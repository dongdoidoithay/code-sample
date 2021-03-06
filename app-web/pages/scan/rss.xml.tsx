import React from "react";
import { NextPageContext } from "next";
import configPrefix from '../../config/configScanPrefix';
import axios from 'axios';
import  URL_DATA  from '../../config/indexscan';
import configSeting from "../../config/configScanSeting";

const blogPostsRssXml = (chapterlist) => {
  let rssItemsXml = "";
  chapterlist.forEach(item => {

    let rssItemsDetailXml = "";
    item.detail_documents.forEach(it => {
      rssItemsDetailXml+= `
      <category><![CDATA[${it.nameChapter}]]></category>
      `;
    })
    let rssItemsh2Xml = "";
    item.detail_documents.forEach(it => {
      rssItemsh2Xml+= `
      <h2><a href="${configPrefix.url_host}${configPrefix.pageViewManga}/${configPrefix.startManga}${it.idDoc}/${configPrefix.startViewmanga}${it.idDetail}">${it.nameChapter}</a></h2><br />
      `;
    })

    rssItemsXml += `
      <item>
        <title>${configSeting.info_name_manga.replace(/{name}/gi,item.name)}</title>
        <link>${configPrefix.url_host}${configPrefix.pageViewManga}/${configPrefix.startManga}${item.idDoc}</link>
        <guid isPermaLink="true">${configPrefix.url_host}${configPrefix.pageViewManga}/${configPrefix.startManga}${item.idDoc}</guid>
        <media:thumbnail url="${item.image}"/>
        <description>
          <![CDATA[
          <h1>${configSeting.info_name_manga_title.replace(/{name}/gi,item.name).replace(/{domain}/gi,configSeting.lbl_domain_name)}</h1><br />
          ${rssItemsh2Xml} <br />
          <p>${item.desc}</p> ]]>
          ${item.desc}
        </description>
        ${rssItemsDetailXml}
        <pubDate>${item.date}</pubDate>
    </item>`;
  });
  return {
    rssItemsXml
  };
};

const getRssXml = (listchapter) => {
  
  const { rssItemsXml } = blogPostsRssXml(listchapter);
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
        <title>Read Manga English Online ??? Read Manga at mangadragon.xyz</title>
        <link>https://mangadragon.xyz</link>
        <description>More complete and organized reader of stories and Free Online Mangas in EnglishSub. The largest collection of Mangas on the internet you can find here.</description>
        <atom:link href="https://mangadragon.xyz/rss.xml" rel="self" type="application/rss+xml"/>
        <language>${configSeting.lbl_lang}</language>
        <lastBuildDate>${Date.now()}</lastBuildDate>
        <sy:updatePeriod>hourly</sy:updatePeriod>
	      <sy:updateFrequency>1</sy:updateFrequency>
        <image>
            <url>https://mangadragon.xyz/image/bg.jpg</url>
            <title>Read Manga English Online ??? Read Manga at mangadragon.xyz</title>
            <link>https://mangadragon.xyz</link>
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
    let chapters = null;
    try {
      await axios.get(URL_DATA.MG_LAST_UPDATE+0).then(response => {
        chapters = response.data.data
      })

    } catch (ex) {
      //console.log("manga ---> getInitialProps:" + ex)
    }
  
    res.setHeader("Content-Type", "text/xml");
    res.write(getRssXml(chapters));
    res.end();
  }
  
export default Rss
