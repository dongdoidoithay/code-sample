import { combineReducers } from "redux"


import category_scan from "./category_scan"
import home_scan from "./home_scan"
import manga_scan from "./manga_scan"


import category_raw from "./category_raw"
import home_raw from "./home_raw"
import manga_raw from "./manga_raw"

const rootReducer = combineReducers({
  cl_raw: category_raw,
  home_raw:home_raw,
  manga_raw:manga_raw,

  cl_scan: category_scan,
  home_scan:home_scan,
  manga_scan:manga_scan

})

export default rootReducer