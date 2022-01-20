import loginPageImg from '../../images/login-page-img.png';
import logo from '../../images/logo/Lightbulb.svg';
import innovator from '../../images/Innovator.svg';
import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/auth-context";
import {useHttp} from "../../hooks/http.hook";
import {URL} from "../../services/url";

const Login = () => {
    const auth = useContext(AuthContext);
    const [badCredentials, setBadCredentials] = useState(false);
    const [login, setLogin] = useState(true);
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value});
    };

    const loginHandler = async () => {
        try {
            const data = await request(`${URL}/api/auth/signin`, "POST", {
                username: form.username,
                password: form.password
            });
            console.log(data)
            auth.login(data.token, data.id, data.roles);
        } catch (err) {
            if (err.message === 'Bad credentials'){
                setBadCredentials(true);
            }
        }
    };

    return (
        <body className="login-page">
        <div className="login-header box-shadow">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <div className="brand-logo">
                    <Link to="/">
                        <img src={logo} alt="Logo"/> <img src={innovator} alt="Logo"/>
                    </Link>
                </div>
            </div>
        </div>
        <div className="login-wrap d-flex align-items-center flex-wrap justify-content-center">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6 col-lg-7">
                        <img src={loginPageImg} alt=""/>
                    </div>
                    <div className="col-md-6 col-lg-5">
                        <div className="login-box bg-white box-shadow border-radius-10">
                            <div className="login-title">
                                <h2 className="text-center text-primary">Вход в Innovator Admin</h2>
                            </div>
                            {
                                badCredentials ? <div className="alert alert-danger" role="alert">
                                Неверные данные для входа</div> : null
                            }
                            <div className="input-group custom">
                                <input type="text"
                                       className="form-control form-control-lg"
                                       placeholder="Username"
                                       name="username"
                                       onChange={changeHandler}
                                />
                                <div className="input-group-append custom">
                                    <span className="input-group-text"><i className="icon-copy dw dw-user1"/></span>
                                </div>
                            </div>
                            <div className="input-group custom">
                                <input type="password"
                                       className="form-control form-control-lg"
                                       placeholder="**********"
                                       name="password"
                                       onChange={changeHandler}
                                />
                                <div className="input-group-append custom">
                                    <span className="input-group-text"><i className="dw dw-padlock1"/></span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="input-group mb-0">

                                        <button className="btn btn-primary btn-lg btn-block"
                                                onClick={loginHandler}>
                                            Войти
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        </body>
    );
};

export default Login;