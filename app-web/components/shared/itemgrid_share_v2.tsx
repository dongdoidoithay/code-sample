
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from './Image'
import { BreadcrumbJsonLd } from 'next-seo';
import getDate from '../../config/caldate';
import ItemGrid_share_v2_loading from './itemgrid_share_loading';
import AdsDesktop from '../ads/ads_desktop';
import AddKeep from '../ads/ads_keeper';
const ItemGrid_share_v2 = ({ listmanga ,configPrefix}) => {
   
    const[listviemanga,setlistmanga]=useState([]);
    useEffect(()=>{
        setlistmanga(listmanga);
    });

    return (
        <>
            <AddKeep/>
    <AdsDesktop/>
         {listviemanga && <BreadcrumbJsonLd
                itemListElements={
                    listviemanga && listviemanga.map((item, indx) =>
                    {
                        if(item.idDoc!=null && item.idDoc!=undefined){
                            return (
                                {
                                    position: indx + 1,
                                    name: item.name,
                                    item: `${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${item.idDoc}`,
                                }
                            )
                        }
                        if(item.id!=null && item.id!=undefined){
                            return (
                                {
                                    position: indx + 1,
                                    name: item.name,
                                    item: `${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${item.id}`,
                                }
                            )
                        }
                    }
                    
                    )
                }
            />}
          {//console.log("listviemanga",listviemanga)
          }
            {!listviemanga &&<ItemGrid_share_v2_loading/>}
            {listviemanga && listviemanga.map((data) =>
            {
                if(data.idDoc!=null && data.idDoc!=undefined){
                    return (
                        <li className="segment-poster-sm" key={data.idDoc}>
                            <div className="poster poster-xs">
                                <span className="date">
                                    <span>{getDate(data.date)}</span>
                                </span>
                                <div className="poster-subject" data-tooltip="Malaise Creature: Awaken" data-inverted="">
                                    <h2 className="truncate">
                                        <Link href={`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${data.idDoc}`}>
                                            <a title={data.name} >{data.name}</a>
                                        </Link>
                                    </h2>
                                    <ul className="chapters">
                                        {data.detail_documents && data.detail_documents.map((item) => (
                                             <li key={item.idDetail}>
                                                <Link href={`${configPrefix.url_host}${configPrefix.pageViewManga}/${configPrefix.startManga}${item.idDoc}/${configPrefix.startViewmanga}${item.idDetail}`}>
                                                    <a title={`${item.idDetail} | ${item.nameParent}`}>{item.idDetail}</a>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Image src={data.image} width="" height="" alt={data.nameSeo} title={data.name} classCss="lazy-wide loaded" />
        
                            </div>
                        </li>
                    )
                }
                if(data.id!=null && data.id!=undefined){
                    //console.log("data.documentDetail",data.documentDetail)
                    return (
                        <li className="segment-poster-sm" key={data.id}>
                            <div className="poster poster-xs">
                                {data.documentDetail&&  <span className="date">
                                    <span>{data.documentDetail.date}</span>
                                </span>}
                                <div className="poster-subject" data-tooltip="Malaise Creature: Awaken" data-inverted="">
                                    <h2 className="truncate">
                                        <Link href={`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${data.id}`}>
                                            <a title={data.name} >{data.name}</a>
                                        </Link>
                                    </h2>
                                    <ul className="chapters">
                                        {data.lsDocumentDetail && data.lsDocumentDetail.map((item) => (
                                             <li key={item.id}>
                                                <Link href={`${configPrefix.url_host}${configPrefix.pageViewManga}/${configPrefix.startManga}${data.id}/${configPrefix.startViewmanga}${item.id}`}>
                                                    <a title={`${item.name}`}>{item.nameSeo}</a>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Image src={data.image} width="" height="" alt={data.nameSeo} title={data.name} classCss="lazy-wide loaded" />
        
                            </div>
                        </li>
                    )
                }
            }
            
            )}
        </>
    )
}

export default ItemGrid_share_v2;