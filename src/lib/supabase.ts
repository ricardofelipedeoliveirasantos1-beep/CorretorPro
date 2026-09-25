import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Variáveis de ambiente do Supabase não encontradas. O cliente não pode ser inicializado corretamente.')
}

// Inicializa o cliente exportando uma única instância.
export const supabase = createClient(
  supabaseUrl || 'http://localhost:54321', // Fallback apenas para evitar crash do app se .env estiver vazio inicialmente
  supabaseAnonKey || 'anon_key_placeholder'
)
