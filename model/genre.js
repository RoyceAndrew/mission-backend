import {  DataTypes } from "sequelize";


const Genre = (sequelize) => { return sequelize.define('genres', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  }, {
    tableName: 'genres', 
    timestamps: false,
  })};

  export default Genre