import { ACT_DETAIL, ACT_MG_LIST } from "../../../config/indexraw";

const initialState = {
  mangainfo: null,
  mangalistChapter: [],
  mangaview: null,
  listbymanga: [],
  listbymangaquicksearch: [],
  listbymangaformsearch: [],
};

const MangaReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACT_DETAIL.GET_INFO:
      return {
        ...state,
        mangainfo: action.data,
      };
    case ACT_DETAIL.GET_CHAPTER:
      return {
        ...state,
        mangalistChapter: action.data,
      };
    case ACT_DETAIL.GET_VIEW_DETAIL:
      return {
        ...state,
        mangaview: action.data,
      };
    case ACT_MG_LIST.GET_BY_GENRES:
      return {
        ...state,
        listbymanga: action.data,
      };
    case ACT_MG_LIST.GET_BY_QUICK_SEARCH:
      return {
        ...state,
        listbymangaquicksearch: action.data,
      };
    case ACT_MG_LIST.GET_BY_FROM_SEARCH:
      return {
        ...state,
        listbymangaformsearch: action.data,
      };
    default:
      return state;
  }
};

export default MangaReducer;
