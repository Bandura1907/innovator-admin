import './App.css';
import './style.css';
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Users from "./pages/users/Users";
import EditUser from "./pages/editUser/editUser";
import AddUser from "./pages/addUser/addUser";
import Support from "./pages/support/Support";

function App() {
    return (
        <Router>
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/support" component={Support}/>
                    <Route path="/users" component={Users}/>
                    <Route path="/edit-user/:id" component={EditUser}/>
                    <Route path="/add-user" component={AddUser}/>
                </Switch>

            </div>
        </Router>
    );
}

export default App;
