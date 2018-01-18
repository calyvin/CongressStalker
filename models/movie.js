var fs = require('fs');

getMovieData = function(){
  var theatreData = fs.readFileSync('data/data.json', 'utf8');
  return JSON.parse(theatreData);
}

saveMovieData = function(newData){
  fs.writeFile('data/data.json', JSON.stringify(newData));
}
addMovie = function(title, year, rating, director, actors, plot, poster, showtimes) {
	var movieData = getMovieData();
    var newId = parseInt(movieData.movies.length);
    
    var newMovie={
      "id": newId,
      "title": title,
      "year": year,
      "rating": rating, 
      "director": director,
      "actors": actors,
      "plot": plot,
      "poster": poster,
      "showtimes": showtimes
    }
    movieData.movies.push(newMovie);
    movieData.counter = movieData.movies.length;
    saveMovieData(movieData);
}
updateMovieData = function(i, id, title, year, rating, director, actors, plot, poster, showtimes){
  var movieData=getMovieData();
  var movieList=movieData.movies;
  var thisMovie = movieList[i];
  thisMovie["id"]= id;
  thisMovie["title"] = title;
  thisMovie["year"]= year;
  thisMovie["rating"]= rating; 
  thisMovie["director"]= director;
  thisMovie["actors"]= actors;
  thisMovie["plot"]= plot;
  thisMovie["poster"]= poster;
  thisMovie["showtimes"] = showtimes.split(",");
  saveMovieData(movieData);
}

deleteMovieData = function(id){
  var movieData = getMovieData();
  var movieToDelete = movieData.movies[id];

  movieData.movies.splice(id, 1);
  
  movieData.counter=movieData.movies.length;
  for(i=0; i< movieData.movies.length;i++){
    movieData.movies[i].id=i;
  }

  saveMovieData(movieData);
}
exports.addMovie = addMovie;
exports.getMovieData = getMovieData;
exports.saveMovieData = saveMovieData;
exports.updateMovieData = updateMovieData;
exports.deleteMovieData = deleteMovieData;