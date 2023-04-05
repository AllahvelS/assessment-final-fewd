





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  // Select the elements working with
  //movie titles
  const selectMenu = document.getElementById('titles');
  //movie description
  const displayInfo = document.getElementById('display-info');

  // Fetch the movie data from the API
  fetch('https://resource-ghibli-api.onrender.com/films/')
    .then(response => response.json())
    .then((data) => {
      // Loop through the movie data and create an option element for each one
      data.forEach(movie => {
        const option = document.createElement('option');
        option.value = movie.id;
        option.textContent = movie.title;
        selectMenu.append(option);
      });

      // Listen for changes to the select menu and update the movie details accordingly
      selectMenu.addEventListener('change', () => {
        // Find the selected movie in the data
        const selectedMovie = data.find(movie => movie.id === selectMenu.value);

        // Update the display-info section with the movie details
        displayInfo.innerHTML = `
          <h3>${selectedMovie.title}</h3>
          <p>${selectedMovie.release_date}</p>
          <p>${selectedMovie.description}</p>
        `;
      });
    })
    .catch(error => console.log(error))
}


setTimeout(run, 1000);

