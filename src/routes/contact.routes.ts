import {Router} from "express";
import {getAllContacts, saveContact} from "../controllers/contact.controller";

const conatctRouter:Router = Router();

conatctRouter.get("/all", getAllContacts);
conatctRouter.post("/save", saveContact)

export default conatctRouter;
