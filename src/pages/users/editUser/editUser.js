import {Link, Redirect, useParams} from "react-router-dom";
import {useCallback, useContext, useEffect, useState} from "react";
import {BarWave} from "react-cssfx-loading";
import {URL} from "../../../services/url";
import {AuthContext} from "../../../context/auth-context";
import axios from "axios";

const EditUser = () => {

    const id = useParams().id;

    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(true);
    const {token} = useContext(AuthContext);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const header = {
        Authorization: `Bearer ${token}`
    };

    const fetchUser = useCallback(async () => {
        try {
            const fetched = await axios.get(`${URL}/api/user_by_id/${id}`, {headers: header});
            setEmail(fetched.data.email);
            setFullName(fetched.data.fullName);
            setPhotoUrl(fetched.data.photoUrl);
            setLoading(false);
        } catch (e) {
        }
    }, [token]);

    const saveUser = useCallback(async () => {

    }, []);

    useEffect(fetchUser, []);

    const save = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${URL}/api/update_user/${id}`, {
                email,
                photoUrl,
                fullName
            }, {headers: header});

            setRedirect(true);
        } catch (e) {
        }
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
                            <input className="form-control" type="text" value={fullName}
                                   onChange={e => setFullName(e.target.value)}
                                   required={true}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">Email</label>
                        <div className="col-sm-12 col-md-10">
                            <input className="form-control" onChange={e => setEmail(e.target.value)}
                                   value={email.trim()} required={true}/>
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