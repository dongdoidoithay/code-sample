import { ACT_CATEGORY, ACT_MANGA } from "../../../config/indexraw";

const initialState = {
  listgenres: [],
  listyear: [],
  listtype: [],
  liststatus: [],
  root: "",
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACT_CATEGORY.GET_GENRES:
      return {
        ...state,
        listgenres: action.data,
      };
    case ACT_CATEGORY.GET_YEAR:
      return {
        ...state,
        listyear: action.data,
      };
    case ACT_CATEGORY.GET_TYPE:
      return {
        ...state,
        listtype: action.data,
      };
    case ACT_CATEGORY.GET_STATUS:
      return {
        ...state,
        liststatus: action.data,
      };
    case ACT_CATEGORY.GET_ROOT:
      return {
        ...state,
        root: action.data,
      };
    default:
      return state;
  }
};

export default CategoryReducer;
