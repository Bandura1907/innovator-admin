import axios from "axios";
import {URL} from "./url";

class BlocksService {

    async getBlocks(token, index) {
        return await axios.get(`${URL}/api/get_blocks/${index}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }

    async getBlockById(token, id) {
        return await axios.get(`${URL}/api/get_block_by_id/${id}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }

    async addBlock(token, index, name, description) {
        return await axios.post(`${URL}/api/add_block/${index}`, {
            name, description
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }

    async editBlock(token, id, index, name, description) {
        return await axios.put(`${URL}/api/edit_block/${id}/${index}`, {
            name, description
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }

    async deleteBlock(token, id) {
        return await axios.delete(`${URL}/api/delete_block/${id}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }
}

export default new BlocksService();