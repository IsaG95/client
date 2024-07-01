import React, { useEffect, useState } from "react";
import "./Update.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateUser = () => {
    const users = {
        name: "",
        email: "",
        age: "",
    };
    const [user,setUser] = useState(users)

    const navigate = useNavigate();

    const { id } = useParams();

    const inputHandler = (e) =>{
        const {name, value}= e.target
        console.log(name, value);

        setUser({ ...user, [name]: value});
    };

    useEffect(()=>{
        axios.get(`http://localhost:3000/users/${id}`)
        .then((response)=>{
            setUser(response.data)
        })
        .catch((error)=>{
            console.log(error);
        });
    },[id]);

    const submitForm = async(e) => {
        e.preventDefault();
        await axios.put(`http://localhost:3000/users/${id}`,user)
        .then((response)=>{
            toast.success(response.data.message, {position: "top-right"})
            navigate("/");
        })
        .catch((error)=>{
            console.log(error)
        })

    }

    return (
        <div className="Update">
            <Link to="/" type="button" className="btn btn-secondary"> {/* Cambié class a className */}
                <i className="fa-solid fa-backward"></i> Regresar
            </Link>

            <h3>Actualizar usuario</h3>
            <form className="updateForm" onSubmit={submitForm}> {/* Añadí className para el formulario */}
                <div className="inputGroup">
                    <label htmlFor="name">Nombre:</label>
                    <input 
                        type="text"
                        id="name"
                        value={user.name}
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
                        value={user.email}
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
                        value={user.age}
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

export default UpdateUser;
