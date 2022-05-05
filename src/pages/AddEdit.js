import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import "./AddEdit.css";

const initialState = {
    identity: "",
    date: "",
    name: "",
    quantity: "",
    price: "",
};

const AddEdit = () => {
    const [state, setState] = useState(initialState);

    const { identity, date, name, quantity, price } = state;

    const history = useHistory();

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getSingleUser(id);
        }
    }, [id]);

    const getSingleUser = async (id) => {
        const response = await axios.get(`http://localhost:5000/user/${id}`);
        if (response.status === 200) {
            setState({ ...response.data[0] });
        }
    };

    const addUser = async (data) => {
        const response = await axios.post("http://localhost:5000/user", data);
        if (response.status === 200) {
            toast.success(response.data);
        }
    };

    const updateUser = async (data, id) => {
        const response = await axios.put(`http://localhost:5000/user/${id}`, data);
        if (response.status === 200) {
            toast.success(response.data);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!identity || !date || !name || !quantity || !price) {
            toast.error("Please provide value to each input field");
        }
        else {
            if (!id) {
                addUser(state);
            } else {
                updateUser(state, id);
            }
            setTimeout(() => history.push("/"), 500);
        }
    };

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    }
    return (
        <div style={{ marginTop: "100px" }}>
            <form
                style={{
                    margin: "auto",
                    padding: "15px",
                    maxWidth: "400px",
                    alignContent: "center",
                }}
                onSubmit={handleSubmit}
            >

                <label htmlFor="identity">ID</label>
                <input
                    type="text"
                    id="identity"
                    name="identity"
                    placeholder="Enter ID ..."
                    onChange={handleInputChange}
                    value={identity}
                />

                <label htmlFor="date">DATE</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    placeholder="Enter Date ..."
                    onChange={handleInputChange}
                    value={date}
                />

                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter Name ..."
                    onChange={handleInputChange}
                    value={name}
                />

                <label htmlFor="quantity">Quantity</label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    placeholder="Enter Quantity ..."
                    onChange={handleInputChange}
                    value={quantity}
                />

                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Enter Price ..."
                    onChange={handleInputChange}
                    value={price}
                />
                <input type="submit" value={id ? "Update" : "Add"} />
            </form>
        </div>
    )
}

export default AddEdit