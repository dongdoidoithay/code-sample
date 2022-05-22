import { useRouter } from "next/router";
import configPrefix from "../../../config/configRawPrefix";
import  URL_DATA  from "../../../config/indexraw";
import configSeting from "../../../config/configRawSeting";


import configScanPrefix from "../../../config/configScanPrefix";
import  URL_DATA_SCAN  from "../../../config/indexscan";
import configScanSeting from "../../../config/configScanSeting";


import ReactPaginate from 'react-paginate';
import axios from "axios";

import React from "react";
import { ArticleJsonLd, NextSeo } from "next-seo";
import HistoryManga from "../../../components/shared/history";
import GenresRight from "../../../components/partials/option/genresRight_scan";
import ItemGrid_share_v1 from "../../../components/shared/itemgrid";
import AZ from "../../../components/shared/az";
import TabTopDaily from "../../../components/partials/homepage_scan/tabTopDaily";
import Discord from "../../../components/shared/discord";
const StatusPage = ({ listbymanga,listbyscanmanga, currentPage, pageCount,idSelect,nameSelect }) => {

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
  return (
    <>
    <NextSeo
    title={`${configSeting.sb_seo_page_group_title
      .replace(/{domain}/g, configSeting.lbl_domain_name)
      .replace(/{groupname}/g,configSeting.lbl_alphabet)
      .replace(/{key}/g,nameSelect)
      .replace(/{page}/g,`${router.query.page}`)
      }`
    }
    description={`${configSeting.sb_seo_page_group_desc
      .replace(/{domain}/g, configSeting.lbl_domain_name)
      .replace(/{groupname}/g,configSeting.lbl_alphabet)
      .replace(/{key}/g, nameSelect)
      .replace(/{page}/g, `${router.query.page}`)}`
    }
    canonical={`${configPrefix.url_host}${router.asPath}`}
    openGraph={{
      url:`${configPrefix.url_host}${router.asPath}`,
      title: `${nameSelect}`,
        description: `${configSeting.sb_seo_page_group_desc
          .replace(/{domain}/g, configSeting.lbl_domain_name)
          .replace(/{groupname}/g,configSeting.lbl_alphabet)
          .replace(/{key}/g, nameSelect)
          .replace(/{page}/g, `${router.query.page}`)}`,
        site_name: `${configSeting.lbl_domain_Page}`,
      }
    }
    additionalMetaTags={[{
      property: 'keywords',
      content: configSeting.sb_seo_page_group_key
      .replace(/{domain}/g, configSeting.lbl_domain_name)
      .replace(/{groupname}/g,configSeting.lbl_alphabet)
      .replace(/{key}/g, nameSelect)
      .replace(/{page}/g, `${router.query.page}`)
    }]}
    additionalLinkTags={[{
      rel: "alternate",
      href: `${configPrefix.url_host}${configPrefix.pageAlphaBet}/${configPrefix.startAlphaBet}${router.query.id}/rss.xml`,         
      type: "application/rss+xml"
    },{
      rel: "preconnect",
      href: `${configPrefix.url_host}`
    },{
      rel: "preconnect",
      href: `${configPrefix.url_host}${configPrefix.pageAlphaBet}/${configPrefix.startAlphaBet}${router.query.id}`
    }
  ]}
  
  />
  <ArticleJsonLd
          url={`${configPrefix.url_host}${router.asPath}`}
          title={`${configSeting.sb_seo_page_group_title
            .replace(/{domain}/g, configSeting.lbl_domain_name)
            .replace(/{groupname}/g,configSeting.lbl_alphabet)
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
            .replace(/{groupname}/g,configSeting.lbl_alphabet)
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
             {/*  <div className="breadcrumbs-item">
                <a title="Home" href={`${configPrefix.url_host}${configPrefix.pageType}/${configPrefix.startType}${"all"}`}>{configSeting.lbl_all_type}<i className="fa fa-angle-right"></i></a>
              </div> */}
              <div className="breadcrumbs-item" style={{ "overflow": "hidden" }}><span>{nameSelect}</span></div>
            </div>
          </div>
          <div className='row mt-1 d-flex flex-wrap-reverse'>
          <h1 style={{"display":"none"}}>{nameSelect}</h1>
            <ItemGrid_share_v1 titlepage={nameSelect} listmanga={listbymanga} configPrefix={configPrefix} configSeting={configSeting} />

            <ItemGrid_share_v1 titlepage={nameSelect} listmanga={listbyscanmanga} configPrefix={configScanPrefix} configSeting={configScanSeting} />

            <div className='col-lg-3 container__right'>
              
              <HistoryManga />
              <TabTopDaily />
              <Discord />
              <GenresRight />
              <AZ configPrefix={configPrefix} configSeting={configSeting}/>
            </div>

          </div>
          <div className="container mt-1 d-flex">
            <div className="paginator" style={{ "display": "block", "textAlign": "center" }}>
              <ReactPaginate
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                previousLabel={"❮"}
                nextLabel={"❯"}
                breakLabel={"..."}
                initialPage={currentPage}
                pageCount={pageCount}
                onPageChange={pagginationHandler}
                containerClassName={"paginate-wrap"}
                subContainerClassName={"paginate-inner"}
                activeClassName={"active"}
              />

            </div>
          </div>
        </div>
      
      </div>

    </>)
}


export async function getServerSideProps(ctx) {
  
  let _fixid = '';
  let data = null;
  let data_scan=null;
  const page = ctx.query.page || 1;
  const id = ctx.query.id;

  if (id != null && id.length > 0) {
    _fixid = id.toString().replace(configPrefix.startAlphaBet, '');
  }

  data = await (await axios.get(URL_DATA.MG_LIST_MANGA_ALPHABET + _fixid + '/' + (page-1))).data;
  data_scan= await (await axios.get(URL_DATA_SCAN.MG_LIST_MANGA_ALPHABET + _fixid + '/' + (page-1))).data;


  let countpage =1;
  let totalRecode=0;
  let cout_raw= data.totalRecode / URL_DATA.ITEM_PAGE;
  let cout_scan= data_scan.totalRecode / URL_DATA_SCAN.ITEM_PAGE;

  countpage=cout_raw;
  totalRecode=data_scan.totalRecode;
  if (countpage < cout_scan)
  {
    countpage = cout_scan;
    totalRecode=data_scan.totalRecode;
  }

  if (countpage == 0)
    countpage = 1
  return {
    props: {
      //pagin
      totalCount: data.totalRecode,
      pageCount: countpage,
      currentPage: page-1,
      perPage: URL_DATA.ITEM_PAGE,
      listbymanga: data.data,
      idSelect:_fixid,
      nameSelect:_fixid,
      listbyscanmanga:data_scan.data
    }
  }
}
export default StatusPage
