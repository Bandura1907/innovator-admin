import {Link, Redirect, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/auth-context";
import UsefulService from "../../services/useful.service";
import {FilePond} from "react-filepond";
import {URL} from "../../services/url";
import axios from "axios";

export const AddEditArticle = () => {

    const id = useParams().id
    const {token} = useContext(AuthContext);
    const [redirect, setRedirect] = useState(false)
    const [article, setArticle] = useState({
        name: "",
        pictureUrl: "",
        description: ""
    })
    const [picture, setPicture] = useState(null);

    useEffect(async () => {
        if (id) {
            const fetch = await UsefulService.getArticle(token, id)
            setArticle({
                name: fetch.data.name,
                pictureUrl: fetch.data.pictureUrl,
                description: fetch.data.description
            })
        }
    }, [id, token])

    const saveHandler = async e => {
        e.preventDefault();

        const formData = new FormData();
        if (picture != null) {
            formData.append("picture", picture[0].file);
        }
        formData.append("name", article.name);
        formData.append("description", article.description);
        formData.append("pictureUrl", `${URL}/api/useful/get_picture/`);

        if (!id) {
            await axios.post(`${URL}/api/useful/add_article`, formData, {
                headers: {Authorization: 'Bearer ' + token}
            });
        } else {
            await axios.put(`${URL}/api/useful/edit_article/${id}`, formData, {
                headers: {Authorization: 'Bearer ' + token}
            });
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
                            <h4 className="text-blue h4">Статья</h4>
                            {id ? <p className="mb-30">Редактировать статью</p> :
                                <p className="mb-30">Добавить статью</p>}
                            {/*<p className="mb-30">Добавить статью</p>*/}
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
                            <input className="form-control" type="text"
                                   value={article.name}
                                   onChange={e => setArticle({...article, name: e.target.value})} required={true}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">Описание</label>
                        <div className="col-sm-12 col-md-10">
                            <textarea className="form-control" required={true}
                                      value={article.description}
                                      onChange={e => setArticle({...article, description: e.target.value})}/>
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

                </form>
            </div>
        </div>
    );
}

