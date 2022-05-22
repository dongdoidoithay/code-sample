import React, { useState, useEffect } from 'react';

import axios from 'axios';
import  URL_DATA  from '../../../../config/indexraw';
import configPrefix from '../../../../config/configRawPrefix';
import LoadingView from '../../../../components/shared/loaddingView';
import configSeting from '../../../../config/configRawSeting';
import Head from 'next/head';
import MangaView_share_V2 from '../../../../components/shared/mangaView_share_v2';
import MangaView_share_V2_next from '../../../../components/shared/mangaView_share_v2_next';


const ViewManga = ({ manga, chapters,mangaview ,_fixid}) => {
  
  const [isload, setIsload] = useState(false)

  //#region  scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  })
  const handleScroll = () => {

    let number =
      window.pageXOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (document.getElementById('viewer-header') != undefined) {
      if (number >= 100) {
        document
          .getElementById('viewer-header')
          .classList.add('scroll-down');
      } else {
        document
          .getElementById('viewer-header')
          .classList.remove('scroll-down');
      }
    }
  }
  //#endregion


  if (mangaview != null && mangaview != undefined && mangaview.idDetail != _fixid) {
    mangaview = null;
  }
  if(manga==null || manga==''||manga==undefined){
    return (<><LoadingView/></>)
  }
  //console.log("mangaview==>", mangaview)
  if (mangaview == null || mangaview == undefined|| mangaview == '') {
    mangaview={idDetail:_fixid,nameDoc:manga.name,idDoc:manga.idDoc};
    return (<>  <MangaView_share_V2_next chapters={chapters} manga={manga} mangaview={mangaview} idchapter={_fixid} configPrefix={configPrefix} configSeting={configSeting} />
      </>)
  }
  else
    return (
      <>
        <Head> <link rel="stylesheet" href="/chapter.css" /></Head>
        <div className="main-container viewer each-page">
          <div className='chapter-content-inner text-center image-auto'>
            <MangaView_share_V2 chapters={chapters} manga={manga} mangaview={mangaview} idchapter={_fixid} configPrefix={configPrefix} configSeting={configSeting} />
          </div>
        </div>
      </>
    )
}
export async function getServerSideProps(ctx) {

  let _fixid = '';
  let _fixiddetail = '';
  let manga = null;
  let chapters = null;
  let view = null;
  const idmanga = ctx.query.idmanga;
  const iddetail = ctx.query.iddetail;
  try {
    if (idmanga != null && idmanga.length > 0) {
      _fixid = idmanga.toString().replace(configPrefix.startManga, '');
    }
    if (iddetail != null && iddetail.length > 0) {
      _fixiddetail = iddetail.toString().replace(configPrefix.startViewmanga, '');
    }
    await axios.get(URL_DATA.MG_INFO + _fixid).then(response => {
      manga = response.data
    })
    await axios.get(URL_DATA.MG_INFO_CHAPTERS + _fixid).then(response => {
      chapters = response.data
    })
    await axios.get(URL_DATA.MG_VIEW_MANGA + _fixid+"/"+_fixiddetail).then(response => {
      view = response.data
    })
  } catch (ex) {
    //console.log("manga ---> getInitialProps:" + ex)
  }
  //console.log("manga",manga);
  //console.log("chapter",chapters);
  return {
    props: {
      //pagin
      manga: manga,
      chapters: chapters,
      mangaview:view,
      _fixid:_fixiddetail
    }
  }
}
export default ViewManga