const API_KEY = '85326238'; 

const searchBtn = document.getElementById('searchBtn');
const movieInput = document.getElementById('movieInput');
const resultDiv = document.getElementById('result');

searchBtn.addEventListener('click', () => {
  const query = movieInput.value.trim();
  if (query !== '') {
    buscarPelicula(query);
  }
});

async function buscarPelicula(titulo) {
  resultDiv.innerHTML = '<p>Cargando...</p>';
  
  // Usamos HTTPS siempre para evitar problemas de contenido mixto en GitHub Pages
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(titulo)}&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === 'True') {
      resultDiv.innerHTML = `
        <h2>${data.Title} (${data.Year})</h2>
        <p><strong>Género:</strong> ${data.Genre}</p>
        <p><strong>Director:</strong> ${data.Director}</p>
        <p><strong>Sinopsis:</strong> ${data.Plot}</p>
        ${data.Poster !== 'N/A' ? `<img src="${data.Poster}" alt="Póster de ${data.Title}">` : ''}
      `;
    } else {
      resultDiv.innerHTML = `<p style="color: red;">Película no encontrada: ${data.Error}</p>`;
    }
  } catch (error) {
    console.error('Error al conectar con la API:', error);
    resultDiv.innerHTML = '<p style="color: red;">Ocurrió un error al consultar la API.</p>';
  }
}
