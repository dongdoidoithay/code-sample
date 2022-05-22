import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SelectChapter from './selectChapter_share_v2';
import parse from 'html-react-parser';
import { ArticleJsonLd, BreadcrumbJsonLd, NextSeo } from 'next-seo';
import Image from './Image'
import SelectImage from './selectImage';
import { getStorage, setStorage } from '../../redux/actions/localFx';
import DisqusComments from './disquscomment';
import AdsDesktop from '../ads/ads_desktop';
import AdsMobile from '../ads/ads_mobile';
import AddKeep from '../ads/ads_keeper';

const MangaView_share_V2 = ({ manga, chapters, mangaview, idchapter, configPrefix, configSeting }) => {


   if (mangaview != null) {
      let local_data = getStorage(configSeting.localReadViewPo)
      if ((local_data == null && mangaview.idDetail != null && mangaview.idDetail != undefined) || local_data == "null") {
        // console.log("local_data", local_data)
        var item_obj = {};
        item_obj[mangaview.idDoc] = mangaview.idDetail;
        item_obj["comicId"] = mangaview.idDoc;
        item_obj["chapterId"] = mangaview.idDetail;
        item_obj["namechapter"] = mangaview.idDetail;
        item_obj["namecomic"] = mangaview.nameDoc;
        item_obj["time"] = manga.date;
        item_obj["image"] = manga.image;
        item_obj["url_detail"] = `${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}`;
        item_obj["url_view"] = `${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}/${configPrefix.startViewmanga}${mangaview.idDetail}`;
        
        setStorage(configSeting.localReadViewPo, JSON.stringify([item_obj]), 30 * 24 * 60 * 60)
      } 
      else {
        var cookie_obj = JSON.parse(getStorage(configSeting.localReadViewPo));
        var exist = false;
        if (cookie_obj != null) {
          for (var i = 0; i < cookie_obj.length; i++) {
            var obj = cookie_obj[i];
            if (obj[mangaview.idDoc] && mangaview.idDetail != null && mangaview.idDetail != undefined) 
            {
              obj[mangaview.idDoc] = mangaview.idDetail;
              obj["comicId"] = mangaview.idDoc;
              obj["chapterId"] = mangaview.idDetail;
              obj["namechapter"] = mangaview.idDetail;
              obj["namecomic"] = mangaview.nameDoc;
              obj["time"] = manga.date;
              obj["image"] = manga.image;
              obj["url_detail"] = `${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}`;
              obj["url_view"] = `${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}/${configPrefix.startViewmanga}${mangaview.idDetail}`;
              
              exist = true;
              break;
            }
          }
        }
        else {
          var item_obj = {};
          if (mangaview.idDetail != null && mangaview.idDetail != undefined) {
            item_obj[mangaview.idDoc] = mangaview.idDetail;
            item_obj["comicId"] = mangaview.idDoc;
            item_obj["chapterId"] = mangaview.idDetail;
            item_obj["namechapter"] = mangaview.idDetail;
            item_obj["namecomic"] = mangaview.nameDoc;
            item_obj["time"] = manga.date;
            item_obj["image"] = manga.image;
            item_obj["url_detail"] = `${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}`;
            item_obj["url_view"] = `${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}/${configPrefix.startViewmanga}${mangaview.idDetail}`;
            
            setStorage(configSeting.localReadViewPo, JSON.stringify([item_obj]), 30 * 24 * 60 * 60)
            exist = true;
          }
        }
        if (!exist && mangaview.idDetail != null && mangaview.idDetail != undefined) {
          var item_obj = {};
          item_obj[mangaview.idDoc] = mangaview.idDetail;
          item_obj["comicId"] = mangaview.idDoc;
          item_obj["chapterId"] = mangaview.idDetail;
          item_obj["namechapter"] = mangaview.idDetail;
          item_obj["namecomic"] = mangaview.nameDoc;
          item_obj["time"] = manga.date;
          item_obj["image"] = manga.image;
          item_obj["url_detail"] = `${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}`;
          item_obj["url_view"] = `${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}/${configPrefix.startViewmanga}${mangaview.idDetail}`;
            
          cookie_obj.push(item_obj);
        }
  
        setStorage(configSeting.localReadViewPo, JSON.stringify(cookie_obj), 30 * 24 * 60 * 60)
      }
    }


   //let is_full = 'N';
   let is_next = '';
   let is_prev = '';

   const [is_full, SetIsfull] = useState("Y");
   const [CurrentImage, SetCurrentImage] = useState(0);
   const [ImageSelect, SetImageSelect] = useState('');
   const [listImg, SetlistImg] = useState([]);
   const [keycode, Setkeycode] = useState(0);

   //console.log("listImg-->",listImg);
   for (let i = 0; i < chapters.length; i++) {
      if( chapters[i].idDetail!=null &&  chapters[i].idDetail!=undefined)
      {
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
      if( chapters[i].id!=null &&  chapters[i].id!=undefined)
      {
         if (i == 0 && chapters[i].id == idchapter) {
            if (chapters.length > 1) {
               is_prev = chapters[i + 1].id;
            }
         }
         else {
            if (i < chapters.length - 1 && chapters[i].id == idchapter) {
               is_prev = chapters[i + 1].id;
            }
         }

         if (i == chapters.length - 1 && chapters[i].id == idchapter) {
            if (chapters.length > 1) {
               is_next = chapters[i - 1].id;
            }
         }
         else {
            if (i > 0 && chapters[i].id == idchapter) {
               is_next = chapters[i - 1].id;
            }
         }
      }
   }
   useEffect(() => {
      // Runs ONCE after initial rendering
      if (mangaview != null && mangaview.source!=null && mangaview.source!=undefined) {
         let imagelist = mangaview.source.split(',');
         SetlistImg(imagelist);
         if (listImg.length > 0) {
            let imageselected = listImg[0];
            SetImageSelect(imageselected);
         }
         // console.log('listImg', {listImg});
      }
      if (mangaview != null && mangaview.image!=null && mangaview.image!=undefined) {
         let imagelist = mangaview.image.split('#');
         SetlistImg(imagelist);
         if (listImg.length > 0) {
            let imageselected = listImg[0];
            SetImageSelect(imageselected);
         }
         // console.log('listImg', {listImg});
      }
      //doc localstore
      let _viewmode = getStorage("View-Mode-Option");
      if (_viewmode != '' && _viewmode != null && _viewmode != undefined)
         SetIsfull(_viewmode);
   }, []);

   useEffect(() => {
      // Runs ONCE after initial rendering
      // and after every rendering ONLY IF `prop` or `state` changes
      if (listImg.length > 0 && CurrentImage == 0) {
         if (listImg.length > 0) {
            let imageselected = listImg[0];
            SetImageSelect(imageselected);
            //console.log('imageselected', {imageselected});
         }
      }
   }, [ImageSelect]);
   useEffect(() => {
      // Runs ONCE after initial rendering
      // and after every rendering ONLY IF `prop` or `state` changes
      if (listImg.length > 0 && CurrentImage != 0) {
         let imageselected = listImg[CurrentImage];
         SetImageSelect(imageselected);
      }
     // console.log("change CurrentImage", { CurrentImage })
   }, [CurrentImage]);

   useEffect(() => {
      // every rendering 
      if (listImg.length > 0 && CurrentImage == 0 && ImageSelect == '') {

         let imageselected = listImg[0];
         SetImageSelect(imageselected);
         // console.log('imageselected', {imageselected});
      }
   });

   useEffect(() => {
      let _keycode = 0;
      /*window.addEventListener('keydown',  event => {
         _keycode=event.keyCode;
         console.log('event.keyCode',event.keyCode)

            if(_keycode == 39){
               //next image
               if(is_full == 'N')
               {
                  if((CurrentImage+1)<listImg.length-1)
                  {
                     SetImageSelect('');
                     SetCurrentImage(CurrentImage+1);
                     Setkeycode(0);
                  }else{
                     let count=listImg.length;
                     console.log("het image chuyen chapter truoc",{CurrentImage,count});
                     if(is_next!=''){
                     window.location.href = `${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}/${configPrefix.startViewmanga}${is_next}`;
                  }
               }
               }
            }
            if(_keycode == 37){
               //prev image
               if(is_full == 'N')
               {
                  if((CurrentImage-1)>=0)
                  {
                     SetImageSelect('');
                     SetCurrentImage(CurrentImage-1);
                     Setkeycode(0);
                  }else{
                     if(is_prev!=''){
                     window.location.href = `${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}/${configPrefix.startViewmanga}${is_prev}`;
                  }
               }
               }
            }
         
       });
       Setkeycode(_keycode);*/
   }, [keycode, CurrentImage, listImg])

   const next_pic = (e) => {
      if (e < listImg.length) {
         
         //window.location.href = "#" + (parseInt(e) + 1);
         let hash="#" + (parseInt(e) + 1);
         window.location.hash = hash;
         window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
         });
     /* window.scroll({
         top: 0,
         left: 0,
         behavior: 'smooth'
      }); */
   }
      if (e == listImg.length) {
         if (is_next != '')
            window.location.href = `${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}/${configPrefix.startViewmanga}${is_next}`;
         else
            console.log('het chap moi');
      }
   }
   const prev_img = () => {
      if ((CurrentImage - 1) >= 0) {
         SetImageSelect('');
         SetCurrentImage(CurrentImage - 1);
         window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
         });
      } else {
         if (is_prev != '') {
            SetlistImg([]);
            SetImageSelect('');
            SetCurrentImage(0);
            window.location.href = `${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}/${configPrefix.startViewmanga}${is_prev}`;
         }
         else
            console.log('chap cuoi');
      }
   }
   const next_img = () => {
      if ((CurrentImage + 1) < listImg.length) {
         SetImageSelect('');
         SetCurrentImage(CurrentImage + 1);
         window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
         });
      } else {
         if (is_next != '') {
            SetlistImg([]);
            SetImageSelect('');
            SetCurrentImage(0);
            window.location.href = `${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}/${configPrefix.startViewmanga}${is_next}`;
         }
         else
            console.log('het chap moi');
      }
   }

   const handlelnkClick = (e) => {
      window.location.href = e;
   }

   const handleScroll = () => {
      window.scroll({
         top: 0,
         left: 0,
         behavior: 'smooth'
      });
   }


   const loadOneImage = () => {

      if (is_full == "N" && ImageSelect != '') {

         return (
            <>
               <Image src={ImageSelect} alt={`${mangaview.nameDoc}-${CurrentImage}`} height="" width="" title={`${mangaview.nameDoc}-${CurrentImage}`} classCss="" />
               <a className="img_land_prev" onClick={() => prev_img()}></a>
               <a className="img_land_next" onClick={() => next_img()}></a>
               {<AdsDesktop/>}
            </>
         )
      }else{
         return(<><img src={`${configPrefix.url_host}/image/nextimage.png`} title={mangaview.nameDoc}/></>)
      }
   }
   const loadAllImage = () => {

      if (is_full == "Y" && listImg.length > 0) {
         return listImg.map((image, k) => {
           /* if (image != null && image != '')
               if(image.includes("https://img-host"))
                  image=image.replace(".jpg",".png").replace("/mangas_files","/images")+".webp";
               console.log("image -->",image);*/
               return (
                  <>
                  {(k==0)&&<AdsDesktop/>}
                  <a id={`${k + 1}`} onClick={() => next_pic(k + 1)} key={image}>
                     <Image src={image} alt={`${mangaview.nameDoc}-${k}`} height="" width="" title={`${mangaview.nameDoc}-${k}`} classCss="" />
                     <p className="mh_curr_page">{`${(k + 1)}/${listImg.length}`}</p>
                  </a>
                  {(k%5==0 && k!=listImg.length-1)&&<AdsDesktop/>}
                  {(k==(listImg.length-1))&&<AdsDesktop/>}
                  </>
               )
         })
      }
   }
   const handleChangeImage = (e) => {
      e.preventDefault();

      let _value = e.target.value;
      let _xvalue = parseInt(_value) - 1;
      // console.log("e--->", { e, _value })
      if (_xvalue < listImg.length) {
         // console.log("e--->_xvalue",{_xvalue})
         SetImageSelect('');
         SetCurrentImage(_xvalue);
      }
      window.scroll({
         top: 0,
         left: 0,
         behavior: 'smooth'
      });
   }
   const handleChangeViewImage = (e) => {
      e.preventDefault();
      let _value = e.target.value;
      SetIsfull(_value);
      setStorage("View-Mode-Option", _value, 30 * 24 * 60 * 60);
      if (_value == "N") {
         SetImageSelect(listImg[0]);
         SetCurrentImage(0);
      }
   }
   const handleShowImage = (index) => {
      if (index < listImg.length && index >= 0) {
        // console.log("e--->index", { index })
         SetImageSelect('');
         SetCurrentImage(index);
      }
      window.scroll({
         top: 0,
         left: 0,
         behavior: 'smooth'
      });
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
               <div className='d-flex'>
                  <li>
                     {_is_prev_img && <a style={{ "backgroundColor": "#ff5700" }} id="btn-prev" title="Previous chapter" className="main__button prev" onClick={() => handleShowImage(_value_prev)}>❮</a>}
                     {!_is_prev_img && parse('<a id="btn-prev" title="Previous chapter" class="main__button prev" disabled>❮</a>')}

                  </li>
                  <li id="image-in-list" className="chapter-list-wrapper">
                     <SelectImage listimage={listImg} currentimage={_img_select} onChange={(e) => handleChangeImage(e)} />

                  </li>

                  <li>
                     {_is_next_img && <a style={{ "backgroundColor": "#ff5700" }} id="btn-next" title="Next chapter" className="main__button next" onClick={() => handleShowImage(_value_next)}>❯</a>}
                     {!_is_next_img && parse('<a id="btn-next" title="Next chapter" class="main__button next" disabled>❯</a>')}
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
               <div className='d-flex hidden-sm'>
                  <li>
                     {_is_prev_img && <a style={{ "backgroundColor": "#ff5700 " }} id="btn-prev" title="Previous chapter" className="main__button x" onClick={() => handleShowImage(_value_prev)}>❮</a>}
                     {!_is_prev_img && parse('<a id="btn-prev" title="Previous chapter" class="main__button prev" disabled>❮</a>')}

                  </li>
                  <li id="image-in-list" className="chapter-list-wrapper">
                     <SelectImage listimage={listImg} currentimage={_img_select} onChange={(e) => handleChangeImage(e)} />

                  </li>

                  <li>
                     {_is_next_img && <a style={{ "backgroundColor": "#ff5700 " }} id="btn-next" title="Next chapter" className="main__button x" onClick={() => handleShowImage(_value_next)}>❯</a>}
                     {!_is_next_img && parse('<a id="btn-next" title="Next chapter" class="main__button next" disabled>❯</a>')}
                  </li>
               </div>
            </>
         )
      } else {
         return (<></>)
      }
   }
   const optionChapter = () => {
      let _hidden='';
      if (is_full == "N") {
         _hidden='hidden-sm';
      }
      
      return (<>
         <div className={`d-flex ${_hidden}`}>
            <li>
               {is_prev && <a id="btn-prev" title="Previous chapter" className="main__button prev" onClick={() => handlelnkClick(`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}/${configPrefix.startViewmanga}${is_prev}`)}>❮</a>}
               {!is_prev && parse('<a id="btn-prev" title="Previous chapter" class="main__button prev" disabled>❮</a>')}

            </li>
            <li id="chapter-list" className="chapter-list-wrapper">
               <SelectChapter listchapter={chapters} idDoc={mangaview.idDoc} currentChapter={idchapter} configPrefix={configPrefix} configSeting={configSeting} />
            </li>
            <li>
               {is_next && <a id="btn-next" title="Next chapter" className="main__button next" onClick={() => handlelnkClick(`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}/${configPrefix.startViewmanga}${is_next}`)}>❯</a>}
               {!is_next && parse('<a id="btn-next" title="Next chapter" class="main__button next" disabled>❯</a>')}
            </li>
         </div>
      </>)

   }
   const optionFootChapter = () => {
      let _hidden='';
      if (is_full == "N") {
         _hidden='hidden-ld';
      }

      return (<>
         <div className={`d-flex ${_hidden}`}>
            <li>
               {is_prev && <a id="btn-prev" title="Previous chapter" className="main__button prev" onClick={() => handlelnkClick(`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}/${configPrefix.startViewmanga}${is_prev}`)}>❮</a>}
               {!is_prev && parse('<a id="btn-prev" title="Previous chapter" class="main__button prev" disabled>❮</a>')}

            </li>
            <li id="chapter-list" className="chapter-list-wrapper">
               <SelectChapter listchapter={chapters} idDoc={mangaview.idDoc} currentChapter={idchapter} configPrefix={configPrefix} configSeting={configSeting} />
            </li>
            <li>
               {is_next && <a id="btn-next" title="Next chapter" className="main__button next" onClick={() => handlelnkClick(`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}/${configPrefix.startViewmanga}${is_next}`)}>❯</a>}
               {!is_next && parse('<a id="btn-next" title="Next chapter" class="main__button next" disabled>❯</a>')}
            </li>
         </div>
      </>)

   }
   //#region  Seo Tag
   let name_author='';
   let name_author_org='';
   let des_full='';
   let des_meta='';//250 ky tu
   let key_word='';
   let title='';
   let url_manga='';
   let url_manga_detail='';
   let chapter_name='';
   let manga_chapter='';
   let chapter_name_view='';
   if (manga != null){
       url_manga=`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}`;
       url_manga_detail=`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}/${configPrefix.startViewmanga}${mangaview.idDetail}`;
       if(manga.listAuthors &&manga.listAuthors.length>0 )
       {
           name_author=`(by ${manga.listAuthors[0].name})`;
           name_author_org=manga.listAuthors[0].name;
       }
       if(mangaview.idDetail!=null && mangaview.idDetail!=''){
         chapter_name=mangaview.idDetail;
         manga_chapter=manga.name+ ' '+ chapter_name;
         chapter_name_view=`${configSeting.lbl_start_chapter}${chapter_name}`;
       }
       else{
          if(chapters.length>0){
           chapter_name=chapters[0].idDetail;
           manga_chapter=manga.name+ ' '+ chapter_name;
           chapter_name_view=`${configSeting.lbl_start_chapter}${chapter_name}`;
       }
      }

       if(manga.desc!=null && manga.desc!=''){
           des_full=manga.desc.replace(/"/gi,'');
           des_meta=manga.desc.replace(/"/gi,'').substring(0,250)+'...';
       }
       else
       {
           des_full=configSeting.desc_info_manga.replace(/{name}/gi,manga.name).replace(/{nameOther}/g,manga.nameOther).replace(/{auth}/g,name_author).replace(/{domain}/g,configSeting.lbl_domain_name).replace(/{chapter}/g,chapter_name_view);
           des_meta=des_full;
       }
    
       key_word=configSeting.keyword_view_name_chapter.replace(/{name}/gi,manga.name).replace(/{nameOther}/g,manga.nameOther).replace(/{auth}/g,name_author).replace(/{domain}/g,configSeting.lbl_domain_name).replace(/{chapter}/g,chapter_name_view);
       title=configSeting.view_name_chapter_title.replace(/{name}/gi,manga.name).replace(/{nameOther}/g,manga.nameOther).replace(/{auth}/g,name_author).replace(/{domain}/g,configSeting.lbl_domain_name).replace(/{chapter}/g,chapter_name_view);
       des_meta=configSeting.desc_view_name_chapter.replace(/{name}/gi,manga.name).replace(/{nameOther}/g,manga.nameOther).replace(/{auth}/g,name_author).replace(/{domain}/g,configSeting.lbl_domain_name).replace(/{chapter}/g,chapter_name_view);
   }
   //#endregion

   return (<>
   <NextSeo
         title={title}
         additionalMetaTags={[{
          property: 'keywords',
          content: key_word
        }]}
        description={des_meta}
        openGraph={{
          title: title,
          description: des_meta,
          url: url_manga,
          type: 'article',
          article: {
            publishedTime: new Date().toISOString(),
            modifiedTime: new Date().toISOString(),
            expirationTime: new Date().toISOString(),
            section: "News",
            tags: [key_word],
          },
          images: [
            {
              url: manga.image,
              alt: title,
            },
          ],
        }
        }
        additionalLinkTags={[{
          rel: "alternate",
          href: `${url_manga_detail}/rss.xml`,         
          type: "application/rss+xml"
        },{
          rel: "preconnect",
          href: `${configPrefix.url_host}`
        },{
          rel: "preconnect",
          href: `${url_manga_detail}`
        }]}
      />
        <ArticleJsonLd
         url={url_manga_detail}
         title={title}
         images={[manga.image,]}
         datePublished={new Date().toISOString()}
         dateModified={new Date().toISOString()}
         authorName={manga.nameOther}
         publisherName={manga.nameOther}
         publisherLogo={manga.image}
         description={des_full}
       />

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
               {mangaview.idDoc &&
                  <div className="breadcrumbs-item">
                     <Link href={`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${mangaview.idDoc}`}>
                        <a title={mangaview.nameDoc} ><span>{mangaview.nameDoc}</span><i className="fa fa-angle-right"></i></a>
                     </Link>
                  </div>
               }
               <div className="breadcrumbs-item" style={{ "overflow": "hidden" }}>
                  <span>{mangaview.nameDoc} {configSeting.lbl_text_chapter}- {mangaview.idDetail}</span>
               </div>
            </div>
         </div>
      </div>
      <div className="viewer__container">
         <div className="viewer-header" id="viewer-header" style={{ "maxHeight": "66px" }}>
            <div className="container">
               <div className="d-flex align-items-center justify-content-center">
                  <ul className="chapter__actions d-flex justify-content-center">
                    
                     <li id="chapter-list-option" className="chapter-list-wrapper">
                        <select value={is_full} onChange={(e) => handleChangeViewImage(e)} className="select-chapter">
                           <option value="N" >View: 1 Image</option>
                           <option value="Y" >View: All Image</option>
                        </select>
                     </li>
                     {optionChapter()}
                     {optionMode()}
                     <li className='hidden-sm'>
                        <a className="main__button" title="Back top" onClick={() => handleScroll()}>
                           <i className="fa fa-arrow-up"></i>
                        </a>
                     </li>
                     <li >
                        <a style={{ "backgroundColor": "#2d4486" }} className="main__button" title="Back Manga" href={`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${mangaview.idDoc}`}>
                           <i className="fa fa-undo fb"></i>
                        </a>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="comic_wraCon text-center">
        
            {loadAllImage()}
            {loadOneImage()}
        
         <AddKeep/>
         </div>
         <div className="text-center  notice-box mt-2">
         {parse(configSeting.lbl_tip
                     .replace(/{name}/g, manga.name + ' ' + manga.nameOther)
                     .replace(/{namechapter}/g, configSeting.lbl_text_chapter + ' ' + (chapters.length > 0 && chapters[0].idDetail))
                  )}
            </div>

         <div className="container bottom-buttons mb-4">
            <div className="d-flex align-items-center justify-content-center">
               <ul className="chapter__actions d-flex justify-content-center">
               {optionFootChapter()}
               {optionFootMode()}
               </ul>
            </div>
         </div>
        
         <div className="chapter-info">
            <div id="info">
            
               <DisqusComments configSeting={configSeting} url={`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}/${configPrefix.startViewmanga}${mangaview.idDetail}`} id={`${manga.idDoc}-${mangaview.idDetail}`} title={title} />
           
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
                  {is_prev &&
                     <a style={{ "cursor": "pointer", "color": "red", "fontWeight": "bold" }} title={mangaview.nameDoc} onClick={() => handlelnkClick(`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}/${configPrefix.startViewmanga}${is_prev}`)}>{configSeting.lbl_prev_chapter}<i className="fa fa-angle-right"></i><span>{`${mangaview.nameDoc} Prev#${is_prev}`}</span></a>
                  }
                  <br />
                  {is_next &&
                     <a style={{ "cursor": "pointer", "color": "red", "fontWeight": "bold" }} title={mangaview.nameDoc} onClick={() => handlelnkClick(`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${manga.idDoc}/${configPrefix.startViewmanga}${is_next}`)}>{configSeting.lbl_next_chapter}<i className="fa fa-angle-right"></i><span>{`${mangaview.nameDoc} Next#${is_next}`}</span></a>
                  }
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
export default MangaView_share_V2;
