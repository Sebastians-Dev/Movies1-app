const express = require('express');
const moviesRouter = require('./movies.router');
const genresRouter = require('./genres.router');
const directorsRouter = require('./directors.router');
const actorsRouter = require('./actors.router');
const router = express.Router();

// colocar las rutas aquí
router.use(moviesRouter);
router.use(genresRouter);
router.use(directorsRouter);
router.use(actorsRouter);

module.exports = router;