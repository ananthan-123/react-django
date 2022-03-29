import React from "react";
import Modal from 'react-modal';
import DoctorStatusForm from "./DoctorStatusForm";
import './Styles/DoctorDashboard.css';

function NewPatientList(){

    return(
        <div >
            <h1 >New Patient List</h1>
        <div className={"patient-container"}>

            <table className={"table"}>
                <tbody>
                <tr>
                    <td>Adam White</td>
                    <td>adamwhite@gmail.com</td>
                    <td><DoctorStatusForm/></td>
                </tr>
                <tr>
                    <td>Bianca Floria</td>
                    <td>biancaf@gmail.com</td>
                    <td><DoctorStatusForm/></td>
                </tr>

                </tbody>
            </table>
        </div>
        </div>
        )

}
export default NewPatientList;