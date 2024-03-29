import DataTable from 'react-data-table-component';
import {useCallback, useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {BarWave} from "react-cssfx-loading";
import {URL} from "../../services/url";
import {AuthContext} from "../../context/auth-context";
import axios from "axios";


const Users = () => {
    const columns = [
        {
            name: "client_id",
            selector: row => row.clientId,
            sortable: true
        },
        {
            name: "Полное имя",
            cell: row => {
                return <div className="d-flex align-items-center"><img className="rounded-circle"
                                                                       src={row.photoUrl} alt=""
                                                                       width="40" height="40"/><span
                    className="ml-2">{row.fullName}</span></div>
            },
            selector: (row) => row.fullName,
            sortable: true
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true
        },
        {
            name: "Photo url",
            selector: (row) => !row.photoUrl ? "" : row.photoUrl.slice(0, 100),
            sortable: true,
            right: true
        },
        {
            cell: (row) => {
                return <div className="table-actions">
                    {/*<Link to={'/edit-user/' + row.clientId} style={{color: "#265ed7"}}><i*/}
                    {/*    className="icon-copy dw dw-edit2"/></Link>*/}
                    <a onClick={() => deleteUser(row.clientId)} href="#" style={{color: "#e95959"}}><i
                        className="icon-copy dw dw-delete-3"/></a>
                </div>
            },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true
        }
    ];

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const {token} = useContext(AuthContext);
    const header = {
        Authorization: `Bearer ${token}`
    };

    const fetchUsers = useCallback(async () => {
        try {
            const fetched = await axios.get(`${URL}/api/all_users`, {headers: header});
            setUsers(fetched.data);
            setLoading(false);
        } catch (e) {
        }
    }, []);

    useEffect(fetchUsers, [])

    const deleteUser = async (id) => {
        if (window.confirm("Ви уверены что хотите удалить пользователя?")) {
            try {
                await axios.delete(`${URL}/api/delete_user/${id}`, {headers: header});
                setUsers(users.filter(x => x.clientId !== id));
            } catch (e) {
            }
        }
    };


    return (
        loading ? <BarWave className="loaderBar"/> :
            <div className="main-container">
                <div className="pd-20 card-box mb-30">

                    <div className="title pb-20">
                        <h2 className="h3 mb-0">Пользователи</h2>
                    </div>
                    {/*<div className="pull-right">*/}
                    {/*    <Link to="/add-user" type="submit" className="btn btn-primary btn-sm scroll-click"*/}
                    {/*          rel="content-y"*/}
                    {/*          data-toggle="collapse">Добавить*/}
                    {/*    </Link>*/}
                    {/*</div>*/}
                    <DataTable columns={columns}
                               data={users}
                        // selectableRows
                               pagination/>

                </div>
            </div>
    )
};

export default Users;