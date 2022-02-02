import {Link, Redirect} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../../../context/auth-context";
import {URL} from "../../../services/url";
import axios from "axios";
import {FilePond, registerPlugin} from "react-filepond";
import "filepond/dist/filepond.min.css";
import {ProgressBar} from "react-bootstrap";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const NewsAdd = () => {

    const [redirect, setRedirect] = useState(false);

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [pictureUrlFile, setPictureUrlFile] = useState(null);
    const [videoUrlFIle, setVideoUrlFile] = useState(null);
    const [text, setText] = useState('');
    const [sourceUrl, setSourceUrl] = useState('');
    const {token} = useContext(AuthContext);
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
        setPictureUrlFile("");
        setVideoUrlFile("");

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
        if (!(typeof pictureUrlFile === "string") && !(typeof videoUrlFIle === "string")) {
            const formDataPicture = new FormData();
            const formDataVideo = new FormData();
            formDataPicture.append("picture", pictureUrlFile[0].file);
            formDataVideo.append("video", videoUrlFIle[0].file);

            await axios.post(`${URL}/api/save_picture`, formDataPicture, options);
            await axios.post(`${URL}/api/save_video`, formDataVideo, options);

            await axios.post(`${URL}/api/news_add`, {
                pictureUrl: `${URL}/api/news/photo/${pictureUrlFile[0].file.name}`,
                videoUrl: `${URL}/api/video/${videoUrlFIle[0].file.name}`,
                title,
                subtitle,
                text,
                sourceUrl
            }, {
                // cancelToken: source.token,
                headers: {
                    ContentType: "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("upload files success")
        }
        //save video url (string) and picture file
        else if (!(typeof pictureUrlFile === "string") && typeof videoUrlFIle === "string") {
            const formData = new FormData();
            formData.append("picture", pictureUrlFile[0].file);

            await axios.post(`${URL}/api/save_picture`, formData, options);

            await axios.post(`${URL}/api/news_add`, {
                pictureUrl: `${URL}/api/news/photo/${pictureUrlFile[0].file.name}`,
                title,
                subtitle,
                videoUrl: videoUrlFIle,
                text,
                sourceUrl
            }, {
                // cancelToken: source.token,
                headers: {
                    ContentType: "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

        }
        //save picture url (string) and video file
        else if (typeof pictureUrlFile === "string" && !(typeof videoUrlFIle === "string")) {
            const formData = new FormData();
            formData.append("video", videoUrlFIle[0].file);

            await axios.post(`${URL}/api/save_video`, formData, options);

            await axios.post(`${URL}/api/news_add`, {
                pictureUrl: pictureUrlFile,
                videoUrl: `${URL}/api/video/${videoUrlFIle[0].file.name}`,
                title,
                subtitle,
                text,
                sourceUrl
            }, {
                headers: {
                    ContentType: "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
        } else if (((typeof videoUrlFIle === "string") && (typeof pictureUrlFile === "string"))) {
            await axios.post(`${URL}/api/news_add`, {
                title,
                subtitle,
                pictureUrl: pictureUrlFile,
                videoUrl: videoUrlFIle,
                text,
                sourceUrl
            }, {
                headers: {
                    ContentType: "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
        }

        setRedirect(true);


    };

    const radioPhotoFileHandler = e => {
        if (e.target.checked) {
            setPhotoFile(false);
            setPictureUrlFile("");
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
            setVideoUrlFile("");
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
                        {uploadPercentage > 0 &&
                            <ProgressBar now={uploadPercentage} active label={`${uploadPercentage}%`}/>}
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
                            <input className="form-control" type="text" onChange={e => setTitle(e.target.value)} required={true}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">Подзаголовок</label>
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
                                   onChange={e => setPictureUrlFile(e.target.value)}/>
                        </div>
                        <div className="col-sm-6 col-md-5">
                            <FilePond
                                // files={pictureUrlFile}
                                allowReorder={true}
                                onupdatefiles={setPictureUrlFile}
                                disabled={photoFile}
                                allowFileTypeValidation={true}
                                acceptedFileTypes={['image/jpg', 'image/jpeg', 'image/png']}
                                labelIdle='Загрузить картинку (.jpg .jpeg .png)'
                            />
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
                                   onChange={e => setVideoUrlFile(e.target.value)}
                                   disabled={videoText}/>
                        </div>
                        <div className="col-sm-6 col-md-5">
                            <FilePond
                                // files={videoUrlFIle}
                                allowReorder={true}
                                onupdatefiles={setVideoUrlFile}
                                disabled={videoFile}
                                allowFileTypeValidation={true}
                                acceptedFileTypes={['video/mp4']}
                                labelIdle='Загрузить видео (.mp4)'
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">Текст</label>
                        <div className="col-sm-12 col-md-10">
                            <textarea className="form-control" onChange={e => setText(e.target.value)} required={true}/>
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