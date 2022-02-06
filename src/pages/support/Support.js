import DataTable from 'react-data-table-component';
import {useCallback, useContext, useEffect, useState} from "react";
import {BarWave} from "react-cssfx-loading";
import {Link} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/auth-context";
import {URL} from "../../services/url";

const Support = () => {

    const columns = [
        {
            name: "id_report",
            selector: row => row.id,
            sortable: true
        },
        {
            name: "Email",
            selector: row => row.customEmail,
            sortable: true
        },
        {
            name: "Пользователь",
            cell: row => {
                return <div className="d-flex align-items-center">
                    <img className="rounded-circle" src={row.user.photoUrl} alt="" width="40" height="40"/>
                    <span className="ml-2">{row.user.fullName}</span>
                </div>
            },
            selector: row => row.user.fullName,
            sortable: true
        },
        {
            name: "Текс обращения",
            selector: row => !row.messageText ? "" : row.messageText.slice(0, 40),
            sortable: true
        },
        {
            name: "Статус",
            cell: row => {
                return status(row.status);
            },
            sortable: true
        },
        {
            name: "Дата и время обращения",
            selector: row => row.createDate,
            sortable: true
        },
        {
            name: "Дата и время решения",
            selector: row => row.closedDate ?? "",
            sortable: true
        },
        {
            name: "Действие",
            cell: (row) => {
                return <div className="dropdown">
                    <a className="btn btn-link font-24 p-0 line-height-1 no-arrow dropdown-toggle" href="#"
                       role="button" data-toggle="dropdown">
                        <i className="dw dw-more"/>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
                        <Link to={'/view-support/' + row.id}>
                            <button className="dropdown-item"><i className="dw dw-eye"/> Посмотреть</button>
                        </Link>

                        {/*<button className="dropdown-item"><i className="dw dw-edit2"/> Edit</button>*/}
                        <button className="dropdown-item" onClick={() => deleteReport(row.id)}><i
                            className="dw dw-delete-3"/> Удалить
                        </button>
                    </div>
                </div>
            },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true
        }
    ];

    function status(status) {
        if (status === "Новый") {
            return <span className="badge badge-warning">{status}</span>;
        } else if (status === "Отменено") {
            return <span className="badge badge-danger">{status}</span>;
        } else if (status === "Решено") {
            return <span className="badge badge-success">{status}</span>;
        } else return <span className="badge badge-secondary">{status}</span>;
    }

    const [reports, setReports] = useState([]);
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);
    const header = {
        Authorization: `Bearer ${token}`
    };

    const fetchReports = useCallback(async () => {
        try {
            const reports = await request(`${URL}/api/all_reports`, "GET", null, header)

            setReports(reports);
        } catch (e) {}
    }, []);

    useEffect(() => {
        fetchReports();
    }, []);

    const deleteReport = async (id) => {
        if (window.confirm("Вы уверены что хотите удалить данную проблему?")) {
            try {
                const newReports = await request(`${URL}/api/report_error_delete/${id}`, "DELETE", null, header);

                setReports(newReports);
            } catch (e) {}
        }

    }

    return loading ? <BarWave className="loaderBar"/> : <div className="main-container">
        <div className="pd-20 card-box mb-30">
            <div className="title pb-20">
                <h2 className="h3 mb-0">Поддержка</h2>
            </div>
            <DataTable columns={columns} data={reports}
                       // selectableRows
                       pagination/>
        </div>

    </div>
};

export default Support;