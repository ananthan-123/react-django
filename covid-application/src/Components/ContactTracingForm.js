import "./Styles/CovidForm.css";
import React, { Component, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ReactDOM from "react-dom";
import axios from "./api/axios";

const PatientForm_URL = "/patientDailyFormEndpoint/";
const PatientHistory_URL = "/patientStatusHistoryEndpoint/";
const PatientUpdate_URL = "/patientUpdateEndpoint/";

function ContactTracingForm() {
 /* const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";

  //states for different states of the system
  const [userFocus, setUserFocus] = useState(false);

  const [sex, setSex] = useState();
  const [ageRange, setAgeRange] = useState();
  const [testStatus, setTestStatus] = useState();
  const [testResult, setTestResult] = useState();
  const [selfAssessment, setSelfAssessment] = useState();
  const [weight, setPatientWeight] = useState("");
  const [recent_test_date, setRecent_test_date] = useState();
  const [bodyTemperature, setBodyTemperature] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [vaccineShots, setVaccineShots] = useState();
  const [patientComments, setPatientComments] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [
    weight,
    recent_test_date,
    bodyTemperature,
    symptoms,
    vaccineShots,
    patientComments,
    sex,
    ageRange,
    testStatus,
    testResult,
    selfAssessment,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

   // console.log("Error");

    try {
    // Fill out form and store it in patient Daily form table
      let response = await axios.post(
        PatientForm_URL,
        JSON.stringify({
          sex: sex,
          age_range: ageRange,
          test_status: testStatus,
          recent_test_date: recent_test_date,
          test_result: testResult,
          body_temp: bodyTemperature,
          weight: weight,
          self_assessment: selfAssessment,
          symptoms: symptoms,
          vaxination_count: vaccineShots,
          comments: patientComments,
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
            current_sex: sex,
            current_age_range: ageRange,
            current_test_status: testStatus,
            recent_test_date: recent_test_date,
            current_test_result: testResult,
            current_body_temp: bodyTemperature,
            current_weight: weight,
            current_self_assessment: selfAssessment,
            current_symptoms: symptoms,
            current_vaxination_count: vaccineShots,
            user_info: user_info.id,
        }),
        {
          headers: { "Content-Type": "application/json" },
          //   withCredentials: true,
        }
      );
      // console.log(response?.accessToken);
      // console.log(JSON.stringify(response));
      setSuccess(true);
      setSex();
      setAgeRange();
      setTestStatus();
      setTestResult();
      setSelfAssessment();
      setPatientWeight("");
      setRecent_test_date();
      setBodyTemperature("");
      setSymptoms("");
      setVaccineShots();
      setPatientComments("");
      setErrMsg("");
      setSuccess(false);

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
  };*/

  return (
    <div className="formContainer">
      <center>
        <h1>
          <b>Contact Tracing Form</b>
        </h1>
      </center>
      <div className="container">
      {/*<p*/}
      {/*  ref={errRef}*/}
      {/*  className={errMsg ? "errmsg" : "offscreen"}*/}
      {/*  aria-live="assertive">*/}
      {/*  {errMsg}*/}
      {/*</p>*/}
        <form> {/*onSubmit={handleSubmit}*/}
          <div className="ctFormContainer">
          <label>
            <b>1.Have you been diagnosed with Covid-19, or had close contact with someone who has been diagnosed with Covid-19,within the past 14 days? </b>
          </label>
          <br/>
          <br/>
          <input type="radio"  name="Diagnosed"  value="0"/>  {/*onChange={(e) => setSex(e.target.value)}*/}
            <label htmlFor="Yes">Yes</label>
            <input type="radio"  name="Diagnosed"  value="1"/>
            <label htmlFor="No">No</label>

          <br />
          <br />
          <label>
            <b>2.Have you been told by a health official to self-isolate, or been in close contact with someone who has been asked to self-isolate within the past 14days? </b>
          </label>
          <br/>
          <input type="radio"  name="selfIsolate" value="0"/>
          <label htmlFor="Yes">Yes</label>
          <input type="radio"  name="selfIsolate"  value="1"/>
          <label htmlFor="No">No</label>
          <br />
            <br />
            <label>
              <b>if so, Please list the<i> person's name and phone number</i> below : </b>{" "}
            </label>
            <br />
            <br />
            <textarea
                name="ContactSelfIsolate"
                rows="3"
                cols="100"
                autoComplete="off"
                // ref={userRef}
                required
            />
            <br />
          <br />
          <br />
          <label>
            <b>3.Are you experiencing fever, dry cough, difficulty breathing, chest pain, or shortness of breath? </b>
          </label>
          <br/>
            <br />
          <input type="radio"  name="HaveSymptoms" value="0"/>
          <label htmlFor="Yes">Yes</label>
          <input type="radio"  name="HaveSymptoms" value="1"/>
          <label htmlFor="No">No</label>
          <br />
          <br />
          <br />
          <label>
            <b>4.Have you travelled, or had close contact with a person who has recently travelled outside of Canada (including the US) with the past 14 days?   </b>
          </label>
          <br/>
            <br />
          <input type="radio"  name="travelled" value="0"/>
          <label htmlFor="Yes">Yes</label>
          <input type="radio"  name="travelled" value="1"/>
          <label htmlFor="No">No</label>
          <br />
          <br />
            <label>
              <b>if so, Please list the <i>person's name and phone number</i> or the <i>places</i> you have been below : </b> {" "}
            </label>
            <br />
            <br />
            <textarea
                name="ContactTravelled"
                rows="3"
                cols="100"
                autoComplete="off"
                // ref={userRef}
                required
            />
            <br />
          <br />
          <label>
            <b>5.I agree to wear a mask when boarding, disembarking, when physical distancing is not possible, or when indoors at the public place?   </b>
          </label>
          <br/>
            <br />
          <input type="radio"  name="wearMask" value="0"/>
          <label htmlFor="Yes">Yes</label>
          <input type="radio"  name="wearMask"  value="1"/>
          <label htmlFor="No">No</label>
          <br />
          <br />
          <br />

            <input  type="checkbox" required />
            <label> I affirm the accuracy of my statements on this form. </label>
            <br />
            <br />
            <br />

           <center>
            <button type="submit" className="covidFormbtn">
              Submit
            </button>
          </center>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ContactTracingForm;
// const rootElement = document.getElementById("root");
// ReactDOM.render(<CovidForm />, rootElement);
