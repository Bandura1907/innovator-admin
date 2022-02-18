import {Link, Redirect, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/auth-context";
import UserInnovatorService from "../../services/userInnovator.service";

const UserInnovatorAddEdit = () => {

    const id = useParams().id
    const {token} = useContext(AuthContext)
    const [redirect, setRedirect] = useState(false)
    const [user, setUser] = useState({
        username: "",
        password: null,
        role: []
    })

    const fetchUser = async () => {
        if (id) {
            const fetch = await UserInnovatorService.getUser(token, id)
            setUser({
                username: fetch.data.username,
                password: fetch.data.password,
                role: fetch.data.roles.map(x => x.name)
            })
        }
    }

    useEffect(fetchUser, [])

    const saveHandler = async (e) => {
        e.preventDefault()
        if (!id) {
            await UserInnovatorService.saveUser(token, user)
        } else {
            await UserInnovatorService.editUser(token, id, user)
        }
        console.log(user)
        setRedirect(true)
    }

    if (redirect)
        return <Redirect to="/users-innovator"/>

    return (
        <div className="main-container">
            <div className="pd-20 card-box mb-30">
                <form onSubmit={saveHandler}>
                    <div className="clearfix">
                        <div className="pull-left">
                            {!id ? <>
                                <h4 className="text-blue h4">User Innovator add</h4>
                                <p className="mb-30">ADD USERINNOVATOR</p>
                            </> : <>
                                <h4 className="text-blue h4">User
                                Innovator edit</h4>
                                <p className="mb-30">EDIT USERINNOVATOR</p>
                            </>}
                        </div>
                        <div className="pull-right">
                            <Link to="/users-innovator">
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
                        <label className="col-sm-12 col-md-2 col-form-label">Username</label>
                        <div className="col-sm-12 col-md-10">
                            <input className="form-control" type="text"
                                   value={user.username}
                                   onChange={e => setUser({...user, username: e.target.value})} required={true}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">PASSWORD</label>
                        <div className="col-sm-12 col-md-10">
                            <input className="form-control" type="text"
                                   value={user.password}
                                   onChange={e => setUser({...user, password: e.target.value})}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">ROlE</label>
                        <div className="col-sm-12 col-md-10">
                            <select className="custom-select col-12"
                                    value={user.role}
                                    onChange={e => setUser({...user, role: [e.target.value]})}>
                                <option defaultValue="user">Выбирете...</option>
                                <option value="admin">ADMIN</option>
                                <option value="manager">MANAGER</option>
                                <option value="user">USER</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserInnovatorAddEdit