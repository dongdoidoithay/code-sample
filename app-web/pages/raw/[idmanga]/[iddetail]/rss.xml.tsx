import React from "react";
import { NextPageContext } from "next";
import configPrefix from '../../../../config/configRawPrefix';
import axios from 'axios';
import  URL_DATA  from '../../../../config/indexraw';
import configSeting from "../../../../config/configRawSeting";
import parse from 'html-react-parser';

const blogPostsRssXml = (manga,views) => {
  let rssItemsXml = "";
  let rssItemsGenresXml = "";
  let rssitemAuthXml="";
  let rssitemAuth="";
  manga.lsauths.forEach(item => {
    if(item.name!="")
    rssitemAuth += `${item.name}, `;
  });
  if(rssitemAuth!=""){
    rssitemAuthXml=` <dc:creator><![CDATA[${rssitemAuth}]]></dc:creator>`;
  }
  manga.lsgenres.forEach(item => {
    if(item.name!="")
    rssItemsGenresXml += `
    <category><![CDATA[${item.name}]]></category>
    `;
  });
  let _indx=0;
  let listchapter=views.source.split(',');
  listchapter.forEach(item => {
    rssItemsXml += `
      <item>
        <title>${views.nameDoc} ${configSeting.lbl_text_chapter}-${views.idDetail}</title>
        <link>${configPrefix.url_host}${configPrefix.pageViewManga}/${configPrefix.startManga}${views.idDoc}/${configPrefix.startViewmanga}${views.idDetail}</link>
        <guid isPermaLink="true">${configPrefix.url_host}${configPrefix.pageViewManga}/${configPrefix.startManga}${views.idDoc}/${configPrefix.startViewmanga}${views.idDetail}#${_indx}</guid>
        <media:thumbnail url="${item}"/>
        <description>
          <![CDATA[ <img src="${item}#${_indx}" /><br /> <a href="${configPrefix.url_host}${configPrefix.pageViewManga}/${configPrefix.startManga}${views.idDoc}/${configPrefix.startViewmanga}${views.idDetail}#${_indx}">${views.nameDoc} ${configSeting.lbl_text_chapter}-${views.idDetail}#${_indx}</a>
          ]]>
          ${views.nameDoc} ${configSeting.lbl_text_chapter}#${views.idDetail}
        </description>
        ${rssitemAuthXml}
        ${rssItemsGenresXml}
        <pubDate>${manga.date}</pubDate>
    </item>`;
    _indx++;
  });
  return {
    rssItemsXml
  };
};

const getRssXml = (manga,views) => {
    var name_author='';
    if(manga.listAuthors &&manga.listAuthors.length>0 )
    {
        name_author=manga.listAuthors[0].name;
    }
    
    const { rssItemsXml } = blogPostsRssXml(manga,views);
    return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:wfw="http://wellformedweb.org/CommentAPI/"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
    xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
    xmlns:media="http://search.yahoo.com/mrss/"
    >
      <channel>
          <title>${configSeting.view_name_chapter_title.replace(/{name}/gi, manga.name).replace(/{chapter}/gi, views.idDetail).replace(/{domain}/gi, configSeting.lbl_domain_name)}</title>
          <link>${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}/${configPrefix.startViewmanga}${views.idDetail}</link>
          <description>${configSeting.desc_view_name_chapter.replace(/{name}/gi, manga.name).replace(/{chapter}/gi, views.idDetail).replace(/{domain}/gi, configSeting.lbl_domain_name)}</description>
          <atom:link href="${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}/${configPrefix.startViewmanga}${views.idDetail}/rss.xml" rel="self" type="application/rss+xml"/>
          <language>${configSeting.lbl_lang}</language>
          <lastBuildDate>${manga.date}</lastBuildDate>
          <sy:updatePeriod>hourly</sy:updatePeriod>
          <sy:updateFrequency>1</sy:updateFrequency>
          <image>
              <url>${manga.image}</url>
              <title>${configSeting.view_name_chapter_title.replace(/{name}/gi, manga.name).replace(/{chapter}/gi, views.idDetail).replace(/{domain}/gi, configSeting.lbl_domain_name)}</title>
              <link>${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}/${configPrefix.startViewmanga}${views.idDetail}</link>
              <width>144</width>
              <height>144</height>
          </image>

          ${rssItemsXml}
      </channel>
    </rss>`;
};

function Rss({data}) {
  return <div>Next rss</div>
  }
  
  Rss.getInitialProps = async ({query, res } ) => {
    let _fixid = '';
    let _fixiddetail = '';
    let manga = null;
    let chapters = null;
    let view = null;
    const idmanga = query.idmanga;
    const iddetail = query.iddetail;
    try {
      if (idmanga != null && idmanga.length > 0) {
        _fixid = idmanga.toString().replace(configPrefix.startManga, '');
      }
      if (iddetail != null && iddetail.length > 0) {
        _fixiddetail = iddetail.toString().replace(configPrefix.startViewmanga, '');
      }
      //console.log("_fixid==>",_fixid);
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
  
    res.setHeader("Content-Type", "text/xml");
    res.write(getRssXml(manga,view));
    res.end(); 
  }
  
export default Rss

/* export async function getInitialProps(ctx) {

    let _fixid = '';
  let manga = null;
  let chapters = null;
  const idmanga = ctx.query.idmanga;
  try {
    if (idmanga != null && idmanga.length > 0) {
      _fixid = idmanga.toString().replace(configPrefix.startManga, '');
    }
    //console.log("_fixid==>",_fixid);
    await axios.get(URL_DATA.MG_INFO + _fixid).then(response => {
      manga = response.data
    })

    await axios.get(URL_DATA.MG_INFO_CHAPTERS + _fixid).then(response => {
      chapters = response.data
    })
  } catch (ex) {
    //console.log("manga ---> getInitialProps:" + ex)
  }

    ctx.setHeader("Content-Type", "text/xml");
    ctx.write(getRssXml(manga,chapters));
    ctx.end();
  } */

/* 
export default class Rss extends React.Component {
  static async getInitialProps({ ctx }) {
    if (!ctx) {
      return;
    }
    let _fixid = '';
  let manga = null;
  let chapters = null;
  const idmanga = ctx.query.idmanga;
  try {
    if (idmanga != null && idmanga.length > 0) {
      _fixid = idmanga.toString().replace(configPrefix.startManga, '');
    }
    //console.log("_fixid==>",_fixid);
    await axios.get(URL_DATA.MG_INFO + _fixid).then(response => {
      manga = response.data
    })

    await axios.get(URL_DATA.MG_INFO_CHAPTERS + _fixid).then(response => {
      chapters = response.data
    })
  } catch (ex) {
    //console.log("manga ---> getInitialProps:" + ex)
  }

    ctx.setHeader("Content-Type", "text/xml");
    ctx.write(getRssXml(manga,chapters));
    ctx.end();
  }
} */