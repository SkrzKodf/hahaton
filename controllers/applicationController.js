import ApplicationService from "../services/applicationService.js"
import { applicationIsValid } from "../validators/applicationValidator.js";

class ApplicationController{

    static CODE = "DSG698fas7f6dg70876G7F6G0"
    static applicationService = new ApplicationService();

    static getApplications = async (req,res)=>{
        const { filter } = req.query;

        let applications = await ApplicationController.applicationService.getApplications()

        // if (filter) {
        //     applications = applications.filter(e => e.age < filter);
        // }

        res.set('Content-Type', 'application/json')
        res.status(200).send(ApplicationController.body(applications));
    }

    static addApplication = async (req,res)=>{
        if (!req.body) {
            res.status(403).send(ApplicationController.exception("1", "Неверное тело запроса"));
            return;
        }

        console.log(req.body);

        const application = {
            "surname": req.body.surname,
            "name": req.body.name,
            "patronymic": req.body.patronymic,
            "birthDay": req.body.birthDay,
            "email": req.body.email,
            "tel":  req.body.tel,
            "status":  req.body.status,
            "teamName":  req.body.teamName,
            "track":  req.body.track,
            "teamMembers":  req.body.teamMembers,
            "note":  req.body.note
        }

        console.log(application);

        if (!applicationIsValid(application)) {
            res.status(403).send(ApplicationController.exception("2", "Не валидный application"));
            return;
        }

        const check = await ApplicationController.applicationService.addApplication(application);

        if (!check) {
            res.status(502).send(
                ApplicationController.exception("3", "Заявка не была добавлена")
            );
            return;
        }

        res.status(200)
        // res.status(200).send(ApplicationController.body("ok"));
    }

    static body = (json) => {
        return {
            "controller-code": ApplicationController.CODE,
            "payload": json
        }
    }

    static exception = (code, text) => {
        return {
            "controller-code": ApplicationController.CODE,
            "exception-code": code,
            "text": text
        }
    }


}

export default ApplicationController