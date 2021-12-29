import './viewSupport.css';
import {Redirect, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ReportService from "../../../services/report.service";


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

    const [report, setReport] = useState({});
    const [user, setUser] = useState({});

    useEffect(() => {
        ReportService.getReportById(id).then(res => {
            setReport(res.data);
            setUser(res.data.user);
        });
    }, [id]);

    const solveProblem = (e) => {
        e.preventDefault();
        ReportService.solveProblem(id).then(() => {
            setRedirect(true);
        });
    }

    if (redirect)
        return <Redirect to="/support"/>

    return (
        <div className="container bootdey flex-grow-1 container-p-y">
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