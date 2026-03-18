import express from "express";

import { getIndex, getCreate, postCreate, 
    getEdit, postEdit, getDelete, Delete } from "../controllers/RegionController.js";

const router = express.Router();

router.get("/index", getIndex);
router.get("/create", getCreate);
router.post("/create", postCreate);
router.get("/edit/:id", getEdit);
router.post("/edit/:id", postEdit);
router.get("/delete/:id", getDelete);
router.post("/delete", Delete);

export default router;