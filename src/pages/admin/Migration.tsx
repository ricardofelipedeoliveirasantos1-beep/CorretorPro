import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { collection, writeBatch, doc, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface MigrationReport {
  totalFound: number;
  fromLocalStorage: number;
  fromMock: number;
  validForMigration: number;
  invalid: number;
  duplicates: number;
  conflicts: number;
  clientsToMigrate: any[];
  legacyMap: Record<string, string>;
}

export function Migration() {
  const { user, workspace, membership, isDemoMode } = useAuth();
  const [report, setReport] = useState<MigrationReport | null>(null);
  const [isMigrating, setIsMigrating] = useState(false);
  const [backupDone, setBackupDone] = useState(false);
  const [migrationDone, setMigrationDone] = useState(false);
  const [migratedCount, setMigratedCount] = useState(0);
  const [migrationError, setMigrationError] = useState<string | null>(null);

  // Security checks
  if (isDemoMode) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-6 rounded-lg text-center">
          <h2 className="text-xl font-bold mb-2">Modo Demonstração Ativo</h2>
          <p>A migração deve ser executada com uma conta Firebase real.</p>
        </div>
      </div>
    );
  }

  if (!user || !workspace || !membership || membership.role !== 'owner' || membership.status !== 'active') {
    return <div className="p-8 text-red-500 font-bold text-center">Acesso Negado. Requer privilégios de Owner.</div>;
  }

  const handleDryRun = async () => {
    try {
      const saved = localStorage.getItem('corretorpro_clients');
      let rawClients: any[] = [];
      let isFromLocalStorage = false;

      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            rawClients = parsed;
            isFromLocalStorage = true;
          }
        } catch (e) {
          console.error('Failed to parse localStorage', e);
        }
      }

      const totalFound = rawClients.length;
      const validForMigration: any[] = [];
      const invalid: any[] = [];
      const legacyMap: Record<string, string> = {};

      rawClients.forEach(client => {
        if (client && typeof client === 'object' && client.id && client.name) {
          // Normalization & Idempotent ID
          const firestoreClientId = `client_${workspace.id}_${client.id}`;
          
          const normalized = {
            id: firestoreClientId,
            legacyId: client.id.toString(),
            workspaceId: workspace.id,
            name: (client.name || '').trim(),
            email: (client.email || '').trim(),
            phone: (client.phone || '').trim().replace(/\s+/g, ''),
            status: client.status || 'lead',
            temperature: client.temperature || 'cold',
            tags: client.tags || [],
            source: client.source || 'other',
            notes: client.notes || '',
            createdAt: client.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: user.uid
          };
          validForMigration.push(normalized);
          legacyMap[client.id.toString()] = firestoreClientId;
        } else {
          invalid.push(client);
        }
      });

      // Check duplicates in Firestore
      const existingQuery = await getDocs(collection(db, 'clients'));
      const existingIds = new Set(existingQuery.docs.map(d => d.id));
      
      let duplicates = 0;
      const finalToMigrate = validForMigration.filter(c => {
        if (existingIds.has(c.id)) {
          duplicates++;
          return false;
        }
        return true;
      });

      setReport({
        totalFound,
        fromLocalStorage: isFromLocalStorage ? totalFound : 0,
        fromMock: isFromLocalStorage ? 0 : totalFound,
        validForMigration: validForMigration.length,
        invalid: invalid.length,
        duplicates,
        conflicts: 0,
        clientsToMigrate: finalToMigrate,
        legacyMap
      });
      setBackupDone(false);
      setMigrationDone(false);
      setMigrationError(null);
    } catch (err) {
      console.error(err);
      alert('Erro no Dry Run');
    }
  };

  const handleBackup = () => {
    if (!report) return;
    
    // Download legacy map
    const mapBlob = new Blob([JSON.stringify(report.legacyMap, null, 2)], { type: 'application/json' });
    const mapUrl = URL.createObjectURL(mapBlob);
    const mapA = document.createElement('a');
    mapA.href = mapUrl;
    mapA.download = 'client-id-mapping.json';
    mapA.click();

    // Download backup
    const saved = localStorage.getItem('corretorpro_clients') || '[]';
    const backupData = {
      timestamp: new Date().toISOString(),
      workspaceId: workspace.id,
      executorUid: user.uid,
      count: report.totalFound,
      records: JSON.parse(saved)
    };
    
    const backupBlob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const backupUrl = URL.createObjectURL(backupBlob);
    const backupA = document.createElement('a');
    backupA.href = backupUrl;
    
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const dateStr = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;
    
    backupA.download = `backup-clients-pre-firestore-${dateStr}.json`;
    backupA.click();

    setBackupDone(true);
  };

  const handleMigrate = async () => {
    if (!report || report.clientsToMigrate.length === 0 || !backupDone) return;
    
    setIsMigrating(true);
    setMigrationError(null);
    let successCount = 0;
    let errCount = 0;

    try {
      // Split into batches of 500 (Firestore limit)
      const batchPromises = [];
      for (let i = 0; i < report.clientsToMigrate.length; i += 500) {
        const batch = writeBatch(db);
        const chunk = report.clientsToMigrate.slice(i, i + 500);
        
        chunk.forEach(client => {
          const ref = doc(db, 'clients', client.id);
          batch.set(ref, client);
        });
        
        batchPromises.push(batch.commit().then(() => chunk.length));
      }
      
      const results = await Promise.allSettled(batchPromises);
      
      results.forEach(result => {
        if (result.status === 'fulfilled') {
          successCount += result.value;
        } else {
          errCount += 500; // rough estimate for failed batch
          console.error("Batch error:", result.reason);
        }
      });

      setMigratedCount(successCount);
      
      if (errCount > 0) {
        setMigrationError(`Falha ao migrar alguns registros. Sucesso: ${successCount}. Falhas: ${errCount}. Verifique o console.`);
      } else {
        setMigrationDone(true);
      }
    } catch (err: any) {
      console.error(err);
      setMigrationError(err.message || 'Erro crítico na migração.');
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Migração de Clients para Firestore</h1>
      
      <div className="bg-white dark:bg-[#1E293B] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-[rgba(255,255,255,0.1)] mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Status do Ambiente</h2>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <li><strong>Usuário:</strong> {user.email}</li>
          <li><strong>UID:</strong> {user.uid}</li>
          <li><strong>Workspace:</strong> {workspace.name}</li>
          <li><strong>Workspace ID:</strong> {workspace.id}</li>
          <li><strong>Role:</strong> {membership.role}</li>
        </ul>
      </div>

      <div className="flex gap-4 mb-8">
        <button 
          onClick={handleDryRun}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
        >
          Executar Dry Run
        </button>

        {report && (
          <button 
            onClick={handleBackup}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold"
          >
            Fazer Backup JSON e Map
          </button>
        )}

        {report && !migrationDone && (
          <button 
            onClick={handleMigrate}
            disabled={isMigrating || report.clientsToMigrate.length === 0 || !backupDone}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isMigrating ? 'Migrando...' : 'Migrar para Firestore'}
          </button>
        )}
      </div>

      {report && (
        <div className="bg-white dark:bg-[#1E293B] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-[rgba(255,255,255,0.1)]">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Resultado do Dry Run</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-gray-50 dark:bg-[#0F172A] rounded-lg">
              <p className="text-xs text-gray-500 uppercase font-bold">Total Encontrado</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{report.totalFound}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-[#0F172A] rounded-lg">
              <p className="text-xs text-gray-500 uppercase font-bold">Do LocalStorage</p>
              <p className="text-2xl font-bold text-blue-600">{report.fromLocalStorage}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-[#0F172A] rounded-lg">
              <p className="text-xs text-gray-500 uppercase font-bold">Válidos</p>
              <p className="text-2xl font-bold text-green-600">{report.validForMigration}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-[#0F172A] rounded-lg">
              <p className="text-xs text-gray-500 uppercase font-bold">Prontos p/ Migrar</p>
              <p className="text-2xl font-bold text-purple-600">{report.clientsToMigrate.length}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-[#0F172A] rounded-lg">
              <p className="text-xs text-gray-500 uppercase font-bold">Inválidos</p>
              <p className="text-2xl font-bold text-red-600">{report.invalid}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-[#0F172A] rounded-lg">
              <p className="text-xs text-gray-500 uppercase font-bold">Duplicados (Skip)</p>
              <p className="text-2xl font-bold text-yellow-600">{report.duplicates}</p>
            </div>
          </div>
          
          {!backupDone && report.clientsToMigrate.length > 0 && (
            <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg mb-4">
              ⚠️ O botão de migração está desabilitado. Faça o Backup JSON primeiro.
            </div>
          )}

          {migrationError && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg font-medium mb-4">
              ❌ {migrationError}
            </div>
          )}

          {migrationDone && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium">
              ✅ Migração concluída com sucesso! {migratedCount} clientes gravados.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
