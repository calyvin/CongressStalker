var fs = require('fs');

getLegislatorData = function(){
  var legislatorData = fs.readFileSync('data/data.json', 'utf8');
  return JSON.parse(legislatorData);
}

saveLegislatorData = function(newData){
  fs.writeFile('data/data.json', JSON.stringify(newData));
}

addLegislator = function(leg) {
	var legislatorData = getLegislatorData();
  console.log(leg);
  var newLegislator={
    "id": leg.member_id,
    "first_name": leg.first_name,
    "last_name": leg.last_name,
  }

  for(let i = 0; i < legislatorData.legislators.length; i++){
    if(legislatorData.legislators[i].id == newLegislator.id)
      return;
  }

  legislatorData.legislators.push(newLegislator);
  legislatorData.counter = legislatorData.legislators.length;
  saveLegislatorData(legislatorData);
}
// updateMovieData = function(i, id, title, year, rating, director, actors, plot, poster, showtimes){
//   var movieData=getMovieData();
//   var movieList=movieData.movies;
//   var thisMovie = movieList[i];
//   thisMovie["id"]= id;
//   thisMovie["title"] = title;
//   thisMovie["year"]= year;
//   thisMovie["rating"]= rating; 
//   thisMovie["director"]= director;
//   thisMovie["actors"]= actors;
//   thisMovie["plot"]= plot;
//   thisMovie["poster"]= poster;
//   thisMovie["showtimes"] = showtimes.split(",");
//   saveMovieData(movieData);
// }

// deleteMovieData = function(id){
//   var movieData = getMovieData();
//   var movieToDelete = movieData.movies[id];

//   movieData.movies.splice(id, 1);
  
//   movieData.counter=movieData.movies.length;
//   for(i=0; i< movieData.movies.length;i++){
//     movieData.movies[i].id=i;
//   }

//   saveMovieData(movieData);
// }
exports.addLegislator = addLegislator;
exports.getLegislatorData = getLegislatorData;
exports.saveLegislatorData = saveLegislatorData;
// exports.updateMovieData = updateMovieData;
// exports.deleteMovieData = deleteMovieData;