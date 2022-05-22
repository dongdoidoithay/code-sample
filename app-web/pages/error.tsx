import configSeting from "../config/configRawSeting";
import GenresRight from '../components/partials/option/genresRight_raw';
import React from "react";
import Link from "next/link";

const Error=()=> {

  return (
    <>
   
      <div className="main-container">
        <div className="container">
          <div id="breadcrumbs-container">
            <div className="breadcrumbs-wrapper">
              <div className="breadcrumbs-item">
                <a title="Home" href="/">{configSeting.lbl_page_home}<i className="fa fa-angle-right"></i></a>
              </div>
              <div className="breadcrumbs-item" style={{ "overflow": "hidden" }}><span>ERROR 404</span></div>
            </div>
          </div>
          <div className="row no-gutters d-flex">
            <div className="col-lg-9">
              <div className="container__left">
                <div className="section box">
                  <div style={{ "padding": "20px" }}>
                    <div className="search-wrapper">
                    <h1>{configSeting.sb_error_title}<br/>
                    {configSeting.sb_error_line}</h1> 
                    </div>
                  </div>
                </div>
                <div className="section box mt-1">
                  <div className="section-body">
                    <div className="row no-gutters">
                   <h2><Link href="/">
                        <a style={{"color":"red"}}>
                        {configSeting.sb_error_bt_back}
                        </a>
                    </Link></h2> 
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            <div className="col-lg-3">
              <div className="container__right">
                <GenresRight />
              </div>
            </div>
          </div>
        </div>
      </div>

    </>)
}

export default Error

