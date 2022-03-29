import React, {useEffect, useRef, useState} from "react";
import './Styles/DoctorDashboard.css';
import axios from "./api/axios";
import {useLocation, useNavigate} from "react-router-dom";
import {set} from "date-fns";
import Modal from "react-modal";
import {BsFlagFill} from "react-icons/bs"
import {BsFlag} from "react-icons/bs"
import FlagFun from './FlagFun';


const GET_PATIENT_LIST = "/patientListEndpoint/"
const GET_PATIENT_BYID ="/patientByIdEndpoint/"
const GET_USERINFO_BYID ="/userInfoByIdEndpoint/"
const GET_USER_BYID="/userByIdEndpoint/"
const patientlistid=[];
const patientinfoid=[];
const patientuserinfonum=[];
const patientuserinfoform=[];
const patientuserid=[];
const patientinfo=[];
const patientUserName=[];
const patientDoses=[];


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        transform: 'translate(-50%, -50%)',
        marginBottom: '0%',
        overflow: 'scroll',
    },
};

Modal.setAppElement('#root');

function PatientList() {

        const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
    }

    const [historyModalIsOpen, setHistoryIsOpen] = React.useState(false);

    function openHistoryModal() {
        setHistoryIsOpen(true);
    }


    function closeHistoryModal() {
        setHistoryIsOpen(false);
    }
    const [flag, setFlag] = useState(true);
    const [patientList, setPatientList] = useState([]);
    const [patientInfo,setPatientInfo]=useState([]);
    const loggedInDoctor = JSON.parse(localStorage.getItem("doctor"));
    //console.log(loggedInDoctor);
    const doctorid = loggedInDoctor.id;
    //console.log(doctorid);




    useEffect(async () => {

        // Response for the patientList
        const patientList = await axios.get(
            GET_PATIENT_LIST + doctorid + "/",
        ).then(data => data.data);
        //console.log(patientList);
        setPatientList(patientList);
        //add the patient's patient id to one array
        patientList.map(getPatientId);
        //function to add
            function getPatientId(item){
        patientlistid.push(item.patient);

    }
    //console.log(patientlistid);
            //get the patient status info by this patient id
    for(var i=0; i <patientlistid.length;i++){
         const patientUserInfoId= await axios.get(
             GET_PATIENT_BYID+patientlistid[i]+"/",).then(data =>data.data);
         patientinfoid.push(patientUserInfoId);
    }

   // console.log(patientinfoid);

    //put patient's user info in one array
        patientinfoid.map(getPatientUserInfoId);
        //function to add
        function getPatientUserInfoId(array){
        array.map(nestedArray);
    }
    function nestedArray(item){
            patientuserinfonum.push(item.user_info);
            patientDoses.push(item.current_vaxination_count);

    }

   // console.log(patientuserinfonum);
     //   console.log(patientDoses);

        //get the patient userinfo by this patient userinfo_id
    for(var i=0; i <patientuserinfonum.length;i++){
         const patientUserInfo= await axios.get(
             GET_USERINFO_BYID+patientuserinfonum[i]+"/",).then(data =>data.data);
         patientuserinfoform.push(patientUserInfo);
    }

   // console.log(patientuserinfoform);

    //put patient's userid into an array
        patientuserinfoform.map(getPatientUserId);
        //function to add
        function getPatientUserId(array){
        array.map(nestedUserArray);
    }
    function nestedUserArray(item){
            patientuserid.push(item.user);

    }
    //console.log(patientuserid);

    //get user info array by user_id
        for(var i=0; i <patientuserid.length;i++){
         const patientInfo= await axios.get(

             GET_USER_BYID+patientuserid[i]+"/",).then(data =>data.data);
         patientinfo.push(patientInfo);
    }

   // console.log(patientinfo);

setPatientInfo(patientinfo);










    },[])


    // useEffect(async ()=>){
    //
    //
    // }







    useEffect(async ()=>{


    })


    return (


        <div>


            <h1>Patient List</h1>
            <div className={"patient-container"}>

                <table className={"table"}>
                    <tbody>
                     {
                                            patientInfo.map((array, index) => {
                                                console.log({array})

                                                return (
                                                    <tr key={index}>
                                                        <td>{array[0].first_name}</td>
                                                        <td>{array[0].email}</td>

                                                        <td>
                                             <FlagFun />
                                             </td>
                                                        <td>
                                                           <button type="button" className={"patientbutton"} onClick={openModal}>Check Status History</button>
                                                        </td>
                                                    </tr>


                                                )
                                            })
                                        }
                    {/*<tr>*/}
                    {/*    <td>Mila Ku</td>*/}
                    {/*    <td>milaKu@gmail.com</td>*/}
                    {/*    <td>*/}
                    {/*        <button type="button" className={"patientbutton"}>Check Status History</button>*/}
                    {/*    </td>*/}

                    {/*</tr>*/}
                    {/*<tr>*/}
                    {/*    <td>Linda Whitehouse</td>*/}
                    {/*    <td>lindaw@gmail.com</td>*/}
                    {/*    <td>*/}
                    {/*        <button type="button" className={"patientbutton"}>Check Status History</button>*/}
                    {/*    </td>*/}

                    {/*</tr>*/}

                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Modal: Form Generator"
                style={customStyles}>
                <div className="generatePatientHistory">
                    <form>
                        <ul>
                            {/**This will display Q's for patient */}

                                <li ><button type="button" className={"historybutton"} onClick={openHistoryModal}>Status History 1</button></li>
                                <li ><button type="button" className={"historybutton"} onClick={openHistoryModal}>Status History 2</button></li>
                                <li ><button type="button" className={"historybutton"} onClick={openHistoryModal}>Status History 3</button></li>


                        </ul>
                        <br/>
                        <div className='GenerateForm'>

                            <button className='GenerateButton' onClick={closeModal}>Close</button>
                        </div>
                        <br/>
                        <div className='GenerateForm'>
                        </div>
                    </form>
                </div>
            </Modal>
            <Modal
                isOpen={historyModalIsOpen}
                onRequestClose={closeHistoryModal}
                contentLabel="Modal: Form Generator"
                style={customStyles}>
                <div className="generatePatientHistory">
                    <form>
                        <div>
                            {/**This will display Q's for patient */}

                           this is some status history
                        </div>
                        <br/>
                        <div className='GenerateForm'>

                            <button className='GenerateButton' onClick={closeHistoryModal}>Close</button>
                        </div>
                        <br/>
                        <div className='GenerateForm'>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>



);};


export default PatientList