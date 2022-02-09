import React, { useEffect, useState,useRef, useCallback  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { showUser, selectUser, addUser, updateUser } from '../redux/store';

const Form = (props) => {
    const [name, setName] = useState(null)
    const { id } = useParams();
    const dispatch = useDispatch();
    const user  = useSelector(selectUser);
    
    useEffect(() => {
        if (id === "new") {
            setName("Add")
        } else {
            dispatch(showUser(id));
            setName("Edit")
        }
    },[]);

    const firstNameRef = useRef();
    const lastNameRef = useRef(null)
    const descriptionRef = useRef(null)
    const mobileRef = useRef(null)
    const onAdd = useCallback(() => {
        dispatch(addUser({
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            description: descriptionRef.current.value,
            mobile: mobileRef.current.value
        }))

        firstNameRef.current.value = "";
        lastNameRef.current.value = "";
        descriptionRef.current.value = "";
        mobileRef.current.value = "";
      }, [dispatch]);


      const onUpdate = useCallback(() => {
        dispatch(updateUser(id,{
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            description: descriptionRef.current.value,
            mobile: mobileRef.current.value
        }))

        firstNameRef.current.value = "";
        lastNameRef.current.value = "";
        descriptionRef.current.value = "";
        mobileRef.current.value = "";
      }, [dispatch]);

    return (
        <div>
            <h1 className="main">User Form</h1>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="first-name">First Name</label>
                            <input type="text" ref={firstNameRef} defaultValue={user.first_name} className="form-control" placeholder="First Name" /> 
                        </div>
                        <div className="form-group">
                            <label htmlFor="last-name">Last Name</label>
                            <input type="text" ref={lastNameRef}  defaultValue={user.last_name} className="form-control" placeholder="Last Name" /> 
                        </div>
                        <div className="form-group">
                            <label htmlFor="last-name">Description</label>
                            <input type="text" ref={descriptionRef}  defaultValue={user.description} className="form-control" placeholder="Description" /> 
                        </div>
                        <div className="form-group">
                            <label htmlFor="last-name">Mobile</label>
                            <input type="number" ref={mobileRef}  defaultValue={user.mobile} className="form-control" placeholder="Mobile" /> 
                        </div>
                        <button onClick={`${name}` ==='Add' ? onAdd : onUpdate } className={`${name === "Add" ? "btn btn-primary" : "btn btn-success"}`}>{ name }</button>
                    </div>
                </div>
            </div>
        </div>
    );
} 


export default Form;