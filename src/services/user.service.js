import axios from "axios";

const API_URL = 'http://65.108.182.146:8080';
// const API_URL = 'http://localhost:8080';

class UserService {
    getAllUsers() {
        return axios.get(API_URL + "/api/all_users");
    }

    getUser(id) {
        return axios.get(API_URL + "/api/user_by_id/" + id);
    }

    addUser(fullName, email, photoUrl) {
        return axios.post(API_URL + '/api/add_user/', {
            fullName,
            email,
            photoUrl
        });
    }

    updateUser(clientId, fullName, email, photoUrl) {
        return axios.put(API_URL + `/api/update_user/${clientId}`, {
            fullName,
            email,
            photoUrl
        });
    }

    deleteUser(id) {
        return axios.delete(API_URL + '/api/delete_user/' + id);
    }
}

export default new UserService();