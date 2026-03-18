import { projectRoot } from "./paths.js";
import path from "path";
import dotenv from "dotenv";


const envPath = path.join(
  projectRoot,
  process.env.NODE_ENV && process.env.NODE_ENV !== "development"
    ? `.env.${process.env.NODE_ENV}`
    : ".env"
);

dotenv.config({ path: envPath });