import { promises as fs } from 'fs'
import path from 'path'
import configPrefix from '../../config/configRawPrefix';

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
   

    var targetFiles = filenames.filter(function (file) {
        return path.extname(file).toLowerCase() === ".xml";
    });

    let data_robot = targetFiles.map((page) => {
        return `Sitemap: ${configPrefix.url_host}/` + page
    });
    //console.log(data_robot)

    let str_item = `User-agent: *\n
Allow: /\n
Sitemap: ${configPrefix.url_host}/server-sitemap.xml\n\n`

    await fs.unlink(publicDirectory + "/robots.txt")
    await fs.writeFile(
        publicDirectory + "/robots.txt",
        str_item + data_robot.join('\n')
    )

    genIndexSite();
    res.status(200).json({ name: '==>done gensitemap index' })
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

    //console.log(xmlString);
    // Write the file to disk
    await fs.writeFile(
        publicDirectory + "/sitemap-index.xml",
        `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
        + xmlString +`</sitemapindex>`
    )
}