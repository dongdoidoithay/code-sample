import React from 'react';
import configPrefix from '../../config/configRawPrefix';
import configSeting from '../../config/configRawSeting';


 const NavigationList =()=> {
    
        return (
            <div className="navigation--list">
                
                <div className="navigation__content">
                    <a className={`navigation__item`} href="/index.html">
                        <i className="fa fa-home"></i>
                        <span> Home</span>
                    </a>
                    <a className={`navigation__item`} href="/history">
                        <i className="fa fa-sync"></i>
                        <span> Bookmark</span>
                    </a>
                    <a className={`navigation__item`} href="/search?q=_keyword_&page=1">
                        <i className="fa fa-search"></i>
                        <span> Search</span>
                    </a>
                    <a className={`navigation__item`} href="https://discord.gg/DtbX5EfwQc">
                        <i className="fab fa-discord"></i>
                        <span> Discord</span>
                    </a>
                </div>
            </div>
        );
    }

export default NavigationList