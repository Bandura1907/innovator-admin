import axios from "axios";
import {URL} from "./url";


class UsefulService {

    async getAllUseful(token) {
        return await axios.get(`${URL}/api/useful`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
    }

    async getUsefulById(token, id) {
        return await axios.get(`${URL}/api/useful/${id}`, {
            headers: {Authorization: 'Bearer ' + token}
        })
    }

    async saveUseful(token, useful) {
        return await axios.post(`${URL}/api/useful`, {
            title: useful.title,
            imageUrl: useful.imageUrl,
            description: useful.description,
            category: useful.category
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
    }

    async updateUseful(token, id, useful) {
        return await axios.put(`${URL}/api/useful/${id}`, {
            title: useful.title,
            imageUrl: useful.imageUrl,
            description: useful.description,
            category: useful.category
        }, {headers: {Authorization: 'Bearer ' + token}})
    }

    async deleteUseful(token, id) {
        return await axios.delete(`${URL}/api/useful/${id}`, {
            headers: {Authorization: 'Bearer ' + token}
        })
    }
}

export default new UsefulService()