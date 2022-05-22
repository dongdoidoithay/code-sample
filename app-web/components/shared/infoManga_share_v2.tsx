import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from './Image'
import LoadingView from './loaddingView';
import { getStorage } from '../../redux/actions/localFx';
import { ArticleJsonLd, BreadcrumbJsonLd, NextSeo } from 'next-seo';
import getDate from '../../config/caldate';
import AddKeep from '../ads/ads_keeper';
import AdsDesktop from '../ads/ads_desktop';

const InfoManga_share_v2 = ({ manga, chapters,configSeting,configPrefix }) => {
   // console.log("manga=>",manga)
    let histNamechap='';
    let histIdchap='';
    if(manga!=null && manga!=undefined && (manga.idDoc==null||manga.idDoc==undefined) ){
        manga.idDoc=manga.id;
    }

   // console.log("manga-->",manga);
    var cookie_obj = JSON.parse(getStorage(configSeting.localReadViewPo));
    if (cookie_obj != null) {
      for (var i = 0; i < cookie_obj.length; i++) {
        var obj = cookie_obj[i];
        if (obj["comicId"] == manga.idDoc) {
          histIdchap=obj["chapterId"] ;
          histNamechap= obj["namechapter"];
          break;
        }
      }
    }
    let name_author='';
    let name_author_org='no-auth';
    let des_full='';
    let des_meta='';//250 ky tu
    let key_word='';
    let title='';
    let manga_name='';
    let url='';
    let chapter_name='';
    let manga_chapter='';
    let chapter_name_view='';
    if (manga != null){
        url=`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}`;
        if(manga.listAuthors &&manga.listAuthors.length>0 )
        {
            name_author=`(by ${manga.listAuthors[0].name})`;
            name_author_org=manga.listAuthors[0].name;
        }
        if(chapters.length>0){
            chapter_name=chapters[0].idDetail;
            manga_chapter=manga.name+ ' '+ chapter_name;
            chapter_name_view=`${configSeting.lbl_start_chapter}${chapter_name}`;
        }

        if(manga.desc!=null && manga.desc!=''){
            des_full=manga.desc.replace(/"/gi,'');
            des_meta=manga.desc.replace(/"/gi,'').substring(0,250)+'...';
        }
        else
        {
            des_full=configSeting.desc_info_manga.replace(/{name}/gi,manga.name).replace(/{nameOther}/g,manga.nameOther).replace(/{auth}/g,name_author).replace(/{domain}/g,configSeting.lbl_domain_name).replace(/{chapter}/g,chapter_name_view);
            des_meta=des_full;
        }
     
        key_word=configSeting.keyword_info_manga.replace(/{name}/gi,manga.name).replace(/{nameOther}/g,manga.nameOther).replace(/{auth}/g,name_author).replace(/{domain}/g,configSeting.lbl_domain_name).replace(/{chapter}/g,chapter_name_view)+manga.tags;
        title=configSeting.info_name_manga_title.replace(/{name}/gi,manga.name).replace(/{nameOther}/g,manga.nameOther).replace(/{auth}/g,name_author).replace(/{domain}/g,configSeting.lbl_domain_name).replace(/{chapter}/g,chapter_name_view);
        manga_name=configSeting.info_name_manga.replace(/{name}/gi,manga.name).replace(/{nameOther}/g,manga.nameOther).replace(/{auth}/g,name_author).replace(/{domain}/g,configSeting.lbl_domain_name).replace(/{chapter}/g,chapter_name_view);
        
    }
    //let lnkurl=configPrefix.url_host+configPrefix.pageManga+"/"+configPrefix.startManga+manga.id;
    return (<>

     <NextSeo
            title={title}
            description={des_meta}
            canonical={url}
            
            openGraph={{
                title:title,
                description: des_full,
                url:  url,
                type: 'article',
                article: {
                publishedTime: new Date().toISOString(),
                modifiedTime:new Date().toISOString(),
                expirationTime:  new Date().toISOString(),
                section: "News",
                authors: [
                    manga.listAuthors && manga.listAuthors.map((auth) => {
                        return (
                            `${configPrefix.url_host}${configPrefix.pageAuth}/${configPrefix.startAuth}${auth.id}`
                        )
                    }
                    )
                ],
                tags: [
                    key_word
                    ],
                },
                images: [
                {
                    url: manga.image,
                    alt:manga.name,
                },
                ],
            }
        }
           
        additionalMetaTags={[{
            property: 'keywords',
            content:key_word
          }]}

          additionalLinkTags={[{
            rel: "alternate",
            href: `${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}/rss.xml`,         
            type: "application/rss+xml"
          },{
            rel: "preconnect",
            href: `${configPrefix.url_host}`
          },{
            rel: "preconnect",
            href: url
          }]}
         />
        <BreadcrumbJsonLd
            itemListElements={[
                {
                position: 1,
                name: configSeting.lbl_page_home,
                item: configPrefix.url_host,
                },
                {
                position: 2,
                name:title,
                item: url,
                }
            ]}
            />
         <ArticleJsonLd
            url={url}
            title={title}
            images={[manga.image,
            ]}
            datePublished={ new Date().toISOString()}
            dateModified={ new Date().toISOString()}
            authorName={[name_author_org]}
            publisherName={name_author_org}
            publisherLogo={manga.image}
            description={des_full}
            />
        <div className="novel-header">
            <div className="container header-body">
            
                <div className="fixed-img">
                    <figure className="cover">
                        <Image src={manga.image} width="" height="" alt={manga.name} title={manga.name} classCss="" />
                    </figure>
                </div>
                <div className="novel-info">
                    <div className="main-head">
                        <h1 className="novel-title text2row">{manga_name}</h1>
                        <div className="author"><span>{configSeting.lbl_inf_NameOther} :</span>
                            <strong>{manga.nameOther}</strong>
                        </div>
                            {manga.lsauths && manga.lsauths.length > 0 &&
                                <div className="author"><span>{configSeting.lbl_inf_Auth}:</span>
                                    {manga.lsauths.map((auth) => {
                                        return (
                                            <Link href={`${configPrefix.url_host}${configPrefix.pageAuth}/${configPrefix.startAuth}${auth.id}`} key={auth.id}>
                                                <a className="property-item" title={auth.name}>  <span>{auth.name.replace('<div>', '').replace('</div>', '')}</span></a>
                                            </Link>
                                        )
                                    }
                                    )}
                                </div>
                            }

                            {(manga.lstypes &&manga.lsarts.length>0)&&
                                <div className="author"><span>{configSeting.lbl_inf_Type}:</span>
                                    {manga.lstypes.map((item) => {
                                        return (
                                            <Link href={`${configPrefix.url_host}${configPrefix.pageType}/${configPrefix.startType}${item.id}`} key={item.id}>
                                                <a className="property-item" title={item.name}><span>{item.name.replace('<div>', '').replace('</div>', '')}</span>, </a>
                                            </Link>
                                        )
                                    }
                                    )}
                                </div>
                            }
                            {(manga.lsarts && manga.lsarts.length>0)&&
                                <div className="author"><span>{configSeting.lbl_inf_Art}:</span>
                                    {manga.lsarts.map((item) => {
                                        return (
                                            <Link href={`${configPrefix.url_host}${configPrefix.pageArt}/${configPrefix.startArt}${item.id}`} key={item.id}>
                                                <a className="property-item" title={item.name}><span>{item.name}</span>, </a>
                                            </Link>
                                        )
                                    }
                                    )}
                                </div>
                            }
                             {(manga.lsscans &&manga.lsscans.length>0) &&
                                <div className="author"><span>{configSeting.lbl_inf_Scan}:</span>
                                    {manga.lsscans.map((item) => {
                                        return (
                                            <Link href={`${configPrefix.url_host}${configPrefix.pageScan}/${configPrefix.startScan}${item.id}`} key={item.id}>
                                                <a className="property-item" title={item.name}><span>{item.name}</span>, </a>
                                            </Link>
                                        )
                                    }
                                    )}
                                </div>
                            }
                        </div>
                        <nav className="actions">
                           {(chapters && chapters.length>0)&&
                            <Link href={`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${chapters[chapters.length-1].idDoc}/${configPrefix.startViewmanga}${chapters[chapters.length-1].idDetail}`}>
                                <a className="property-item" title={`${configSeting.lbl_read} ${chapters[chapters.length-1].name}`}>{configSeting.lbl_inf_start_read}</a>
                            </Link>
                            }
                            {(histIdchap && histNamechap) &&
                             <Link href={`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${chapters[chapters.length-1].idDoc}/${configPrefix.startViewmanga}${histIdchap}`}>
                                <a className="property-item" title={`${configSeting.lbl_read} ${histNamechap}`}>{`${configSeting.lbl_inf_continew}:${histNamechap}`}</a>
                            </Link>
                            }
                        </nav>
                        <div className="header-stats hidden-sm">
                            <span className="hidden-sm">
                                <strong>
                                    <i className="fa fa-eye"></i> {manga.view}
                                </strong>
                                <small>{configSeting.lbl_inf_View}</small>
                            </span>
                            <span>
                                <strong className="ongoing">
                                   {manga.year &&<Link href={`${configPrefix.url_host}${configPrefix.pageYear}/${configPrefix.startYear}${manga.year!=null?manga.year.replace(',',''):'n-a'}`} >
                                        <a title={manga.year}>{manga.year!=null?manga.year.replace(',',''):'n-a'}</a>
                                    </Link>}
                                </strong><small>{configSeting.lbl_inf_Year}</small>
                            </span>
                            <span>
                                <strong className="ongoing">
                                  
                                    {manga.lsstatus && manga.lsstatus.map((item) => (
                                        <Link href={`${configPrefix.url_host}${configPrefix.pageStatus}/${configPrefix.startStatus}${item.id}`} key={item.id}>
                                            <a title={item.name}>{item.name&&item.name}</a>
                                        </Link>
                                    ))}
                                </strong><small>{configSeting.lbl_inf_status}</small>
                            </span>
                        </div>
                        <div className="updinfo"><span>{configSeting.lbl_inf_date}</span>
                            <strong>{getDate(manga.date)}</strong>
                        </div>
                        {(manga.lsgenres && manga.lsgenres.length > 0 )&&
                            <div className="categories">
                                <strong> {configSeting.lbl_inf_Genres}:</strong>
                                <ul>
                                    {manga.lsgenres.map((genre) => {
                                        return (
                                            <li key={genre.id}>
                                                <Link href={`${configPrefix.url_host}${configPrefix.pageGenre}/${configPrefix.startGenre}${genre.id}`} >
                                                    <a className="property-item" title={genre.name}>{genre.name}</a>
                                                </Link>
                                            </li>
                                        )
                                    }
                                    )}
                                </ul>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </>)
    return (<><LoadingView /></>);
}
export default InfoManga_share_v2;
