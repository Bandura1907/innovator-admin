import {URL} from "./url";
import axios from "axios";

class ReportService {
    getAllReports() {
        return axios.get(`${URL}/api/all_reports`);
    }

    getReportById(id) {
        return axios.get(`${URL}/api/report_by_id/${id}`);
    }

    solveProblem(id) {
        return axios.put(`${URL}/api/solve_the_problem/${id}`);
    }

    deleteReport(id) {
        return axios.delete(`${URL}/report_error_delete/${id}`);
    }
}

export default new ReportService();