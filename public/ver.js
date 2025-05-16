document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('http://localhost:3000/frases'); // Cambia la URL si tu API usa otro puerto
      const frases = await response.json();
  
      const container = document.getElementById('frases-container');
      container.innerHTML = '';
  
      frases.forEach(frase => {
        const div = document.createElement('div');
        div.classList.add('frase');
        div.innerHTML = `
          <p><strong>Código:</strong> ${frase.codigo}</p>
          <p><strong>Palabra Clave:</strong> ${frase.palabraClave}</p>
          <p><strong>Descripción:</strong> ${frase.descripcion}</p>
          <p><strong>Fecha:</strong> ${frase.fecha}</p>
        `;
        container.appendChild(div);
      });
  
    } catch (error) {
      console.error('Error al cargar las frases:', error);
      alert('No se pudieron cargar las frases.');
    }
  });
  