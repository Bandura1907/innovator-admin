import logo from '../../images/logo/Lightbulb.svg';
import './header.css';
import person from '../../images/photo1.jpg';
import {Link, useHistory, useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import innovator from '../../images/Innovator.svg';
import {AuthContext} from "../../context/auth-context";

const Header = () => {
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
            <Link to="/" className="navbar-brand"><img src={logo} alt="" width={30} height={30}/><b> Innovator</b></Link>
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
                    <Link to="/" className={"nav-item nav-link " + (active === '/' ? 'active' : null)}>Аналитика</Link>
                    <Link to="/news" className={"nav-item nav-link " + (active === '/news' ? 'active' : null)}>Новости</Link>
                    <a href="#" className={"nav-item nav-link " + (active === '/s' ? 'active' : null)}>Полезное</a>
                    <Link to="/support" className={"nav-item nav-link " + (active === '/support' ? 'active' : null)}>Поддержка</Link>
                    <Link to='/users' className={"nav-item nav-link " + (active === '/users' ? 'active' : null)}>Пользователи</Link>
                </div>

                <div className="navbar-nav ml-auto">
                    <a href="#" className="nav-item nav-link notifications"><i className="fa fa-bell-o"/><span
                        className="badge">1</span></a>
                    <a href="#" className="nav-item nav-link messages"><i className="fa fa-envelope-o"/><span
                        className="badge">10</span></a>
                    <div className="nav-item dropdown">
                        <a href="#" data-toggle="dropdown" className="nav-link dropdown-toggle user-action"><img
                            src={person} className="avatar" alt="Avatar"/> Paula Wilson <b
                            className="caret"/></a>
                        <div className="dropdown-menu">
                            <a href="#" className="dropdown-item"><i className="fa fa-user-o"/> Profile</a>
                            <a href="#" className="dropdown-item"><i className="fa fa-calendar-o"/> Calendar</a>
                            <a href="#" className="dropdown-item"><i className="fa fa-sliders"/> Settings</a>
                            <div className="dropdown-divider"/>
                            <a href="#" onClick={logout} className="dropdown-item"><i className="material-icons">&#xE8AC;</i> Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    )
};

export default Header;