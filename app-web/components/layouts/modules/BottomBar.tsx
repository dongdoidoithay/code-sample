import React from 'react';
import configPrefix from '../../../config/configPrefix';
import configSeting from '../../../config/configRawSeting';

//load data
const BottomBar = () => {
  
    return (
        <> 
           <div className="bottom-bar">
               <div className="container">
                  <ul className="header__links-list">
                    <li className="header__links-item"><a title={`Home manga`} href="/">{configSeting.lbl_page_home}</a></li>
                    <li className="header__links-item"><a title={`Sub En manga`} href={`${configPrefix.pageMangaRaw}`}>Manga Raw </a></li>
                    <li className="header__links-item"><a title={`Sub Po manga`} href={`${configPrefix.pageMangaScan}`}>Manga Scan</a></li>
                    <li className="header__links-item"><a title={`Sub Po manga`} href='/history'>Bookmark</a></li>
                  </ul>
               </div>
            </div>
        </>
    )
};
export default BottomBar;