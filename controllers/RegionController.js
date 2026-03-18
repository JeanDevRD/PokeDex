import context from "../context/DbContext.js";

export function getIndex(req, res, next) {
    context.Regions.findAll()
        .then((regions) => {
            const regionsData = regions.map((result) => result.dataValues);
            res.render("regions/index", {title: 
                "Regiones",
                 regions: regionsData,
                 hasRegions: regionsData.length > 0
                });
        })
        .catch((err) => {
            console.error("Error fetching regions:", err);
            res.status(500).send("Error fetching regions");
        });
}
export function getCreate(req, res, next) {
    res.render("Regions/save", {
        title: "new region",
        editMode: false
    });
}
export function postCreate(req,res,next){
    const name = req.body.name;

    context.Regions.create({ name: name })
        .then(() => {
            res.redirect("/regions/index");
        })
        .catch((err) => {
            console.error("Error creating region:", err);
            res.status(500).send("Error creating region");
        });
}

export function getEdit(req, res, next) {
    const id = req.params.id;
    context.Regions.findOne({ where: { id: id } })
        .then((region) => {
            if(region){
                const regionData = region.dataValues;
            res.render("regions/save", {
                title: `Edit-Region: ${regionData.name}`,
                region: regionData,
                editMode: true
            });
            } else {
                res.status(404).send("Region not found");
            }
        })
        .catch((err) => {
            console.error("Error fetching region:", err);
            res.status(500).send("Error fetching region");
        });
}

export function postEdit(req,res,next){
    const name = req.body.name;
    const id = req.params.id;
    context.Regions.findOne({ where: { id: id } })
        .then((region) => {
            if(region){
                context.Regions.update({ name: name }, { where: { id: id } })
                    .then(() => {
                        res.redirect("/regions/index");
                    })
                    .catch((err) => {
                        console.error("Error updating region:", err);
                        res.status(500).send("Error updating region");
                    });
            }
        })
        .catch((err) => {
            console.error("Error fetching region:", err);
            res.status(500).send("Error fetching region");
        });
}
 export function Delete(req,res,next){
        const id = req.body.id;
        context.Regions.findOne({ where: { id: id } })
            .then((region) => {
                if(region){
                    context.Regions.destroy({ where: { id: id } })
                        .then(() => {
                            res.redirect("/regions/index");
                        })
                        .catch((err) => {
                            console.error("Error deleting region:", err);
                            res.status(500).send("Error deleting region");
                        });
                }
            })
            .catch((err) => {
                console.error("Error fetching region:", err);
                res.status(500).send("Error fetching region");
            });
 }

 export function getDelete(req, res, next) {
    const id = req.params.id;
    context.Regions.findOne({ where: { id } })
        .then((region) => {
            if (region) {
                res.render("regions/delete", {
                    title: "Eliminar Región",
                    region: region.dataValues
                });
            }
        });
}