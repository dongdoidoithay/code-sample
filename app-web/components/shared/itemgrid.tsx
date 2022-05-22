
import React, {  } from 'react';
import Link from 'next/link';
import Image from './Image'
import { BreadcrumbJsonLd } from 'next-seo';
import getDate from '../../config/caldate';
import AdsDesktop from '../ads/ads_desktop';
import AddKeep from '../ads/ads_keeper';
const ItemGrid_share_v1 = ({ listmanga, configPrefix, configSeting, titlepage }) => {

    // console.log("listmanga",listmanga)
    return (
        <>
            <div className='col-lg-9 container__left'>
                <AddKeep />
                <AdsDesktop />

                <div className="section-header">
                    <div className="title">
                        <h2>{configSeting.lbl_list_title} {titlepage}</h2>
                    </div>
                </div>
                <div className='section box grid-items'>


                    {listmanga && <BreadcrumbJsonLd
                        itemListElements={
                            listmanga && listmanga.map((item, indx) => (
                                {
                                    position: indx + 1,
                                    name: item.name,
                                    item:item.idDoc!=null? `${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${item.idDoc}`:`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${item.id}`,
                                }
                            ))
                        }
                    />}
                    {listmanga && listmanga.map((data) => (

                        <div className="latest-item" key={data.idDoc || data.id}>
                            <div className="inner">
                                <div className="thumb tooltip-hover">
                                    {data.idDoc && <Link href={`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${data.idDoc}`}>
                                        <a title={data.name} ><Image src={data.image} width="" height="" alt={data.nameSeo} title={data.name} classCss="" /></a>
                                    </Link>}
                                    {data.id && <Link href={`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${data.id}`}>
                                        <a title={data.name} ><Image src={data.image} width="" height="" alt={data.nameSeo} title={data.name} classCss="" /></a>
                                    </Link>}
                                </div>
                                <div className="meta">
                                    <div className="title">
                                        <h3>
                                            {data.idDoc && <Link href={`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${data.idDoc}`}>
                                                <a title={data.name} >{data.name}</a>
                                            </Link>}
                                            {data.id && <Link href={`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${data.id}`}>
                                                <a title={data.name} >{data.name}</a>
                                            </Link>}
                                        </h3>
                                    </div>
                                    <div className="chapters">
                                        {data.detail_documents && data.detail_documents.map((item) => (
                                            <div className="chap-item" key={item.idDetail}>
                                                <h3>
                                                    <Link href={`${configPrefix.url_host}${configPrefix.pageViewManga}/${configPrefix.startManga}${item.idDoc}/${configPrefix.startViewmanga}${item.idDetail}`}>
                                                        <a title={`${item.idDetail} | ${item.nameParent}`}>{configSeting.lbl_start_chapter}{item.idDetail}</a>
                                                    </Link>
                                                </h3>
                                                <div className="updated-date"><time>{getDate(item.date)}</time></div>
                                            </div>
                                        ))}
                                        {data.lsDocumentDetail && data.lsDocumentDetail.map((item) => (
                                            <div className="chap-item" key={item.id}>
                                                <h3>
                                                    <Link href={`${configPrefix.url_host}${configPrefix.pageViewManga}/${configPrefix.startManga}${data.id}/${configPrefix.startViewmanga}${item.id}`}>
                                                        <a title={`${item.name} | ${item.nameParent}`}>{item.name}</a>
                                                    </Link>
                                                </h3>
                                                <div className="updated-date"><time>{item.date}</time></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ItemGrid_share_v1;