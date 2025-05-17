import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchItems = async () => {
    const res = await axios.get("http://localhost:5000/api/items");
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async () => {
    if (editingId) {
      await axios.put(`http://localhost:5000/api/items/${editingId}`, form);
    } else {
      await axios.post("http://localhost:5000/api/items", form);
    }
    setForm({ name: "", description: "" });
    setEditingId(null);
    fetchItems();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
    fetchItems();
  };

  const handleEdit = (item) => {
    setForm({ name: item.name, description: item.description });
    setEditingId(item.id);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );


return (
  <div className="container mt-4">
    <h1 className="text-primary">CRUD React + Node</h1>

    <div className="mb-3">
      <input
        className="form-control mb-2"
        type="text"
        placeholder="Buscar por Palabra Clave"
      />
      <input
        className="form-control mb-2"
        type="text"
        placeholder="Nombre"
      />
      <input
        className="form-control mb-2"
        type="text"
        placeholder="Descripción"
      />
      <button className="btn btn-success">Agregar</button>
    </div>

    <ul className="list-group">
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <span><b>PalabraClaveEjemplo</b>: Descripción de la frase</span>
        <div>
          <button className="btn btn-warning btn-sm me-2">Editar</button>
          <button className="btn btn-danger btn-sm">Eliminar</button>
        </div>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <span><b>OtraPalabra</b>: Otra descripción</span>
        <div>
          <button className="btn btn-warning btn-sm me-2">Editar</button>
          <button className="btn btn-danger btn-sm">Eliminar</button>
        </div>
      </li>
      {/* Puedes duplicar más <li> según necesites para mostrar el diseño */}
    </ul>
  </div>
)};



//   return (
//     <div className="container mt-4">
//       <h1 className="text-primary">CRUD React + Node</h1>

//       <div className="mb-3">
//         <input
//           className="form-control mb-2"
//           type="text"
//           placeholder="Buscar por Palabra Clave"
//           value={search}
//           onChange={handleSearchChange}
//         />
//         <input
//           className="form-control mb-2"
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           placeholder="Nombre"
//         />
//         <input
//           className="form-control mb-2"
//           name="description"
//           value={form.description}
//           onChange={handleChange}
//           placeholder="Descripción"
//         />
//         <button className="btn btn-success" onClick={handleSubmit}>
//           {editingId ? "Actualizar" : "Agregar"}
//         </button>
//       </div>

//       <ul className="list-group">
//         {filteredItems.map(item => (
//           <li
//             key={item.id}
//             className="list-group-item d-flex justify-content-between align-items-center"
//           >
//             <span><b>{item.name}</b>: {item.description}</span>
//             <div>
//               <button className="btn btn-wrning btn-sm me-2" onClick={() => handleEdit(item)}>Editar</button>
//               <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Eliminar</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
