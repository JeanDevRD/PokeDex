import connection from "../utils/DbConnection.js";
import { DataTypes } from "sequelize";

const Region = connection.define("Region", {
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
    tableName: "Regions",
}
);

export default Region;