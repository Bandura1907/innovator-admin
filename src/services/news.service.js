import {URL} from "./url";
import axios from "axios";

class NewsService {

    getNews(params) {
        return axios.get(`${URL}/api/news_for_front`, {params});
    }

    getNewsById(id) {
        return axios.get(`${URL}/api/news_id/${id}`);
    }

    addNews(pictureUrl, videoUrl, text, sourceUrl) {
        return axios.post(`${URL}/api/news_add`, {
            pictureUrl,
            videoUrl,
            text,
            sourceUrl
        });
    }

    editNews(id, pictureUrl, videoUrl, text, sourceUrl) {
        return axios.put(`${URL}/api/news_edit/${id}`, {
            pictureUrl,
            videoUrl,
            text,
            sourceUrl
        });
    }

    deleteNews(id) {
        return axios.delete(`${URL}/api/delete_news/${id}`);
    }
}

export default new NewsService();