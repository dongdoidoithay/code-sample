import React from 'react';
import configPrefix from '../../../config/configPrefix';
import configSeting from '../../../config/configSeting';

const MobileSideBar = () => {
    const closeMenu=()=>{
      var e = document.getElementById("mobile-sidebar");
      e.classList.remove("active")
    }
    return (
        <>
          <div className="mobile__sidebar snap-drawer-left" id="mobile-sidebar">
               <div className="sidebar__header">
                  <div className="sidebar__header-logo"><a href="index.html" style={{"color": "#fff", "fontSize": "20px", "fontWeight": 700}}>{configSeting.lbl_Name_Page}</a></div>
                  <a onClick={()=> closeMenu()} className="sidebar__header-close"><i className="fa fa-times"></i></a>
               </div>
               <div className="sidebar-breadcrumb">
                  Navigation
                  <li className="header__links-item dark-mode-settings">
                    {/*  <span className="text"><i
                        className="fas fa-sun"></i>-<i className="fas fa-moon"></i></span>
                     <div className="switch-container">
                        <label>
                           <input id='darkmode-cb' type="checkbox" className="switch darkmode-cb" onChange={()=>darkModeChange()} >
                           <div>
                              <div></div>
                           </div>
                        </label>
                     </div> */}
                  </li>
               </div>
               <ul className="sidebar__menu">
                  <li><a href="/index.html"><i className="fa fa-home"></i>HOME</a></li>
                  <li><a title={`English manga scan`} href={`${configPrefix.pageMangaScan}`}>Scan Manga</a></li>
                  <li><a title={`English manga `} href={`${configPrefix.pageMangaRaw}`}>Raw Manga</a></li>
                  <li><a href="/history"><i className="fa fa-sync"></i>BookMark</a></li>
                 </ul>
               <div className="sidebar-breadcrumb" style={{"bottom":"0","marginTop":"auto"}}>Copyright 2019.</div>
            </div>
            <div id="mobile__sidebar-overlay" className="fadeOut"></div>
        </>
    )
};


export default MobileSideBar;