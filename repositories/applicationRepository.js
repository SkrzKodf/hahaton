import DataStore from "nedb-promises"

class ApplicationRepository{
    db; 

    constructor() {
        this.db = DataStore.create("./db/applications.db");
        this.db.load();
    }

    getAllApplications = async () => {
        let applications;
        await this.db.find({}).then((res) => {
            applications = res;
        })
        return applications
    }

    getAllApplicationsByFilter = async (filter) => {
        let applications;
        await this.db.findOne(filter).then((res) => {
            applications = res;
        })
        return applications
    }

    addNewApplication = async (application) => {
        let result = true
        console.log(this.getAllApplicationsByFilter(application));
        if (await this.getAllApplicationsByFilter(application) !== null) return false

        await this.db.insert(application).catch((err) => {
            result = false
        })
        return result
    }
}

export default ApplicationRepository