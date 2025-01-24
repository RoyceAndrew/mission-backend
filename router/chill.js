import express from "express";
import { getAllMovies, updateMoviesById, getSingleMovie, deleteMoviesById, createMovies } from "../controller/moviesController.js";

const router = express.Router();


router.get("/movies", getAllMovies);

router.post("/movie", createMovies);

router.patch(`/movie/:id`, updateMoviesById);

router.get("/movie/:id", getSingleMovie);

router.delete("/movie/:id", deleteMoviesById);

export default router;