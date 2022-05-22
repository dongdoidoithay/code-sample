import axios from "axios"
import URL_DATA,{ACT_HOME,} from "../../../config/indexscan"
import configSeting from "../../../config/configScanSeting"
import { getStorage, setStorage } from "../localFx"


  export const getMangaHomeFeatures = () => {
    return async dispatch => {
      let localmgFeatures = getStorage(configSeting.localmangaFeatures)
      if (localmgFeatures == null) {
        await axios.get(URL_DATA.MG_FEATURES).then(response => {
          if(response.data.length>0){
          setStorage(configSeting.localmangaFeatures,JSON.stringify(response.data),1*60*60)
          dispatch({
            type: ACT_HOME.GET_FEATURES,
            data: response.data
          })
        }
        })
      }else{
          dispatch({
              type: ACT_HOME.GET_FEATURES,
              data:JSON.parse(localmgFeatures)
          })
      }
    }
  }  
  export const getMangaHomeLastUpdate = (page) => {
     
    return async dispatch => {
      let local_data = getStorage(configSeting.localmangaLastUpdate+'-'+page)
      if (local_data == null) {
        //console.log("getMangaHomeLastUpdate UL: ",URL_DATA.MG_LAST_UPDATE+page)
        await axios.get(URL_DATA.MG_LAST_UPDATE+page).then(response => {
          console.log("getMangaHomeLastUpdate En: ",response.data.data)
            if(response.data.data.length>0){
            setStorage(configSeting.localmangaLastUpdate+'-'+page,JSON.stringify(response.data.data),30*60)
              dispatch({
                type: ACT_HOME.GET_LAST_UPDATE,
                data: response.data.data
              })
            }
        })
      }else{
          dispatch({
              type: ACT_HOME.GET_LAST_UPDATE,
              data:JSON.parse(local_data)
          })
      }
    }
  }
  export const getMangaHomeTopView = () => {
    return async dispatch => {
      let local_data = getStorage(configSeting.localmangaTopView)
      if (local_data == null) {
        await axios.get(URL_DATA.MG_TOP_VIEW).then(response => {
          if(response.data.length>0){
          setStorage(configSeting.localmangaTopView,JSON.stringify(response.data),30*60)
          dispatch({
            type: ACT_HOME.GET_TOP_VIEW,
            data: response.data
          })
        }
        })
      }else{
          dispatch({
            type: ACT_HOME.GET_TOP_VIEW,
              data:JSON.parse(local_data)
          })
      }
    }
  }
  export const getMangaComment = (domain) => {
    return async dispatch => {
      let local_data = getStorage(configSeting.localMangaComment+"-"+domain)
      if (local_data == null) {
        await axios.get(URL_DATA.MG_GET_COMMENT+domain).then(response => {
          setStorage(configSeting.localMangaComment+"-"+domain,JSON.stringify(response.data),20*24*60*60)
          dispatch({
            type: ACT_HOME.GET_MG_COMENT,
            data: response.data
          })
        })
      }else{
          dispatch({
            type: ACT_HOME.GET_MG_COMENT,
              data:JSON.parse(local_data)
          })
      }
    }
  }
