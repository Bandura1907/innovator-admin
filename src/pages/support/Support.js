import DataTable from 'react-data-table-component';
import {useEffect, useState} from "react";
import ReportService from "../../services/report.service";

const Support = () => {

    const [reports, setReports] = useState([]);

    const columns = [
        {
            name: "id_report",
            selector: row => row.id,
            sortable: true
        },
        {
          name: "Email",
          selector: row => row.user.email,
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
            selector: row => row.messageText,
            sortable: true
        },
        {
            name: "Статус",
            selector: row => row.status,
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
        }
    ];


    useEffect(() => {
        ReportService.getAllReports().then(res => {
           setReports(res.data);
        });
    }, []);

    return <div className="main-container">
        <div className="pd-20 card-box mb-30">
            <div className="title pb-20">
                <h2 className="h3 mb-0">Поддержка</h2>
            </div>
            <DataTable columns={columns} data={reports} selectableRows pagination/>
        </div>

    </div>
};

export default Support;