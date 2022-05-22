import React from 'react';
import configPrefix from '../../../config/configRawPrefix';
import { useSelector } from 'react-redux';
import configSeting from '../../../config/configRawSeting';
import Link from 'next/link';

const YearRight = () => {
    let listcl = useSelector((state:any) => state.cl_raw.listyear)

    return (
        <>

            <div className='section box mt-1 hidden-sm'>
                <div className="section-header">
                    <div className="title">
                        <h2>{`${configSeting.lbl_inf_Year}`}</h2>
                    </div>
                </div>
                <div className="section__categories p-2">
                    {listcl && listcl.map((data) => (
                        <div className="category-item-year" key={data.id}>
                            <Link href={`${configPrefix.url_host}${configPrefix.pageYear}/${configPrefix.startYear}${data.id}`} >
                                <a title={data.name.replace('<div>', '').replace('</div>', '')} ><i className="fa fa-caret-right"></i>{data.name.replace('<div>', '').replace('</div>', '')}</a>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </>
    );
}
export default YearRight;