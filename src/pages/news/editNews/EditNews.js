import {Link, Redirect, useParams} from "react-router-dom";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {BarWave} from "react-cssfx-loading";
import {useHttp} from "../../../hooks/http.hook";
import {AuthContext} from "../../../context/auth-context";
import {URL} from "../../../services/url";

const EditNews = () => {
    const id = useParams().id;

    const [redirect, setRedirect] = useState(false);
    const [pictureUrl, setPictureUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [text, setText] = useState('');
    const [sourceUrl, setSourceUrl] = useState('');
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);
    const header = {
        Authorization: `Bearer ${token}`
    };

    const radioPhotoLink = useRef();
    const radioVideoLink = useRef();

    const fetchNews = useCallback(async () => {
        try {
            const news = await request(`${URL}/api/news_id/${id}`, "GET", null, header);
            setPictureUrl(news.pictureUrl);
            setVideoUrl(news.videoUrl);
            setText(news.text);
            setSourceUrl(news.sourceUrl);
            setTitle(news.title);
            setSubtitle(news.subtitle);
        } catch (e) {}
    }, [id]);

    useEffect(() => {
        // radioVideoLink.current.checked = true;
        // radioPhotoLink.current.checked = true;
        fetchNews();
    }, [id]);

    const save = async (e) => {
           e.preventDefault();
           try {
               await request(`${URL}/api/news_edit/${id}`, "PUT", {
                   pictureUrl,
                   title,
                   subtitle,
                   videoUrl,
                   text,
                   sourceUrl
               }, header);

               setRedirect(true);
           } catch (e) {

           }
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
                        <label className="col-sm-12 col-md-2 col-form-label">Заголовок</label>
                        <div className="col-sm-12 col-md-10">
                            <input className="form-control" type="text" value={title} onChange={e => setTitle(e.target.value)}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">Подзаголовок</label>
                        <div className="col-sm-12 col-md-10">
                            <input className="form-control" type="text" value={subtitle} onChange={e => setSubtitle(e.target.value)}/>
                        </div>
                    </div>

                    {/*<div className="form-group row">*/}
                    {/*    <div className="custom-control custom-radio mb-5 ml-2">*/}
                    {/*        <input type="radio" id="customRadio1" ref={radioPhotoLink}*/}
                    {/*               name="customRadio"*/}
                    {/*               // onClick={radioPhotoTextHandler}*/}
                    {/*               className="custom-control-input"/>*/}
                    {/*        <label className="custom-control-label" htmlFor="customRadio1">URL картинки</label>*/}
                    {/*    </div>*/}
                    {/*    <div className="custom-control custom-radio mb-5 ml-4">*/}
                    {/*        <input type="radio" id="customRadio2"*/}
                    {/*               name="customRadio"*/}
                    {/*               // onClick={radioPhotoFileHandler}*/}
                    {/*               className="custom-control-input"/>*/}
                    {/*        <label className="custom-control-label" htmlFor="customRadio2">Загрузить картинку</label>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">url картинки</label>
                        <div className="col-sm-12 col-md-10">
                            <input className="form-control"
                                   value={pictureUrl}
                                   type="text"
                                   // disabled={photoText}
                                   onChange={e => setPictureUrl(e.target.value)}/>
                        </div>
                        {/*<div className="col-sm-6 col-md-5">*/}
                        {/*    <input type="file" className="custom-file-input" name="picture"*/}
                        {/*           onChange={e => setPictureUrl(e.target.files[0])}*/}
                        {/*           accept=".jpg, .jpeg, .png"*/}
                        {/*           // disabled={photoFile}*/}
                        {/*    />*/}
                        {/*    <label className="custom-file-label">Выбрать файл</label>*/}
                        {/*</div>*/}
                    </div>

                    {/*<div className="form-group row">*/}
                    {/*    <div className="custom-control custom-radio mb-5 ml-2">*/}
                    {/*        <input type="radio" id="customRadioVideo"*/}
                    {/*               name="customRadioVideo"*/}
                    {/*               // onClick={radioVideoTextHandler}*/}
                    {/*               ref={radioVideoLink}*/}
                    {/*               className="custom-control-input"/>*/}
                    {/*        <label className="custom-control-label" htmlFor="customRadioVideo">URL видео</label>*/}
                    {/*    </div>*/}
                    {/*    <div className="custom-control custom-radio mb-5 ml-5">*/}
                    {/*        <input type="radio" id="customRadioVideo2"*/}
                    {/*               name="customRadioVideo"*/}
                    {/*               // onClick={radioVideoFileHandler}*/}
                    {/*               className="custom-control-input"/>*/}
                    {/*        <label className="custom-control-label" htmlFor="customRadioVideo2">Загрузить видео</label>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">url видео</label>
                        <div className="col-sm-12 col-md-10">
                            <input className="form-control" type='text' value={videoUrl}
                                   onChange={e => setVideoUrl(e.target.value)}
                                   // disabled={videoText}
                            />
                        </div>
                        {/*<div className="col-sm-6 col-md-5">*/}
                        {/*    <input type="file" name="video"*/}
                        {/*           accept=".mp4"*/}
                        {/*           className="custom-file-input"*/}
                        {/*           onChange={e => setVideoUrl(e.target.files[0])}*/}
                        {/*           // disabled={videoFile}*/}
                        {/*    />*/}
                        {/*    <label className="custom-file-label">Выбрать файл</label>*/}
                        {/*</div>*/}
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