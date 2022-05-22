
import React, { FC, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from './Image'
import { BreadcrumbJsonLd } from 'next-seo';
import AddKeep from '../ads/ads_keeper';
import AdsDesktop from '../ads/ads_desktop';

const ItemlistSearch = ({ listbymanga,configPrefix, }) => {
//console.log("listbymanga===>",listbymanga)
    return (
        <>
        <AddKeep/>
        <AdsDesktop/>
          {  listbymanga&&   <BreadcrumbJsonLd
                itemListElements={
                   listbymanga && listbymanga.map((item, indx) => (
                        {
                            position: indx + 1,
                            name: item.name,
                            item: `${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${item.id}`,
                        }
                    ))
                   
                }
            />}
            {listbymanga  && listbymanga.map(data =>
            (
                <div className="col-12 col-md-6" key={data.id}>
                    <div className="novel-detailed-item">
                        <div className="thumb">
                            <Link href={`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${data.id}`} >
                                <a title={data.nameSeo}>
                                    <Image src={data.image} width="100%" height="" alt={data.nameSeo} title={data.nameSeo} classCss="" />
                                </a>
                            </Link>
                        </div>
                        <div className="meta">
                            <div className="title">
                                <h3>
                                    <Link href={`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${data.id}`} >
                                        <a title={data.nameSeo}>{data.name}</a>
                                    </Link>
                                </h3>
                            </div>
                            <div className="genres">
                                {data.listGenres && data.listGenres.map(item => (
                                    <Link href={`${configPrefix.url_host}${configPrefix.pageGenre}/${configPrefix.startGenre}${item.id}`} key={item.id}>
                                        <a title={item.name}>{item.name}</a>
                                    </Link>
                                ))}
                            </div>
                            <div className="rating-view d-flex flex-wrap align-items-center ">
                                <span><i className="fa fa-star"></i></span>
                                <span><i className="fa fa-star"></i></span>
                                <span><i className="fa fa-star"></i></span>
                                <span><i className="fa fa-star-half-alt"></i></span>
                                <span><i className="far fa-star"></i></span>
                                {/* <span className="ml-2" style={{"lineHeight": "16px"}}></span> */}
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

export default ItemlistSearch;