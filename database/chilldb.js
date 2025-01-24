import env from "dotenv";
import { Sequelize } from "sequelize";
import Genre from "../model/genre.js";
import SeriesFilm from "../model/movie.js";


env.config();

const sq = new Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
})

const Sefi = SeriesFilm(sq);
const Gen = Genre(sq);


Sefi.belongsToMany(Gen, { through: "series_film_genre" });
Gen.belongsToMany(Sefi, { through: "series_film_genre" });

export { sq, Sefi, Gen };