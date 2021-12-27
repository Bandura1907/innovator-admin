import {Link, Redirect, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import NewsService from "../../../services/news.service";
import {BarWave} from "react-cssfx-loading";

const EditNews = () => {
    const id = useParams().id;

    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);

    const [pictureUrl, setPictureUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [text, setText] = useState('');
    const [sourceUrl, setSourceUrl] = useState('');

    useEffect(() => {
        NewsService.getNewsById(id).then(res => {
            setPictureUrl(res.data.pictureUrl);
            setVideoUrl(res.data.videoUrl);
            setText(res.data.text);
            setSourceUrl(res.data.sourceUrl);

            setLoading(false);
        });
    }, []);

    const save = (e) => {
           e.preventDefault();
           NewsService.editNews(id, pictureUrl, videoUrl, text, sourceUrl).then(() => {
              setRedirect(true);
           });
    }

    if (redirect)
        return <Redirect to='/news'/>

    return (
        loading ? <BarWave className="loaderBar"/> : <div className="main-container">
            <div className="pd-20 card-box mb-30">
                <form onSubmit={save}>
                    <div className="clearfix">
                        <div className="pull-left">
                            <h4 className="text-blue h4">Новости</h4>
                            <p className="mb-30">Редактирование</p>
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
                            <input className="form-control" type="text" value={pictureUrl} onChange={e => setPictureUrl(e.target.value)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">url видео</label>
                        <div className="col-sm-12 col-md-10">
                            <input className="form-control" type='text' value={videoUrl} onChange={e => setVideoUrl(e.target.value)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">Текст</label>
                        <div className="col-sm-12 col-md-10">
                            <textarea className="form-control" value={text} onChange={e => setText(e.target.value)}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">source Url</label>
                        <div className="col-sm-12 col-md-10">
                            <input className="form-control" type="text" value={sourceUrl} onChange={e => setSourceUrl(e.target.value)}/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditNews;