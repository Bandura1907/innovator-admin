import {Link, Redirect, useParams} from "react-router-dom";
import {useCallback, useContext, useEffect, useState} from "react";
import UsefulService from "../../services/useful.service";
import {AuthContext} from "../../context/auth-context";
import {BarWave} from "react-cssfx-loading";

export const ViewArticle = () => {
    const id = useParams().id
    const [article, setArticle] = useState({})
    const {token} = useContext(AuthContext);
    const [redirect, setRedirect] = useState(false)
    const [loading, setLoading] = useState(true);


    useEffect(async () => {
        const fetch = await UsefulService.getArticle(token, id);
        setArticle(fetch.data);
        setLoading(false);
    }, [])

    const deleteHandler = async e => {
        if (window.confirm("Вы уверены что хотите удалить?")) {
            await UsefulService.deleteArticleById(token, id)
            setRedirect(true)
        }
    }


    if (redirect)
        return <Redirect to="/useful"/>

    return (
        loading ? <BarWave className="loaderBar"/> : <div className="main-container">
            <div className="blog-wrap">
                <div className="container pd-0">
                    <div className="pull-right">
                        <Link to={'/add-edit-article/' + id}>
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
                                    <img src={!article.pictureUrl ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlf91yfOT2B7vCu4ikHj54dlXtsCAo7ZzeCw&usqp=CAU" : article.pictureUrl} alt="" width="1120"/>
                                </div>
                                <div className="blog-caption">
                                    <h4 className="mb-10">{article.name}</h4>
                                    <p>{article.description}</p>

                                    {/*<p>Дата публикации: {("0" + date.getDate()).slice(-2) + "." + ("0" + (date.getMonth() + 1)).slice(-2) + "." +*/}
                                    {/*    date.getFullYear()}</p>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}