import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Layout from "./Components/Layout";
import RequireAuth from "./Components/RequireAuth";
import RequireNoAuth from "./Components/RequireNoAuth";
import useAuth from "./Components/hooks/useAuth";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import AmpTest from "./Components/AmpTest";
import CovidForm from "./Components/CovidForm";
import UpdatedCovidForm from "./Components/UpdatedCovidForm";
import DoctorDashboard from "./Components/DoctorDashboard";
import PatientDashboard from "./Components/PatientDashboard";
import HealthDashBoard from "./Components/HealthDashBoard";
import ImmigrantDashBoard from "./Components/ImmigrantDashBoard";
import ContactDoctor from "./Components/ContactDoctor";
import DoctorMail from "./Components/DoctorMail";
import Profile from "./Components/Profile";
import AdminDashboard from "./Components/AdminDashboard";
import ContactTracingForm from "./Components/ContactTracingForm";

function App() {
  return (
    <div>
      <Header />
      <div className="mainBody">
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route element={<RequireAuth />}>
                <Route path="profile" element={<Profile />} />
                <Route path="Test1" element={<AmpTest />} />
                <Route path="CovidForm" element={<CovidForm />} />
                <Route path="UpdatedCovidForm" element={<UpdatedCovidForm />} />
                <Route path="DoctorDashBoard" element={<DoctorDashboard />} />
                <Route path="ContactDoctor" element={<ContactDoctor />} />
                <Route path="DoctorMail" element={<DoctorMail />} />
                  <Route path="HealthDashBoard" element={<HealthDashBoard />} />
                  <Route path="ImmigrantDashBoard" element={<ImmigrantDashBoard />} />
                <Route path="PatientDashboard" element={<PatientDashboard />} />
                  <Route path="AdminDashboard" element={<AdminDashboard />} />
                <Route path="ContactTracingForm" element={<ContactTracingForm />} />
              </Route>
              <Route path="" element={<Login />} />
              <Route element={<RequireNoAuth />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

// const Home = () => {
//   // const { auth } = useAuth();

//   return (
//     <div className="HomePage">
//       <h1>Home Page</h1>
//       <h4>
//         add <a href="/login">'/login'</a> to url to reach login page
//       </h4>
//     </div>
//   );
// };

export default App;
