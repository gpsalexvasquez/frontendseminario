import React, { useEffect, useState } from 'react';

const VerFrases = () => {
  const [frases, setFrases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reemplaza esta URL con la de tu backend
    fetch('http://localhost:3000/api/frases')
      .then(response => response.json())
      .then(data => {
        setFrases(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al cargar frases:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando frases...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Frases Motivadoras</h2>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Código</th>
            <th className="border px-4 py-2">Palabra Clave</th>
            <th className="border px-4 py-2">Descripción</th>
            <th className="border px-4 py-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {frases.map((frase) => (
            <tr key={frase.codigo}>
              <td className="border px-4 py-2">{frase.codigo}</td>
              <td className="border px-4 py-2">{frase.palabraClave}</td>
              <td className="border px-4 py-2">{frase.descripcion}</td>
              <td className="border px-4 py-2">{frase.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerFrases;
