import { DataTypes } from "sequelize";
import { sq } from "../database/chilldb.js";

 const FilmGenre = sq.define(`series_film_genre`, {
    'series/filmId': {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    genreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
}, {
    tableName: 'series_film_genre', 
    timestamps: false,
});

export default FilmGenre