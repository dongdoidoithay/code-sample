import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import URL_DATA from '../../config/indexraw'
import configPrefix from '../../config/configRawPrefix'
import URL_DATA_SCAN from '../../config/indexscan'
import configScanPrefix from '../../config/configScanPrefix'


export const getServerSideProps = async (ctx) => {
  // Method to source urls from cms
  const urls = await fetch(URL_DATA.MG_SM_MANGA + 200)
  // console.log(urls)
  const data = await urls.json()
  let fields = data.map((item) => ({
    loc: `${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${item.idDoc}`, // Absolute url
    lastmod: new Date().toISOString(),
    changefreq: 'always',
    priority: 1
  }))
  //en
  const urls_scan = await fetch(URL_DATA_SCAN.MG_SM_MANGA + 200)
  const data_scan = await urls_scan.json()
  let fields_scan = data_scan.map((item) => ({
    loc: `${configScanPrefix.url_host}${configScanPrefix.pageManga}/${configScanPrefix.startManga}${item.idDoc}`, // Absolute url
    lastmod: new Date().toISOString(),
    changefreq: 'always',
    priority: 1
  }))
 
  //18 br

  if (fields == null)
    fields = [];
  let field_merger = fields.concat(fields_scan);


  return getServerSideSitemap(ctx, field_merger)
}

// Default export to prevent next.js errors
export default () => { }