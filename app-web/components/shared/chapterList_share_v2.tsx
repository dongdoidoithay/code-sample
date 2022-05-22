
import getDate from '../../config/caldate';
import Link from 'next/link';
import parse from 'html-react-parser';
import LoadingView from "./loaddingView"
import { BreadcrumbJsonLd } from 'next-seo';
import { useState } from 'react';
import DisqusComments from './disquscomment';
import AdsDesktop from '../ads/ads_desktop';
import AdsMobile from '../ads/ads_mobile';
import AddKeep from '../ads/ads_keeper';

const ChapterList_share_v2 = ({ manga, chapters, configSeting, configPrefix }) => {
 // console.log("manga==>",manga);
  const [show, setshow] = useState(false)
  const handleClick = () => {
    setshow(true)
  }
  const ChapterNext = () => {
    if (chapters.length > 0) {
      let item = chapters[0];
      let id_1 = parseInt(item.idDetail) + 1;
      let id_2 = parseInt(item.idDetail) + 2;

      if (isNaN(parseInt(item.idDetail))) {
        id_1 = parseInt(item.nameSeo) + 1;
        id_2 = parseInt(item.nameSeo) + 2;
      }
      return (
        <>
          <div className="heading" >
            <div className="intro intro-next" ><strong>{configSeting.lbl_inf_chapters_next} </strong>
            </div>
          </div>
          <ul className="chapter-list-next mt-2">
            <li>
              <Link href={`${configPrefix.url_host}${configPrefix.pageViewManga}/${configPrefix.startManga}${item.idDoc}/${configPrefix.startViewmanga}${id_1}`}>
                <a className="ps-product--chapter" title={`${item.nameDoc} -${id_1}`}>
                  <div>
                    <strong className="chapter-title">{manga.name} <span className='chapter-update'>{configSeting.lbl_start_chapter}{id_1}</span> </strong>
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <Link href={`${configPrefix.url_host}${configPrefix.pageViewManga}/${configPrefix.startManga}${item.idDoc}/${configPrefix.startViewmanga}${id_2}`}>
                <a className="ps-product--chapter" title={`${item.nameDoc} -${id_2}`}>
                  <div><strong className="chapter-title">{manga.name} <span className='chapter-update'>{configSeting.lbl_start_chapter}{id_2}</span></strong>
                  </div>
                </a>
              </Link>
            </li>

          </ul>
        </>
      )
    }



  }
  const InfoManga = () => {
   
    if (manga.desc != null && manga.desc != '') {
      return (<>
        <div className="summary">
          <h4>{configSeting.lbl_inf_Summary}</h4>
          <div className="content">
            {manga.desc}</div>
        </div>
      </>)
    } else
      return (<></>)
  }
  //console.log("manga",manga)
  if (manga != null && chapters != null){
  let numchapter='';
  if(chapters.length > 0 && chapters[0].idDetail!=undefined){
    numchapter= chapters[0].idDetail;
  }
  if(chapters.length > 0 && chapters[0].idDetail==undefined){
    numchapter= chapters[0].name.replace('Capítulo #','');
  }
    return (<>
      {(chapters && chapters.length > 0) && <BreadcrumbJsonLd
        itemListElements={
          chapters.map((item, indx) => {
            if (item.idDetail != null && item.idDetail != undefined) {
              return (
                {
                  position: indx + 1,
                  name: item.name,
                  item: `${configPrefix.url_host}${configPrefix.pageViewManga}/${configPrefix.startManga}${item.idDoc}/${configPrefix.startViewmanga}${item.idDetail}`,
                }
              )

            }
            if (item.id != null && item.id != undefined) {
              return (
                {
                  position: indx + 1,
                  name: item.name,
                  item: `${configPrefix.url_host}${configPrefix.pageViewManga}/${configPrefix.startManga}${item.idDoc}/${configPrefix.startViewmanga}${item.id}`,
                }
              )

            }
          }
          )
        }
      />}
      <div className="col-md-9 mb-1 chapters-info">
      <AddKeep/>
      <AdsDesktop/>
        <div className="tab-content mt-4">
          <div id="chapters">
            <div className="heading">
              <div className="intro"><strong>{configSeting.lbl_inf_chapters} </strong>
              </div>
            </div>
            <div className="scroll-chapter">
              <ul className="chapter-list mt-2" id="chapter-list">
                {chapters && chapters.map((item, indx) => {
                  if (item.idDetail != null && item.idDetail != undefined) {
                    if (indx < 20) {
                      return (<li key={item.idDetail}>
                        <Link href={`${configPrefix.url_host}${configPrefix.pageViewManga}/${configPrefix.startManga}${item.idDoc}/${configPrefix.startViewmanga}${item.idDetail}`}>
                          <a className="ps-product--chapter" title={`${item.nameDoc} -${item.idDetail} |${getDate(item.date)}`}>
                            <i className="fa fa-caret-right" aria-hidden="true"></i>
                            <div><strong className="chapter-title">{configSeting.lbl_start_chapter}{item.idDetail}</strong><time className="chapter-update">{getDate(item.date)}</time></div>
                          </a>
                        </Link>
                      </li>
                      )
                    } else {
                      if (show) {
                        return (<li key={item.idDetail} >
                          <Link href={`${configPrefix.url_host}${configPrefix.pageViewManga}/${configPrefix.startManga}${item.idDoc}/${configPrefix.startViewmanga}${item.idDetail}`}>
                            <a className="ps-product--chapter" title={`${item.nameDoc} -${item.idDetail} |${getDate(item.date)}`}>
                              {/* <span className="chapter-no">{chapters.length- indx-1}</span> */}
                              <i className="fa fa-caret-right" aria-hidden="true"></i>
                              <div><strong className="chapter-title">{configSeting.lbl_start_chapter}{item.idDetail}</strong><time className="chapter-update">{getDate(item.date)}</time></div>
                            </a>
                          </Link>
                        </li>
                        )
                      }
                      else {
                        return (<li key={item.idDetail} style={{ "display": "none" }}>
                          <Link href={`${configPrefix.url_host}${configPrefix.pageViewManga}/${configPrefix.startManga}${item.idDoc}/${configPrefix.startViewmanga}${item.idDetail}`}>
                            <a className="ps-product--chapter" title={`${item.nameDoc} -${item.idDetail} |${getDate(item.date)}`}>
                              {/* <span className="chapter-no">{chapters.length- indx-1}</span> */}
                              <i className="fa fa-caret-right" aria-hidden="true"></i>
                              <div><strong className="chapter-title">{configSeting.lbl_start_chapter}{item.idDetail}</strong><time className="chapter-update">{getDate(item.date)}</time></div>
                            </a>
                          </Link>
                        </li>
                        )
                      }
                    }
                  }
                  if (item.id != null && item.id != undefined) {
                    if (indx < 20) {
                      return (<li key={item.id}>
                        <Link href={`${configPrefix.url_host}${configPrefix.pageViewManga}/${configPrefix.startManga}${manga.id}/${configPrefix.startViewmanga}${item.id}`}>
                          <a className="ps-product--chapter" title={`${item.nameDoc} -${item.id} |${item.date}`}>
                            <i className="fa fa-caret-right" aria-hidden="true"></i>
                            <div><strong className="chapter-title">{item.name.replace('Capítulo #',configSeting.lbl_start_chapter)}</strong><time className="chapter-update">{item.date}</time></div>
                          </a>
                        </Link>
                      </li>
                      )
                    } else {
                      if (show) {
                        return (<li key={item.id} >
                          <Link href={`${configPrefix.url_host}${configPrefix.pageViewManga}/${configPrefix.startManga}${manga.id}/${configPrefix.startViewmanga}${item.id}`}>
                            <a className="ps-product--chapter" title={`${item.nameDoc} -${item.id} |${item.date}`}>
                              {/* <span className="chapter-no">{chapters.length- indx-1}</span> */}
                              <i className="fa fa-caret-right" aria-hidden="true"></i>
                              <div><strong className="chapter-title">{item.name.replace('Capítulo #',configSeting.lbl_start_chapter)}</strong><time className="chapter-update">{item.date}</time></div>
                            </a>
                          </Link>
                        </li>
                        )
                      }
                      else {
                        return (<li key={item.id} style={{ "display": "none" }}>
                          <Link href={`${configPrefix.url_host}${configPrefix.pageViewManga}/${configPrefix.startManga}${manga.id}/${configPrefix.startViewmanga}${item.id}`}>
                            <a className="ps-product--chapter" title={`${item.nameDoc} -${item.id} |${item.date}`}>
                              {/* <span className="chapter-no">{chapters.length- indx-1}</span> */}
                              <i className="fa fa-caret-right" aria-hidden="true"></i>
                              <div><strong className="chapter-title">{item.name.replace('Capítulo #',configSeting.lbl_start_chapter)}</strong><time className="chapter-update">{item.date}</time></div>
                            </a>
                          </Link>
                        </li>
                        )
                      }
                    }
                  }

                }
                )

                }

              </ul>
              {chapters && chapters.length > 20 && !show &&
                <div className="heading">
                  <div className="intro" style={{ "textAlign": "center", "cursor": "pointer", "color": "red" }} onClick={() => handleClick()}>
                    <strong>{configSeting.lbl_inf_morechapter} </strong>
                  </div>
                </div>
              }
            </div>
            <div id="info">
              {ChapterNext()}
              {InfoManga()}
              
              <p className="description">
                {
                parse(configSeting.lbl_des_inf
                  .replace(/{name}/g, manga.name + ' ' + (manga.nameOther==undefined?manga.name_Other:''))
                  .replace(/{namechapter}/g, configSeting.lbl_text_chapter + ' ' + numchapter)
                  .replace(/{domain}/g, configSeting.lbl_domain_Page)
                  .replace(/{keyword}/g, configSeting.lbl_start_chapter + ' ' + numchapter)
                  .replace(/{numchapter}/g, numchapter)
                  .replace(/<div>/g, '<strong>')
                  .replace(/<\/div>/g, '</strong>')
                  .replace(/<br>/g, '<br/>')
                )}
              </p>
              <p className="description">
               {manga.tags}
              </p>
              {manga.idDoc &&<DisqusComments configSeting={configSeting} url={`${configPrefix.url_host}${configPrefix.pageViewManga}/${configPrefix.startManga}${manga.idDoc}`} id={manga.idDoc} title={manga.name} />
                }
              {manga.id &&<DisqusComments configSeting={configSeting} url={`${configPrefix.url_host}${configPrefix.pageViewManga}/${configPrefix.startManga}${manga.id}`} id={manga.id} title={manga.name} />
                }
            </div>

          </div>
        </div>
      </div>

    </>)
  }
  else
  return (<><LoadingView /></>);
}
export default ChapterList_share_v2;