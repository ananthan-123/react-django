import React from "react";
import PropTypes from "prop-types";
import "./Styles/Navlink.css";
import { NavItem, NavLink } from 'reactstrap';




function Navlink(props){

  // onClick function for the Nav Links
const action = () => {
  
  // redirect link
   window.location.href = 'http://localhost:3000/' + props.navlinks;
}

  return (
    <NavItem>
      <div className="linkbg">
        <NavLink  href={props.href} disabled={props.disabled} active={props.active} onClick={action}>
            {props.name}
        </NavLink>
      </div>
    </NavItem>
   
  );
}

export default Navlink;
