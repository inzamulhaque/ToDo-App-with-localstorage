import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from './images/todo.svg';

const getLocalItems = () => {
    let list = localStorage.getItem("lists");
    if (list) {
        return JSON.parse(list);
    } else {
        return [];
    }
}

const ToDo = () => {
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalItems());

    const addItem = () => {
        if (!inputData) {
            // alert("Please Write Your Item Name");
            toast.error('Please Write Your Item Name', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        } else {
            setItems([...items, inputData]);
            setInputData("");
        }
    }

    const deleteItem = (id) => {
        const updatedItems = items.filter((val, ind)=>{
            return ind !== id;
        });
        setItems(updatedItems);
    }

    const removeAll = () => {
        setItems([]);
    }

    useEffect(() => {
        localStorage.setItem("lists", JSON.stringify(items));
    }, [items])

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src={Image} alt="Image" />
                        <figcaption> Add Your List Here </figcaption>
                    </figure>

                    <div className="addItems">
                        <input type="text" placeholder="Add Item" value={inputData} onChange={ (e)=>setInputData(e.target.value) } />
                        <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i>
                    </div>

                    <div className="showItems">
                        {
                            items.map( (val, ind)=>{
                                return(
                                    <div className="eachItem" key={ind}>
                                        <h3> {val} </h3>
                                        <i className="far fa-trash-alt add-btn" title="Remove Item" onClick={() => {
                                           deleteItem(ind); 
                                        }}></i>
                                    </div>
                                )
                            } )
                        }
                    </div>

                    <div className="showItems">
                        <button className="btn" onClick={removeAll}>
                            <span> CLEAR LIST </span>
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default ToDo;
