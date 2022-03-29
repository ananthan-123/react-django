import React, {useEffect, useRef, useState} from "react";
import axios from "./api/axios";
import './Styles/DoctorDashboard.css';

function PatientDashDoctorProfile(){
    const GET_DOCTOR_FROM_PATIENT_LIST = "/patientListByPatientIdEndpoint/";
    const GET_DOCTOR_BYID ="/doctorByIdEndpoint/"
    const GET_USERINFO_BYID ="/userInfoByIdEndpoint/"
    const GET_USER_BYID="/userByIdEndpoint/"

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const loggedInPatient = JSON.parse(localStorage.getItem("patient"));

    const [doctorFirstname, setDoctorFirstname] = useState("");
    const [doctorLastname, setDoctorLastname] = useState("");

    useEffect(async () => {

        // Response for the patientList
        const patientList = await axios.get(
            GET_DOCTOR_FROM_PATIENT_LIST + loggedInPatient.id + "/",
        ).then(data => data.data);

        console.log(patientList[0].doctor);

        const doctor = await axios.get(
            GET_DOCTOR_BYID + patientList[0].doctor + "/",
        ).then(data => data.data);

        console.log(doctor[0].user_info);

        const user_info = await axios.get(
            GET_USERINFO_BYID + doctor[0].user_info + "/",
        ).then(data => data.data);

        console.log(user_info[0].user);

        const user = await axios.get(
            GET_USER_BYID + user_info[0].user + "/",
        ).then(data => data.data);

        console.log(user[0].first_name);

        setDoctorFirstname(user[0].first_name);
        setDoctorLastname(user[0].last_name);


    });

    return(
        <div className={"profile-container"}>
            <div align={"center"}>
            <img src={"https://pyxis.nymag.com/v1/imgs/576/191/a6fade5a35bff53d16c14a2af53f3c6852-31-dr-mike.rsquare.w700.jpg"} alt={"profile"} className={"profilepic2"}/>
            </div>
            <br></br>
            <div><p align={"center"}>Doctor: {doctorFirstname} {doctorLastname}<br></br> </p></div>
            <div><p align={"center"}>This will contain information about <br></br> the doctor such as hobbies</p></div>

        </div>
    )
}
export default PatientDashDoctorProfile