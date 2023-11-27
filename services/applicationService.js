import ApplicationRepository from "../repositories/applicationRepository.js"

class ApplicationService{
    applicationRepository;

    constructor() {
        this.applicationRepository = new ApplicationRepository;
    }

    getApplications = async () => {
        return await this.applicationRepository.getAllApplications();
    }

    addApplication = async (application) => {
        return await this.applicationRepository.addNewApplication(application);
    }
}

export default ApplicationService