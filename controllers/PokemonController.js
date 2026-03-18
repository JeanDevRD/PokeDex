import context from "../context/DbContext.js";

export function getIndex(req, res, next) {
    context.Pokemons.findAll({
        include: [
            { model: context.PokemonTypes, as: "PrimaryType" },
            { model: context.PokemonTypes, as: "SecondaryType" },
            context.Regions
        ]
    })
        .then((pokemons) => {
            const pokemonsData = pokemons.map((result) => result.get({ plain: true }));
            res.render("pokemons/index", {
                title: "Pokémons",
                pokemons: pokemonsData,
                hasPokemons: pokemonsData.length > 0
            });
        });
}

export function getCreate(req, res, next) {

    const typesData = context.PokemonTypes.findAll()
        .then((types) => {
            return types.map((result) => result.dataValues);
        });
    const regionsData = context.Regions.findAll()
        .then((regions) => {
            return regions.map((result) => result.dataValues);
        });
    Promise.all([typesData, regionsData])
        .then(([types, regions]) => {
            res.render("pokemons/save", {
                title: "New Pokémon",
                editMode: false,
                regions: regions,
                types: types
            });
        })
        .catch((err) => {
            console.error("Error fetching types:", err);
            res.status(500).send("Error fetching types");
        });
}

export function postCreate(req,res,next){
    const name = req.body.name;
    const typeId = parseInt(req.body.typeId);
    const secondaryTypeId = parseInt(req.body.secondaryTypeId);
    const regionId = parseInt(req.body.regionId);
    const photo = req.body.photo;
    
    context.Pokemons.create({name: name, pokemonTypesId: typeId, secondaryTypeId: secondaryTypeId, regionId: regionId, photo: photo})
        .then(() => {
            res.redirect("/pokemons/index");
        })
        .catch((err) => {
            console.error("Error creating Pokémon:", err);
            res.status(500).send("Error creating Pokémon");
        });
};

export function getEdit(req, res, next) {
    const id = req.params.id;

    const pokemonData = context.Pokemons.findOne({ where: { id: id } });
    const typesData = context.PokemonTypes.findAll().then(t => t.map(r => r.dataValues));
    const regionsData = context.Regions.findAll().then(r => r.map(r => r.dataValues));

    Promise.all([pokemonData, typesData, regionsData])
        .then(([pokemon, types, regions]) => {
            if (pokemon) {
                res.render("pokemons/save", {
                    title: `Edit Pokémon: ${pokemon.name}`,
                    pokemon: pokemon.dataValues,
                    types: types,
                    regions: regions,
                    editMode: true
                });
            }
        })
        .catch((err) => {
            console.error("Error fetching Pokémon:", err);
            res.status(500).send("Error fetching Pokémon");
        });
}

export function postEdit(req, res, next) {
    console.log("Body recibido:", req.body);
    const name = req.body.name;
    const typeId = parseInt(req.body.typeId);
    const secondaryTypeId = parseInt(req.body.secondaryTypeId);
    const regionId = parseInt(req.body.regionId); 
    const photo = req.body.photo;
    const id = req.params.id;

    context.Pokemons.findOne({ where: { id: id } })
        .then((pokemon) => {
            if (pokemon) {
                context.Pokemons.update(
                    { name: name, pokemonTypesId: typeId, secondaryTypeId: secondaryTypeId, regionId: regionId, photo: photo },
                    { where: { id: id } }
                )
                .then(() => res.redirect("/pokemons/index"))
                .catch((err) => {
                    console.error("Error updating Pokémon:", err);
                    res.status(500).send("Error updating Pokémon");
                });
            }
        })
}
export function Delete(req,res,next){
    const id = req.body.id;
    context.Pokemons.findOne({ where: { id: id } })
        .then((pokemon) => {
            if(pokemon){
                context.Pokemons.destroy({ where: { id: id } })
                    .then(() => {
                        res.redirect("/pokemons/index");
                    })
                    .catch((err) => {
                        console.error("Error deleting Pokémon:", err);
                        res.status(500).send("Error deleting Pokémon");
                    });
            }
        })
        .catch((err) => {
            console.error("Error deleting Pokémon:", err);
            res.status(500).send("Error deleting Pokémon");
        });
}

export function getDelete(req, res, next) {
    const id = req.params.id;
    context.Pokemons.findOne({ where: { id } })
        .then((pokemon) => {
            if (pokemon) {
                res.render("pokemons/delete", {
                    title: "Eliminar Pokémon",
                    pokemon: pokemon.dataValues
                });
            }
        });
}