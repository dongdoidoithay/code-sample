import axios from "axios"
import URL_DATA,{ ACT_CATEGORY,  } from "../../../config/indexscan"
import configSeting from "../../../config/configScanSeting"
import { getStorage, setStorage } from "../localFx"

export const getCateAllGenres = () => {
    return async dispatch => {
        let localgenres = getStorage(configSeting.localGenresPo)
        if (localgenres == null) {
           // console.log("get genres api")
            await axios.get(URL_DATA.GENRES).then(response => {
            setStorage(configSeting.localGenresPo,JSON.stringify(response.data),30*24*60*60)//30 ngay
            dispatch({
                    type: ACT_CATEGORY.GET_GENRES,
                    data: response.data
                })
            })
        }else{
            //console.log("get genres local",JSON.parse(localgenres))
            dispatch({
                type: ACT_CATEGORY.GET_GENRES,
                data:JSON.parse(localgenres)
            })
        }
    }
}
export const getCateAllType = () => {
    return async dispatch => {
        let local = getStorage(configSeting.localtypePo)
        if (local == null) {
           // console.log("get genres api")
            await axios.get(URL_DATA.TYPE).then(response => {
            setStorage(configSeting.localtypePo,JSON.stringify(response.data),30*24*60*60)//30 ngay
            dispatch({
                    type: ACT_CATEGORY.GET_TYPE,
                    data: response.data
                })
            })
        }else{
            //console.log("get genres local",JSON.parse(localgenres))
            dispatch({
                type: ACT_CATEGORY.GET_TYPE,
                data:JSON.parse(local)
            })
        }
    }
}
export const getCateAllYear = () => {
    return async dispatch => {

        let local = getStorage(configSeting.localyearPo)
        if (local == null) {
           // console.log("get genres api")
            await axios.get(URL_DATA.YEAR).then(response => {
            setStorage(configSeting.localyearPo,JSON.stringify(response.data),30*24*60*60) //30 ngay
            dispatch({
                    type: ACT_CATEGORY.GET_YEAR,
                    data: response.data
                })
            })
        }else{
            //console.log("get genres local",JSON.parse(localgenres))
            dispatch({
                type: ACT_CATEGORY.GET_YEAR,
                data:JSON.parse(local)
            })
        }
    }
}
export const getCateAllStatus = () => {
    return async dispatch => {

        let local = getStorage(configSeting.localstatusPo)
        if (local == null) {
           // console.log("get genres api")
            await axios.get(URL_DATA.STATUS).then(response => {
            setStorage(configSeting.localstatusPo,JSON.stringify(response.data),30*24*60*60) //30 ngay
            dispatch({
                    type: ACT_CATEGORY.GET_STATUS,
                    data: response.data
                })
            })
        }else{
            //console.log("get genres local",JSON.parse(localgenres))
            dispatch({
                type: ACT_CATEGORY.GET_STATUS,
                data:JSON.parse(local)
            })
        }
    }
}
export const getRoot = () => {
    return async dispatch => {
        await axios.get(URL_DATA.ROOT).then(response => {
        dispatch({
                type: ACT_CATEGORY.GET_ROOT,
                data: response.data
            })
        })
    }
}

