import loginPageImg from '../../images/login-page-img.png';
import logo from '../../images/logo/Lightbulb.svg';
import innovator from '../../images/Innovator.svg';
import {Link} from "react-router-dom";

const Login = (props) => {

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
                                <h2 className="text-center text-primary">Login To Innovator</h2>
                            </div>
                            <form >
                                <div className="input-group custom">
                                    <input type="text" className="form-control form-control-lg" placeholder="Username"
                                           />
                                    <div className="input-group-append custom">
                                        <span className="input-group-text"><i className="icon-copy dw dw-user1"/></span>
                                    </div>
                                </div>
                                <div className="input-group custom">
                                    <input type="password" className="form-control form-control-lg"
                                           placeholder="**********"
                                           />
                                    <div className="input-group-append custom">
                                        <span className="input-group-text"><i className="dw dw-padlock1"/></span>
                                    </div>
                                </div>
                                {/*<div className="row pb-30">*/}
                                {/*    <div className="col-6">*/}
                                {/*        <div className="custom-control custom-checkbox">*/}
                                {/*            <input type="checkbox" className="custom-control-input" id="customCheck1"/>*/}
                                {/*            <label className="custom-control-label"*/}
                                {/*                   htmlFor="customCheck1">Remember</label>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="input-group mb-0">

                                            <button className="btn btn-primary btn-lg btn-block" type="submit">Sign
                                                In</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </body>
    );
};

export default Login;