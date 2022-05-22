import { useRouter } from "next/router";
import configSeting from "../../config/configRawSeting";
import React, { useEffect, useState } from "react";
import { ArticleJsonLd, NextSeo } from "next-seo";
import { getStorage, setStorage } from "../../redux/actions/localFx";
import Link from "next/link";
import configPrefix from "../../config/configRawPrefix";
import Image from '../../components/shared/Image'

const History = () => {


  const [lsmanga, SetManga] = useState([]);
  useEffect(() => {
    let cookie_obj = JSON.parse(getStorage(configSeting.localReadViewPo));
    SetManga(cookie_obj);
  }, [])
  const removeItem = (idmanga) => {

    if (idmanga != null) {
      var list = lsmanga.filter(item => item.comicId !== idmanga);
      //console.log("delete==>", list)
      setStorage(configSeting.localReadViewPo, JSON.stringify(list), 30 * 24 * 60 * 60)
      // let cookie_obj = JSON.parse(getStorage(configSeting.localReadViewPo));
      SetManga(list);
    }
  }
  
  return (
    <>
      <NextSeo
        title={`${configSeting.sb_seo_page_group_title}`}
      />
      <div className="main-container">
        <div className="container">
          <div id="breadcrumbs-container">
            <div className="breadcrumbs-wrapper">
              <div className="breadcrumbs-item">
                <a title="Home" href="/">HOME
                  <i className="fa fa-angle-right"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="profile mt-1">
            <div className="row no-gutters md-no-gutters section box w-100">
              <div className="col-sm-3">
                {/*  ads */}
              </div>

              <div className="col-sm-9">
                <div className="section-header">
                  <div className="title">
                    <h2>READING HISTORY</h2>
                  </div>
                </div>
                <div id="reading-list" className="mt-2">

                  {lsmanga && lsmanga.length > 0 && lsmanga.map((item) => (
                    <div className="reading-item" key={item.comicId}>
                      <div className="inner">
                        <div className="icon">
                          <Link href={`${item.url_detail}`}>
                            <a title={`${item.namecomic}`} >
                              <Image src={item.image} width="" height="" alt={item.namecomic} title={item.namecomic} classCss="" />
                            </a>
                          </Link>
                        </div>
                        <div className="meta">
                          <div className="name">
                            <h3>
                              <Link href={`${item.url_detail}`}>
                                <a title={`${item.namecomic}`}>
                                  {`${item.namecomic}`}
                                </a>
                              </Link>
                            </h3>
                          </div>
                          <div className="info">
                            <Link href={`${item.url_view}`}>
                              <a title={`${item.namecomic}-${item.namechapter && item.namechapter}`}> <span className="version">{configSeting.lbl_start_chapter}{item.namechapter && item.namechapter}</span></a>
                            </Link>

                          </div>
                        </div>
                        <a className="remove-button" onClick={() => removeItem(item.comicId)} title="Remove">
                          <i className="fas fa-times"></i></a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}



export default History
