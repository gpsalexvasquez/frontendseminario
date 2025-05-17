import React, { useState } from 'react';

function ListaConEliminar() {
  const [items, setItems] = useState(['Elemento 1', 'Elemento 2', 'Elemento 3']);

  const eliminarItem = (index) => {
    const nuevosItems = items.filter((_, i) => i !== index);
    setItems(nuevosItems);
  };

  return (
    <div>
      <h2>Lista de elementos</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => eliminarItem(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaConEliminar;