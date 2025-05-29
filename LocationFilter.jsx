// /home/ubuntu/freelancerai/frontend/components/LocationFilter.jsx
// Exemplo de componente React para filtro de localização

import React, { useState } from 'react';

const LocationFilter = ({ onLocationChange }) => {
  const [city, setCity] = useState('');
  const [state, setState] = useState(''); // Ou usar um select com estados brasileiros

  const handleApplyFilter = () => {
    // Idealmente, validar os inputs
    if (city) { // Aplicar filtro apenas se a cidade for preenchida
      onLocationChange({ city: city.trim(), state: state.trim() });
    }
  };

  const handleClearFilter = () => {
    setCity('');
    setState('');
    onLocationChange(null); // Sinaliza para remover o filtro de localização
  };

  return (
    <div className="p-4 border rounded-md bg-gray-50 mb-4">
      <h4 className="font-semibold mb-2">Filtrar por Localização (Serviços Presenciais)</h4>
      <div className="mb-2">
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Cidade:</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Ex: São Paulo"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      {/* Poderia adicionar Estado, Raio de busca, etc. */}
      {/* <div className="mb-2">
        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">Estado:</label>
        <input type="text" id="state" value={state} onChange={(e) => setState(e.target.value)} placeholder="Ex: SP" className="w-full px-3 py-2 border border-gray-300 rounded-md ..." />
      </div> */}
      <div className="flex space-x-2 mt-3">
        <button
          onClick={handleApplyFilter}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm"
        >
          Aplicar Filtro
        </button>
        <button
          onClick={handleClearFilter}
          className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 text-sm"
        >
          Limpar
        </button>
      </div>
      {/* Opcional: Integração com API de geolocalização ou mapa */}
    </div>
  );
};

export default LocationFilter;

