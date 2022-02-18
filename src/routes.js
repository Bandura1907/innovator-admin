import {Switch, Route, Redirect} from "react-router-dom";
import Layout from "./hoc/Layout";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import News from "./pages/news/News";
import NewsAdd from "./pages/news/newsAdd/NewsAdd";
import EditNews from "./pages/news/editNews/EditNews";
import ViewNews from "./pages/news/viewNews/ViewNews";
import Support from "./pages/support/Support";
import ViewSupport from "./pages/support/ViewsSupport/ViewSupport";
import Users from "./pages/users/Users";
import EditUser from "./pages/users/editUser/editUser";
import AddUser from "./pages/users/addUser/addUser";
import {CSSTransition} from "react-transition-group";
import './routers.css';
import Useful from "./pages/usefull/Useful";
import {AddEditUseful} from "./pages/usefull/AddEditUseful/AddEditUseful";
import {ViewUseful} from "./pages/usefull/ViewUseful";
import UsersInnovator from "./pages/users-innovator/UsersInnovator";
import UserInnovatorAddEdit from "./pages/users-innovator/UserInnovatorAddEdit";


export const useRoutes = (userType) => {

    const routersAdmin = [
        {path: '/', name: 'Home', Component: Home},
        {path: '/news', name: 'News', Component: News},
        {path: '/add-news', name: 'NewsAdd', Component: NewsAdd},
        {path: '/edit-news/:id', name: 'EditNews', Component: EditNews},
        {path: '/viewNews/:id', name: 'ViewNews', Component: ViewNews},
        {path: '/useful', name: 'Useful', Component: Useful},
        {path: '/add-edit-useful', name: 'AddEditUseful', Component: AddEditUseful},
        {path: '/add-edit-useful/:id', name: 'AddEditUseful', Component: AddEditUseful},
        {path: '/view-useful/:id', name: 'ViewUseful', Component: ViewUseful},
        {path: '/support', name: 'Support', Component: Support},
        {path: '/view-support/:id', name: 'ViewSupport', Component: ViewSupport},
        {path: '/users', name: 'Users', Component: Users},
        {path: '/edit-user/:id', name: 'EditUser', Component: EditUser},
        {path: '/add-user', name: 'AddUser', Component: AddUser},
        {path: '/users-innovator', name: 'UsersInnovator', Component: UsersInnovator},
        {path: '/users-innovator-add-edit', name: 'UsersInnovatorAddEdit', Component: UserInnovatorAddEdit},
        {path: '/users-innovator-add-edit/:id', name: 'UsersInnovatorAddEdit', Component: UserInnovatorAddEdit}
    ];
    const routersManager = [
        {path: '/', name: 'Home', Component: Home},
        {path: '/news', name: 'News', Component: News},
        {path: '/add-news', name: 'NewsAdd', Component: NewsAdd},
        {path: '/edit-news/:id', name: 'EditNews', Component: EditNews},
        {path: '/viewNews/:id', name: 'ViewNews', Component: ViewNews}
    ];


    switch (userType) {
        case 'ROLE_ADMIN':
            return (
                <Switch>
                    <Layout role="admin">
                        {/*<Route exact path="/" component={Home}/>*/}
                        {routersAdmin.map(({path, Component}) => (
                            <Route key={path} exact path={path}>
                                {({match}) => (
                                    <CSSTransition
                                        in={match != null}
                                        timeout={300}
                                        classNames="page"
                                        unmountOnExit>
                                        <div className="page">
                                            <Component/>
                                        </div>
                                    </CSSTransition>
                                )}
                            </Route>
                        ))}
                        <Redirect to="/"/>
                    </Layout>
                 </Switch>

            );
        case 'ROLE_MANAGER':
            return (
                <Switch>
                    <Layout role='manager'>
                        {routersManager.map(({path, Component}) => (
                            <Route key={path} exact path={path}>
                                {({match}) => (
                                    <CSSTransition
                                        in={match != null}
                                        timeout={300}
                                        classNames="page"
                                        unmountOnExit>
                                        <div className="page">
                                            <Component/>
                                        </div>
                                    </CSSTransition>
                                )}
                            </Route>
                        ))}
                        <Redirect to="/"/>
                    </Layout>
                </Switch>
            )
        default:
            return (
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Redirect to="/login"/>
                </Switch>
            );
    }
};