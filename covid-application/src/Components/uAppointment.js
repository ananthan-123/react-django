import React from "react";
import Modal from 'react-modal';
import './Styles/DoctorDashboard.css';
import AppointmentTime from "./AppointmentTime";

function uAppointment(){

    return(
        <div >
            <h1 >Upcoming appointments</h1>
        <div className={"appointment-container"}>

            <table className={"table"}>
                <tbody>
                <tr>
                    <td>Adam White</td>
                    <td>14h00   01/05/2022</td>
                    <td><AppointmentTime/></td>
                </tr>

                </tbody>
            </table>
        </div>
        </div>
        )
}
export default uAppointment;