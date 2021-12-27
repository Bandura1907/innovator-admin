import {URL} from "./url";
import axios from "axios";

class ReportService {
    getAllReports() {
        return axios.get(`${URL}/api/all_reports`);
    }

    deleteReport(id) {
        return axios.delete(`${URL}/report_error_delete/${id}`);
    }
}

export default new ReportService();