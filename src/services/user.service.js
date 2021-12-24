import axios from "axios";
import {URL} from './url'


class UserService {
    getAllUsers() {
        return axios.get(URL + "/api/all_users");
    }

    getUser(id) {
        return axios.get(URL + "/api/user_by_id/" + id);
    }

    addUser(fullName, email, photoUrl) {
        return axios.post(URL + '/api/add_user/', {
            fullName,
            email,
            photoUrl
        });
    }

    updateUser(clientId, fullName, email, photoUrl) {
        return axios.put(URL + `/api/update_user/${clientId}`, {
            fullName,
            email,
            photoUrl
        });
    }

    deleteUser(id) {
        return axios.delete(URL + '/api/delete_user/' + id);
    }
}

export default new UserService();