// /home/ubuntu/freelancerai/frontend/components/ProjectCard.jsx
// Exemplo de um componente React para exibir um card de projeto
// (Assumindo uso de Next.js/React e talvez Tailwind CSS para estilização)

import React from 'react';

const ProjectCard = ({ project }) => {
  // Assume que 'project' é um objeto com dados como title, description, budget, clientName, etc.
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-xl font-semibold mb-2">{project.title || 'Título do Projeto'}</h3>
      <p className="text-gray-600 mb-3">{project.description ? project.description.substring(0, 100) + '...' : 'Descrição breve do projeto...'}</p>
      <div className="flex justify-between items-center mb-3">
        <span className="text-green-600 font-medium">Orçamento: ${project.budget || 'N/D'}</span>
        <span className="text-sm text-gray-500">Por: {project.clientName || 'Cliente'}</span>
      </div>
      {/* Adicionar tags de habilidades, localização (se aplicável), etc. */}
      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors duration-200">
        Ver Detalhes
      </button>
    </div>
  );
};

export default ProjectCard;

