import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import AuthHandler from "./AuthHandler";
import Config from "./Config";

class APIHandler {
    async checkLogin() {
        if (AuthHandler.checkTokenExpiry()) {
            try {
                var response = await axios.post(Config.refreshApiUrl, {
                    refresh: AuthHandler.getRefreshToken()
                })
                // set refresh token
                reactLocalStorage.set("token", response.data.access)
            }
            catch (error) {
                console.log(error)
                // invalid token for refresh, need to log user out
                AuthHandler.logoutUser()
                window.location = "/"
            }
        }
    }

    async saveClientData(name, email, school, programme) {
        // wait till token get updated then proceed
        await this.checkLogin()

        // call client API to save data
        var response = await axios.post(Config.clientApiUrl, {
            name: name, email: email, school: school, programme: programme
        },
            { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
        )

        return response
    }

    async fetchAllClient() {
        await this.checkLogin()

        var response = await axios.get(Config.clientApiUrl, {
            headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() }
        })

        return response
    }

    async fetchClientDetail(id) {
        await this.checkLogin()

        try {
            var response = await axios.get(Config.clientApiUrl + "" + id + "/", {
                headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() }
            })
        }
        catch (error) {
            console.log(error)
        }

        return response
    }

    async editClientData(name, email, school, programme, id) {
        // wait till token get updated then proceed
        await this.checkLogin()

        // call client API to save data
        var response = await axios.put(Config.clientApiUrl + "" + id +"/", {
            name: name, email: email, school: school, programme: programme
        },
            { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
        )

        return response
    }

    async saveAppointmentData(appointment_date, appointment_time, client_id) {
        // wait till token get updated then proceed
        await this.checkLogin()

        // call appointment API to save data
        var response = await axios.post(Config.appointmentUrl, {
            appointment_date: appointment_date, appointment_time:appointment_time, client_id:client_id
        },
            { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
        )

        return response
    }

    async fetchAppointmentDetail(id) {
        await this.checkLogin()

        try {
            var response = await axios.get(Config.appointmentUrl + "" + id + "/", {
                headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() }
            })
        }
        catch (error) {
            console.log(error)
        }

        return response
    }

    async editAppointmentData(appointment_date, appointment_time, client_id, id) {
        // wait till token get updated then proceed
        await this.checkLogin()

        // call appointment API to save data
        var response = await axios.put(Config.appointmentUrl + "" + id +"/", {
            appointment_date: appointment_date, appointment_time: appointment_time, client_id: client_id
        },
            { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
        )

        return response
    }

    async saveAssessmentData(attendance, intake_date, status, case_category, remarks, appointment_id, client_id) {
        // wait till token get updated then proceed
        await this.checkLogin()

        // call assessment API to save data
        var response = await axios.post(Config.assessmentUrl, {
            attendance: attendance, intakeDate:intake_date, status:status, case_category:case_category, 
                remarks:remarks, appointment_id:appointment_id, client_id:client_id
        },
            { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
        )

        return response
    }

    async fetchAssessmentDetail(id) {
        await this.checkLogin()

        try {
            var response = await axios.get(Config.assessmentUrl + "" + id + "/", {
                headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() }
            })
        }
        catch (error) {
            console.log(error)
        }

        return response
    }

    async editAssessmentData(attendance, intake_date, status, case_category, remarks, id, client_id, app_id) {
        // wait till token get updated then proceed
        await this.checkLogin()

        // call assessment API to save data
        var response = await axios.put(Config.assessmentUrl + "" + id +"/", {
            attendance: attendance, intakeDate:intake_date, status:status, case_category:case_category, 
                remarks:remarks, client_id : client_id, appointment_id:app_id
        },
            { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
        )

        return response
    }
}

export default APIHandler