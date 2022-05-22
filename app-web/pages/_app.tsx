
import App,{AppProps} from 'next/app';
import React, { Suspense, useEffect } from 'react';
import DefaultLayout from '../components/layouts/DefaultLayout';

import { Provider } from 'react-redux';
import { store } from "../redux/storeConfig/store"

import { DefaultSeo, SiteLinksSearchBoxJsonLd } from 'next-seo';
import { NextSeo } from 'next-seo';
// import your default seo configuration
import SEO from '../next-seo.config';
import NextNprogress from 'nextjs-progressbar';
import configSeting from '../config/configRawSeting';
import configPrefix from '../config/configRawPrefix';


function MangaApp({ Component, pageProps }: AppProps) {


  return (
    <Provider store={store}>
       <DefaultLayout >
                <NextSeo
                    robotsProps={{
                      nosnippet: true,
                      notranslate: true,
                      noimageindex: true,
                      noarchive: true,
                      maxSnippet: -1,
                      maxImagePreview: 'none',
                      maxVideoPreview: -1,
                    }} 
                    additionalMetaTags={[{
                      property: 'keywords',
                      content: configSeting.sb_seo_page_default_key
                    }]}
                    />
                  <DefaultSeo {...SEO} />
                  <SiteLinksSearchBoxJsonLd
                    url={configPrefix.url_host}
                    potentialActions={[
                      {
                        target: `${configPrefix.url_host}/search?q`,
                        queryInput: 'search_term_string',
                      }
                    ]}
                  />
                  <NextNprogress
                    color="#e61a05"
                    startPosition={0.3}
                    stopDelayMs={200}
                    height={3}
                    options={{ easing: 'ease', speed: 500 }}
                  />
                  <Component {...pageProps} />
              </DefaultLayout>
          </Provider>
  );
}

export default MangaApp
