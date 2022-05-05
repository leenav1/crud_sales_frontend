import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Home.css";
import { toast } from 'react-toastify';

const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);


    const getUsers = async () => {
        const response = await axios.get("http://localhost:5000/users");
        if (response.status === 200) {
            setData(response.data);
        }
    };

    const onDeleteUser = async (id) => {
        if (window.confirm("Are you sure that you want to delete this record")) {
            const response = await axios.delete(`http://localhost:5000/user/${id}`);
            if (response.status === 200) {
                toast.success(response.data);
                getUsers();
            }
        }
    }

    console.log("data =>", data);

    return (
        <div style={{ marginTop: "150px" }}>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>Sr. No.</th>
                        <th style={{ textAlign: "center" }}>ID</th>
                        <th style={{ textAlign: "center" }}>DATE</th>
                        <th style={{ textAlign: "center" }}>NAME</th>
                        <th style={{ textAlign: "center" }}>QUANTITY</th>
                        <th style={{ textAlign: "center" }}>PRICE</th>
                        <th style={{ textAlign: "center" }}>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.identity}</td>
                                <td>{item.date}</td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                                <td>
                                    <Link to={`/update/${item.id}`}>
                                        <button className="btn-btn-edit">Edit</button>
                                    </Link>
                                    <button className="btn-btn-delete" onClick={() => onDeleteUser(item.id)}>Delete</button>
                                    <Link to={`/view/${item.id}`}>
                                        <button className="btn-btn-view">View</button>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <h2>Home</h2>
        </div>
    );
};

export default Home