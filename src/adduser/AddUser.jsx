import React, { useState } from "react";
import "./adduser.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AddUser = () => {
    const users = {
        name: "",
        email: "",
        age: "",
    };
    const [user,setUser] = useState(users)

    const navigate = useNavigate();

    const inputHandler = (e) =>{
        const {name, value}= e.target
        console.log(name, value);

        setUser({ ...user, [name]: value});
    };

    const submitForm = async(e) => {
        e.preventDefault();
        await axios.post("http://localhost:3000/users",user)
        .then((response)=>{
            toast.success(response.data.message, {position: "top-right"})
            navigate("/");
        })
        .catch((error)=>{
            console.log(error)
        })

    }

    return (
        <div className="addUser">
            <Link to="/" type="button" className="btn btn-secondary"> {/* Cambié class a className */}
                <i className="fa-solid fa-backward"></i> Regresar
            </Link>
            <h3>Add new user</h3>
            <form className="addUserForm" onSubmit={submitForm}> {/* Añadí className para el formulario */}
                <div className="inputGroup">
                    <label htmlFor="name">Nombre:</label>
                    <input 
                        type="text"
                        id="name"
                        name="name"
                        onChange={inputHandler}
                        autoComplete="off"
                        placeholder="Ingrese su nombre.." 
                    />
                </div>
                <div className="inputGroup">
                    <label htmlFor="email">Email:</label> {/* Cambié el id a email */}
                    <input 
                        type="text"
                        id="email"
                        name="email"
                        onChange={inputHandler}
                        autoComplete="off"
                        placeholder="Ingrese su correo.." 
                    />
                </div>
                <div className="inputGroup">
                    <label htmlFor="age">Edad:</label> {/* Cambié el id a age */}
                    <input 
                        type="text"
                        id="age"
                        name="age"
                        onChange={inputHandler}
                        autoComplete="off"
                        placeholder="Ingrese su edad.." 
                    />
                </div>
                <div className="inputGroup">
                    <button type="submit" className="btn btn-primary">Submit {/* Cambié class a className */}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddUser;
