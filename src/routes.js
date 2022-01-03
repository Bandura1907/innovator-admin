import { Switch, Route, Redirect } from "react-router-dom";
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

export const useRoutes = (userType) => {
  switch (userType) {
      case 'ROLE_ADMIN':
          return (
                <Switch>
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
                        <Redirect to="/"/>
                    </Layout>
                </Switch>
          );
      default: return (
        <Switch>
            <Route exact path="/login" component={Login}/>
            <Redirect to="/login"/>
        </Switch>
      );
  }
};