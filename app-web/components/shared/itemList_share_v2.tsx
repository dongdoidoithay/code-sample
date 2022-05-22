
import React from 'react';
import Link from 'next/link';
import Image from './Image'
import { BreadcrumbJsonLd } from 'next-seo';
import AdsDesktop from '../ads/ads_desktop';

const Itemlist_share_v2 = ({ listbymanga,configPrefix ,configSeting}) => {
//console.log("listbymanga===>",listbymanga)
    return (
        <>
    <AdsDesktop/>
          {  listbymanga&&   <BreadcrumbJsonLd
                itemListElements={
                   listbymanga && listbymanga.map((item, indx) => (
                        {
                            position: indx + 1,
                            name: item.name,
                            item: `${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${item.idDoc}`,
                        }
                    ))
                   
                }
            />}
            {listbymanga  && listbymanga.map((data,index) =>
            (
                
                <div className="col-12 col-md-6" key={data.idDoc}>
                    <div className="novel-detailed-item">
                        <div className="thumb">
                            <Link href={`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${data.idDoc}`} >
                                <a title={data.nameSeo}>
                                    <Image src={data.image} width="100%" height="" alt={data.nameSeo} title={data.nameSeo} classCss="" />
                                </a>
                            </Link>
                        </div>
                        <div className="meta">
                            <div className="title">
                                <h3>
                                    <Link href={`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${data.idDoc}`} >
                                        <a title={data.nameSeo}>{data.name}</a>
                                    </Link>
                                </h3>
                            </div>
                            <div className="rating-view d-flex flex-wrap align-items-center ">
                                <span><i className="fa fa-star"></i></span>
                                <span><i className="fa fa-star"></i></span>
                                <span><i className="fa fa-star"></i></span>
                                <span><i className="fa fa-star-half-alt"></i></span>
                                <span><i className="far fa-star"></i></span>
                                {/* <span className="ml-2" style={{"lineHeight": "16px"}}></span> */}
                            </div>
                            <div className="genres">
                                {data.detail_documents && data.detail_documents.map(item => (
                                   
                                   item&& <Link  key={item.idDetail} href={`${configPrefix.url_host}${configPrefix.pageViewManga}/${configPrefix.startManga}${item.idDoc}/${configPrefix.startViewmanga}${item.idDetail}`}>
                                            <a title={`${item.idDetail} | ${item.nameParent}`}>{configSeting.lbl_start_chapter}{item.idDetail}</a>
                                        </Link>
                                      
                                ))}
                            </div>
                           
                            <div className="summary">
                                <p>{data.desc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Itemlist_share_v2;