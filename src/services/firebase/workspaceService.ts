import { collection, doc, setDoc, getDocs, getDoc, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import type { Workspace, Membership, User } from '../../types/firebase';

export async function getUserProfile(uid: string): Promise<User | null> {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data() as User;
  }
  return null;
}

export async function createUser(userData: Omit<User, 'createdAt' | 'updatedAt'>): Promise<User> {
  const existingUser = await getUserProfile(userData.uid);
  if (existingUser) return existingUser; // Idempotency

  const userRef = doc(db, 'users', userData.uid);
  const now = new Date().toISOString();
  const user: User = { ...userData, createdAt: now, updatedAt: now };
  await setDoc(userRef, user);
  return user;
}

export async function getMemberships(userId: string): Promise<Membership[]> {
  const membershipsQuery = query(collection(db, 'memberships'), where('userId', '==', userId));
  const membershipsSnapshot = await getDocs(membershipsQuery);
  return membershipsSnapshot.docs.map(doc => doc.data() as Membership);
}

export async function createWorkspace(workspaceData: Omit<Workspace, 'id' | 'createdAt' | 'updatedAt'>): Promise<Workspace> {
  const newWorkspaceRef = doc(collection(db, 'workspaces'));
  const now = new Date().toISOString();
  
  const workspace: Workspace = {
    ...workspaceData,
    id: newWorkspaceRef.id,
    createdAt: now,
    updatedAt: now,
  };
  
  await setDoc(newWorkspaceRef, workspace);
  return workspace;
}

export async function createMembership(membershipData: Omit<Membership, 'id' | 'createdAt'>): Promise<Membership> {
  // Check if membership already exists to avoid duplicates
  const q = query(
    collection(db, 'memberships'), 
    where('userId', '==', membershipData.userId),
    where('workspaceId', '==', membershipData.workspaceId)
  );
  const existing = await getDocs(q);
  if (!existing.empty) {
    return existing.docs[0].data() as Membership;
  }

  const newMembershipRef = doc(collection(db, 'memberships'));
  const membership: Membership = {
    ...membershipData,
    id: newMembershipRef.id,
    createdAt: new Date().toISOString(),
  };
  
  await setDoc(newMembershipRef, membership);
  return membership;
}

export async function getUserWorkspaces(userId: string): Promise<Workspace[]> {
  const memberships = await getMemberships(userId);
  const activeMemberships = memberships.filter(m => m.status === 'active');
  const workspaceIds = activeMemberships.map(m => m.workspaceId);
  
  if (workspaceIds.length === 0) return [];
  
  // Note: Firebase 'in' query supports up to 10 items. For SaaS, a user typically has 1-2 workspaces.
  const workspacesQuery = query(collection(db, 'workspaces'), where('id', 'in', workspaceIds.slice(0, 10)));
  const workspacesSnapshot = await getDocs(workspacesQuery);
  return workspacesSnapshot.docs.map(doc => doc.data() as Workspace);
}

export async function bootstrapSaaSClient(uid: string, email: string | null, displayName: string | null, workspaceNameFromInput?: string) {
  // 1. Ensure User Profile
  const user = await createUser({
    uid,
    email,
    displayName,
    photoURL: null
  });

  // 2. Check if user already has a workspace membership
  const memberships = await getMemberships(uid);
  let activeOwnerMembership = memberships.find(m => m.role === 'owner' && m.status === 'active');

  const deterministicWorkspaceId = `workspace_${uid}`;
  const deterministicMembershipId = `${uid}_${deterministicWorkspaceId}`;

  // 3. SE NÃO TEM MEMBERSHIP, CRIA PRIMEIRO (para liberar as regras do Firestore)
  if (!activeOwnerMembership) {
    activeOwnerMembership = {
      id: deterministicMembershipId,
      userId: uid,
      workspaceId: deterministicWorkspaceId,
      role: 'owner',
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    // setDoc is allowed by rules (create or update for owner)
    await setDoc(doc(db, 'memberships', deterministicMembershipId), activeOwnerMembership);
  }

  // 4. AGORA QUE TEM MEMBERSHIP, PODEMOS LER/ATUALIZAR O WORKSPACE
  let workspace: Workspace | null = null;
  const targetWorkspaceId = activeOwnerMembership.workspaceId;
  const wsRef = doc(db, 'workspaces', targetWorkspaceId);
  
  try {
    const wsSnap = await getDoc(wsRef);
    if (wsSnap.exists()) {
      workspace = wsSnap.data() as Workspace;
    } else {
      // ORPHAN WORKSPACE: A membership exists, but the workspace document is missing!
      // Vamos recriar o workspace com o mesmo ID da membership
      const slugBase = email ? email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '-') : 'imoveis-' + Math.floor(Math.random()*1000);
      const workspaceName = workspaceNameFromInput || (displayName ? `${displayName} Imóveis` : 'Meu CRM');
      
      workspace = {
        id: targetWorkspaceId,
        name: workspaceName,
        slug: slugBase.toLowerCase(),
        ownerUid: uid,
        plan: 'basic',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await setDoc(wsRef, workspace);
    }
  } catch (error) {
    console.error('Erro ao acessar workspace. Garantindo criação segura...', error);
    throw error;
  }

  return {
    user,
    workspace,
    membership: activeOwnerMembership
  };
}
