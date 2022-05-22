import React, {  } from 'react';
import Itemlist_share_v2 from './itemList_share_v2';

const ListPage_list_v2 = ({ listmanga, titlepage,configSeting,configPrefix }) => {

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
                            <Itemlist_share_v2 listbymanga={listmanga} configPrefix={configPrefix} configSeting={configSeting} />
                        </ul>
                    </div>
                </div>
            </div>

        </>
    );
}
export default  ListPage_list_v2
