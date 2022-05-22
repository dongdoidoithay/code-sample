
import React, { useState } from 'react';

const SelectImage = ({ listimage, currentimage,onChange}) => {
  return (
    <> 
    <select value={currentimage} onChange={(e) => onChange(e)} className="select-chapter">
      {listimage && listimage.map((item,index) =>  
      (
      <option value={index+1} key={index} >{`Image [${index+1} / ${listimage.length}]`}</option>)
      )}
      </select>
    </>
  );
}


export default SelectImage;