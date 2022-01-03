import {Link, Redirect, useParams} from "react-router-dom";
import {useCallback, useContext, useEffect, useState} from "react";
import {BarWave} from "react-cssfx-loading";
import {useHttp} from "../../../hooks/http.hook";
import {URL} from "../../../services/url";
import {AuthContext} from "../../../context/auth-context";

const EditUser = () => {

    const id = useParams().id;

    const [redirect, setRedirect] = useState(false);
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const header = {
        Authorization: `Bearer ${token}`
    };

    const fetchUser = useCallback(async () => {
        try {
            const fetched = await request(`${URL}/api/user_by_id/${id}`, "GET", null, header);
            setEmail(fetched.email);
            setFullName(fetched.fullName);
            setPhotoUrl(fetched.photoUrl);
        } catch (e) {
        }
    }, [request, token]);

    const saveUser = useCallback(async () => {

    }, []);

    useEffect(() => {
        fetchUser();
    }, []);

    const save = async (e) => {
        e.preventDefault();
        try {
            await request(`${URL}/api/update_user/${id}`, "PUT", {
                email,
                photoUrl,
                fullName
            }, header);

            setRedirect(true);
        } catch (e) {}
    };

    if (redirect) {
        return <Redirect to="/users"/>
    }

    return (
        loading ? <BarWave className="loaderBar"/> : <div className="main-container">
            <div className="pd-20 card-box mb-30">
                <form onSubmit={save}>
                    <div className="clearfix">
                        <div className="pull-left">
                            <h4 className="text-blue h4">Редактирование пользователя</h4>
                        </div>
                        <div className="pull-right">
                            <Link to="/users">
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
                        <label className="col-sm-12 col-md-2 col-form-label">Полное имя</label>
                        <div className="col-sm-12 col-md-10">
                            <input className="form-control" type="text" onChange={e => setFullName(e.target.value)}
                                   value={fullName}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">Email</label>
                        <div className="col-sm-12 col-md-10">
                            <input className="form-control" onChange={e => setEmail(e.target.value)} value={email}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">URL</label>
                        <div className="col-sm-12 col-md-10">
                            <input className="form-control" onChange={e => setPhotoUrl(e.target.value)} value={photoUrl}
                                   type="url"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUser;