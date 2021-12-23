import DataTable from 'react-data-table-component';
import React, {useEffect, useState} from "react";
import UserService from "../../services/user.service";
import {Link} from "react-router-dom";

const Users = () => {

    const columns = [
            {
                name: "client_id",
                selector: row => row.clientId,
                sortable: true
            },
            {
                name: "Фото",
                cell: (row) => {
                    return <div className="avatar mr-2 flex-shrink-0">
                        <img src={row.photoUrl} className="border-radius-100 box-shadow" width="50"
                             height="50" alt=""/>
                    </div>
                }
            },
            {
                name: "Полное имя",
                selector: (row) => row.fullName,
                sortable: true
            }
            ,
            {
                name: "Email",
                selector: (row) => row.email,
                sortable: true
            }
            ,
            {
                name: "Photo url",
                selector: (row) => row.photoUrl,
                sortable: true,
                right: true
            }
            ,
            {
                cell: (row) => {
                    return <div className="table-actions">
                        <Link to={'/edit-user/' + row.clientId} style={{color: "#265ed7"}}><i
                            className="icon-copy dw dw-edit2"/></Link>
                        <a onClick={() => deleteUser(row.clientId)} href="#" style={{color: "#e95959"}}><i
                            className="icon-copy dw dw-delete-3"/></a>
                    </div>
                },
                ignoreRowClick:
                    true,
                allowOverflow: true,
                button: true
            }
        ]
    ;

    const deleteUser = (id) => {
            UserService.deleteUser(id).then(() => {
                UserService.getAllUsers().then(response => {
                    setData(response.data);
                });
            });
        }
    ;

    const [data, setData] = useState([]);

    useEffect(() => {
            UserService.getAllUsers().then(response => {
                setData(response.data);
            });
        }
        , [])

    const onClick = (row) => {
        console.log(row)
    }

    return (
        <div className="main-container">

            <div className="pd-20 card-box mb-30">

                <div className="title pb-20">
                    <h2 className="h3 mb-0">Пользователи</h2>
                </div>
                <div className="pull-right">
                    <Link to="/add-user" type="submit" className="btn btn-primary btn-sm scroll-click"
                          rel="content-y"
                          data-toggle="collapse">Добавить
                    </Link>
                </div>
                <DataTable columns={columns} data={data} selectableRows pagination/>

            </div>
        </div>
    )
};

export default Users;