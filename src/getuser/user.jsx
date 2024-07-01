import React, { useEffect, useState } from "react";
import "./user.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const User = () => {
    const [users, setUsers] = useState([]);  // Cambié 'user' a 'users'
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/users");
                setUsers(response.data);  // Cambié 'setUser' a 'setUsers'
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        };
        fetchData();
    }, []);

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:3000/users/${id}`)
        .then((response)=>{
            setUsers((prevUser)=>prevUser.filter((user) => user._id !== id));
            toast
        .success(response.data.message, { position: "top-right" })
        })
        
        .catch((error)=>{
            console.log(error);
        });
    };

    return (
        <div className="userTable">
            <Link to="/add" type="button" className="btn btn-primary">
                Agregar <i className="fa-regular fa-user"></i>
            </Link>

            

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">S.No.</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Email</th>
                        <th scope="col">Edad</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => {  // Cambié 'users' a 'users'
                        return (
                            <tr key={user._id}> 
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td className="actionButtons">
                                    <Link to={`/update/`+user._id} type="button" className="btn btn-info">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </Link>

                                    <button 
                                    onClick={()=>deleteUser(user._id)} 
                                    type="button" className="btn btn-danger">
                                        
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default User;
