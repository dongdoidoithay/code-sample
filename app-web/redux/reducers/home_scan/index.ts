import { ACT_HOME } from "../../../config/indexscan";

const initialState = {
  mangafeatures: [],
  mangalastupdate: [],
  mangatopview:[],
  mangacomments:[],
};

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
   
    case ACT_HOME.GET_FEATURES:
      return {
        ...state,
        mangafeatures: action.data,
      };
      case ACT_HOME.GET_LAST_UPDATE:
        return {
          ...state,
          mangalastupdate: action.data,
        };
      case ACT_HOME.GET_TOP_VIEW:
        return {
          ...state,
          mangatopview: action.data,
        };
        case ACT_HOME.GET_MG_COMENT:
          return {
            ...state,
            mangacomments: action.data,
          };
    //end home
    default:
      return state;
  }
};

export default HomeReducer;
