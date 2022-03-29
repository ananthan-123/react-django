import React from "react";
import axios from "./api/axios";
import {useEffect, useRef, useState} from "react";


function AdminDoctors() {
    const [doctors, setInfo] = useState([]);
    let doctor = function () {
        return doctors.map((item, i) =>
            <tr key={i}>
                <td><img src="./use1.png" alt="" /></td>
                <td>{item.user_info.user.username}</td>
                <td>12/16</td>
                <td>{item.profession}</td>
                <td>{item.user_info.user.email}</td>
            </tr>
        )
    }
    useEffect(async () => { 
        setInfo((await axios.get("/admin_for_frontend/doctors")).data );
    },[])
    return (
        <div className="d100">
            <h1 className={"content_center_h1"}>Doctor List</h1>
            <br />
            <table className={"doctorTable"}>
                <thead> 
                    <tr>
                        <th>Profile Pic</th>
                        <th>Candidate</th>
                        <th>Applied</th>
                        <th>#of Positions</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {doctor()}
                </tbody>
            </table>
        </div>
    )
 }
export default AdminDoctors
 