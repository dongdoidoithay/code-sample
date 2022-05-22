import { promises as fs } from 'fs'
import path from 'path'

import  URL_DATA_RAW  from '../../config/indexraw'
import configRawPrefix from '../../config/configRawPrefix';

import  URL_DATA_SCAN  from '../../config/indexscan'
import configScanPrefix from '../../config/configScanPrefix';

import configPrefix from '../../config/configPrefix';

export default async (req, res) => {
    //call api
   
    //console.log("root ==>", process.cwd())
    const publicDirectory = path.join(process.cwd(), 'public')
    //console.log("pub", publicDirectory)

    const filenames = await fs.readdir(publicDirectory)
    //console.log("filenames =>", filenames.join(";"))

    var targetFiles = filenames.filter(function (file) {
        return path.extname(file).toLowerCase() === ".xml";
    });
    //xoa All file sitemap.xml
    targetFiles.forEach(item => {
         //console.log("delete==>", publicDirectory + "/" + item)
       fs.unlink(publicDirectory + "/" + item)
    });


    let loop = true;
    let index = 1;
    let skip = 0;
    while (loop) {
        const list_manga = await fetch(URL_DATA_RAW.MG_SM_MANGA_GEN + skip + '/' + 4000);
       // console.log(list_manga);
        const data = await list_manga.json();
        if (data.length <= 0)
            {loop = false; break;}
        gendocfile(publicDirectory, data, index,configRawPrefix);
        skip = skip + 1;
        index++;
       
    }
    //console.log("index ==>", index)
    loop = true;
    skip = 0;
    while (loop) {
        const list_manga = await fetch(URL_DATA_RAW.MG_SM_DETAIL_GEN + skip + '/' + 4000);
        const data = await list_manga.json();
        if (data.length <= 0)
            {loop = false; break;}
       gendetailfile(publicDirectory, data, index,configRawPrefix);
        skip = skip + 1;
        index++;
      
    }
    //console.log("index ==>", index)
    loop = true;
    skip = 0;
    while (loop) {
        const list_manga = await fetch(URL_DATA_RAW.MG_SM_GENRES_GEN + skip + '/' + 4000);
        const data = await list_manga.json();
        if (data.length <= 0)
            {loop = false; break;}
       gengenresfile(publicDirectory, data, index,configRawPrefix);
        skip = skip + 1;
        index++;
    }
    //console.log("index ==>", index)
    
    //manga en
    loop = true;
    skip = 0;
    while (loop) {
        const list_manga = await fetch(URL_DATA_SCAN.MG_SM_MANGA_GEN + skip + '/' + 4000);
       // console.log(list_manga);
        const data = await list_manga.json();
        if (data.length <= 0)
            {loop = false; break;}
        gendocfile(publicDirectory, data, index,configScanPrefix);
        skip = skip + 1;
        index++;
       
    }
    //console.log("index ==>", index)
    loop = true;
    skip = 0;
    while (loop) {
        const list_manga = await fetch(URL_DATA_SCAN.MG_SM_DETAIL_GEN + skip + '/' + 4000);
        const data = await list_manga.json();
        if (data.length <= 0)
            {loop = false; break;}
       gendetailfile(publicDirectory, data, index,configScanPrefix);
        skip = skip + 1;
        index++;
      
    }
      //console.log("index ==>", index)
      loop = true;
      skip = 0;
      while (loop) {
          const list_manga = await fetch(URL_DATA_SCAN.MG_SM_GENRES_GEN + skip + '/' + 4000);
          const data = await list_manga.json();
          if (data.length <= 0)
              {loop = false; break;}
         gengenresfile(publicDirectory, data, index,configScanPrefix);
          skip = skip + 1;
          index++;
      }

    //manga 18 br
   

    genIndexSite();
    
    
    res.status(200).json({ name: '==>done ' })
}


async function gendocfile(path, data, index,configPrefix) {
    const xml = require('xml')
    const _date=new Date().toISOString();
    const xmlObject = {
        urlset: [
            {
                _attr: {
                    xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9"
                },
            },
            ...data.map((page) => {
                return {
                    url: [
                        { loc: `${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${page.idDoc}` },
                        { lastmod: _date },
                        { changefreq: 'hourly' },
                        { priority: 0.8 }
                    ]
                }
            })
        ]
    }
    // Generate the XML markup
    const xmlString = xml(xmlObject)
    // Write the file to disk
    await fs.writeFile(
        path + "/sitemap-index" + index + ".xml",
        `<?xml version="1.0" encoding="UTF-8"?>` + xmlString
    )
}

async function gendetailfile(path, data, index,configPrefix) {
    const xml = require('xml')
    const _date=new Date().toISOString();
    const xmlObject = {
        urlset: [
            {
                _attr: {
                    xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9"
                },
            },
            ...data.map((page) => {
                return {
                    url: [
                        { loc: `${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${page.idDoc}/${configPrefix.startViewmanga}${page.idDetail}` },
                        { lastmod: _date },
                        { changefreq: 'hourly' },
                        { priority: 0.8 }
                    ]
                }
            })
        ]
    }
    // Generate the XML markup
    const xmlString = xml(xmlObject)
    // Write the file to disk
    await fs.writeFile(
        path + "/sitemap-index" + index + ".xml",
        `<?xml version="1.0" encoding="UTF-8"?>` + xmlString
    )
}


async function gengenresfile(path, data, index,configPrefix) {
    const xml = require('xml')
    const _date=new Date().toISOString();
    const xmlObject = {
        urlset: [
            {
                _attr: {
                    xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9"
                },
            },
            ...data.map((page) => {
            return {
                url: [
                    { loc: `${configPrefix.url_host}${configPrefix.pageGenre}/${configPrefix.startGenre}${page.id}` },
                    { lastmod:_date },
                    { changefreq: 'hourly' },
                    { priority: 0.8 }
                ]
            }
        })
    ]
}
    // Generate the XML markup
    const xmlString = xml(xmlObject)
    // Write the file to disk
    await fs.writeFile(
        path + "/sitemap-index" + index + ".xml",
        `<?xml version="1.0" encoding="UTF-8"?>` + xmlString
    )
}


async function genauthofile(path, data, index,configPrefix) {
    const xml = require('xml')
    const _date=new Date().toISOString();
    const xmlObject =  {
        urlset: [
            {
                _attr: {
                    xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9"
                },
            },
            ...data.map((page) => {
            return {
                url: [
                    { loc: `${configPrefix.url_host}${configPrefix.pageAuth}/${configPrefix.startAuth}${page.id}` },
                    { lastmod: _date },
                    { changefreq: 'hourly' },
                    { priority: 0.8 }
                ]
            }
        })
    ]
}
    // Generate the XML markup
    const xmlString = xml(xmlObject)
    // Write the file to disk
    await fs.writeFile(
        path + "/sitemap-index" + index + ".xml",
        `<?xml version="1.0" encoding="UTF-8"?>` + xmlString
    )
}
async function genartfile(path, data, index,configPrefix) {
    const xml = require('xml')
    const _date=new Date().toISOString();
    const xmlObject =  {
        urlset: [
            {
                _attr: {
                    xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9"
                },
            },
            ...data.map((page) => {
            return {
                url: [
                    { loc: `${configPrefix.url_host}${configPrefix.pageArt}/${configPrefix.startArt}${page.id}` },
                    { lastmod: _date},
                    { changefreq: 'hourly' },
                    { priority: 0.8 }
                ]
            }
        })
    ]
}
    // Generate the XML markup
    const xmlString = xml(xmlObject)
    // Write the file to disk
    await fs.writeFile(
        path + "/sitemap-index" + index + ".xml",
        `<?xml version="1.0" encoding="UTF-8"?>` + xmlString
    )
}
async function genscanfile(path, data, index,configPrefix) {
    const xml = require('xml')
    const _date=new Date().toISOString();
    const xmlObject =  {
        urlset: [
            {
                _attr: {
                    xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9"
                },
            },
            ...data.map((page) => {
            return {
                url: [
                    { loc: `${configPrefix.url_host}${configPrefix.pageScan}/${configPrefix.startScan}${page.id}` },
                    { lastmod: _date },
                    { changefreq: 'hourly' },
                    { priority: 0.8 }
                ]
            }
        })
    ]
}
    // Generate the XML markup
    const xmlString = xml(xmlObject)
    // Write the file to disk
    await fs.writeFile(
        path + "/sitemap-index" + index + ".xml",
        `<?xml version="1.0" encoding="UTF-8"?>` + xmlString
    )
}
async function gentypefile(path, data, index,configPrefix) {
    const xml = require('xml')
    const _date=new Date().toISOString();
    const xmlObject =  {
        urlset: [
            {
                _attr: {
                    xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9"
                },
            },
            ...data.map((page) => {
            return {
                url: [
                    { loc: `${configPrefix.url_host}${configPrefix.pageType}/${configPrefix.startType}${page.id}` },
                    { lastmod: _date },
                    { changefreq: 'hourly' },
                    { priority: 0.8 }
                ]
            }
        })
    ]
}
    // Generate the XML markup
    const xmlString = xml(xmlObject)
    // Write the file to disk
    await fs.writeFile(
        path + "/sitemap-index" + index + ".xml",
        `<?xml version="1.0" encoding="UTF-8"?>` + xmlString
    )
}
async function genyearfile(path, data, index,configPrefix) {
    const xml = require('xml')
    const _date=new Date().toISOString();
    const xmlObject =  {
        urlset: [
            {
                _attr: {
                    xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9"
                },
            },
            ...data.map((page) => {
            return {
                url: [
                    { loc: `${configPrefix.url_host}${configPrefix.pageYear}/${configPrefix.startYear}${page.id}` },
                    { lastmod: _date },
                    { changefreq: 'hourly' },
                    { priority: 0.8 }
                ]
            }
        })
    ]
}
    // Generate the XML markup
    const xmlString = xml(xmlObject)
    // Write the file to disk
    await fs.writeFile(
        path + "/sitemap-index" + index + ".xml",
        `<?xml version="1.0" encoding="UTF-8"?>` + xmlString
    )
}

async function genIndexSite() {
    let xmlString='';
    
    const publicDirectory = path.join(process.cwd(), 'public')
    const filenames = await fs.readdir(publicDirectory)
   
    var targetFiles = filenames.filter(function (file) {
        return path.extname(file).toLowerCase() === ".xml";
    });

    targetFiles.map((page) => {
        xmlString+= `<sitemap><loc>${configPrefix.url_host}/${page}</loc></sitemap>`
    });


    let data_robot = targetFiles.map((page) => {
        return `Sitemap: ${configPrefix.url_host}/` + page
    });
   
    let str_item = `User-agent: *\n Allow: /\n`;
    str_item+=`Sitemap: ${configPrefix.url_host}/sitemap-index.xml \n`;
    try{
    await fs.unlink(publicDirectory + "/robots.txt")
    }catch(e){
        console.log(e);
    }
    await fs.writeFile(
        publicDirectory + "/robots.txt",
        str_item + data_robot.join('\n')
    )


    //console.log(xmlString);
    // Write the file to disk
    await fs.writeFile(
        publicDirectory + "/sitemap-index.xml",
        `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
        + xmlString +`</sitemapindex>`
    )
}