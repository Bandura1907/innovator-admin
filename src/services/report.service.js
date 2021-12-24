import {URL} from "./url";
import axios from "axios";

class ReportService {
    getAllReports() {
        return axios.get(`${URL}/api/all_reports`);
    }
}

export default new ReportService();