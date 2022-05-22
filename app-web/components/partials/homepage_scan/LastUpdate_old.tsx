import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import configSeting from '../../../config/configScanSeting';
import configPrefix from '../../../config/configScanPrefix';
import ItemGrid from '../../shared/itemgridOld';

const HomeEnLastUpdateOld = () => {
    let _listmanga = useSelector((state:any) => state.home_scan.mangalastupdate)

    const [listmanga, Setlistmanga] = useState(null);
    useEffect(() => {
        Setlistmanga(_listmanga);
    })


    return (
        <>
            <div className='col-lg-9 container__left'>
                <div className="section-header">
                    <div className="title">
                        <h2>{configSeting.Lbl_Home_New_Upadte}</h2>
                    </div>
                </div>
                <div className='section box grid-items'>
                    <ItemGrid listmanga={_listmanga} configPrefix={configPrefix} configSeting={configSeting} />
                </div>
                <a className="load-more" title={`${configSeting.lbl_read_more}`} href={`${configPrefix.pageMnLastUpdate}?page=2`}>{configSeting.lbl_read_more}</a>
            </div>
        </>
    );
}
export default HomeEnLastUpdateOld;
