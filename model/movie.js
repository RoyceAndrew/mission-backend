
import { DataTypes } from "sequelize";

const SeriesFilm = (sequelize) => { return sequelize.define('series/film', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    judul: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    deskripsi: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    tahun: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pembuat_film: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    cast: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    batasan_usia: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    is_series: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
    },
    poster: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    img_horiz: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    preview: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    rating: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
  }, {
    tableName: '`series/film`', 
    timestamps: false,
  })};

export default SeriesFilm