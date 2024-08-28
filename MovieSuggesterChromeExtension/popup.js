const apiKey = '380b2718';

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
  
function fetchMovies() {
    let random_page = getRandomInt(100);
    if (random_page == 0)
        random_page = 1;
    
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=movie&y=&type=movie&page=${random_page}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.Response === "True") {
            const random = getRandomInt(10);
            if(data.Search.length>=random){
                const movie = data.Search[random];
                //console.log('Movies with IMDb rating > 7.0:', movie);
                fetchMovie(movie.imdbID)
            }else{
                console.log('Unable to fetch movie at this time. Please try again later.');
                alert("Unable to fetch movie at this time. Please try again later.");
            }
        } else {
          console.log('Error:', data.Error);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      return true;
  }

function fetchMovie(imbdId){
    const imdbid = imbdId
    const movie_url = `https://www.omdbapi.com/?i=${imdbid}&apikey=${apiKey}`;
    fetch(movie_url)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                const movie = data;
                const imdbRating = movie.imdbRating;
                const movie_poster = document.getElementById('movie_poster');
                const movie_nm = document.getElementById('movie_nm');
                movie_nm.innerHTML = movie.Title + "["+imdbRating+"]";
                movie_poster.src = movie.Poster;
                return true;
            }
        })
}

fetchMovies()
  