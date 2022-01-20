import {useParams} from "react-router-dom";
import {useCallback, useContext, useEffect, useState} from "react";
import Plyr from "plyr-react";
import 'plyr-react/dist/plyr.css';
import {BarWave} from "react-cssfx-loading";
import {useHttp} from "../../../hooks/http.hook";
import {AuthContext} from "../../../context/auth-context";
import {URL} from "../../../services/url";
import notFoundImage from '../../../images/notFound.png';

const ViewNews = () => {
    const id = useParams().id;

    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);
    const [news, setNews] = useState({});
    const header = {
      Authorization: `Bearer ${token}`
    };

    const fetchNews = useCallback(async () => {
        try {
            const news = await request(`${URL}/api/news_id/${id}`, "GET", null, header);
            setNews(news);
        } catch (e) {}
    }, []);

    useEffect(() => {
        fetchNews();
    }, []);

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
                                            {/*<video*/}
                                            {/*    poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg?v1"*/}
                                            {/*    controls crossOrigin>*/}
                                            {/*    <source*/}
                                            {/*        src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.mp4"*/}
                                            {/*        type="video/mp4"/>*/}
                                            {/*    <source*/}
                                            {/*        src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.webm"*/}
                                            {/*        type="video/webm"/>*/}
                                            {/*</video>*/}
                                            <Plyr source={
                                                {
                                                    type: "video",
                                                    sources: [
                                                        {
                                                            // src: "https://nl100.cdnsqu.com/s/FXFSyR4T6p48UPCI5.3h7eGouUFBQUFBQUFBQUFBQmdvV2dCUUJC/hd_90/Adrienne.2021.MVO.Amedia.WEBDLRip_480.mp4?vs4-origin",
                                                            src: news.videoUrl,
                                                            provider: "html5"
                                                        }
                                                    ]
                                                }
                                            }/>
                                        </div>


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