import axios from "axios";

class UserService {
    getAllUsers() {
        return axios.get("/api/all_users");
    }

    getUser(id) {
        return axios.get("/api/user_by_id/" + id);
    }

    addUser(fullName, email, photoUrl) {
        return axios.post('/api/add_user/', {
            fullName,
            email,
            photoUrl
        });
    }

    updateUser(clientId, fullName, email, photoUrl) {
        return axios.put(`/api/update_user/${clientId}`, {
            fullName,
            email,
            photoUrl
        });
    }

    deleteUser(id) {
        return axios.delete('/api/delete_user/' + id);
    }
}

export default new UserService();