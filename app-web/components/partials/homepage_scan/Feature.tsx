import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import configPrefix from '../../../config/configScanPrefix';
import { useSelector } from 'react-redux';
import Image from '../../shared/Image'
import configSeting from '../../../config/configScanSeting';
import { BreadcrumbJsonLd } from 'next-seo';
import HomeFeatureLoading from '../../shared/Feature_loading';

const HomeFeature = () => {
    let _listmanga = useSelector((state:any) => state.home_scan.mangafeatures);
 
    const[listmanga,Setlistmanga]=useState(null);
    useEffect(()=>{
        Setlistmanga(_listmanga);
    })
   

   /* if (listmanga == null || listmanga == undefined) {
        return (<> <LoadingView /></>)
      }
   else*/
    return (
        <>
         

         {  listmanga&&  <BreadcrumbJsonLd
                itemListElements={
                    listmanga&& listmanga.map((item,indx) => (
                     { position: indx+1,
                       name: item.name,
                       item: `${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${item.idDoc}`,
                       }
                     ))
                  }
                />
                }
            <div className="section box  my-1 ">
                <div className="section-header">
                    <div className="title">
                        <h2>{configSeting.Lbl_Home_Hot}</h2>
                    </div>
                </div>
                <ul id="latest_trailers">
                {!listmanga && <HomeFeatureLoading/>}
                {listmanga && listmanga.map((data) => (

                            <li  key={data.idDoc}>
                                   <Link href={`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${data.idDoc}`}>
                                    <a title={data.name} >
                                        <div className="trailer_simg">
                                        <Image src={data.image} width="" height="" alt={data.nameSeo} title={data.name} classCss="lazy-wide loaded" />
                                        <span className="watch-now">HOT</span> 
                                        </div>
                                        <h6>{data.name}</h6>
                                    </a>
                            </Link>
                            </li>

                        ))}

                  
                </ul>

               
            </div>
        </>
    );
}
export default HomeFeature;
