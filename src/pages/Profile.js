import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { showUser, selectUser } from '../redux/store';

const Profile = (props) => {
    let { user_id } = useParams();
    const dispatch = useDispatch();
    const user  = useSelector(selectUser);
    useEffect(() => {
        dispatch(showUser(user_id));
    },[user_id]);

    return (
        <div>
            <h1 className="main">Profile</h1>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-bordered">
                            <tr>
                                <th>First Name</th>
                                <td>{ user.first_name }</td>
                            </tr>
                            <tr>
                                <th>Last Name</th>
                                <td>{ user.last_name }</td>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <td>{ user.description }</td>
                            </tr>
                            <tr>
                                <th>Mobile Number</th>
                                <td>{ user.mobile }</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
} 

export default Profile;
