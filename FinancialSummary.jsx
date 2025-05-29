// /home/ubuntu/freelancerai/frontend/components/admin/FinancialSummary.jsx
// Exemplo de componente para exibir o resumo financeiro no Dashboard Admin

import React from 'react';

// Função auxiliar para formatar moeda (exemplo simples, usar biblioteca como Intl.NumberFormat em produção)
const formatCurrency = (value) => {
  return `R$ ${value.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;
};

const FinancialSummary = ({ data }) => {
  if (!data) {
    return <div className="text-center text-gray-500">Dados financeiros não disponíveis.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Receita Total</h3>
        <p className="mt-1 text-3xl font-semibold text-green-600">{formatCurrency(data.totalRevenue)}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Taxas da Plataforma (20%)</h3>
        <p className="mt-1 text-3xl font-semibold text-blue-600">{formatCurrency(data.platformFees)}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Total Pago a Freelancers</h3>
        <p className="mt-1 text-3xl font-semibold text-yellow-600">{formatCurrency(data.totalPayouts)}</p>
      </div>
      {/* Poderia adicionar outros cards, como Novos Usuários, Projetos Ativos, etc. */}
      {/* Exemplo:
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Projetos Ativos</h3>
        <p className="mt-1 text-3xl font-semibold text-indigo-600">{data.activeProjects}</p>
      </div>
      */}
    </div>
  );
};

export default FinancialSummary;

