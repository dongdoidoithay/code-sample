import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import configSeting from '../../../config/configScanSeting';
import configPrefix from '../../../config/configScanPrefix';
import ItemGrid_share_v2 from '../../shared/itemgrid_share_v2';

const HomeEnLastUpdate = () => {
    let _listmanga = useSelector((state:any) => state.home_scan.mangalastupdate)

    const [listmanga, Setlistmanga] = useState(null);
    useEffect(() => {
        Setlistmanga(_listmanga);
    })


    return (
        <>
            <div className="section-header">
                <div className="title">
                    <h2>{configSeting.Lbl_Home_New_Upadte}</h2>
                </div>
            </div>
            <div className="dark-segment section box">
                <ul className="clearfix latest-updates">
                    <ItemGrid_share_v2 listmanga={listmanga} configPrefix={configPrefix} />
                </ul>
            </div>
            <a className="load-more" title={`${configSeting.lbl_read_more}`} href={`${configPrefix.pageMnLastUpdate}?page=2`}>{configSeting.lbl_read_more}</a>
        </>
    );
}
export default HomeEnLastUpdate;
