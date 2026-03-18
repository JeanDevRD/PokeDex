import connection from "../utils/DbConnection.js";
import { DataTypes } from "sequelize";

const PokemonTypes = connection.define("PokemonTypes", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    tableName: "PokemonTypes",
}
);

export default PokemonTypes;