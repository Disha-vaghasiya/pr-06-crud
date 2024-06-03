import React, { useEffect, useState } from 'react'
import { FaRegEdit } from "react-icons/fa";//edit
import { AiOutlineUsergroupAdd } from "react-icons/ai";//add
import { MdDelete } from "react-icons/md";//delete
import "./Style.css"
const Crud = () => {
    const [name, setName] = useState("");
    const [course, setCourse] = useState("");
    let data = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    const [record, setRecord] = useState(data);
    const [single, setSingle] = useState("");
    const [editid, setEditid] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();


        let obj = {
            id: Math.floor(Math.random() * 1000), name, course, status: "Deactive"
        }

        if (!name) {
            alert("Please fill all the fields");
            return false
        }


        if (editid) {
            let newRecord = [...record];
            let upD = newRecord.map((val) => {
                if (val.id == editid) {
                    return {
                        ...val,
                        name: name,
                        course: course,
                    }
                } return val
            })
            setRecord(upD);
            localStorage.setItem('users', JSON.stringify(upD))
            setEditid(upD)
            setSingle("")
        }
        else {

            let newfild = [...record, obj];
            localStorage.setItem('users', JSON.stringify(newfild));
            setRecord(newfild)

            alert("Record  Add")
        };
        setName("");
        setCourse
            ("");
    }

    const deleteUser = (id) => {
        let d = record.filter(val => val.id != id);
        localStorage.setItem('users', JSON.stringify(d));
        setRecord(d)
        alert("Delete")
    }



    const editUser = (id) => {
        console.log(id);
        const s = record.find(val => val.id == id);
        console.log(s);
        setEditid(s.id)
        setSingle(s)
    }

    useEffect(() => {
        setName(single.name)
        setCourse
            (single.course)
    }, [single])



    return (
        <>
            <div align="center">
                <h1>Add User</h1>
                <br></br>
                <form onSubmit={handleSubmit}>
                    Name:- &nbsp; <input
                        type='text'
                        placeholder='&nbsp;&nbsp;&nbsp;Add your Name'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />&nbsp;
                    Course:- &nbsp; <input
                        type='text'
                        placeholder='&nbsp;&nbsp;&nbsp;Add your course'
                        onChange={(e) => setCourse(e.target.value)}
                        value={course}
                    />&nbsp;
                    {editid ? (
                        <button className='edit'><FaRegEdit /></button>
                    ) : (
                        <button className='add'><AiOutlineUsergroupAdd /></button>
                    )}


                </form>

            </div>
            <br></br>
            <div className="container">
                <div className="row d-flex">

                    {

                        record.map((val) => {
                            const { id, name, course } = val;
                            return (


                                <div className="main col-3">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    Id:- {id}
                                    <br></br><hr></hr>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   Name:- {name}
                                    <br></br><hr></hr>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    Course:- {course}

                                    <br></br><hr></hr>

                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


                                    <button onClick={() => deleteUser(id)}

                                        style={{
                                            color: "#8F0B0B",
                                            fontWeight: "900",
                                            background: "transparent",
                                            border: "none",
                                            fontSize: "20px"
                                        }}
                                    ><MdDelete /></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                    <button onClick={() => editUser(id)}

                                        style={{
                                            color: "#007bff",
                                            fontWeight: "900",
                                            background: "transparent",
                                            border: "none",
                                            fontSize: "20px"
                                        }}
                                    ><FaRegEdit /></button>


                                </div>






                            )
                        })
                    }
                </div>
            </div>


        </>
    )
}

export default Crud