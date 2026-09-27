import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { bootstrapSaaSClient } from '../services/firebase/workspaceService';
import { LoadingState } from '../components/ui/LoadingState';
import type { Workspace, Membership, User } from '../types/firebase';

interface AuthContextType {
  user: FirebaseUser | null;
  dbUser: User | null;
  workspace: Workspace | null;
  workspaceId: string | null;
  membership: Membership | null;
  role: string | null;
  isLoading: boolean;
  isDemoMode: boolean;
  authError: string | null;
  signInDemo: (email: string) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const isDemoEnv = import.meta.env.VITE_ENABLE_DEMO_MODE === 'true';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [dbUser, setDbUser] = useState<User | null>(null);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [membership, setMembership] = useState<Membership | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // Demo session bypass
    if (isDemoEnv) {
      const storedDemo = localStorage.getItem('@futcrm:demo_session');
      if (storedDemo) {
        try {
          const data = JSON.parse(storedDemo);
          setUser(data.user as any); // Fake user
          setIsDemoMode(true);
          setIsLoading(false);
          return;
        } catch (e) {
          console.error('Erro ao ler sessão demo', e);
        }
      }
    }

    // Firebase Auth listener
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && !localStorage.getItem('@futcrm:demo_session')) {
        setUser(firebaseUser);
        setIsDemoMode(false);
        try {
          // Bootstrap or fetch existing workspace data
          const pendingWorkspaceName = sessionStorage.getItem('@futcrm:pending_workspace_name');
          const { user: dbU, workspace: ws, membership: ms } = await bootstrapSaaSClient(
            firebaseUser.uid,
            firebaseUser.email,
            firebaseUser.displayName,
            pendingWorkspaceName || undefined
          );
          if (pendingWorkspaceName) sessionStorage.removeItem('@futcrm:pending_workspace_name');
          setDbUser(dbU);
          setWorkspace(ws);
          setMembership(ms);
        } catch (error: any) {
          console.error("Erro ao carregar dados do workspace:", error);
          // In case of error (like offline or permission), still set user but no workspace
          setAuthError(error.message || 'Erro desconhecido');
          setDbUser(null);
          setWorkspace(null);
          setMembership(null);
        }
      } else if (!isDemoMode) {
        setUser(null);
        setDbUser(null);
        setWorkspace(null);
        setMembership(null);
        setAuthError(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [isDemoMode]);

  const signInDemo = (email: string) => {
    if (!isDemoEnv) return;

    const fakeUser = {
      uid: 'demo-user-123',
      email: email,
      displayName: 'Usuário Demo'
    } as any;

    localStorage.setItem('@futcrm:demo_session', JSON.stringify({ user: fakeUser }));
    setUser(fakeUser);
    setIsDemoMode(true);
  };

  const signOut = async () => {
    if (isDemoMode || localStorage.getItem('@futcrm:demo_session')) {
      localStorage.removeItem('@futcrm:demo_session');
      setUser(null);
      setDbUser(null);
      setWorkspace(null);
      setMembership(null);
      setIsDemoMode(false);
    } else {
      await firebaseSignOut(auth);
    }
  };

  if (isLoading) {
    return <LoadingState fullScreen message="Carregando..." />;
  }

  // Se tem usuário mas não tem workspace, pode ser que o painel precise travar
  // Para fins de flexibilidade, apenas disponibilizamos via contexto.

  return (
    <AuthContext.Provider value={{ 
      user, 
      dbUser,
      workspace, 
      workspaceId: workspace?.id || null,
      membership, 
      role: membership?.role || null,
      isLoading, 
      isDemoMode, 
      authError,
      signInDemo, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
