import "./utils/LoadEnvConfig.js";
import express from 'express';
import { projectRoot } from "./utils/paths.js";
import path from "path";
import { engine } from "express-handlebars";
import context from "./context/DbContext.js";
import regionRouter from "./routes/Region-router.js";
import { GetSection } from "./utils/helpers/hbs/Section.js"; 
import { Equals } from "./utils/helpers/hbs/Compare.js"; 
import pokemonTypesRouter from "./routes/PokemonTypes-router.js";
import pokemonRouter from "./routes/Pokemon-router.js";

const app = express();

app.engine('hbs', 
    engine({
        extname: '.hbs',
        defaultLayout: 'main',
        layoutsDir: "views/layout",
        helpers: {
          section: GetSection,
          eq: Equals
        },
        }
    )
);

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(express.static(path.join(projectRoot, "public")));


app.use("/regions", regionRouter);
app.use("/pokemonTypes", pokemonTypesRouter);
app.use("/pokemons", pokemonRouter);

app.use((req, res) => {
    res.status(404).render("404", {title: "404 - Not Found"});
});

context.Sequelize.sync() 
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

  