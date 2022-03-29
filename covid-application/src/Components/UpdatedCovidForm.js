import "./Styles/CovidForm.css";
import React, { Component, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ReactDOM from "react-dom";
import axios from "./api/axios";

const PatientForm_URL = "/patientDailyFormEndpoint/";
const PatientHistory_URL = "/patientStatusHistoryEndpoint/";
const PatientUpdate_URL = "/patientUpdateEndpoint/";

function UpdatedCovidForm() {
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";

  //states for different states of the system
/*  const [userFocus, setUserFocus] = useState(false);
  const [testStatus, setTestStatus] = useState();
  const [testResult, setTestResult] = useState("");
  const [selfAssessment, setSelfAssessment] = useState();
  const [bodyTemperature, setBodyTemperature] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [patientComments, setPatientComments] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);*/

  const [userFocus, setUserFocus] = useState(false);


  const [testStatus, setTestStatus] = useState();
  const [testResult, setTestResult] = useState();
  const [selfAssessment, setSelfAssessment] = useState();
  const [bodyTemperature, setBodyTemperature] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [patientComments, setPatientComments] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);



  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [
    bodyTemperature,
    symptoms,
    patientComments,
    testResult,
    testStatus,
    selfAssessment,
/*    weight,
    recent_test_date,
    bodyTemperature,
    symptoms,
    vaccineShots,
    patientComments,
    sex,
    ageRange,
    testStatus,
    testResult,
    selfAssessment,*/
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

   // console.log("Error");

    try {
    // Fill out form and store it in patient Daily form table
      let response = await axios.post(
        PatientForm_URL,
        JSON.stringify({
          test_result: testResult,
          test_status: testStatus,
          body_temp: bodyTemperature,
          self_assessment: selfAssessment,
          symptoms: symptoms,
          comments: patientComments,
/*          sex: 0,
          age_range: 0,
          test_status: testStatus,
          recent_test_date: 1,
          test_result: testResult,
          body_temp: bodyTemperature,
          weight: 100,
          self_assessment: selfAssessment,
          symptoms: symptoms,
          vaxination_count: 0,
          comments: patientComments,*/

        }),
        {
          headers: { "Content-Type": "application/json" },
          //   withCredentials: true,
        }
      );

      console.log(response?.data);

      const patient_form = response?.data
      const patient = JSON.parse(localStorage.getItem("patient"))
      console.log(patient.id)

      // Store Form in Patient History table
      response = await axios.post(
        PatientHistory_URL,
        JSON.stringify({
          patient: patient.id,
          patient_form: patient_form.id,
        }),
        {
          headers: { "Content-Type": "application/json" },
          //   withCredentials: true,
        }
      );

      // Update the patient in Patient table
      const user_info = JSON.parse(localStorage.getItem("user_info"))
      console.log(user_info.id)
      response = await axios.put(
        PatientUpdate_URL,
        JSON.stringify({
            current_test_status: testStatus,
            current_test_result: testResult,
            current_body_temp: bodyTemperature,
            current_self_assessment: selfAssessment,
            current_symptoms: symptoms,
            user_info: user_info.id,
        /*  current_sex: 0,
          current_age_range: 0,
          current_test_status: testStatus,
          recent_test_date: 1,
          current_test_result: testResult,
          current_body_temp: bodyTemperature,
          current_weight: 100,
          current_self_assessment: selfAssessment,
          current_symptoms: symptoms,
          current_vaxination_count: 0,
          user_info: user_info.id,*/
        }),
        {
          headers: { "Content-Type": "application/json" },
          //   withCredentials: true,
        }
      );
      // console.log(response?.accessToken);
      // console.log(JSON.stringify(response));
      // setSuccess(true);
      // //clear state and controlled inputs
      // //need value attrib on inputs for this
      // setPatientWeight("");
      // setRecent_test_date(0);
      // setBodyTemperature("");//Todo:string or number?
      // setSymptoms("");
      // setVaccineShots(0);

      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="formContainer">
      <center>
        <h1>
          <b>Covid Daily Report</b>
        </h1>
      </center>
      <div className="container">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive">
        {errMsg}
      </p>
        <form onSubmit={handleSubmit}>
       {/*   <select name="ageRange" id="ageRangeBox">
            <option value="0">Under 18</option>
            <option value="1">18 - 35</option>
            <option value="2">36 - 55</option>
            <option value="3">56 - 75</option>
            <option value="4">Over 75</option>
          </select>*/}
          <label>
            <b>1. Have you taken a covid test today? </b>{" "}
          </label>
          <input type="radio" id="yes" name="istested"  onChange={(e) => setTestStatus(e.target.value)} value="True"/>
          <label htmlFor="yes">Yes</label>
          <input type="radio" id="no" name="istested"  onChange={(e) => setTestStatus(e.target.value)} value="False"/>
          <label htmlFor="no">No</label>
          <br />
          <br />
          <br />
          <label>
            <b>2. What was your last covid test result? </b>{" "}
          </label>
          <input type="radio" id="positive" name="preTestResult" onChange={(e) => setTestResult(e.target.value)} value="True"/>
          <label htmlFor="other">Positive</label>
          <input type="radio" id="negative" name="preTestResult" onChange={(e) => setTestResult(e.target.value)} value="False"/>
          <label htmlFor="other">Negative</label>
          <br />
       {/*   <label>*/}
           {/* <b>1. Have you taken a covid test today and was it positive? </b>{" "}
          </label>
          &nbsp;
          &nbsp;
          <select
            id="preTestResult"
            name="preTestResult"
            ref={userRef}

            className={"selectWidth"}
          >
            <option value="default" selected disabled>
              - Select From The Choices Below -
            </option>
            <option  onChange={(e)=> setTestResult("True")&& setTestStatus("True")} >Yes I have, the result is positive. </option>
            <option onChange={(e)=> setTestResult("False")&& setTestStatus("True")}>Yes I have, the result is negative.</option>
            <option onChange={(e)=> setTestResult("False")&& setTestStatus("False")}>I have not taken a test today.</option>
          </select>
          <br />*/}
          <br />
          <br />
          <label>
            <b>3. What is your body temperature ? (°F) </b>
            <input
              id="dailyTemperature"
              name="dailyTemperature"
              type="text"
              style={{ width: "100px" }}
              autoComplete="off"
              ref={userRef}
              onChange={(e) => setBodyTemperature(e.target.value)}
              value={bodyTemperature}
              required
            />
          </label>
          <br />
          <br />
          <br />
          <label>
            <b>4. How do you feel today ? </b> bad(1) - good(5){" "}
          </label>
          <br />
          <br />
          <ul className="likert">
            <li>
              <input type="radio" name="likert" id = "Very_Bad" onChange={(e) => setSelfAssessment(e.target.value)} value="0"/>
              <label>
                <b>1</b>
              </label>
            </li>
            <li>
              <input type="radio" name="likert" id = "Bad" onChange={(e) => setSelfAssessment(e.target.value)} value="1"/>
              <label>
                <b>2</b>
              </label>
            </li>
            <li>
              <input type="radio" name="likert" id = "Ok" onChange={(e) => setSelfAssessment(e.target.value)} value="2"/>
              <label>
                <b>3</b>
              </label>
            </li>
            <li>
              <input type="radio" name="likert" id = "Good" onChange={(e) => setSelfAssessment(e.target.value)} value="3"/>
              <label>
                <b>4</b>
              </label>
            </li>
            <li>
              <input type="radio" name="likert" id = "Very_Good" onChange={(e) => setSelfAssessment(e.target.value)} value="4"/>
              <label>
                <b>5</b>
              </label>
            </li>
          </ul>
          <label>
            <b>5. What are your symptoms ? </b>{" "}
          </label>
          <br />
          <textarea
            id="symptomsBox"
            name="symptomsBox"
            rows="3"
            cols="100"
            autoComplete="off"
            ref={userRef}
            onChange={(e) => setSymptoms(e.target.value)}
            value={symptoms}
            required
          />
          <br />
          <br />
          <label>
            <b>
              6. Comments,concerns or questions you may have for your doctor ?{" "}
            </b>
          </label>
          <br />
          <textarea id="commentBox" name="commentBox" rows="4" cols="100"
                    autoComplete="off"
                    ref={userRef}
                    onChange={(e) => setPatientComments(e.target.value)}
                    value={patientComments}
                    required/>
          <br />
          <br />
          <center>
            <button type="submit" className="covidFormbtn">
              Submit
            </button>
          </center>
        </form>
      </div>
    </div>
  );
}
export default UpdatedCovidForm;
// const rootElement = document.getElementById("root");
// ReactDOM.render(<CovidForm />, rootElement);
