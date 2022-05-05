import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "./View.css";

const View = () => {
    const [user, setUser] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getSingleUser(id);
        }
    }, [id]);

    const getSingleUser = async (id) => {
        const response = await axios.get(`http://localhost:5000/user/${id}`);
        if (response.status === 200) {
            setUser({ ...response.data[0] });
        }
    };

    return (
        <div style={{ marginTop: "150px" }}>
            <div className="card">
                <div className="card-header">
                    <p>User Contact Detail</p>
                </div>
                <div className="container">
                    {/* <strong>ID:</strong>
                    <span>{id}</span>
                    <br /> */}
                    <strong>ID: </strong>
                    <span>{user && user.identity}</span>
                    <br />
                    <strong>Date: </strong>
                    <span>{user && user.date}</span>
                    <br />
                    <strong>Name: </strong>
                    <span>{user && user.Name}</span>
                    <br />
                    <strong>Quantity: </strong>
                    <span>{user && user.quantity}</span>
                    <br />
                    <strong>Price: </strong>
                    <span>{user && user.price}</span>
                    <br />
                    <Link to="/">
                        <button className="btn-btn-edit">Go Back</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default View