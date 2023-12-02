import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { GrClose } from "react-icons/gr";

const ChoiceMesage = ({ ok, no, setter }) => {
  return (
    <div className="ErrorMesage">
        <div className='Message'>
            <div>{setter.message}</div>
            <br />
            <div className='iconsChoises'>
                <GrClose className='Close' onClick={no}/>
                <FaCheck onClick={ok} id='Check'/>
            </div>
        </div>
    </div>
  )
}

export default ChoiceMesage