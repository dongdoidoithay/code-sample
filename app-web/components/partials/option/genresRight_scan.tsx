import React from 'react';
import configPrefix from '../../../config/configScanPrefix';
import { useSelector } from 'react-redux';
import configSeting from '../../../config/configScanSeting';
import Link from 'next/link';

const GenresRight_18 = () => {
    // console.log("listmanga==>",listmanga)
    let listcl = useSelector((state:any) => state.cl_scan.listgenres)

    return (

        <div className='section box mt-1'>
            <div className="section-header">
                <div className="title">
               <h2>{`${configSeting.lbl_genres}`}</h2>
                </div>
            </div>
            <div className="section__categories p-2">
                {listcl && listcl.map((data) => (
                    <div className="category-item-wrapper" key={data.id}>
                        <Link href={`${configPrefix.url_host}${configPrefix.pageGenre}/${configPrefix.startGenre}${data.id}`} >
                            <a title={data.name.replace('<div>', '').replace('</div>', '')} ><i className="fa fa-caret-right"></i>{data.name.replace('<div>', '').replace('</div>', '')}</a>
                        </Link>
                    </div>
                ))}
            </div>

        </div>
    );
}
export default GenresRight_18;