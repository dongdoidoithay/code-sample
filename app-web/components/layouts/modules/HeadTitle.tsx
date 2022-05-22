import React from 'react';
import Head from 'next/head';

const StyleSheets = () => (
    <Head>
        <link rel="shortcut icon" href="/static/favicon.png" />
        <link rel="icon" href="/static/favicon.png" sizes="32x32" />
        <link rel="icon" href="/static/favicon.png" sizes="192x192" />
        <link rel="apple-touch-icon-precomposed" href="/static/favicon.png" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        
        <link
            rel="stylesheet"
            href="/global.min.css"
        />
         
       <link rel="stylesheet" 
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" 
            integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" 
            crossOrigin={"anonymous"} />
      
    
    </Head>
);

export default StyleSheets;
