// /home/ubuntu/freelancerai/frontend/pages/admin/dashboard.jsx
// Exemplo da página principal do Dashboard do Administrador

import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router'; // Para redirecionar se não for admin
// import { supabase } from '../../lib/supabaseClient'; // Cliente Supabase
import FinancialSummary from '../../components/admin/FinancialSummary';
// Importar outros componentes do admin (ex: Tabela de Transações, Gerenciamento de Usuários)

// Mock de dados para demonstração (em produção, viria do Supabase)
const mockFinancialData = {
  totalRevenue: 12500.75, // Valor total transacionado
  platformFees: 2500.15, // 20% de totalRevenue (aproximado)
  totalPayouts: 10000.60, // totalRevenue - platformFees
  activeProjects: 150,
  newUsersToday: 25,
};

const AdminDashboard = () => {
  // const router = useRouter();
  const [financialData, setFinancialData] = useState(mockFinancialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Lógica de Autenticação/Autorização:
    // Verificar se o usuário logado é um administrador.
    // Se não for, redirecionar para a página inicial ou de login.
    // Ex: checkAdminStatus().then(isAdmin => !isAdmin && router.push('/'));

    // Fetch de dados reais do Supabase (substituir mock)
    const fetchAdminData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Exemplo: Chamar uma Edge Function segura que retorna dados agregados
        // const { data, error } = await supabase.functions.invoke('get-admin-dashboard-data');
        // if (error) throw error;
        // setFinancialData(data);

        // Usando mock por enquanto
        await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay da rede
        setFinancialData(mockFinancialData);

      } catch (err) {
        console.error("Erro ao buscar dados do admin:", err);
        setError("Não foi possível carregar os dados do dashboard.");
      } finally {
        setLoading(false);
      }
    };

    // fetchAdminData(); // Descomentar para usar dados reais
  }, []); // Executa ao montar o componente

  // Renderização condicional enquanto carrega ou se houver erro
  if (loading) return <div className="p-6">Carregando dashboard...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard do Administrador</h1>

      {/* Componente de Resumo Financeiro */}
      <FinancialSummary data={financialData} />

      {/* Outras seções do Dashboard */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Últimas Transações</h2>
          {/* Aqui iria uma tabela ou lista de transações recentes */}
          <p className="text-gray-500">[Tabela de Transações Pendente]</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Gerenciamento</h2>
          {/* Links para outras áreas administrativas */}
          <ul className="space-y-2">
            <li><a href="#" className="text-blue-600 hover:underline">Gerenciar Usuários</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">Gerenciar Projetos</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">Configurações da Plataforma</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Adicionar proteção de rota (ex: usando High-Order Component ou middleware)
// export default withAdminAuth(AdminDashboard);
export default AdminDashboard; // Exportação simples para exemplo

