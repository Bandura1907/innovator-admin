import Header from "../components/header/Header";

const Layout = (props) => {

    switch (props.role) {
        case 'admin':
            return (
                <div>
                    <Header role="admin"/>
                    {props.children}
                </div>
            );
        case 'manager':
            return (
                <div>
                    <Header role="manager"/>
                    {props.children}
                </div>
            );
    }
};

export default Layout;