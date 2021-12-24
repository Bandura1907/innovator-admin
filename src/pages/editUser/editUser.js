import {Link, Redirect, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import UserService from "../../services/user.service";

const EditUser = () => {

    const id = useParams().id;

    const [redirect, setRedirect] = useState(false);

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');

    useEffect(() => {
        UserService.getUser(id).then(res => {
            setFullName(res.data.fullName);
            setEmail(res.data.email);
            setPhotoUrl(res.data.photoUrl);
        });
    }, [id]);

    const save = (e) => {
      e.preventDefault();

      UserService.updateUser(id, fullName, email, photoUrl).then(function () {
         setRedirect(true);
      });
    };

    if (redirect) {
        return <Redirect to="/users"/>
    }

    return (
        <div className="main-container">
            <div className="pd-20 card-box mb-30">
                <form onSubmit={save}>
                    <div className="clearfix">
                        <div className="pull-left">
                            <h4 className="text-blue h4">Default Basic Forms</h4>
                            <p className="mb-30">All bootstrap element classies</p>
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