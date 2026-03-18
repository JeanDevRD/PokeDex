import connection from "../utils/DbConnection.js";
import { DataTypes } from "sequelize";

const Pokemons = connection.define("Pokemons", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pokemonTypesId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "PokemonTypes",
            key: "id"
        },
        onDelete: "CASCADE"
    },
    secondaryTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "PokemonTypes",
            key: "id"
        },
        onDelete: "CASCADE"
    },
    regionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Regions",
            key: "id"
        },
        onDelete: "CASCADE"
    }
},
    {
        tableName: "Pokemons"
    }
);

export default Pokemons;