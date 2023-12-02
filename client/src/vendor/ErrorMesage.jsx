import React from 'react';
import { FaCheck } from "react-icons/fa";

const ErrorMesage = ({ message, seter }) => {
  return (
    <div className="ErrorMesage">
        <div className='Message'>
            {message.message}
            <br />
            <FaCheck className='Check' onClick={seter}/>
        </div>
    </div>
  )
}

export default ErrorMesage;