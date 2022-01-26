import './news.css';
import plus from '../../images/Plus.svg';
import {Link} from "react-router-dom";
import {useCallback, useContext, useEffect, useState} from "react";
import Pagination from "@material-ui/lab/Pagination";
import {BarWave} from "react-cssfx-loading";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/auth-context";
import {URL} from "../../services/url";

const News = () => {
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const header = {
        Authorization: `Bearer ${token}`
    };

    const fetchNews = useCallback(async () => {
        try {
            const fetchedNews = await request(`${URL}/api/news_for_front?page=${page - 1}`, "GET", null, header);

            setNews(fetchedNews.news);
            setCount(fetchedNews.totalPages);
        } catch (e) {}
    }, [page]);

    useEffect(fetchNews, [page]);

    const handlePageChange = (e, value) => {
        setPage(value);
    }

    const deleteNews = async id => {
        try {
           if (window.confirm("Вы уверены что хотите удалить новость?")) {
               const fetchedNews = await request(`${URL}/api/delete_news/${id}?page=${page - 1}`, "DELETE", null, header);
               setNews(fetchedNews.news);
               setCount(fetchedNews.totalPages);
           }

        } catch (e) {}
    };

    return (
        <div className="container mt-100 mt-60">
            <Pagination className="my-3"
                        count={count}
                        page={page}
                        siblingCount={1}
                        boundaryCount={1}
                        variant="outlined"
                        shape="rounded"
                        onChange={handlePageChange}
            />
            {loading ? <BarWave className="loaderBar"/> : <div className="row">
                <div className="col-lg-3 col-md-3 mt-4 pt-2">
                    <div className="blog-post rounded border">
                        <div className="blog-img d-block overflow-hidden position-relative">
                            <img src={plus}
                                 className="img-fluid rounded-top" alt=""/>
                            <div className="overlay rounded-top bg-dark"/>
                            <div className="post-meta">
                                <Link to="/add-news" className="text-light read-more">Добавить новость <i
                                    className="mdi mdi-chevron-right"/></Link>
                            </div>
                        </div>
                        <div className="content p-3">

                            <h4 className="mt-2"><Link to="/add-news" className="text-dark title">Добавте свою
                                новость.</Link></h4>
                            {/*<p className="text-muted mt-2">There is now an abundance of readable dummy texts.*/}
                            {/*    These are usually used when a text is required purely to fill a space.</p>*/}

                        </div>
                    </div>
                </div>

                {
                    Array.from(news).map(value => {
                        return <div key={value.id} className="col-lg-3 col-md-3 mt-4 pt-2">
                            <div className="blog-post rounded border">
                                <div className="blog-img d-block overflow-hidden position-relative">
                                    <img src={value.pictureUrl === "" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlf91yfOT2B7vCu4ikHj54dlXtsCAo7ZzeCw&usqp=CAU" : value.pictureUrl}
                                         className="img-fluid rounded-top" alt="" width="350" height="280"/>
                                    <div className="overlay rounded-top bg-dark"/>
                                    <div className="post-meta">
                                        {/*<a href="javascript:void(0)" className="text-light d-block text-right like">*/}
                                        {/*    <i className="mdi mdi-heart"/> 33</a>*/}
                                        <Link to={"/viewNews/" + value.id} className="text-light read-more">Посмотреть
                                            <i className="mdi mdi-chevron-right"/></Link>
                                        <Link to={"/edit-news/" + value.id} className="text-light d-block text-right">Редактировать
                                            <i className="mdi mdi-chevron-right"/></Link>
                                        <a href="#" className="text-light d-block text-right"
                                           onClick={() => deleteNews(value.id)}>Удалить</a>
                                    </div>
                                </div>
                                <div className="content p-3">
                                    <h4 className="mt-2"><Link to={"/viewNews/" + value.id} className="text-dark title">{value.title === "" ? "Заголовок" : value.title}</Link></h4>
                                    <p className="text-muted mt-2">{value.text.slice(0, 150)}...</p>

                                </div>
                            </div>
                        </div>
                    })
                }

            </div>}
        </div>
    );
};

export default News;