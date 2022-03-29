import React, {useState} from "react";
import {BsFlagFill} from "react-icons/bs";
import {BsFlag} from "react-icons/bs";


function FlagFun() {
  const [isFlag, setIsFlag] = useState(false);
  return (
    <button className="flagbtn" onClick={() => setIsFlag(!isFlag)}> {isFlag? <BsFlagFill/> : <BsFlag/>} </button>
  )
}

export default FlagFun