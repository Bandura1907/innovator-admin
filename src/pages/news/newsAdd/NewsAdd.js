import {Link, Redirect} from "react-router-dom";
import {useContext, useState} from "react";
import NewsService from "../../../services/news.service";
import {useHttp} from "../../../hooks/http.hook";
import {AuthContext} from "../../../context/auth-context";
import {URL} from "../../../services/url";

const NewsAdd = () => {

    const [redirect, setRedirect] = useState(false);

    const [pictureUrl, setPictureUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [text, setText] = useState('');
    const [sourceUrl, setSourceUrl] = useState('');
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);
    const header = {
        Authorization: `Bearer ${token}`
    };

    const saveNews = async (e) => {
        e.preventDefault();
        await request(`${URL}/api/news_add`, "POST", {
            pictureUrl,
            videoUrl,
            text,
            sourceUrl
        }, header);
        setRedirect(true);
    };

    if (redirect)
        return <Redirect to='/news'/>

    return (
        <div className="main-container">
            <div className="pd-20 card-box mb-30">
                <form onSubmit={saveNews}>
                    <div className="clearfix">
                        <div className="pull-left">
                            <h4 className="text-blue h4">Новости</h4>
                            <p className="mb-30">Добавте новость</p>
                        </div>
                        <div className="pull-right">
                            <Link to="/news">
                                <button type="button"
                                        className="btn btn-outline-danger btn-sm scroll-click m-2">Отмена
                                </button>
                            </Link>
                            <button type="submit" className="btn btn-primary btn-sm scroll-click" rel="content-y"
                                    data-toggle="collapse">Сохранить
                            </button>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">url картинки</label>
                        <div className="col-sm-12 col-md-10">
                            <input className="form-control" type="text" onChange={e => setPictureUrl(e.target.value)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">url видео</label>
                        <div className="col-sm-12 col-md-10">
                            <input className="form-control" type='text' onChange={e => setVideoUrl(e.target.value)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">Текст</label>
                        <div className="col-sm-12 col-md-10">
                            <textarea className="form-control" onChange={e => setText(e.target.value)}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">source Url</label>
                        <div className="col-sm-12 col-md-10">
                            <input className="form-control" type="text" onChange={e => setSourceUrl(e.target.value)}/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewsAdd;