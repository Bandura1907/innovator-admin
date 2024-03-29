import {useParams} from "react-router-dom";
import {useCallback, useContext, useEffect, useState} from "react";
import Plyr from "plyr-react";
import 'plyr-react/dist/plyr.css';
import {BarWave} from "react-cssfx-loading";
import {AuthContext} from "../../context/auth-context";
import {URL} from "../../services/url";
import axios from "axios";

const ViewNews = () => {
    const id = useParams().id;

    const [loading, setLoading] = useState(true);
    const {token} = useContext(AuthContext);
    const [news, setNews] = useState({});
    const header = {
      Authorization: `Bearer ${token}`
    };

    const fetchNews = useCallback(async () => {
        try {
            const news = await axios.get(`${URL}/api/news_id/${id}`, {headers: header});
            setNews(news.data);
            setLoading(false);
        } catch (e) {}
    }, []);

    useEffect(fetchNews, []);

    const date = new Date(news.datePublished);

    return (
       loading ? <BarWave className="loaderBar"/> : <div className="main-container">
            <div className="blog-wrap">
                <div className="container pd-0">
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <div className="blog-detail card-box overflow-hidden mb-30">
                                <div className="blog-img">
                                    <img src={news.pictureUrl === "" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlf91yfOT2B7vCu4ikHj54dlXtsCAo7ZzeCw&usqp=CAU" : news.pictureUrl} alt="" width="1120"/>
                                </div>
                                <div className="blog-caption">
                                    <h4 className="mb-10">{news.title}</h4>
                                    <h5 className="mb-10">{news.subtitle}</h5>
                                    <p>{news.text}</p>
                                    <h5 className="mb-10">Видео</h5>

                                        <div className="container">
                                            <Plyr source={
                                                {
                                                    type: "video",
                                                    sources: [
                                                        {
                                                            src: news.videoUrl,
                                                            provider: "html5"
                                                        }
                                                    ]
                                                }
                                            }/>
                                        </div>
                                    <br/>
                                    <p>Дата публикации: </p>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewNews;