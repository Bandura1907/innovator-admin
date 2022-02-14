import {Link, Redirect, useParams} from "react-router-dom";
import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/auth-context";
import UsefulService from "../../../services/useful.service";

export const AddEditUseful = () => {

    const id = useParams().id
    const {token} = useContext(AuthContext);
    const [redirect, setRedirect] = useState(false)
    const [useful, setUseful] = useState({
        title: "",
        imageUrl: "",
        description: "",
        category: ""
    })

    const fetchUseful = useCallback(async () => {
       if (id) {
           const fetch = await UsefulService.getUsefulById(token, id)
           setUseful({
               title: fetch.data.title,
               imageUrl: fetch.data.imageUrl,
               description: fetch.data.description,
               category: fetch.data.category
           })
       }
    }, [])

    useEffect(fetchUseful, [])

    const saveHandler = async e => {
        e.preventDefault()
        if (!id) {
            await UsefulService.saveUseful(token, useful)
        } else {
            await UsefulService.updateUseful(token, id, useful)
        }

        setRedirect(true)
    }

    if (redirect)
        return <Redirect to="/useful"/>

    return (
        <div className="main-container">
            <div className="pd-20 card-box mb-30">
                <form onSubmit={saveHandler}>
                    <div className="clearfix">
                        <div className="pull-left">
                            <h4 className="text-blue h4">Полезное</h4>
                            <p className="mb-30">Добавить полезное</p>
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
                                   value={useful.title}
                                   onChange={e => setUseful({...useful, title: e.target.value})} required={true}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">Картинка</label>
                        <div className="col-sm-12 col-md-10">
                            <input className="form-control" type="text"
                                   value={useful.imageUrl}
                                   onChange={e => setUseful({...useful, imageUrl: e.target.value})}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">Описание</label>
                        <div className="col-sm-12 col-md-10">
                            <textarea className="form-control" required={true}
                                      value={useful.description}
                                      onChange={e => setUseful({...useful, description: e.target.value})}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">Категория</label>
                        <div className="col-sm-12 col-md-10">
                            <select className="custom-select col-12"
                                    value={useful.category}
                                    onChange={e => setUseful({...useful, category: e.target.value})}>
                                <option defaultValue="">Выбирете...</option>
                                <option value="Категория 1">Категория 1</option>
                                <option value="Категория 2">Категория 2</option>
                                <option value="Категория 3">Категория 3</option>
                                <option value="Категория 4">Категория 4</option>
                                <option value="Категория 5">Категория 5</option>
                            </select>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

