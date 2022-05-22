import { useRouter } from "next/router";
import configPrefix from "../config/configRawPrefix";
import ReactPaginate from 'react-paginate';
import axios from "axios";
import  URL_DATA_RAW  from "../config/indexraw";
import  URL_DATA_SCAN  from "../config/indexscan";
import configSeting from "../config/configRawSeting";

import React from "react";
import { ArticleJsonLd, NextSeo } from "next-seo";
import ItemGrid_share_v2 from "../components/shared/itemgrid_share_v2";
import configRawPrefix from "../config/configRawPrefix";
import configScanPrefix from "../config/configScanPrefix";

import TabScanTopDaily from '../components/partials/homepage_scan/tabTopDaily';
import TabRawTopDaily from '../components/partials/homepage_raw/tabTopDaily';

const SearchPageOut = ({ listbymangaRaw,listbymangaScan, currentPage, pageCount,idSelect,nameSelect }) => {

//console.log("listbymanga18",{listbymanga18})
//console.log("listbymangaEn",{listbymangaEn})
  const router = useRouter()
 
  const pagginationHandler = (page) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;
    currentQuery.page = page.selected + 1;

    router.push({
      pathname: currentPath,
      query: currentQuery,
    });

  };

  const SeachRaw=()=>{
    if(listbymangaRaw.length>0){
        return (
          <>
          <div className="section-header">
              <div className="title">
                  <h2>MANGA & RAW: {nameSelect}</h2>
              </div>
            </div>
            <div className="dark-segment section box">
                <ul className="clearfix latest-updates">
                <ItemGrid_share_v2 listmanga={listbymangaRaw} configPrefix={configRawPrefix} />
                </ul>
            </div>
          </>
        )
      }
  }
  const SeachScan=()=>{
    if(listbymangaScan&& listbymangaScan.length>0){
      return (
        <>
        <div className="section-header">
            <div className="title">
                <h2>MANGA & SCAN: {nameSelect}</h2>
            </div>
          </div>
          <div className="dark-segment section box">
              <ul className="clearfix latest-updates">
              <ItemGrid_share_v2 listmanga={listbymangaScan} configPrefix={configScanPrefix} />
              </ul>
          </div>
        </>
      )
    }
  }
 

  return (
    <>
    <NextSeo
      title={`${configSeting.sb_seo_page_group_title
        .replace(/{domain}/g, configSeting.lbl_domain_name)
        .replace(/{groupname}/g,'procurar ')
        .replace(/{key}/g,nameSelect)
        .replace(/{page}/g,`${router.query.page}`)
        }`
      }
      description={`${configSeting.sb_seo_page_group_desc
        .replace(/{domain}/g, configSeting.lbl_domain_name)
        .replace(/{groupname}/g,'procurar ')
        .replace(/{key}/g, nameSelect)
        .replace(/{page}/g, `${router.query.page}`)}`
      }
      canonical={`${router.query}`}
      openGraph={{
        url:`${router.query}`,
        title: `${nameSelect}`,
          description: `${configSeting.sb_seo_page_group_desc
            .replace(/{domain}/g, configSeting.lbl_domain_name)
            .replace(/{groupname}/g,'procurar ')
            .replace(/{key}/g, nameSelect)
            .replace(/{page}/g, `${router.query.page}`)}`,
          site_name: `${configSeting.lbl_domain_Page}`,
        }
      }
      additionalMetaTags={[{
        property: 'keywords',
        content: configSeting.sb_seo_page_group_key
        .replace(/{domain}/g, configSeting.lbl_domain_name)
        .replace(/{groupname}/g,'procurar ')
        .replace(/{key}/g, nameSelect)
        .replace(/{page}/g, `${router.query.page}`)
      }]}
    />
     <ArticleJsonLd
            url={`${router.query}`}
            title={`${configSeting.sb_seo_page_group_title
              .replace(/{domain}/g, configSeting.lbl_domain_name)
              .replace(/{groupname}/g,'procurar ')
              .replace(/{key}/g,nameSelect)
              .replace(/{page}/g,`${router.query.page}`)
              }`}
            images={[ configSeting.sb_seo_default_image,]}
            datePublished={ new Date().toISOString()}
            dateModified={ new Date().toISOString()}
            authorName={[nameSelect]}
            publisherName={nameSelect}
            publisherLogo={configSeting.sb_seo_default_image}
            description={`${configSeting.sb_seo_page_group_desc
              .replace(/{domain}/g, configSeting.lbl_domain_name)
              .replace(/{groupname}/g,'procurar ')
              .replace(/{key}/g, nameSelect)
              .replace(/{page}/g, `${router.query.page}`)}`
            }
            
          />
      <div className="main-container">
        <div className="container">
          <div id="breadcrumbs-container">
            <div className="breadcrumbs-wrapper">
              <div className="breadcrumbs-item">
                <a title="Home" href="/">{configSeting.lbl_page_home}<i className="fa fa-angle-right"></i></a>
              </div>
              <div className="breadcrumbs-item" style={{ "overflow": "hidden" }}><span>{nameSelect}</span></div>
            </div>
          </div>
          <div className="row no-gutters d-flex">
            <div className="col-lg-9">
              <div className="container__left">
                <div className="section box">
                  <div style={{ "padding": "20px" }}>
                    <div className="search-wrapper">
                      <form action="search" method="GET">
                        <div className="inner">
                          <input
                            type="text"
                            name="q"
                            className="term"
                            placeholder="Search here"
                            autoComplete={"off"}
                            autoCapitalize={"none"}
                          />
                          <button type="submit">
                            <i className="fa fa-search"></i>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {SeachRaw()}
                {SeachScan()}
               
                <div className="paginator" style={{ "display": "block", "textAlign": "center" }}>
                  <ReactPaginate
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    previousLabel={"❮"}
                    nextLabel={"❯"}
                    breakLabel={"..."}
                    initialPage={currentPage}
                    // disableInitialCallback={true}
                    pageCount={pageCount}
                    onPageChange={pagginationHandler}
                    containerClassName={"paginate-wrap"}
                    subContainerClassName={"paginate-inner"}
                    activeClassName={"active"}
                  />

                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="container__right">
              <TabRawTopDaily/>
             <TabScanTopDaily/>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>)
}
export async function getServerSideProps(ctx) {

  let data_raw = null;
  let data_scan = null;

  let keyword = ctx.query.q;
  const page = ctx.query.page || 1;
  if (keyword == null || keyword == '') {
    return {
      props: {
        //pagin
        totalCount: 0,
        pageCount: 0,
        currentPage: 0,
        perPage: 32,
        listbymanga: [],
        listbymangaEn: [],
        listbymanga18: []
      }
    }
  }
  if (keyword == "_keyword_") {
    keyword = "a";
  }
  data_raw = await (await axios.get(URL_DATA_RAW.MG_LIST_MANGA_SEARCH_PAGE + keyword + '/' + (page-1))).data;
  data_scan = await (await axios.get(URL_DATA_SCAN.MG_LIST_MANGA_SEARCH_PAGE + keyword + '/' + (page-1))).data;
 
  //data_br_18 = await (await axios.get(URL_DATA_BR_18.MG_LIST_MANGA_SEARCH_PAGE + keyword + '/' + (page-1))).data;
  if (data_raw == null && data_scan == null) {
    return {
      props: {
        //pagin
        totalCount: 0,
        pageCount: 0,
        currentPage: 0,
        perPage: 32,
        listbymangaRaw: [],
        listbymangaScan: []
      }
    }
  }


  let countpage =1;
  let totalRecode=0;
  let cout_raw= data_raw.totalRecode / 32;
  let cout_scan= data_scan.totalRecode / 32;

  countpage=cout_raw;
  totalRecode=data_raw.totalRecode;
  if (countpage < cout_scan)
  {
    countpage = cout_scan;
    totalRecode=data_scan.totalRecode;
  }

  
  if(countpage==0)
  countpage=1;

  return {
    props: {
       //pagin
       totalCount: totalRecode,
       pageCount: countpage,
       currentPage: page-1,
       perPage: 32,
       idSelect:data_scan.idSelect,
       nameSelect:data_scan.nameSelect,
       listbymangaRaw: data_raw.data,
       listbymangaScan: data_scan.data
    }
  }
}

export default SearchPageOut
