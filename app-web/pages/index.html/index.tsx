
import React, {  } from 'react';

import HistoryManga from '../../components/shared/history';

import configSeting from '../../config/configRawSeting';

import HomeScanLastUpdate from '../../components/partials/homepage_scan/LastUpdate';
import TabScanTopDaily from '../../components/partials/homepage_scan/tabTopDaily';

import TabRawTopDaily from '../../components/partials/homepage_raw/tabTopDaily';
import HomeFeature from '../../components/partials/homepage_raw/Feature';
import HomeRawLastUpdate from '../../components/partials/homepage_raw/LastUpdate';

import Discord from '../../components/shared/discord';

function Home() {

  return (
    <>
    <h1 style={{"display":"none"}}>{configSeting.sb_seo_df_title}</h1>
      <div className="main-container">
        <div className="container">
          <HomeFeature />
          <div className='row mt-1 d-flex flex-wrap-reverse'>
            <div className='col-lg-9 container__left'>
              <HomeRawLastUpdate/>
              <HomeScanLastUpdate/>
              </div>
            <div className='col-lg-3 container__right'>
             <HistoryManga />
             <Discord />
             <TabRawTopDaily/>
             <TabScanTopDaily/>
            </div>

          </div>
        </div>
      </div>
    </>

  )
}


export default Home

