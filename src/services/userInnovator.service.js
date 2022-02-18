import {URL} from "./url";
import axios from "axios";


class UserInnovatorService {
    async getAllUsers(token) {
        return await axios.get(`${URL}/api/auth/users`, {
            headers: {Authorization: `Bearer ${token}`}
        })
    }

    async getUser(token, id) {
        return await axios.get(`${URL}/api/auth/user/${id}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
    }

    async saveUser(token, user) {
        return await axios.post(`${URL}/api/auth/create`, {
            username: user.username,
            password: user.password,
            role: user.role
        }, {
            headers: {Authorization: `Bearer ${token}`}
        })
    }

    async editUser(token, id, user) {
        return await axios.put(`${URL}/api/auth/edit/${id}`, {
            username: user.username,
            password: user.password,
            role: user.role
        }, {
            headers: {Authorization: `Bearer ${token}`}
        })
    }

    async deleteUser(token, id) {
        return await axios.delete(`${URL}/api/auth/delete/${id}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
    }
}

export default new UserInnovatorService()