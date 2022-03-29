import React from "react";
import './Styles/DoctorDashboard.css';
import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    YAxis,
    Tooltip,
    Bar
} from "recharts";

function PatientList(){
    const dataBarchart = [
        {
          "name": "1",
          "Temperature": 35
        },
        {
          "name": "2",
          "Temperature": 37
        },
        {
          "name": "3",
          "Temperature": 38
        },
        {
          "name": "4",
          "Temperature": 38
        },
        {
          "name": "5",
          "Temperature": 40
        },
        {
          "name": "6",
          "Temperature": 37
        },
        {
          "name": "7",
          "Temperature": 38
        },
        {
          "name": "8",
          "Temperature": 39
        },
        {
          "name": "9",
          "Temperature": 37
        },
        {
          "name": "10",
          "Temperature": 36
        }
      ]

    return(
        <div class="container1">
            <div>
                
                <div class="row">
                    <div class="square-graphs-right">
                        <h5>Body Temperature</h5>
                        <ResponsiveContainer width="90%" height="90%">
                            <BarChart width={730} height={250} data={dataBarchart}>
                                <CartesianGrid strokeDasharray="3 5" />
                                <YAxis domain={[34, 40]}/>
                                <Tooltip />
                                <Bar dataKey="Temperature" fill="#82ca9d" />
                            </BarChart>
                            
                        </ResponsiveContainer>
                    </div>

                </div>

                <br/>

                <div class="row">
                    <div class="patient-menu-right-1">
                      <p align={"middle"}><h3>01</h3></p>
                    </div>
                    <div class="patient-menu-right-2">
                        <h5>Drink Water 1L</h5>
                    </div>
                </div>
                <br/>
                <div class="row">
                    <div class="patient-menu-right-1">
                      <p align={"middle"}><h2>02</h2></p>
                    </div>
                    <div class="patient-menu-right-2">
                        <h5>Eat Vitamin C</h5>
                    </div>
                </div>
                <br/>
                <div class="row">
                    <div class="patient-menu-right-1">
                      <p align={"middle"}><h2>03</h2></p>
                    </div>
                    <div class="patient-menu-right-2">
                        <h5>Sleep over 8 hours</h5>
                    </div>
                </div>
                <br/>
                <div class="row">
                    <div class="patient-menu-right-1">
                      <p align={"middle"}><h2>04</h2></p>
                    </div>
                    <div class="patient-menu-right-2">
                        <h5>Measure Body Temperature</h5>
                    </div>
                </div>
                <br/>
            </div>
        </div>
    )
}
export default PatientList