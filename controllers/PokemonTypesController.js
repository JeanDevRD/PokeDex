import context from "../context/DbContext.js";

export function getIndex(req, res, next) {
    context.PokemonTypes.findAll()
        .then((types) => {
            const typesData = types.map((result) => result.dataValues);
            res.render("pokemonTypes/index", {title: 
                "Tipos de Pokémon",
                 types: typesData,
                 hasTypes: typesData.length > 0
                });
        })
        .catch((err) => {
            console.error("Error fetching types:", err);
            res.status(500).send("Error fetching types");
        });
}
export function getCreate(req, res, next) {
    res.render("pokemonTypes/save", {
        title: "new type",
        editMode: false
    });
}
export function postCreate(req,res,next){
    const name = req.body.name;

    context.PokemonTypes.create({ name: name })
        .then(() => {
            res.redirect("/pokemonTypes/index");
        })
        .catch((err) => {
            console.error("Error creating type:", err);
            res.status(500).send("Error creating type");
        });
}

export function getEdit(req, res, next) {
    const id = req.params.id;
    context.PokemonTypes.findOne({ where: { id: id } })
        .then((type) => {
            if(type){
                const typeData = type.dataValues;
            res.render("pokemonTypes/save", {
                title: `Edit-Type: ${typeData.name}`,
                type: typeData,
                editMode: true
            });
            } else {
                res.status(404).send("Type not found");
            }
        })
        .catch((err) => {
            console.error("Error fetching type:", err);
            res.status(500).send("Error fetching type");
        });
}

export function postEdit(req,res,next){
    const name = req.body.name;
    const id = req.params.id;
    context.PokemonTypes.findOne({ where: { id: id } })
        .then((type) => {
            if(type){
                context.PokemonTypes.update({ name: name }, { where: { id: id } })
                    .then(() => {
                        res.redirect("/pokemonTypes/index");
                    })
                    .catch((err) => {
                        console.error("Error updating type:", err);
                        res.status(500).send("Error updating type");
                    });
            }
        })
        .catch((err) => {
            console.error("Error fetching type:", err);
            res.status(500).send("Error fetching type");
        });
}
 export function Delete(req,res,next){
        const id = req.body.id;
        context.PokemonTypes.findOne({ where: { id: id } })
            .then((type) => {
                if(type){
                    context.PokemonTypes.destroy({ where: { id: id } })
                        .then(() => {
                            res.redirect("/pokemonTypes/index");
                        })
                        .catch((err) => {
                            console.error("Error deleting type:", err);
                            res.status(500).send("Error deleting type");
                        });
                }
            })
            .catch((err) => {
                console.error("Error fetching type:", err);
                res.status(500).send("Error fetching type");
            });
 }
 export function getDelete(req, res, next) {
    const id = req.params.id;
    context.PokemonTypes.findOne({ where: { id } })
        .then((type) => {
            if (type) {
                res.render("pokemonTypes/delete", {
                    title: "Eliminar Tipo",
                    type: type.dataValues
                });
            }
        });
}