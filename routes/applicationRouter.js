import express from "express"
import ApplicationController from "../controllers/applicationController.js";

const router = express.Router()
const urlencodedParser = express.urlencoded({ extended: false });

router.get("/all_applications", ApplicationController.getApplications)

router.post("/add_application", urlencodedParser, ApplicationController.addApplication)

export default router;
