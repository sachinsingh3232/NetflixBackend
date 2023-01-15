const router = require('express').Router();
const { createMovie, updateMovie, deleteMovie, getMovieDetails, random, getAllMovies, getAllSeries, getAllMoviesSeries } = require('../Controllers/movieController')
const { isUserAuthenticated, isAdmin } = require('../Middleware/auth')

router.route("/createMovie").post(isUserAuthenticated, isAdmin, createMovie);
router.route("/updateMovie/:id").put(isUserAuthenticated, isAdmin, updateMovie);
router.route("/deleteMovie/:id").delete(isUserAuthenticated, isAdmin, deleteMovie);
router.route("/getMovieDetails/:id").get(isUserAuthenticated, getMovieDetails);
router.route("/random").get(isUserAuthenticated, random);
router.route("/getAllMovies").get(isUserAuthenticated, getAllMovies);
router.route("/getAllSeries").get(isUserAuthenticated, getAllSeries);
router.route("/getAllMoviesSeries").get(isUserAuthenticated, getAllMoviesSeries);

module.exports = router;