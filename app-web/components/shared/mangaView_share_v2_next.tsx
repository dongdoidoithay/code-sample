import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SelectChapter from './selectChapter_share_v2';
import parse from 'html-react-parser';
import { BreadcrumbJsonLd } from 'next-seo';
import Image from './Image'
import SelectImage from './selectImage';
import { getStorage, setStorage } from '../../redux/actions/localFx';

const MangaView_share_V2_next = ({ manga, chapters, mangaview, idchapter, configPrefix, configSeting }) => {
   if(manga!=null && manga!=undefined && (manga.idDoc==null||manga.idDoc==undefined) ){
      manga.idDoc=manga.id;
  }
   //let is_full = 'N';
   let is_next = '';
   let is_prev = '';

   const [is_full, SetIsfull] = useState("N");
   const [CurrentImage, SetCurrentImage] = useState(0);
   const [ImageSelect, SetImageSelect] = useState('');
   const [listImg, SetlistImg] = useState([]);
   const [keycode, Setkeycode] = useState(0);

   for (let i = 0; i < chapters.length; i++) {
      if (i == 0 && chapters[i].idDetail == idchapter) {
         if (chapters.length > 1) {
            is_prev = chapters[i + 1].idDetail;
         }
      }
      else {
         if (i < chapters.length - 1 && chapters[i].idDetail == idchapter) {
            is_prev = chapters[i + 1].idDetail;
         }
      }

      if (i == chapters.length - 1 && chapters[i].idDetail == idchapter) {
         if (chapters.length > 1) {
            is_next = chapters[i - 1].idDetail;
         }
      }
      else {
         if (i > 0 && chapters[i].idDetail == idchapter) {
            is_next = chapters[i - 1].idDetail;
         }
      }
   }
   const optionMode = () => {
      if (is_full == "N") {
         let _value_next = CurrentImage + 1;
         let _value_prev = CurrentImage - 1;
         let _is_next_img = false;
         let _is_prev_img = false;
         if (CurrentImage < listImg.length - 1) {
            _is_next_img = true;
         }
         if (CurrentImage > 0) {
            _is_prev_img = true;
         }
         let _img_select = 1;
         if (CurrentImage != 0)
            _img_select = CurrentImage + 1;
         return (
            <>
               {
                  //console.log('CurrentImage-->',{CurrentImage})
               }
               <div className='hidden-sm d-flex'>
                  <li>
                     {parse('<a id="btn-prev" title="Previous chapter" class="main__button prev" disabled>❮</a>')}
                  </li>
                  <li id="image-in-list" className="chapter-list-wrapper">
                     <SelectImage listimage={listImg} currentimage={_img_select} onChange={(e) => {}} />
                  </li>
                  <li>
                     {parse('<a id="btn-next" title="Next chapter" class="main__button next" disabled>❯</a>')}
                  </li>
               </div>
            </>
         )
      } else {
         return (<></>)
      }
   }
   const optionFootMode = () => {
      if (is_full == "N") {
         let _value_next = CurrentImage + 1;
         let _value_prev = CurrentImage - 1;
         let _is_next_img = false;
         let _is_prev_img = false;
         if (CurrentImage < listImg.length - 1) {
            _is_next_img = true;
         }
         if (CurrentImage > 0) {
            _is_prev_img = true;
         }
         let _img_select = 1;
         if (CurrentImage != 0)
            _img_select = CurrentImage + 1;
         return (
            <>
               <div className='d-flex'>
                  <li>{ parse('<a id="btn-prev" title="Previous chapter" class="main__button prev" disabled>❮</a>')}

                  </li>
                  <li id="image-in-list" className="chapter-list-wrapper">
                     <SelectImage listimage={listImg} currentimage={_img_select} onChange={()=>{}} />

                  </li>

                  <li>
                     {parse('<a id="btn-next" title="Next chapter" class="main__button next" disabled>❯</a>')}
                  </li>
               </div>
            </>
         )
      } else {
         return (<></>)
      }
   }
   const optionChapter = () => {
      return (<>
         <div className='d-flex'>
            <li>{ parse('<a id="btn-prev" title="Previous chapter" class="main__button prev" disabled>❮</a>')}
            </li>
            <li id="chapter-list" className="chapter-list-wrapper">
               <SelectChapter listchapter={chapters} idDoc={mangaview.idDoc} currentChapter={idchapter} configPrefix={configPrefix} configSeting={configSeting} />
            </li>
            <li>
              {parse('<a id="btn-next" title="Next chapter" class="main__button next" disabled>❯</a>')}
            </li>
         </div>
      </>)

   }
   return (<>
      {chapters && <BreadcrumbJsonLd
         itemListElements={
            chapters && chapters.map((item, indx) => (
               {
                  position: indx + 1,
                  name: item.nameDoc + '- ' + item.idDetail,
                  item: `${configPrefix.url_host}${configPrefix.pageViewManga}/${configPrefix.startManga}${item.idDoc}/${configPrefix.startViewmanga}${item.idDetail}`,
               }
            ))
         }
      />}

      <div className="container">
         <div id="breadcrumbs-container">
            <div className="breadcrumbs-wrapper">
               <div className="breadcrumbs-item">
                  <a title="Home" href="/">{configSeting.lbl_page_home}<i className="fa fa-angle-right"></i></a></div>
               {manga.idDoc &&
                  <div className="breadcrumbs-item">
                     <Link href={`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}`}>
                        <a title={manga.nameDoc} ><span>{manga.nameDoc}{manga.name}</span><i className="fa fa-angle-right"></i></a>
                     </Link>
                  </div>
               }
               <div className="breadcrumbs-item" style={{ "overflow": "hidden" }}>
                  <span>{manga.nameDoc} {configSeting.lbl_text_chapter}- {mangaview.idDetail}</span>
               </div>
            </div>
         </div>
      </div>
      <div className="viewer__container">
         <div className="viewer-header" id="viewer-header" style={{ "maxHeight": "66px" }}>
            <div className="container">
               <div className="d-flex align-items-center justify-content-center">
                  <ul className="chapter__actions d-flex justify-content-center">
                     <li className='hidden-sm '>
                        <a style={{ "backgroundColor": "#2d4486" }} className="main__button" title="Back Manga" href={`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${mangaview.idDoc}`}>
                           <i className="fa fa-undo fb"></i>
                        </a>
                     </li>
                     <li id="chapter-list-option" className="chapter-list-wrapper">
                        <select value={is_full} onChange={(e) => {}} className="select-chapter">
                           <option value="N" >View: 1 Image</option>
                           <option value="Y" >View: All Image</option>
                        </select>
                     </li>
                     {optionChapter()}
                     {optionMode()}
                     <li>
                        <a className="main__button" title="Back top" onClick={() =>{}}>
                           <i className="fa fa-arrow-up"></i>
                        </a>
                     </li>

                  </ul>
               </div>
            </div>
         </div>
         <div className="comic_wraCon text-center">
         <div className="text-center  notice-box mt-2" style={{"backgroundColor":"#ffefe2"}}>
           <p>Sorry, <Link href={`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${mangaview.idDoc}`}>
                     <a style={{ "cursor": "pointer" }} title={mangaview.nameDoc} >{mangaview.nameDoc}</a>
                  </Link> {configSeting.lbl_text_chapter} {idchapter} is not available yet. We will update <strong>{mangaview.nameDoc} {configSeting.lbl_text_chapter} {idchapter}</strong> as soon as the chapter is released.</p>
           <p>Bookmark or save this link to read later.</p>
           <p>You can read the chapters already available at <Link href={`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${mangaview.idDoc}`}>
                     <a style={{ "cursor": "pointer" }} title={mangaview.nameDoc} >{mangaview.nameDoc}</a></Link>.Thanks!</p>
                    
         </div>
         <img src={`${configPrefix.url_host}/image/nextchap.png`} title={mangaview.nameDoc}/>
         </div>
         <div className="text-center  notice-box mt-2">{configSeting.lbl_tip}</div>
         <div className="container bottom-buttons mb-4">
            <div className="d-flex align-items-center justify-content-center">
               <ul className="chapter__actions d-flex justify-content-center">
                  {optionFootMode()}
               </ul>
            </div>
         </div>
         <div className="chapter-info">
            <div id="info">
               <p className="description">
                  {parse(configSeting.lbl_des_inf
                     .replace(/{name}/g, manga.name + ' ' + manga.nameOther)
                     .replace(/{namechapter}/g, configSeting.lbl_text_chapter + ' ' + (chapters.length > 0 && chapters[0].idDetail))
                     .replace(/{domain}/g, configSeting.lbl_domain_Page)
                     .replace(/{keyword}/g, configSeting.lbl_start_chapter + ' ' + (chapters.length > 0 && chapters[0].idDetail))
                     .replace(/{numchapter}/g, (chapters.length > 0 && chapters[0].idDetail))
                     .replace(/<div>/g, '<strong>')
                     .replace(/<\/div>/g, '</strong>')
                     .replace(/<br>/g, '<br/>')
                  )}
               </p>
            </div>
            <div id="info">
               <div className="description">
                  <h1 className="hidden-sm">
                     {mangaview.nameDoc}  {configSeting.lbl_start_chapter}{mangaview.idDetail}
                  </h1>
                  <Link href={`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${mangaview.idDoc}`}>
                     <a style={{ "cursor": "pointer" }} title={mangaview.nameDoc} ><i className="fa fa-angle-right"></i><span>{mangaview.nameDoc}</span></a>
                  </Link>
                  <br />
                 
               </div>
            </div>
         </div>
      </div>
      {/**
      <div className="modal fade " id="exampleModalCenteredScrollable" tabIndex={-1} aria-labelledby="exampleModalCenteredScrollableTitle" style={{"display": "block;"}} aria-modal="true" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
         <div className="modal-content">
         <div className="modal-header">
            <h5 className="modal-title" id="exampleModalCenteredScrollableTitle"></h5>
         </div>
         <div className="modal-body">
            <p>This is some placeholder content to show a vertically centered modal. We've added some extra copy here to show how vertically centering the modal works when combined with scrollable modals. We also use some repeated line breaks to quickly extend the height of the content, thereby triggering the scrolling. When content becomes longer than the prefedined max-height of modal, content will be cropped and scrollable within the modal.</p>
            
            <p>Just like that.</p>
         </div>
         <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
         </div>
         </div>
      </div>
   </div>
    */}
   </>)
}
export default MangaView_share_V2_next;
