import React, {  } from 'react';

import configPrefix from '../../../config/configRawPrefix';
import configSeting from '../../../config/configRawSeting';
import axios from 'axios';
import  URL_DATA  from '../../../config/indexraw';
import GenresRight from '../../../components/partials/option/genresRight_raw';
import InfoManga_share_v2 from '../../../components/shared/infoManga_share_v2';
import ChapterList_share_v2 from '../../../components/shared/chapterList_share_v2';
import TabTopDaily from '../../../components/partials/homepage_raw/tabTopDaily';
import Discord from '../../../components/shared/discord';

const DetailManga = ({ manga, chapters }) => {

  return (
    <>
     <div className="main-container details">
        <div className="details-inner">
        <InfoManga_share_v2 manga={manga} chapters={chapters} configPrefix={configPrefix} configSeting={configSeting} />
          <div className="container">
            <div className="row novel-body">
            <ChapterList_share_v2 manga={manga} chapters={chapters} configPrefix={configPrefix} configSeting={configSeting} /> 
              <div className="col-md-3">
              <TabTopDaily />
              <Discord />
              <GenresRight />
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}




export async function getServerSideProps(ctx) {

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
  //console.log("manga",manga);
  //console.log("chapter",chapters);
  return {
    props: {
      //pagin
      manga: manga,
      chapters: chapters
    }
  }
}


// export async function getStaticPaths() {
//   // Call an external API endpoint to get posts
//   const res = await fetch(URL_DATA.MG_SM_MANGA+14000)
//   const data = await res.json()
//  console.log("data SM",data)
//   // Get the paths we want to pre-render based on posts
//   const paths = data.map((item) => ({
//     params: { idmanga: item },
//   }))

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false }
// } 

export default DetailManga