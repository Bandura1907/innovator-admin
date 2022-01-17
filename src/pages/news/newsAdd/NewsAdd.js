import {Link, Redirect} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import NewsService from "../../../services/news.service";
import {useHttp} from "../../../hooks/http.hook";
import {AuthContext} from "../../../context/auth-context";
import {URL} from "../../../services/url";
import axios from "axios";

const NewsAdd = () => {

    const [redirect, setRedirect] = useState(false);

    const [pictureUrl, setPictureUrl] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [text, setText] = useState('');
    const [sourceUrl, setSourceUrl] = useState('');
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);
    const header = {
        Authorization: `Bearer ${token}`
    };
    const [photoText, setPhotoText] = useState(false);
    const [photoFile, setPhotoFile] = useState(true);
    const [videoText, setVideoText] = useState(false);
    const [videoFile, setVideoFile] = useState(true);

    const radioPhotoLink = useRef();
    const radioVideoLink = useRef();

    // const photoText = useRef();
    // const photoFile = useRef();
    useEffect(() => {
        radioPhotoLink.current.checked = true;
        radioVideoLink.current.checked = true;
    }, [])

    const saveNews = async (e) => {
        e.preventDefault();
        // await request(`${URL}/api/news_add`, "POST", {
        //     pictureUrl,
        //     videoUrl,
        //     text,
        //     sourceUrl
        // }, header);
        // console.log(videoUrl)
        // console.log(pictureUrl)



        //save video and picture url text
        if (!(typeof pictureUrl === "string") && !(typeof videoUrl === "string")) {
            const formDataPicture = new FormData();
            const formDataVideo = new FormData();
            formDataPicture.append("picture", pictureUrl);
            formDataVideo.append("video", videoUrl);

            await request(`${URL}/api/save_picture`, "POST", formDataPicture, {
                ContentType: "multipart/form-data",
                Authorization: `Bearer ${token}`
            });
            await request(`${URL}/api/save_video`, "POST", formDataVideo, {
                ContentType: "multipart/form-data",
                Authorization: `Bearer ${token}`
            });
            await request(`${URL}/api/news_add`, "POST", {
                pictureUrl: `${URL}/api/news/photo/${pictureUrl.name}`,
                videoUrl: `${URL}/api/video/${videoUrl.name}`,
                text,
                sourceUrl
            });
        }
        //save video url (string) and picture file
        else if (!(typeof pictureUrl === "string") && typeof videoUrl === "string") {

        }
        //save picture url (string) and video file
        else if (typeof pictureUrl === "string" && !(typeof videoUrl === "string")) {

        }
        //save picture url (string) and video url (string)
        else if ((typeof videoUrl === "string") && (typeof pictureUrl === "string")) {
            await request(`${URL}/api/news_add`, "POST", {
                pictureUrl,
                videoUrl,
                text,
                sourceUrl
            }, header);
        }

        setRedirect(true);
    };

    const radioPhotoFileHandler = e => {
        if (e.target.checked) {
            setPhotoFile(false);
            setPhotoText(true);
        }
    };

    const radioPhotoTextHandler = e => {
        if (e.target.checked) {
            setPhotoFile(true);
            setPhotoText(false);
        }
    };

    const radioVideoTextHandler = e => {
        if (e.target.checked) {
            setVideoFile(true);
            setVideoText(false);
        }
    };

    const radioVideoFileHandler = e => {
        if (e.target.checked) {
            setVideoFile(false);
            setVideoText(true);
        }
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
                        <div className="custom-control custom-radio mb-5 ml-2">
                            <input type="radio" id="customRadio1" ref={radioPhotoLink}
                                   name="customRadio" onClick={radioPhotoTextHandler}
                                   className="custom-control-input"/>
                            <label className="custom-control-label" htmlFor="customRadio1">URL картинки</label>
                        </div>
                        <div className="custom-control custom-radio mb-5 ml-4">
                            <input type="radio" id="customRadio2"
                                   name="customRadio" onClick={radioPhotoFileHandler}
                                   className="custom-control-input"/>
                            <label className="custom-control-label" htmlFor="customRadio2">Загрузить картинку</label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">url картинки</label>
                        <div className="col-sm-6 col-md-5">
                            <input className="form-control"
                                   type="text"
                                   disabled={photoText}
                                   onChange={e => setPictureUrl(e.target.value)}/>
                        </div>
                        <div className="col-sm-6 col-md-5">
                            <input type="file" className="custom-file-input" name="picture"
                                   onChange={e => setPictureUrl(e.target.files[0])}
                                   accept=".jpg, .jpeg, .png"
                                   disabled={photoFile}/>
                            <label className="custom-file-label">Выбрать файл</label>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="custom-control custom-radio mb-5 ml-2">
                            <input type="radio" id="customRadioVideo"
                                   name="customRadioVideo" onClick={radioVideoTextHandler} ref={radioVideoLink}
                                   className="custom-control-input"/>
                            <label className="custom-control-label" htmlFor="customRadioVideo">URL видео</label>
                        </div>
                        <div className="custom-control custom-radio mb-5 ml-4">
                            <input type="radio" id="customRadioVideo2"
                                   name="customRadioVideo"
                                   onClick={radioVideoFileHandler}
                                   className="custom-control-input"/>
                            <label className="custom-control-label" htmlFor="customRadioVideo2">Загрузить видео</label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">url видео</label>
                        <div className="col-sm-6 col-md-5">
                            <input className="form-control" type='text'
                                   onChange={e => setVideoUrl(e.target.value)}
                                   disabled={videoText}/>
                        </div>
                        <div className="col-sm-6 col-md-5">
                            <input type="file" name="video"
                                   accept=".mp4"
                                   className="custom-file-input"
                                   onChange={e => setVideoUrl(e.target.files[0])}
                                   disabled={videoFile}/>
                            <label className="custom-file-label">Выбрать файл</label>
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