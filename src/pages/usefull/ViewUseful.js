import {Link, Redirect, useParams} from "react-router-dom";
import {useCallback, useContext, useEffect, useState} from "react";
import UsefulService from "../../services/useful.service";
import {AuthContext} from "../../context/auth-context";

export const ViewUseful = () => {
    const id = useParams().id
    const [useful, setUseful] = useState({})
    const {token} = useContext(AuthContext);
    const [redirect, setRedirect] = useState(false)

    const fetchUseful  = useCallback(async () => {
        const fetch = await UsefulService.getUsefulById(token, id)
        setUseful(fetch.data)
    }, [])

    useEffect(fetchUseful, [])

    const deleteHandler = async e => {
        if (window.confirm("Вы уверены что хотите удалить?")) {
            await UsefulService.deleteUseful(token, id)
            setRedirect(true)
        }
    }

    const date = new Date(useful.datePublished)

    if (redirect)
        return <Redirect to="/useful"/>

    return (
        <div className="main-container">
            <div className="blog-wrap">
                <div className="container pd-0">
                    <div className="pull-right">
                        <Link to={'/add-edit-useful/' + id}>
                            <button type="submit" className="btn btn-primary btn-sm scroll-click" rel="content-y"
                                    data-toggle="collapse">Редактировать
                            </button>
                        </Link>
                        <button type="submit" className="btn btn-danger btn-sm scroll-click m-1" rel="content-y" onClick={deleteHandler}
                                data-toggle="collapse">Удалить
                        </button>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <div className="blog-detail card-box overflow-hidden mb-30">
                                <div className="blog-img">
                                    <img src={!useful.imageUrl ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlf91yfOT2B7vCu4ikHj54dlXtsCAo7ZzeCw&usqp=CAU" : useful.imageUrl} alt="" width="1120"/>
                                </div>
                                <div className="blog-caption">
                                    <h4 className="mb-10">{useful.title}</h4>
                                    <p>{useful.description}</p>

                                    <p>Дата публикации: {("0" + date.getDate()).slice(-2) + "." + ("0" + (date.getMonth() + 1)).slice(-2) + "." +
                                        date.getFullYear()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}