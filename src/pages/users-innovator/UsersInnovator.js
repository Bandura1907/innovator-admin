import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/auth-context";
import UserInnovatorService from "../../services/userInnovator.service";
import DataTable from 'react-data-table-component';
import {Link} from "react-router-dom";

const UsersInnovator = () => {

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true
        },
        {
            name: 'USERNAME',
            selector: row => row.username,
            sortable: true
        },
        {
            name: 'ROLE',
            selector: row => row.roles.length === 0 ? "" : row.roles[0].name
        },
        {
            cell: row => {
                return <div className="table-actions">
                    <Link to={'/users-innovator-add-edit/' + row.id} style={{color: "#265ed7"}}><i
                        className="icon-copy dw dw-edit2"/></Link>
                    <a href="#" onClick={async (e) => await deleteHandler(e, row.id)} style={{color: "#e95959"}}><i
                        className="icon-copy dw dw-delete-3"/></a>
                </div>
            },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true
        }
    ]

    const {token} = useContext(AuthContext)
    const [users, setUsers] = useState([])

    const fetchUsers = async () => {
        const fetch = await UserInnovatorService.getAllUsers(token)
        setUsers(fetch.data)
    }

    useEffect(fetchUsers, [])

    const deleteHandler = async (e, id) => {
        e.preventDefault()
        if (window.confirm("Ви уверены что хотите удалить пользователя?")) {
            await UserInnovatorService.deleteUser(token, id)
            setUsers(users.filter(x => x.id !== id))
        }
    }

    return (
        <div className="main-container">
            <div className="pd-20 card-box mb-30">
                <div className="title pd-20">
                    <strong>USERS INNOVATOR</strong>
                </div>
                <div className="pull-right">
                    <Link to="/users-innovator-add-edit" type="submit" className="btn btn-primary btn-sm scroll-click"
                          rel="content-y"
                          data-toggle="collapse">Добавить
                    </Link>
                </div>
                <DataTable columns={columns} data={users} pagination/>
            </div>
        </div>
    )
}

export default UsersInnovator