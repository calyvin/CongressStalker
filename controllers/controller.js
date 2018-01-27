var express = require('express')
  , router = express.Router();

var request = require('request');

var Legislators = require('../models/legislators')

var apikey = 'f09c17eb';
var fs = require('fs');

var apikey = 'Cowto7nqKFyirfn3ml80rCQGM58eXx4NymaLPLro';

router.get('/', function(req, res){
  res.redirect('/legislators');
});

router.get('/legislators', function(req, res){
  var states_json = JSON.parse(fs.readFileSync("data/states.json"));
  var legislatorData = Legislators.getLegislatorData();
  res.render('index.ejs', {states: states_json.states, legislators: legislatorData.legislators, bills: legislatorData.bills});
});

router.post('/legislators', function(req1, res1){
  var state=req1.body.state;
  var branch = req1.body.branch;
  var options = {
    url: "https://api.propublica.org/congress/v1/members/"+branch+"/"+state+"/current.json",
    headers: {
      "X-API-Key": apikey
    }
  };// request options

  request(options, function(req2, res2, body){
      var propublica_data = JSON.parse(body);
      if(propublica_data.results)
        res1.render("legislators.ejs", {data: propublica_data.results});
      else
        res1.redirect('/');
  });//request for Probulica API query
});

router.get('/legislators/:id', function(req, res){
  var legislatorID=req.params.id;

  var options = {
      url: "https://api.propublica.org/congress/v1/members/"+legislatorID+".json",
      headers: {
        "X-API-Key": apikey
      }
    };// request options
    request(options, function(req2, res2, body1){
      var options = {
        url: "https://api.propublica.org/congress/v1/members/"+legislatorID+"/bills/updated.json",
        headers: {
          "X-API-Key": apikey
        }
      };// request options
      request(options, function(req2, res2, body2){
        console.log(JSON.parse(body2).results[0].bills);
        res.render("show_legislator_detail.ejs", {legislator: JSON.parse(body1).results[0], bills: JSON.parse(body2).results[0].bills});
      });
    });//request for Probulica API query
});

router.post('/legislators/:id', function(req, res){
  var legislatorID=req.params.id;

  var options = {
      url: "https://api.propublica.org/congress/v1/members/"+legislatorID+".json",
      headers: {
        "X-API-Key": apikey
      }
    };// request options
    request(options, function(req2, res2, body){
      Legislators.addLegislator(JSON.parse(body).results[0]);
      res.redirect('/legislators');
    });//request for Probulica API query
});
router.delete('/legislators/:id', function(req, res){
  Legislators.deleteLegislator(req.params.id);
  res.redirect('/');
});
router.post('/bills/:id', function(req, res){
  var billID=req.params.id.split('-')[0];
  var billCongress = req.params.id.split('-')[1];
  console.log("Congress: " + billCongress + "\n ID: " + billID)
  var options = {
      url: "https://api.propublica.org/congress/v1/"+billCongress+"/bills/"+billID+".json",
      headers: {
        "X-API-Key": apikey
      }
    };// request options
    request(options, function(req2, res2, body){
      // console.log(JSON.parse(body));
      Legislators.addBill(JSON.parse(body).results[0]);
      res.redirect('/legislators');
    });//request for Probulica API query
});
router.delete('/bills/:id', function(req, res){
  Legislators.deleteBill(req.params.id);
  res.redirect('/');
});


// router.post('/movies', function(req, res){
//   //get title
//   var title=req.body.title;
//   title=title.replace(/ /g, '+');
//   console.log(title);
//   //search for results
//   request("http://www.omdbapi.com/?apikey="+apikey+"&t="+title+"&r=json", function(err, response, body) {
//       if(!err){
//         var movieResponse = JSON.parse(body);
//             //if we get results, render update page
//         res.render('movies/new_movie.ejs', {movie: movieResponse})
//       }
//       else{
//         res.redirect('/movies');
//       }
//     });//look for the movie
// });

// router.post('/movies/:id', function(req, res){
//   var movieID=req.params.id;
//   console.log(movieID)
//   request("http://www.omdbapi.com/?apikey="+apikey+"&i="+movieID+"&r=json", function(err, response, body) {
//       var movieResponse = JSON.parse(body);
//       console.log(movieResponse)

//       if(!err){
//         Movies.addMovie(movieResponse.Title, movieResponse.Year, movieResponse.Rated, movieResponse.Director, movieResponse.Actors, movieResponse.Plot, movieResponse.Poster, ["3:00", "5:30", "8:45"]);
//         res.redirect('/movies');
//       }
//       else{
//         res.redirect('/movies');
//       }
//       //if we don't get results, return to page
//     });//look for the movie
// });

// router.get('/movies/:id', function(req,res){
//   console.log("looking for movie", req.params.id);
//   var thisMovie = Movies.getMovieData().movies[req.params.id];
//   res.render("movies/show_movie_detail.ejs", {movie: thisMovie} );

// });


module.exports = router
