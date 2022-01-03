import {useContext, useState} from "react";
import UserService from "../../../services/user.service";
import {Link, Redirect} from "react-router-dom";
import {useHttp} from "../../../hooks/http.hook";
import {AuthContext} from "../../../context/auth-context";
import {URL} from "../../../services/url";

const AddUser = () => {

    const [redirect, setRedirect] = useState(false);
    const {request} = useHttp();
    const {token} = useContext(AuthContext);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const header = {
        Authorization: `Bearer ${token}`
    };

    const saveUser = async (e) => {
        e.preventDefault();
        await request(`${URL}/api/add_user`, "POST", {
            fullName,
            email,
            photoUrl
        }, header);

        setRedirect(true);
    };

    if (redirect)
        return <Redirect to="/users"/>

    return (
        <div className="main-container">
            <div className="pd-20 card-box mb-30">
                <form onSubmit={saveUser}>
                    <div className="clearfix">
                        <div className="pull-left">
                            <h4 className="text-blue h4">Добавте пользователя</h4>
                        </div>
                        <div className="pull-right">
                            <Link to="/users">
                                <button type="button" className="btn btn-outline-danger btn-sm scroll-click m-2">Отмена</button>
                            </Link>
                            <button type="submit" className="btn btn-primary btn-sm scroll-click" rel="content-y"
                                    data-toggle="collapse">Сохранить
                            </button>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">Полное имя</label>
                        <div className="col-sm-12 col-md-10">
                            <input className="form-control" type="text" onChange={e => setFullName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">Email</label>
                        <div className="col-sm-12 col-md-10">
                            <input className="form-control" onChange={e => setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">URL</label>
                        <div className="col-sm-12 col-md-10">
                            <input className="form-control" onChange={e => setPhotoUrl(e.target.value)} type="url"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default AddUser;