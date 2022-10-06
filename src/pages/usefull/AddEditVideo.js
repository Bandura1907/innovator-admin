import {Link, Redirect, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {FilePond} from "react-filepond";
import {URL} from "../../services/url";
import axios from "axios";
import {AuthContext} from "../../context/auth-context";
import UsefulService from "../../services/useful.service";
import {ProgressBar} from "react-bootstrap";

export const AddEditVideo = () => {

    const id = useParams().id
    const {token} = useContext(AuthContext);
    const [video, setVideo] = useState(null);
    const [picture, setPicture] = useState(null);
    const [name, setName] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");

    const [uploadPercentage, setUploadPercentage] = useState(0);

    useEffect(async () => {
        if (id) {
            const fetch = await UsefulService.getVideo(token, id);
            setName(fetch.data.name);
            setVideoUrl(fetch.data.videoUrl);
        }
    }, [id, token]);

    const saveHandler = async (e) => {
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
        };

        const formData = new FormData();
        if (picture != null) {
            formData.append("picture", picture[0].file)
        }

        if (video != null) {
            const formDataVideo = new FormData();
            formDataVideo.append("file", video[0].file);
            const idVideo = await axios.post(`${URL}/api/video/upload`, formDataVideo, options);

            formData.append("videoUrl", `${URL}/api/video/stream/${idVideo.data}`)
        } else formData.append("videoUrl", videoUrl);


        formData.append("name", name);
        formData.append("pictureUrl", `${URL}/api/useful/get_picture/`);

        if (!id) {
            await axios.post(`${URL}/api/useful/add_video`, formData, options);
        } else {
            await axios.put(`${URL}/api/useful/edit_video/${id}`, formData, options);
        }


        setRedirect(true);
    }

    if (redirect)
        return <Redirect to="/useful"/>

    return (
        <div className="main-container">
            <div className="pd-20 card-box mb-30">
                <form onSubmit={saveHandler}>
                    <div className="clearfix">
                        <div className="pull-left">
                            <h4 className="text-blue h4">Видео</h4>
                            {id ? <p className="mb-30">Редактировать видео</p> :
                                <p className="mb-30">Добавить видео</p>}
                            {/*<p className="mb-30">Добавить видео</p>*/}
                            {uploadPercentage > 0 &&
                                <ProgressBar now={uploadPercentage} active label={`${uploadPercentage}%`}/>}
                        </div>
                        <div className="pull-right">
                            <Link to="/useful">
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
                            <input className="form-control" type="text" value={name}
                                   onChange={e => setName(e.target.value)} required={true}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">Картинка</label>
                        <div className="col-sm-12 col-md-10">
                            <FilePond
                                // files={pictureUrlFile}
                                // required={true}
                                allowReorder={true}
                                onupdatefiles={setPicture}
                                allowFileTypeValidation={true}
                                acceptedFileTypes={['image/jpg', 'image/jpeg', 'image/png']}
                                labelIdle='Загрузить картинку (.jpg .jpeg .png)'
                            />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">Видео</label>
                        <div className="col-sm-12 col-md-10">
                            <FilePond
                                // files={pictureUrlFile}
                                // required={true}
                                allowReorder={true}
                                onupdatefiles={setVideo}
                                allowFileTypeValidation={true}
                                acceptedFileTypes={['video/mp4']}
                                labelIdle='Загрузить видео (.mp4)'
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}