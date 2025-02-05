
import { sq, Sefi, Gen } from "../database/chilldb.js";
import FilmGenre from "../model/genre_movie.js";
import { Op, Sequelize, where } from "sequelize";
import sequelize from "sequelize";

sq.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });


const getAllMovies = async (req, res) => {
    try {
        await sq.sync(); 
        const whereClause = {};

       if (req.query.search) {
          whereClause.judul = { [Op.like]: `%${req.query.search}%` };
        }

        if (req.query.filter) {
          whereClause.batasan_usia = req.query.filter;
        }
        const result = await Sefi.findAll({ 
            where: whereClause,
            order: req.query.sort ? sequelize.literal("tahun " + req.query.sort) : null,
            
            include: 
            [{ 
            model: Gen,
            attributes: ["nama"],
            through: { attributes: [] }
        }] 
    }); 
        if (result.length === 0) {
            return res.status(204).json({ error: "Data not found" });
        }
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateMoviesById = async (req, res) => {
    try {
        await sq.sync();
        const {genres, ...moviesdata} = req.body;
        const result = await Sefi.update(moviesdata, {where: {id: req.params.id}});
        if (result.length === 0) {
            return res.status(204).json({ error: "Data not found" });
        }
        if (genres && genres.length > 0) {
            await FilmGenre.destroy({where: {'series/filmId': req.params.id}});
            await FilmGenre.bulkCreate(genres.map((genre) => ({'series/filmId': req.params.id, genreId: genre})));
        }
        return res.status(202).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
}

const getSingleMovie = async (req, res) => {
    try {
        await sq.sync();
        const result = await Sefi.findByPk(req.params.id , { include: 
            [{
            model: Gen,
            attributes: ["nama"],
            through: { attributes: [] }
        }]
        });
        if (!result) {
            return res.status(204).json({ error: "Data not found" });
        }
        return res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
}

const deleteMoviesById = async (req, res) => {
    try {
        await sq.sync();
        const result = await Sefi.destroy({where: {id: req.params.id}});
        if (result.length === 0) {
            return res.status(204).json({ error: "Data not found" });
        }
        await FilmGenre.destroy({where: {'series/filmId': req.params.id}});
        return res.status(202).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
}

const createMovies = async (req, res) => {
    try {
        await sq.sync();
        const {genres, ...moviesdata} = req.body;
        if (!genres || genres.length === 0) {
            return res.status(400).json({ error: "Genres are required" });
        } 
        const result = await Sefi.create(moviesdata);
        if (result) {
           await FilmGenre.bulkCreate(genres.map((genre) => ({'series/filmId': result.id, genreId: genre})));
        }
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export {getAllMovies, updateMoviesById, getSingleMovie, deleteMoviesById, createMovies}