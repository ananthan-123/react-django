import React, {useEffect, useState} from "react";
import './Styles/DoctorDashboard.css';
import axios from "./api/axios";

function HealthPatientList() {
    const [patients, setInfo] = useState([]);
    useEffect(async () => {
        setInfo((await axios.get("/admin_for_frontend/patients")).data);
    }, [])

    return (
        <div>
            <h1>Patient List</h1>
            <div className={"patient-container"}>
                <table className={"table"}>
                    <thead>
                                        <tr>
                                            <th> First Name</th>
                                            <th> Last Name</th>
                                            <th> Phone Number</th>
                                            <th> Email Address</th>
                                        </tr>
                                        </thead>
                    <tbody>{
                        patients.map((item, index) => {
                            return (
                                <tr key={index}>

                                    <td>{item.user_info.user.first_name}</td>
                                    <td>{item.user_info.user.last_name}</td>
                                    <td>{item.user_info.phone_number}</td>
                                    <td>{item.user_info.user.username}</td>
                                        <td>
                                            <button type="button" className={"patientbutton"}>Request Quarantine
                                            </button>
                                        </td>
                                        <td>
                                            <button type="button" className={"patientbutton"}>Request Contact Trace
                                            </button>
                                        </td>
                                        <td>
                                            <button type="button" className={"patientbutton"}>Check Test Result
                                            </button>
                                        </td>

                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default HealthPatientList