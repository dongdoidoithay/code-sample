export const ACT_CATEGORY = {
   GET_GENRES: "[CATEGORY-RAW]GET-GENRES",
   GET_TYPE: "[CATEGORY-RAW]GET-TYPE",
   GET_YEAR: "[CATEGORY-RAW]GET-YEAR",
   GET_STATUS: "[CATEGORY-RAW]GET-STATUS",
   GET_ROOT: "[CATEGORY-RAW]GET-ROOT",
}
export const ACT_HOME = {
   GET_FEATURES: "[HOME-RAW]GET-FEATURES-MANGA",
   GET_LAST_UPDATE: "[HOME-RAW]GET-LAST-UPDATE-MANGA",
   GET_TOP_VIEW: "[HOME-RAW]GET-TOP_VIEW-MANGA",
   GET_MG_COMENT: "[HOME-RAW]GET-MG-COMENT",
}
export const ACT_MANGA = {
   GET_TOP_NEW: "[MANGA-RAW]GET-TOP-NEW-MANGA",
   GET_TOP_NOTICE: "[MANGA-RAW]GET-TOP_NOTICE-MANGA",
   GET_TOP_POP: "[MANGA-RAW]GET-TOP_POP-MANGA",
   GET_TOP_HOT: "[MANGA-RAW]GET-TOP_HOT-MANGA",
   GET_TOP_SLIDE: "[MANGA-RAW]GET-TOP_SLIDE-MANGA",
   //GET_FEATURES:"[MANGA-RAW]GET-FEATURES-MANGA",
   GET_TOP_VIEW: "[MANGA-RAW]GET-TOP_VIEW-MANGA",

   GET_H_RANDOM: "[MANGA-RAW]GET-H-RANDOM-MANGA",
}
export const ACT_DETAIL = {
   GET_INFO: "[MANGA-RAW]GET-INFO-MANGA",
   GET_CHAPTER: "[MANGA-RAW]GET-CHAPTER-BY-MANGA",
   GET_VIEW_DETAIL: "[MANGA-RAW]GET-VIEW-DETAIL-MANGA",
}
export const ACT_MG_LIST = {
   GET_BY_GENRES: "[GENRES-RAW]GET-LIST-MANGA",
   GET_BY_YEAR: "[YEAR-RAW]GET-LIST-MANGA",
   GET_BY_TYPE: "[TYPE-RAW]GET-LIST-MANGA",
   GET_BY_AUTH: "[AUTH-RAW]GET-LIST-MANGA",
   GET_BY_ART: "[ART-RAW]GET-LIST-MANGA",
   GET_BY_QUICK_SEARCH: "[ART-RAW]GET-LIST-MANGA_QUICK_SEARCH",
   GET_BY_FROM_SEARCH: "[ART-RAW]GET-LIST-MANGA_FROM_SEARCH",
}



//const URL_BASE="https://api.domain.com/api/kumaraw"
const URL_BASE="http://localhost:5060/api/kumaraw"

const URL_DATA = {
   ITEM_PAGE:32,

   GENRES: `${URL_BASE}/AllGenres`,
   TYPE: `${URL_BASE}/AllType`,
   YEAR: `${URL_BASE}/AllYear`,
   STATUS: `${URL_BASE}/AllStatus`,
   ROOT: `${URL_BASE}/GetRoot`,
   //home
   MG_FEATURES: `${URL_BASE}/MangaSlide`,
   MG_LAST_UPDATE: `${URL_BASE}/GetListDocLasteUpdate/`,
   MG_TOP_VIEW: `${URL_BASE}/GetListTopViewHome`,
   //layout
   MG_SLIDE: `${URL_BASE}/MangaSlide`,
   MG_NOTICE: `${URL_BASE}/MangaNotice`,
   MG_POP: `${URL_BASE}/GetListPopHome`,

   MG_GET_COMENT: `${URL_BASE}/GetCommentHome/`,
   //end layout
   //home

   MG_INFO: `${URL_BASE}/GetInfoManga/`,
   MG_INFO_CHAPTERS: `${URL_BASE}/GetChapterList/`,
   MG_VIEW_MANGA: `${URL_BASE}/GetImageChapter/`,

   //list manga by genres
   MG_LIST_MANGA_GENRES: `${URL_BASE}/getGenresManga/`,
   MG_LIST_MANGA_AUTH: `${URL_BASE}/getAuthManga/`,
   MG_LIST_MANGA_STATUS: `${URL_BASE}/getStatusManga/`,

   MG_LIST_MANGA_YEAR: `${URL_BASE}/getYearsManga/`,
   MG_LIST_MANGA_TYPE: `${URL_BASE}/getTypeManga/`,
   MG_LIST_MANGA_ART: `${URL_BASE}/getArtsManga/`,
   MG_LIST_MANGA_SCAN: `${URL_BASE}/getScansManga/`,
   MG_LIST_MANGA_ALPHABET: `${URL_BASE}/getAlphaberManga/`,
   //search
   MG_LIST_MANGA_SEARCH_ITEM: `${URL_BASE}/searchterm/`,
   MG_LIST_MANGA_SEARCH_PAGE: `${URL_BASE}/searchform/`,
   //list manga by menu
   MG_LIST_MN_HOT: `${URL_BASE}/getListMangaHot/`,
   MG_LIST_MN_COMPLATE: `${URL_BASE}/getListMangaComplate/`,
   //sitemap manga all
   MG_SM_MANGA: `${URL_BASE}/AutoSiteMapDoc/`,
   MG_SM_DETAIL: `${URL_BASE}/AutoSiteMapDetail/`,
   MG_SM_GENSITE_MAP: `${URL_BASE}/GenSitemap/`,
   //postcoment
   MG_POST_COMMENT: `${URL_BASE}/PostComments`,
   MG_GET_COMMENT: `${URL_BASE}/GetCommentHome/`,

   //sitemap manga all
   MG_SM_MANGA_GEN: `${URL_BASE}/SiteMapDoc/`,
   MG_SM_DETAIL_GEN: `${URL_BASE}/SiteMapDetail/`,
   MG_SM_GENRES_GEN: `${URL_BASE}/SiteMapGenres/`,
   MG_SM_AUTHOR_GEN: `${URL_BASE}/SiteMapAuthor/`,
   MG_SM_ART_GEN: `${URL_BASE}/SiteMapArt/`,
   MG_SM_SCAN_GEN: `${URL_BASE}/SiteMapScan/`,
   MG_SM_TYPE_GEN: `${URL_BASE}/SiteMapType/`,
   MG_SM_YEAR_GEN: `${URL_BASE}/SiteMapYear/`,
}
export default URL_DATA;