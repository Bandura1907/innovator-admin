import './App.css';
import './style.css';
import {BrowserRouter as Router} from 'react-router-dom'
import {useAuth} from "./hooks/auth.hook";
import {useRoutes} from "./routes";
import {BarWave} from "react-cssfx-loading";
import {AuthContext} from "./context/auth-context";

function App() {

    const {token, login, logout, userId, ready, userType} = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(userType);
    if (!ready) {
        return <BarWave className="loaderBar"/>
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                login,
                logout,
                userId,
                isAuthenticated,
            }}
        >
            <Router>{routes}</Router>
        </AuthContext.Provider>
    );
}

export default App;
