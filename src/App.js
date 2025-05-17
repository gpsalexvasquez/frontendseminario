import React, { useState } from 'react';
import './App.css';

function App() {
  const [id, setId] = useState('');
  const [newText, setNewText] = useState('');
  const [message, setMessage] = useState('');

  const handleEdit = async (e) => {
    e.preventDefault();

    if (!id || !newText) {
      setMessage('Por favor completa todos los campos.');
      return;
    }


    
    try {
      const response = await fetch(`http://localhost:3000/frases/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ texto: newText }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Frase editada correctamente.');
        setId('');
        setNewText('');
      } else {
        setMessage(`Error: ${data.error || 'No se pudo editar la frase.'}`);
      }
    } catch (err) {
      setMessage('Error al conectar con el servidor.');
    }
  };

  return (
    <div className="App">
      <h1>Editar Frase</h1>
      <form onSubmit={handleEdit}>
        <label>
          ID de la frase:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Nuevo texto:
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Guardar cambios</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
