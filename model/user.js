import { sq } from "../database/chilldb.js";
import { DataTypes } from "sequelize";


const User = sq.define("users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(45),
        allowNull: false,
    }, 
    fullname: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    status_premium: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    verify_token: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    is_verify: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
},  {
        tableName: 'user', 
        timestamps: false,
    }
);

export default User