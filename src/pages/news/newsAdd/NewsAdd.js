import {Link, Redirect} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import {useHttp} from "../../../hooks/http.hook";
import {AuthContext} from "../../../context/auth-context";
import {URL} from "../../../services/url";
import axios from "axios";
import {BarWave} from "react-cssfx-loading";
import {ProgressBar} from "react-bootstrap";

const NewsAdd = () => {

    const [loadingFiles, setLoadingFiles] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
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

    const [uploadPercentage, setUploadPercentage] = useState(0);

    const radioPhotoLink = useRef();
    const radioVideoLink = useRef();

    const photoRef = useRef();
    const videoRef = useRef();

    useEffect(() => {
        radioPhotoLink.current.checked = true;
        radioVideoLink.current.checked = true;
        setPictureUrl("");
        setVideoUrl("");

    }, [])

    const saveNews = async (e) => {
        e.preventDefault();

        const options = {
            onUploadProgress: (progressEvent) => {
                const {loaded, total} = progressEvent;
                let percent = Math.floor((loaded * 100) / total);
                console.log(`${loaded}kb of ${total}kb | ${percent}%`);

                if (percent < 100) {
                    setUploadPercentage(percent);
                }
            },
            headers: {
                ContentType: "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }

        //save video and picture url text
        if (!(typeof pictureUrl === "string") && !(typeof videoUrl === "string")) {
            setLoadingFiles(true);
            const formDataPicture = new FormData();
            const formDataVideo = new FormData();
            formDataPicture.append("picture", pictureUrl);
            formDataVideo.append("video", videoUrl);

            await axios.post(`${URL}/api/save_picture`, formDataPicture, options);
            await axios.post(`${URL}/api/save_video`, formDataVideo, options);

            await request(`${URL}/api/news_add`, "POST", {
                pictureUrl: `${URL}/api/news/photo/${pictureUrl.name}`,
                videoUrl: `${URL}/api/video/${videoUrl.name}`,
                title,
                subtitle,
                text,
                sourceUrl
            }, {
                ContentType: "application/json",
                Authorization: `Bearer ${token}`
            });

            console.log("upload files success")
            setLoadingFiles(false);
        }
        //save video url (string) and picture file
        else if (!(typeof pictureUrl === "string") && typeof videoUrl === "string") {
            setLoadingFiles(true);
            const formData = new FormData();
            formData.append("picture", pictureUrl);

            await axios.post(`${URL}/api/save_picture`, formData, options);

            await request(`${URL}/api/news_add`, "POST", {
                pictureUrl: `${URL}/api/news/photo/${pictureUrl.name}`,
                title,
                subtitle,
                videoUrl,
                text,
                sourceUrl
            }, {
                ContentType: "application/json",
                Authorization: `Bearer ${token}`
            });

            setLoadingFiles(false);
        }
        //save picture url (string) and video file
        else if (typeof pictureUrl === "string" && !(typeof videoUrl === "string")) {
            setLoadingFiles(true);
            const formData = new FormData();
            formData.append("video", videoUrl);

            await axios.post(`${URL}/api/save_video`, formData, options);

            await request(`${URL}/api/news_add`, "POST", {
                pictureUrl,
                videoUrl: `${URL}/api/video/${videoUrl.name}`,
                title,
                subtitle,
                text,
                sourceUrl
            }, {
                ContentType: "application/json",
                Authorization: `Bearer ${token}`
            });
            setLoadingFiles(false);
        } else if (((typeof videoUrl === "string") && (typeof pictureUrl === "string"))) {
            await request(`${URL}/api/news_add`, "POST", {
                title,
                subtitle,
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
            setPictureUrl("");
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
            setVideoUrl("");
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
                        {/*{loadingFiles ? <BarWave/> : null}*/}
                        {uploadPercentage > 0 && <ProgressBar now={uploadPercentage} active label={`${uploadPercentage}%`}/>}
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
                        <label className="col-sm-12 col-md-2 col-form-label">Title</label>
                        <div className="col-sm-12 col-md-10">
                            <input className="form-control" type="text" onChange={e => setTitle(e.target.value)}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">Subtitle</label>
                        <div className="col-sm-12 col-md-10">
                            <input className="form-control" type="text" onChange={e => setSubtitle(e.target.value)}/>
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
                                   ref={photoRef}
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
                        <div className="custom-control custom-radio mb-5 ml-5">
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
                                   ref={videoRef}
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