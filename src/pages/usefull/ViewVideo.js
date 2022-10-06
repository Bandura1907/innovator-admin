import {Link, Redirect, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/auth-context";
import UsefulService from "../../services/useful.service";
import Plyr from "plyr-react";
import {BarWave} from "react-cssfx-loading";

export const ViewVideo = () => {
    const id = useParams().id;
    const {token} = useContext(AuthContext);
    const [video, setVideo] = useState({});
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        const fetch = await UsefulService.getVideo(token, id);
        setVideo(fetch.data);
        setLoading(false);
    }, []);

    const deleteHandler = async () => {
        if (window.confirm("Вы уверены что хотите удалить?")) {
            await UsefulService.deleteVideoById(token, id);
            setRedirect(true);
        }
    }

    if (redirect)
        return <Redirect to={'/useful'}/>

    return loading ? <BarWave className="loaderBar"/> : <div className="main-container">
        <div className="blog-wrap">
            <div className="container pd-0">
                <div className="pull-right">
                    <Link to={'/add-edit-video/' + id}>
                        <button type="submit" className="btn btn-primary btn-sm scroll-click" rel="content-y"
                                data-toggle="collapse">Редактировать
                        </button>
                    </Link>
                    <button type="submit" className="btn btn-danger btn-sm scroll-click m-1" rel="content-y"
                            data-toggle="collapse" onClick={deleteHandler}>Удалить
                    </button>
                </div>

                <div className="row">
                    <div className="col-md-12 col-sm-12">
                        <div className="blog-detail card-box overflow-hidden mb-30">
                            <div className="blog-img">
                                <img
                                    src={!video.pictureUrl ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlf91yfOT2B7vCu4ikHj54dlXtsCAo7ZzeCw&usqp=CAU" : video.pictureUrl}
                                    alt="" width="1120"/>

                                <div className="blog-caption">
                                    <h4 className="mb-10">{video.name}</h4>
                                    <div className="container">
                                        <Plyr source={
                                            {
                                                type: "video",
                                                sources: [
                                                    {
                                                        src: video.videoUrl,
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
    </div>
}