
import { NextSeo } from 'next-seo';
import React, { } from 'react';
import GenresRight from '../../components/partials/option/genresRight_raw';
import HistoryManga from '../../components/shared/history';
import configSeting from '../../config/configScanSeting';
import configPrefix from '../../config/configScanPrefix';
import { useRouter } from 'next/router';
import AZ from '../../components/shared/az';
import HomeFeatureOld from '../../components/partials/homepage_scan/Feature_old';
import HomeScanLastUpdateOld from '../../components/partials/homepage_scan/LastUpdate_old';
import TabTopDaily from '../../components/partials/homepage_scan/tabTopDaily';
import Discord from '../../components/shared/discord';

function Home() {
  const router = useRouter()
  return (
    <>
      <NextSeo
        title={`${configSeting.sb_seo_df_title}`}
        description={`${configSeting.sb_seo_page_default_desc}`}
        canonical={`${configPrefix.url_host}${router.asPath}`}
        openGraph={{
          url: `${configPrefix.url_host}${router.asPath}`,
          title: `${configSeting.sb_seo_df_title}`,
          description: `${configSeting.sb_seo_page_default_desc}`,
          site_name: `${configSeting.lbl_domain_Page}`,
          images: [{ url: `${configSeting.sb_seo_default_image}` }],
        }
        }
        additionalMetaTags={[{
          property: 'keywords',
          content: configSeting.sb_seo_page_default_key
        }]}
        additionalLinkTags={[{
          rel: "alternate",
          href: `${configPrefix.url_host}${router.asPath}/rss.xml`,
          type: "application/rss+xml"
        }, {
          rel: "preconnect",
          href: `${configPrefix.url_host}`
        }, {
          rel: "preconnect",
          href: `${configPrefix.url_host}${router.asPath}`
        }
        ]}
      />
      <h1 style={{ "display": "none" }}>{configSeting.sb_seo_df_title}</h1>
      <div className="main-container">
        <div className="container">
          <HomeFeatureOld />
          <div className='row mt-1 d-flex flex-wrap-reverse'>
            <HomeScanLastUpdateOld />
            <div className='col-lg-3 container__right'>
              <HistoryManga />
              <TabTopDaily />
              <Discord />
              <GenresRight />
              <AZ configPrefix={configPrefix} configSeting={configSeting} />
            </div>

          </div>
        </div>
      </div>
    </>

  )
}



export default Home

