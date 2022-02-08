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


export const useRoutes = (userType) => {

    const routersAdmin = [
        {path: '/', name: 'Home', Component: Home},
        {path: '/news', name: 'News', Component: News},
        {path: '/add-news', name: 'NewsAdd', Component: NewsAdd},
        {path: '/edit-news/:id', name: 'EditNews', Component: EditNews},
        {path: '/viewNews/:id', name: 'ViewNews', Component: ViewNews},
        {path: '/support', name: 'Support', Component: Support},
        {path: '/view-support/:id', name: 'ViewSupport', Component: ViewSupport},
        {path: '/users', name: 'Users', Component: Users},
        {path: '/edit-user/:id', name: 'EditUser', Component: EditUser},
        {path: '/add-user', name: 'AddUser', Component: AddUser}
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
                        {/*<Route path="/news" component={News}/>*/}
                        {/*<Route path='/add-news' component={NewsAdd}/>*/}
                        {/*<Route path="/edit-news/:id" component={EditNews}/>*/}
                        {/*<Route path="/viewNews/:id" component={ViewNews}/>*/}
                        {/*<Route path="/support" component={Support}/>*/}
                        {/*<Route path="/view-support/:id" component={ViewSupport}/>*/}
                        {/*<Route path="/users" component={Users}/>*/}
                        {/*<Route path="/edit-user/:id" component={EditUser}/>*/}
                        {/*<Route path="/add-user" component={AddUser}/>*/}
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