import React from "react";
import { NextPageContext } from "next";
import configPrefix from '../../../config/configScanPrefix';
import axios from 'axios';
import  URL_DATA  from '../../../config/indexscan';
import configSeting from "../../../config/configScanSeting";

const blogPostsRssXml = (manga,chapterlist) => {
  let rssItemsXml = "";
  let rssItemsGenresXml = "";
  let rssitemAuth="";
  let rssitemAuthXml="";
  if(manga.detail_documents!=null)
   { manga.detail_documents.forEach(item => {
      if(item.name!="")
      rssitemAuth += `${item.name}, `;
    });
    if(rssitemAuth!=""){
      rssitemAuthXml=`<dc:creator><![CDATA[${rssitemAuth}]]></dc:creator>`;
    }
  }
  if(manga.lsgenres!=null)
      manga.lsgenres.forEach(item => {
        if(item.name!="")
        rssItemsGenresXml += `
        <category><![CDATA[${item.name}]]></category>
        `;
      });
  chapterlist.forEach(item => {
    rssItemsXml += `
      <item>
        <title>${configSeting.info_name_manga.replace(/{name}/gi,item.name)}</title>
        <link>${configPrefix.url_host}${configPrefix.pageViewManga}/${configPrefix.startManga}${item.idDoc}/${configPrefix.startViewmanga}${item.idDetail}</link>
        <guid isPermaLink="true">${configPrefix.url_host}${configPrefix.pageViewManga}/${configPrefix.startManga}${item.idDoc}/${configPrefix.startViewmanga}${item.idDetail}</guid>
        <description>
          <![CDATA[<h1>${configSeting.info_name_manga.replace(/{name}/gi,item.name)}</h1><br /> <h2> ${item.nameDoc} ${configSeting.lbl_text_chapter} ${item.idDetail}</h2> <a href="${configPrefix.url_host}${configPrefix.pageViewManga}/${configPrefix.startManga}${item.idDoc}/${configPrefix.startViewmanga}${item.idDetail}" /><br /> ]]>
          ${item.nameDoc} ${configSeting.lbl_text_chapter} ${item.idDetail}
        </description>
        ${rssitemAuthXml}
        ${rssItemsGenresXml}
        <pubDate>${item.date}</pubDate>
    </item>`;
  });
  return {
    rssItemsXml
  };
};

const getRssXml = (manga,listchapter) => {
    var name_author='';
    if(manga.listAuthors &&manga.listAuthors.length>0 )
    {
        name_author=manga.listAuthors[0].name;
    }
  const { rssItemsXml } = blogPostsRssXml(manga,listchapter);
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
        <title>${configSeting.info_name_manga.replace(/{name}/gi,manga.name)}</title>
        <link>${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}</link>
        <description>${configSeting.desc_info_manga.replace(/{name}/gi,manga.name).replace(/{nameOther}/g,manga.name_Other).replace(/{auth}/g,name_author).replace(/{domain}/g,configSeting.lbl_domain_Page)}</description>
        <atom:link href="${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}/rss.xml" rel="self" type="application/rss+xml"/>
        <language>${configSeting.lbl_lang}</language>
        <lastBuildDate>${manga.date}</lastBuildDate>
        <sy:updatePeriod>hourly</sy:updatePeriod>
	      <sy:updateFrequency>1</sy:updateFrequency>
        <image>
            <url>${manga.image}</url>
            <title>${configSeting.info_name_manga.replace(/{name}/gi,manga.name)}</title>
            <link>${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}</link>
            <width>144</width>
            <height>144</height>
        </image>

        ${rssItemsXml}
    </channel>
  </rss>`;
};

function Rss() {
    return <div>Next rss</div>
  }
  
  Rss.getInitialProps = async ({query, res }: NextPageContext ) => {
    let _fixid = '';
    let manga = null;
    let chapters = null;
    const idmanga = query.idmanga;
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
  
    res.setHeader("Content-Type", "text/xml");
    res.write(getRssXml(manga,chapters));
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