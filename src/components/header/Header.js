import logo from '../../images/logo/Lightbulb.svg';
import './header.css';
import {Link, useHistory, useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/auth-context";

const Header = (props) => {
    const [active, setActive] = useState('/');
    const location = useLocation();
    const history = useHistory();
    const auth = useContext(AuthContext);

    useEffect(() => {
        setActive(location.pathname);
    }, [location]);

    const logout = e => {
        e.preventDefault();
        auth.logout();
        history.push('/login');
    };

    return (
        <nav className="navbar navbar-expand-xl navbar-light bg-light">
            <Link to="/" className="navbar-brand"><img src={logo} alt="" width={30}
                                                       height={30}/><b> Innovator</b></Link>
            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon"/>
            </button>
            <div id="navbarCollapse" className="collapse navbar-collapse justify-content-start">

                <div className="navbar-nav">
                    <form className="navbar-form form-inline">
                        <div className=" search-box">
                            <input type="text" id="search" className="form-control" placeholder="Search by Name"/>
                        </div>
                    </form>
                    {
                        props.role === 'admin' ? <>
                            <Link to="/"
                                  className={"nav-item nav-link " + (active === '/' ? 'active' : null)}>Аналитика</Link>
                            <Link to="/news"
                                  className={"nav-item nav-link " + (active === '/news' || active === '/add-news' ||
                                  active === `/viewNews/${location.pathname.slice(10)}` ||
                                  active === `/edit-news/${location.pathname.slice(11)}` ? 'active' : null)}>Новости</Link>
                            {/*<a href="#"*/}
                            {/*   className={"nav-item nav-link " + (active === '/s' ? 'active' : null)}>Полезное</a>*/}
                            <Link to="/useful"
                                  className={"nav-item nav-link " + (active === '/useful' || active === '/add-useful' ? 'active' : null)}
                            >Полезное</Link>
                            <Link to="/support"
                                  className={"nav-item nav-link " + (active === '/support' || active === `/view-support/${location.pathname.slice(14)}` ? 'active' : null)}>Поддержка</Link>
                            <Link to='/users'
                                  className={"nav-item nav-link " + (active === '/users' || active === `/add-user` ||
                                  active === `/edit-user/${location.pathname.slice(11)}` ? 'active' : null)}>Пользователи</Link>
                        </> : <>
                            <Link to="/"
                                  className={"nav-item nav-link " + (active === '/' ? 'active' : null)}>Аналитика</Link>
                            < Link to="/news"
                                   className={"nav-item nav-link " + (active === '/news' || active === '/add-news' ||
                                   active === `/viewNews/${location.pathname.slice(10)}` ||
                                   active === `/edit-news/${location.pathname.slice(11)}` ? 'active' : null)}>Новости</Link>
                        </>
                    }

                </div>

                <div className="navbar-nav ml-auto">
                    {/*<a href="#" className="nav-item nav-link notifications"><i className="fa fa-bell-o"/><span*/}
                    {/*    className="badge">1</span></a>*/}
                    {/*<a href="#" className="nav-item nav-link messages"><i className="fa fa-envelope-o"/><span*/}
                    {/*    className="badge">10</span></a>*/}
                    <div className="nav-item dropdown">
                        <a href="#" data-toggle="dropdown" className="nav-link dropdown-toggle user-action"><img
                            src={logo} className="avatar" alt="Avatar"/> {props.role === 'admin' ? "ADMIN" : "MANAGER"} <b
                            className="caret"/></a>
                        <div className="dropdown-menu">
                            {/*<a href="#" className="dropdown-item"><i className="fa fa-user-o"/> Profile</a>*/}
                            {/*<a href="#" className="dropdown-item"><i className="fa fa-calendar-o"/> Calendar</a>*/}
                            <a href="#" className="dropdown-item" onClick={logout}><i
                                className="fa fa-close"/> Выйти</a>

                        </div>
                    </div>
                </div>
            </div>
        </nav>

    )
};

export default Header;