import React, {  } from 'react';
import ItemGrid from './itemgrid_share_v2';

const ListPage_grid_v2 = ({ listmanga, titlepage,configSeting,configPrefix }) => {

    return (
        <>
            <div className='col-lg-9 container__left'>
                <div className="section-header">
                    <div className="title">
                        <h2>{configSeting.lbl_list_title} {titlepage}</h2>
                    </div>
                </div>

                <div className='section box grid-items'>
                    <div className="dark-segment section box">
                        <ul className="clearfix latest-updates">
                            <ItemGrid listmanga={listmanga} configPrefix={configPrefix} />
                        </ul>
                    </div>
                </div>
            </div>

        </>
    );
}
export default  ListPage_grid_v2
