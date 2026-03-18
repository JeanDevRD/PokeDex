import context from "../context/DbContext.js"; 

export async function getIndex(req, res, next) {
    const { searchTerm, typeId, regionId } = req.query;

    let pokemons = await context.Pokemons.findAll({
        include: [
            { model: context.PokemonTypes, as: "PrimaryType" },
            { model: context.PokemonTypes, as: "SecondaryType" },
            context.Regions
        ]
    });

    let pokemonsData = pokemons.map(p => p.get({ plain: true }));

    if (searchTerm)
        pokemonsData = pokemonsData.filter(p => 
            p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    if (typeId)
        pokemonsData = pokemonsData.filter(p =>
            p.pokemonTypesId == typeId || p.secondaryTypeId == typeId);

    if (regionId)
        pokemonsData = pokemonsData.filter(p => p.regionId == regionId);

    const types = await context.PokemonTypes.findAll()
        .then(t => t.map(r => r.dataValues));

    const regions = await context.Regions.findAll()
        .then(r => r.map(r => r.dataValues));

    res.render("home/index", {
        title: "home",
        pokemons: pokemonsData,
        types,
        regions,
        hasPokemons: pokemonsData.length > 0,
        formData: { searchTerm, typeId, regionId }
    });
}