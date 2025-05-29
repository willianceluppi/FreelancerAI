// /home/ubuntu/freelancerai/frontend/lib/supabaseClient.js
// Exemplo de inicialização do cliente Supabase no frontend

import { createClient } from '@supabase/supabase-js'

// As variáveis de ambiente devem ser configuradas na Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing. Check environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Exemplo de uso (em um componente ou página):
// import { supabase } from '../lib/supabaseClient'
//
// async function fetchProjects() {
//   const { data, error } = await supabase
//     .from('projects') // Nome da tabela de projetos
//     .select('*')
//     .limit(10)
//
//   if (error) console.error('Error fetching projects:', error)
//   else console.log('Projects:', data)
// }

