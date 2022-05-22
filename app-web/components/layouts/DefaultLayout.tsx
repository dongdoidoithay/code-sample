import React from 'react';

import HeadTitle from './modules/HeadTitle';
import Header from './Header';
import Footer from './Footer';
import BackToTop from './modules/BackToTop';
import NavigationList from '../shared/mobile';
import InitialFetchDataEn from './InitialFetchData_Scan';
import InitialFetchDataEnDc from './InitialFetchData_Raw';
//load data
const DefaultLayout = ({ children }) => {
    return (
        <>
            <InitialFetchDataEn />
            <InitialFetchDataEnDc />
            <HeadTitle />
            <div className="layout">
                <Header />
                <NavigationList/>
                {children}
                <Footer />
                <BackToTop scrollStepInPx="1000" delayInMs="20" />
            </div>
        </>
    )
};


export default DefaultLayout;
