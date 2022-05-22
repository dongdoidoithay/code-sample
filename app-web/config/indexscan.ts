export const ACT_CATEGORY = {
   GET_GENRES: "[CATEGORY-SCAN]GET-GENRES",
   GET_TYPE: "[CATEGORY-SCAN]GET-TYPE",
   GET_YEAR: "[CATEGORY-SCAN]GET-YEAR",
   GET_STATUS: "[CATEGORY-SCAN]GET-STATUS",
   GET_ROOT: "[CATEGORY-SCAN]GET-ROOT",
}
export const ACT_HOME = {
   GET_FEATURES: "[HOME-SCAN]GET-FEATURES-MANGA",
   GET_LAST_UPDATE: "[HOME-SCAN]GET-LAST-UPDATE-MANGA",
   GET_TOP_VIEW: "[HOME-SCAN]GET-TOP_VIEW-MANGA",
   GET_MG_COMENT: "[HOME-SCAN]GET-MG-COMENT",
}
export const ACT_MANGA = {
   GET_TOP_NEW: "[MANGA-SCAN]GET-TOP-NEW-MANGA",
   GET_TOP_NOTICE: "[MANGA-SCAN]GET-TOP_NOTICE-MANGA",
   GET_TOP_POP: "[MANGA-SCAN]GET-TOP_POP-MANGA",
   GET_TOP_HOT: "[MANGA-SCAN]GET-TOP_HOT-MANGA",
   GET_TOP_SLIDE: "[MANGA-SCAN]GET-TOP_SLIDE-MANGA",
   //GET_FEATURES:"[MANGA-SCAN]GET-FEATURES-MANGA",
   GET_TOP_VIEW: "[MANGA-SCAN]GET-TOP_VIEW-MANGA",

   GET_H_RANDOM: "[MANGA-SCAN]GET-H-RANDOM-MANGA",
}
export const ACT_DETAIL = {
   GET_INFO: "[MANGA-SCAN]GET-INFO-MANGA",
   GET_CHAPTER: "[MANGA-SCAN]GET-CHAPTER-BY-MANGA",
   GET_VIEW_DETAIL: "[MANGA-SCAN]GET-VIEW-DETAIL-MANGA",
}
export const ACT_MG_LIST = {
   GET_BY_GENRES: "[GENRES-SCAN]GET-LIST-MANGA",
   GET_BY_YEAR: "[YEAR-SCAN]GET-LIST-MANGA",
   GET_BY_TYPE: "[TYPE-SCAN]GET-LIST-MANGA",
   GET_BY_AUTH: "[AUTH-SCAN]GET-LIST-MANGA",
   GET_BY_ART: "[ART-SCAN]GET-LIST-MANGA",
   GET_BY_QUICK_SEARCH: "[ART-SCAN]GET-LIST-MANGA_QUICK_SEARCH",
   GET_BY_FROM_SEARCH: "[ART-SCAN]GET-LIST-MANGA_FROM_SEARCH",
}




//const URL_BASE="https://api.domain.com/api/kumascans"
const URL_BASE="http://localhost:5060/api/kumascans"

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