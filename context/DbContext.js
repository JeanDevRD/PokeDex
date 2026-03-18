import connection from "../utils/DbConnection.js";
import PokemonsModel from "../models/PokemonsModel.js";
import PokemonTypesModel from "../models/PokemonsTypeModel.js";
import RegionsModel from "../models/RegionsModel.js";

connection.authenticate().then(() => {
    console.log("Database connection established successfully.");
}).catch((err) => {
    console.error("Unable to connect to the database:", err);
});

PokemonsModel.belongsTo(PokemonTypesModel, { foreignKey: "pokemonTypesId" });
PokemonTypesModel.hasMany(PokemonsModel, { foreignKey: "pokemonTypesId" });
PokemonsModel.belongsTo(RegionsModel, { foreignKey: "regionId" });
RegionsModel.hasMany(PokemonsModel, { foreignKey: "regionId" });

export default {
    Sequelize: connection,
    Pokemons: PokemonsModel,
    PokemonTypes: PokemonTypesModel,
    Regions: RegionsModel
};
