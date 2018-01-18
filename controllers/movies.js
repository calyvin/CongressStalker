var express = require('express')
  , router = express.Router();

var request = require('request');

var Movies = require('../models/movie')

var apikey = 'f09c17eb';

router.get('/', function(req, res){
  res.redirect('/movies');
});

router.get('/movies', function(req, res){
  var movieList = Movies.getMovieData().movies;
  res.render('movies/show_movies.ejs', {movies: movieList});
});

router.post('/movies', function(req, res){
  //get title
  var title=req.body.title;
  title=title.replace(/ /g, '+');
  console.log(title);
  //search for results
  request("http://www.omdbapi.com/?apikey="+apikey+"&t="+title+"&r=json", function(err, response, body) {
      if(!err){
        var movieResponse = JSON.parse(body);
            //if we get results, render update page
        res.render('movies/new_movie.ejs', {movie: movieResponse})
      }
      else{
        res.redirect('/movies');
      }
    });//look for the movie
});

router.post('/movies/:id', function(req, res){
  var movieID=req.params.id;
  console.log(movieID)
  request("http://www.omdbapi.com/?apikey="+apikey+"&i="+movieID+"&r=json", function(err, response, body) {
      var movieResponse = JSON.parse(body);
      console.log(movieResponse)

      if(!err){
        Movies.addMovie(movieResponse.Title, movieResponse.Year, movieResponse.Rated, movieResponse.Director, movieResponse.Actors, movieResponse.Plot, movieResponse.Poster, ["3:00", "5:30", "8:45"]);
        res.redirect('/movies'); 
      }
      else{
        res.redirect('/movies');
      }
      //if we don't get results, return to page
    });//look for the movie
});

router.get('/movies/:id', function(req,res){
  console.log("looking for movie", req.params.id);
  var thisMovie = Movies.getMovieData().movies[req.params.id];
  res.render("movies/show_movie_detail.ejs", {movie: thisMovie} );

});

router.get('/movies/:id/edit', function(req,res){
  var movieList=Movies.getMovieData();
  var thisMovie = movieList.movies[req.params.id];
  res.render("movies/edit_movie.ejs", {movie: thisMovie} );
});

router.delete('/movies/:id', function(req, res){
  Movies.deleteMovieData(req.params.id);
  res.redirect('/movies');
});

router.put('/movies/:id', function(req,res){
  Movies.updateMovieData(req.params.id, req.body.id, req.body.title, req.body.year, req.body.rating, req.body.director, req.body.actors, req.body.plot, req.body.poster, req.body.showtimes);
  res.redirect('/movies');
});

module.exports = router