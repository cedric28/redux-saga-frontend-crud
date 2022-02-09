import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, selectUsers, removeUser } from '../redux/store';

const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);

    useEffect(() => {
        dispatch(fetchUsers());
    },[]);

    return (
        <div>
            <h1 className="main">Users</h1>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Link
                            to="/user/new"
                            className="btn btn-primary"
                            style={{ marginBottom: 20 }}
                        >
                            New User
                        </Link>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {users.map((user,index) => {
                                return (
                                    <tr key={index}>
                                        <td><Link to={`/profile/${user.id}`}>{ user.first_name }</Link></td>
                                        <td>{ user.last_name }</td>
                                        <td>
                                            <Link className="btn btn-success mr-2" to={`/user/${user.id}`}>Edit</Link>

                                            <button 
                                                className="btn btn-danger"
                                                onClick={() => dispatch(removeUser(user.id))}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ) 
                            })}
                           </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Users;