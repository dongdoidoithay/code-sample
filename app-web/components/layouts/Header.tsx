import React from 'react';
import BottomBar from './modules/BottomBar';
import MobileSideBar from './modules/MobileSideBar';
import TopBar from './modules/TopBar';


//load data
const Header = () => {
    return (
        <>
        <header id="header" className="header">
            <TopBar/>
            <BottomBar/>
            <MobileSideBar/>
         </header>
        </>
    )
};


export default Header;