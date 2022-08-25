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
}

export default new BlocksService();