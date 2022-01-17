import './viewSupport.css';
import {Redirect, useParams} from "react-router-dom";
import {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../../../hooks/http.hook";
import {AuthContext} from "../../../context/auth-context";
import {BarWave} from "react-cssfx-loading";
import {URL} from "../../../services/url";


const ViewSupport = () => {

    function status(status) {
        if (status === "Новый") {
            return <span className="badge badge-warning">{status}</span>;
        } else if (status === "Отменено") {
            return <span className="badge badge-danger">{status}</span>;
        } else if (status === "Решено") {
            return <span className="badge badge-success">{status}</span>;
        } else return <span className="badge badge-secondary">{status}</span>;
    }

    const id = useParams().id;

    const [redirect, setRedirect] = useState(false);
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);
    const [report, setReport] = useState({});
    const [user, setUser] = useState({});
    const header = {
        Authorization: `Bearer ${token}`
    };

    const fetchNews = useCallback(async () => {
        try {
            const fetchedReport = await request(`${URL}/api/report_by_id/${id}`, "GET", null, header);

            setReport(fetchedReport);
            setUser(fetchedReport.user);
        } catch (e) {}
    }, []);

    useEffect(() => {
        fetchNews();
    }, [id]);

    const solveProblem = async (e) => {
        e.preventDefault();
        await request(`${URL}/api/solve_the_problem/${id}`, "PUT", null, header);

        setRedirect(true);
    }

    if (redirect)
        return <Redirect to="/support"/>

    return (
        loading ? <BarWave className="loaderBar"/> : <div className="container bootdey flex-grow-1 container-p-y">
            <div className="media align-items-center py-3 mb-3">
                <img src={user.photoUrl} alt="Фото пользователя"
                     className="d-block ui-w-100 rounded-circle"/>
                <div className="media-body ml-4">
                    <h4 className="font-weight-bold mb-0">{user.fullName}</h4>
                    <div className="text-muted mb-2">{report.customEmail}</div>
                </div>
            </div>

            <div className="card mb-4">

                <div className="card-body">
                    <div className="blog-caption">
                        <h4 className="mb-10">Статус: {status(report.status)}</h4>
                        <p>{report.messageText}</p>
                    </div>

                    <div className="pull-right">
                        <button onClick={solveProblem} type="submit" className="btn btn-primary btn-sm scroll-click"
                                rel="content-y"
                                data-toggle="collapse">Проблема решена
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewSupport;