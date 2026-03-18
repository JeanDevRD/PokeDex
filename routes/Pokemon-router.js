import express from "express";

import { getIndex, getCreate, postCreate, 
    getEdit, postEdit, Delete, getDelete} from "../controllers/PokemonController.js"; 

const router = express.Router();

router.get("/index", getIndex);
router.get("/create", getCreate);
router.post("/create", postCreate);
router.get("/edit/:id", getEdit);
router.post("/edit/:id", postEdit);
router.post("/delete", Delete);
router.get("/delete/:id", getDelete);

export default router;