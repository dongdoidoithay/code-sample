import axios from "axios"
import URL_DATA,{ACT_DETAIL,ACT_MG_LIST,} from "../../../config/indexscan"
import configSeting from "../../../config/configScanSeting"
import { getStorage, setStorage } from "../localFx"



export const getMangaInfo = (idmanga) => {
    return async dispatch => {
      let local_data = getStorage(configSeting.localmangaInfo+'-'+idmanga)
      if (local_data == null) {
        await axios.get(URL_DATA.MG_INFO+idmanga).then(response => {
          setStorage(configSeting.localmangaInfo+'-'+idmanga,JSON.stringify(response.data),24*60*60)
          dispatch({
            type: ACT_DETAIL.GET_INFO,
            data: response.data
          })
        })
      }else{
          dispatch({
            type: ACT_DETAIL.GET_INFO,
              data:JSON.parse(local_data)
          })
      }
    }
}
export const getMangaChapters =  (idmanga) => {
    return async dispatch => {
  
      let local_data = getStorage(configSeting.localmangaInfoChapter+'-'+idmanga)
      if (local_data == null) {
        await axios.get(URL_DATA.MG_INFO_CHAPTERS+idmanga).then(response => {
         setStorage(configSeting.localmangaInfoChapter+'-'+idmanga,JSON.stringify(response.data),30*60)
          dispatch({
            type: ACT_DETAIL.GET_CHAPTER,
            data: response.data
          })
        })
      }else{
          dispatch({
            type: ACT_DETAIL.GET_CHAPTER,
              data:JSON.parse(local_data)
          })
      }
    }
  }

  //view
  export const getMangaView =  (idslug) => {
    return async dispatch => {
     axios.get(URL_DATA.MG_VIEW_MANGA+idslug).then(response => {
        dispatch({
          type: ACT_DETAIL.GET_VIEW_DETAIL,
          data: response.data
        })
      })
    }
  }
  

  export const getListMangaByGenres =  (idgenres,page) =>  {
    return async dispatch => {
      if(page==undefined ||page==''|| page=="")
      page=1
     axios.get(URL_DATA.MG_LIST_MANGA_GENRES+idgenres+'/'+page).then(response => {
        dispatch({
          type: ACT_MG_LIST.GET_BY_GENRES,
          data: response.data
        })
      })
    }
  }
  
  export const getListMangaQuickSearch =  (keyword) =>  {
    return async dispatch => {
    console.log('key search =>>',keyword)
     axios.get(URL_DATA.MG_LIST_MANGA_SEARCH_ITEM+keyword).then(response => {
      console.log('key data =>>', response.data)
        dispatch({
          type: ACT_MG_LIST.GET_BY_QUICK_SEARCH,
          data: response.data
        })
      })
    }
  }
  
  export const getListMangaPageSearch =  (keyword,page) =>  {
    return async dispatch => {
      if(page==undefined ||page==''|| page=="")
      page=1
     axios.get(URL_DATA.MG_LIST_MANGA_SEARCH_PAGE+keyword+'/'+page).then(response => {
        dispatch({
          type: ACT_MG_LIST.GET_BY_FROM_SEARCH,
          data: response.data
        })
      })
    }
  }