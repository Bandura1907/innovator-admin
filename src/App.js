import './App.css';
import './style.css';
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Users from "./pages/users/Users";
import EditUser from "./pages/users/editUser/editUser";
import AddUser from "./pages/users/addUser/addUser";
import Support from "./pages/support/Support";
import News from "./pages/news/News";
import NewsAdd from "./pages/news/newsAdd/NewsAdd";
import ViewNews from "./pages/news/viewNews/ViewNews";
import EditNews from "./pages/news/editNews/EditNews";
import ViewSupport from "./pages/support/ViewsSupport/ViewSupport";
import Login from "./pages/login/Login";
import Layout from "./hoc/Layout";

function App() {

    return (
        <Router>

                <Switch>

                    <Route exact path="/login" component={Login}/>

                    <Layout>
                        <Route exact path="/" component={Home}/>
                        <Route path="/news" component={News}/>
                        <Route path='/add-news' component={NewsAdd}/>
                        <Route path="/edit-news/:id" component={EditNews}/>
                        <Route path="/viewNews/:id" component={ViewNews}/>
                        <Route path="/support" component={Support}/>
                        <Route path="/view-support/:id" component={ViewSupport}/>
                        <Route path="/users" component={Users}/>
                        <Route path="/edit-user/:id" component={EditUser}/>
                        <Route path="/add-user" component={AddUser}/>
                    </Layout>
                </Switch>


        </Router>
    );
}

export default App;
