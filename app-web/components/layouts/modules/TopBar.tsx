import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useDispatch} from "react-redux";
import configRawPrefix from '../../../config/configRawPrefix';
import configRawSeting from '../../../config/configRawSeting';
import configScanSeting from '../../../config/configScanSeting';
import configScanPrefix from '../../../config/configScanPrefix';
import configSeting from '../../../config/configSeting';
import Image from '../../shared/Image'
import axios from 'axios';
import URL_DATA_RAW  from '../../../config/indexraw';
import URL_DATA_SCAN  from '../../../config/indexscan';


import { getStorage, setStorage } from '../../../redux/actions/localFx';
//load data
const TopBar = () => {
    const dispatch = useDispatch()
    const toggleMobileMenu = () => {
        var menuShow = !1;
        menuShow = !menuShow;
        var e = document.getElementById("mobile-sidebar");
        menuShow ? e.classList.add("active") : e.classList.remove("active")
    }
    const[keyword,setKeyword]=useState('')
    //const[listmangasearch,setlistmangasearch]=useState([])
    const[listmangasearch_raw,setlistmangasearchRaw]=useState([])
    const[listmangasearch_scan,setlistmangasearchScan]=useState([])
    //const[listmangasearch_18,setlistmangasearch18]=useState([])
   // const[listmangasearch_br_18,setlistmangasearchbr18]=useState([])
  
    const FcApiSearch=(keysearch)=>
    {
        //RAW
        let local_raw = getStorage(configRawSeting.localQuickSearchPo+keysearch)
        if (local_raw == null) {
           // console.log("get genres api")
           axios.get(URL_DATA_RAW.MG_LIST_MANGA_SEARCH_ITEM+keysearch).then(response => {
            setlistmangasearchRaw(response.data);
            setStorage(configRawSeting.localQuickSearchPo+keysearch,JSON.stringify(response.data),24*60*60) //30 ngay
            })
        }else{
            setlistmangasearchRaw(JSON.parse(local_raw))
        } 
        //SCAN
        let local_scan = getStorage(configScanSeting.localQuickSearchPo+keysearch)
        if (local_scan == null) {
           // console.log("get genres api")
           axios.get(URL_DATA_SCAN.MG_LIST_MANGA_SEARCH_ITEM+keysearch).then(response => {
            setlistmangasearchScan(response.data);
            setStorage(configScanSeting.localQuickSearchPo+keysearch,JSON.stringify(response.data),30*24*60*60) //30 ngay
            })
        }else{
            setlistmangasearchScan(JSON.parse(local_scan))
        }
        //18+
        
       /*   let local_br_18 = getStorage(configSetingbr18.localQuickSearchPo+keysearch)
         if (local_br_18 == null) {
            // console.log("get genres api")
            axios.get(URL_DATA_BR_18.MG_LIST_MANGA_SEARCH_ITEM+keysearch).then(response => {
                setlistmangasearchbr18(response.data);
             setStorage(configSetingbr18.localQuickSearchPo+keysearch,JSON.stringify(response.data),30*24*60*60) //30 ngay
             })
         }else{
             setlistmangasearchbr18(JSON.parse(local_br_18))
         } */
    }
    const handleSearch=(e)=> {
       
        if (e.target.value !== ''&& e.target.value.trim().length>2) {
            setKeyword(e.target.value)
            FcApiSearch(e.target.value)
        } else {
            setlistmangasearchRaw([]);
            setlistmangasearchScan([]);
        }
    }
    const handleOutSearch=()=> {
        //console.log("handleOutSearch")
        setlistmangasearchRaw([]);
        setlistmangasearchScan([]);
    }
    const handleSubmit=(e)=> {
       // console.log("enter")
        e.preventDefault();
       Router.push(`/search?q=${keyword}`);
    }
    return (
        < >
            <div className="top-bar" onClick={handleOutSearch}>
                <div className="container">
                    <div className="d-flex align-items-center">
                        <a className="navbar-item logo" href="/index.html" title="HOME PAGE">
                            <div className="hub">
                                <span>{configSeting.lbl_Name_Page}</span>
                            </div>
                        </a>
                        <form id="search"  method="GET"  action="/search">
                            <div className="inner">
                                <input id="input-header-search" 
                                type="text" name="q" 
                                placeholder="search by manga ..." 
                                onChange={(e)=>handleSearch(e)} 
                                autoComplete={'off'}/>
                                
                                {((listmangasearch_raw && listmangasearch_raw.length > 0)||(listmangasearch_scan && listmangasearch_scan.length > 0))&&<div className="bt-act" onClick={()=>handleOutSearch}><i className="fa fa-times" aria-hidden="true"></i></div>}    
                                {listmangasearch_raw.length <=0 && listmangasearch_scan.length <=0&&<div className="bt-search" onClick={(e)=>handleSubmit(e)}><i className="fa fa-search" aria-hidden="true"></i></div>  }
                                
                            </div>
                            <div className="suggestions" id='autocomplete-list'>
                         {/*dc*/}
                            {listmangasearch_raw && listmangasearch_raw.length>0 &&<div className="novel__item-group">
                                <div className="novel__item-group-inner">
                                    <div className="novel__item-group-meta">
                                            <div className="name">
                                            <h3>Manga Raw:  {keyword}</h3>
                                            </div>
                                        </div>
                                </div>
                                </div>
                                }
                                {listmangasearch_raw && listmangasearch_raw.map(data=>(
                                    <div className="novel__item" key={data.id}>
                                    <div className="novel__item-inner">
                                        <div className="novel__item-icon">
                                        <Link href={`${configRawPrefix.url_host}${configRawPrefix.pageManga}/${configRawPrefix.startManga}${data.idDoc}`}>
                                            <a title={data.title} >
                                                <Image src={data.image} width="" height="" alt={data.name} title={data.name} classCss="" /></a>
                                        </Link>
                                        </div>
                                        <div className="novel__item-meta">
                                            <div className="name">
                                            <h3>
                                                <Link href={`${configRawPrefix.url_host}${configRawPrefix.pageManga}/${configRawPrefix.startManga}${data.idDoc}`}>
                                                    <a title={data.name} >{data.name}</a>
                                                </Link>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                ))
                                }


                                {/*end*/}
                                {listmangasearch_scan && listmangasearch_scan.length>0 &&<div className="novel__item-group">
                                <div className="novel__item-group-inner">
                                    <div className="novel__item-group-meta">
                                            <div className="name">
                                            <h3> Manga Scan:  {keyword}</h3>
                                            </div>
                                        </div>
                                </div>
                                </div>
                                }
                                {listmangasearch_scan && listmangasearch_scan.map(data=>(
                                    <div className="novel__item" key={data.id}>
                                    <div className="novel__item-inner">
                                        <div className="novel__item-icon">
                                        <Link href={`${configScanPrefix.url_host}${configScanPrefix.pageManga}/${configScanPrefix.startManga}${data.idDoc}`}>
                                            <a title={data.title} >
                                                <Image src={data.image} width="" height="" alt={data.name} title={data.name} classCss="" /></a>
                                        </Link>
                                        </div>
                                        <div className="novel__item-meta">
                                            <div className="name">
                                            <h3>
                                                <Link href={`${configScanPrefix.url_host}${configScanPrefix.pageManga}/${configScanPrefix.startManga}${data.idDoc}`}>
                                                    <a title={data.name} >{data.name}</a>
                                                </Link>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                ))
                                }
                                {/*end*/}

                                {(listmangasearch_scan.length>0 || listmangasearch_raw.length>0 )&& <a className="view-all" title="View all results" onClick={(e)=>handleSubmit(e)}>VIEW ALL</a>}
                            </div>
                        </form>
                    </div>
                    <div className="d-flex justify-content-center">
                       {/* <ul className="header__links-list">
                            <li className="header__links-item"><a title="Reading history" href="/history"><i className="fa fa-history"></i></a></li>
                        </ul>*/}
                        <ul className="m-bars">
                            <li className="header__links-item search"><a href="/search?q=_keyword_&page=1"><i className="fa fa-search"></i></a></li>
                            <li className="header__links-item hamburger">
                                <a onClick={() => toggleMobileMenu()}><i className="fa fa-bars"></i></a>
                            </li>
                          
                        </ul>
                    </div>
                </div>
            </div>
            {/* <script
        dangerouslySetInnerHTML={{
          __html: `
              document.addEventListener("DOMContentLoaded", function() 
              {
                window.addEventListener("click", function (e) {
                    console.log(e.target);
                   
                  });
              }); `,
        }}
      /> */}
        </>
    )
};


export default TopBar;