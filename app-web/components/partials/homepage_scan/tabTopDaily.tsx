import React from 'react';
import configSeting from '../../../config/configScanSeting';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import configPrefix from '../../../config/configScanPrefix';
import Image from '../../shared/Image'
const TabTopDaily = () => {

    let mangatopview = useSelector((state:any) => state.home_scan.mangatopview)
   
    return (
        <>
            <div className='section box mt-1 hidden-sm hidden-md'>
                <div className="section-header">
                    <div className="title">
                        <h2>{configSeting.lbl_top_daily}</h2>
                    </div>
                </div>
                <div className="section__categories p-2">
                    {mangatopview && mangatopview.map((data, index) => (
                        <div className="top-item" key={index}>
                            <div className="inner">
                                <span className={`rank r${index + 1}`}>{index + 1}</span>
                                <div className="thumb">
                                    <Link href={`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${data.idDoc}`}>
                                        <a title={data.name} >
                                            <Image src={data.image} width="" height="" alt={data.nameOther} title={data.name} classCss="" />
                                        </a>
                                    </Link>
                                </div>
                                <div className="meta">
                                    <h3 className="title">
                                    <Link href={`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${data.idDoc}`}>
                                        <a title={data.name} >{data.name}</a>
                                     </Link>
                                    </h3>
                                    <h4 className="chap-item">
                                    {data.detail_documents && data.detail_documents.slice(0,1).map((item) => (
                                        <Link href={`${configPrefix.url_host}${configPrefix.pageViewManga}/${configPrefix.startManga}${item.idDoc}/${configPrefix.startViewmanga}${item.idDetail}`} key={item.slug}>
                                            <a title={`${item.idDetail} | ${data.nameOther}`}>{configSeting.lbl_start_chapter} {item.idDetail}</a>
                                        </Link>
                                    ))}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
}
export default TabTopDaily;