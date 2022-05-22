import { FC ,useEffect} from 'react';


import { useDispatch} from "react-redux";
import {getMangaHomeFeatures,getMangaHomeLastUpdate, getMangaHomeTopView} from "../../redux/actions/home_scan"
import {getCateAllGenres,getCateAllStatus,getCateAllType } from "../../redux/actions/category_scan"


const InitialFetchDataEn:FC= () =>{
    const dispatch = useDispatch()

    const actionCateAllGenres=getCateAllGenres()
    //const actionCateAllType =getCateAllType()
    //const actionCateAllYear =getCateAllYear()
    const actionCateAllStatus =getCateAllStatus()
    //const actionRoot =getRoot()
    //home
  
    const actionMangaHomeFeatures=getMangaHomeFeatures()
    const actionMangaHomeLastUpdate=getMangaHomeLastUpdate(0)
      const actionMangaHomeTopView=getMangaHomeTopView()
    /*const actiongetMangaComment=getMangaComment(configSeting.lbl_domain_name)
     */
    //contrator
    useEffect(() =>{
        dispatch(actionCateAllGenres)
        //dispatch(actionCateAllType)
        //(actionCateAllYear)
        dispatch(actionCateAllStatus)
        //(actionRoot)

        dispatch(actionMangaHomeFeatures)
        dispatch(actionMangaHomeLastUpdate)
         dispatch(actionMangaHomeTopView)
        // dispatch(actiongetMangaComment)
    },[])


    return null
}

export default InitialFetchDataEn;
