var cache = require('express-redis-cache')();
module.exports = app => {
    const api = require("../controllers/api.scan.controller.js");

    //********** CL ***********/
    //genres
    app.get("/api/kumascans/AllGenres",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.AllGenres';
            next();
        },
        // cache middleware 86400 second :1 day
        cache.route(90),
        api.findAllGenres
    );
    //gtype
    app.get("/api/kumascans/AllType",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.AllType';
            next();
        },
        // cache middleware 86400 second :1 day
        cache.route(90),
        api.findAllType
    );
    //year
    app.get("/api/kumascans/AllYear",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.AllYear';
            next();
        },
        // cache middleware 86400 second :1 day
        cache.route(90),
        api.findAllYear
    );
    //year
    app.get("/api/kumascans/AllStatus",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.AllStatus';
            next();
        },
        // cache middleware 86400 second :1 day
        cache.route(90),
        api.findAllStatus
    );
    //art
    app.get("/api/kumascans/AllArts",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.AllArts';
            next();
        },
        // cache middleware 86400 second :1 day
        cache.route(90),
        api.findAllArt
    );
    //get root
    app.get("/api/kumascans/GetRoot", api.findRoot);
    //************ Source *****************//
    //-- Trend
    app.get("/api/kumascans/MangaTrend/:page/:count/:type",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.MangaTrend-'  + req.params.page+'-'+ req.params.count+'-'+ req.params.type;
            next();
        },
        // cache middleware 86400 second :1 day
        cache.route(90),
        api.findMangaTrend
    );
    app.post("/api/kumascans/addTrend",api.addMangaTrend);
    app.get("/api/kumascans/MangaHomeUpdate/:page/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.MangaHomeUpdate-' + req.params.page+'-'+ req.params.count;
            next();
        },
        // cache middleware 86400 second :1 day
        cache.route(90),
        api.findMangaHomeUpdate
    );
    //-- Slide
    app.get("/api/kumascans/MangaSlide/:page/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.MangaSlide-' + req.params.page+'-'+ req.params.count;
            next();
        },
        // cache middleware 86400 second :1 day
        cache.route(90),
        api.findMangaSlide
    );

    //-- LastUpdate
    app.get("/api/kumascans/GetListDocLasteUpdates/:page/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.GetListDocLasteUpdate-' + req.params.page+ req.params.count;
            next();
        },
        cache.route(90),
        api.findMangaLastUpdate
    );
    app.get("/api/kumascans/GetListDocLasteUpdate/:count",
    function (req, res, next) {
        // set cache name
        res.express_redis_cache_name = 'api.kumascans.GetListDocLasteUpdate-' + req.params.count;
        next();
    },
    cache.route(90),
    api.findMangaLastUpdate
);

    //-- findInfoManga
    app.get("/api/kumascans/getInfoManga/:id_document",
     function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.getInfoManga-' + req.params.id_document;
            next();
        },
        cache.route(90), 
        api.findInfoManga
    );
    app.get("/api/kumascans/GetChapterList/:id_document",
     function (req, res, next) {
           // set cache name
           res.express_redis_cache_name = 'api.kumascans.GetChapterList-' + req.params.id_document;
           next();
       },
       cache.route(70), 
       api.findInfoMangaChapter
   );
   app.get("/api/kumascans/GetImageChapter/:id_document/:id_detail",
     function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.GetImageChapter-' + req.params.id_document+'-'+req.params.id_detail;
            next();
        },
        cache.route(100),
        api.findImageChapter
    );
    //-- findGenresManga
    app.get("/api/kumascans/getGenresManga/:id_genres/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.findGenresManga-' + req.params.id_genres + "-" + req.params.count;
            next();
        },
        cache.route(90),
        api.findGenresManga
    );
    app.get("/api/kumascans/getGenresMangas/:page/:id_genres/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.findGenresManga-' + req.params.id_genres + "-" + req.params.count+"-"+req.params.page;
            next();
        },
        cache.route(90),
        api.findGenresManga
    );
    //-- findAuthManga
    app.get("/api/kumascans/getAuthManga/:id_auth/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.findAuthManga-' + req.params.id_auth + "-" + req.params.count;
            next();
        },
        cache.route(90),
        api.findAuthManga
    );
    app.get("/api/kumascans/getAuthMangas/:page/:id_auth/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.findAuthManga-' + req.params.id_auth + "-" + req.params.count+"-"+req.params.page;
            next();
        },
        cache.route(90),
        api.findAuthManga
    );
    //-- findStatusManga
    app.get("/api/kumascans/getStatusManga/:id_status/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.findStatusManga-' + req.params.id_status + "-" + req.params.count;
            next();
        },
        cache.route(90),
        api.findStatusManga
    );
    app.get("/api/kumascans/getStatusMangas/:page/:id_status/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.findStatusManga-' + req.params.id_status + "-" + req.params.count+"-"+req.params.page;
            next();
        },
        cache.route(90),
        api.findStatusManga
    );
    //-- find type
    app.get("/api/kumascans/getTypeManga/:id_type/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.getTypeManga-' + req.params.id_type + "-" + req.params.count;
            next();
        },
        cache.route(90),
        api.findTypesManga
    );

    app.get("/api/kumascans/getTypeMangas/:page/:id_type/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.getTypeManga-' + req.params.id_type + "-" + req.params.count+"-"+req.params.page;
            next();
        },
        cache.route(90),
        api.findTypesManga
    );

    //-- find findArtsManga
    app.get("/api/kumascans/getArtsManga/:id_art/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.getArtsManga-' + req.params.id_art + "-" + req.params.count;
            next();
        },
        cache.route(90),
        api.findArtsManga
    );
    app.get("/api/kumascans/getArtsMangas/:page/:id_art/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.getArtsManga-' + req.params.id_art + "-" + req.params.count+ "-" + req.params.page;
            next();
        },
        cache.route(90),
        api.findArtsManga
    );
    //-- find scans
    app.get("/api/kumascans/getScansManga/:id_scan/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.getScansManga-' + req.params.id_scan + "-" + req.params.count;
            next();
        },
        cache.route(90),
        api.findScansManga
    );

    app.get("/api/kumascans/getScansMangas/:page/:id_scan/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.getScansManga-' + req.params.id_scan + "-" + req.params.count+ "-" + req.params.page;
            next();
        },
        cache.route(90),
        api.findScansManga
    );
    //-- find scans
    app.get("/api/kumascans/getYearsManga/:id_year/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.getYearsManga-' + req.params.id_year + "-" + req.params.count;
            next();
        },
        cache.route(90),
        api.findYearsManga
    );

    app.get("/api/kumascans/getYearsMangas/:page/:id_year/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.getYearsManga-' + req.params.id_year + "-" + req.params.count+'-'+req.params.page;
            next();
        },
        cache.route(90),
        api.findYearsManga
    );
    //-- find alphabet
    app.get("/api/kumascans/getAlphaberManga/:id_alpha/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.getAlphaberManga-' + req.params.id_alpha + "-" + req.params.count;
            next();
        },
        cache.route(90),
        api.findAlphabetManga
    );
    app.get("/api/kumascans/getAlphaberMangas/:page/:id_alpha/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.getAlphaberMangas-' + req.params.id_alpha + "-" + req.params.count+'-'+req.params.page;
            next();
        },
        cache.route(90),
        api.findAlphabetManga
    );
    //findMangaHot
    app.get("/api/kumascans/getListMangaHot/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.getListMangaHot-' + req.params.count;
            next();
        },
        cache.route(90),
        api.findMangaHot
    );

    app.get("/api/kumascans/getListMangaHots/:page/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.getListMangaHot-' + req.params.count+'-' + req.params.page;
            next();
        },
        cache.route(90),
        api.findMangaHot
    );
    //findMangaComplate
    app.get("/api/kumascans/getListMangaComplate/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.getListMangaComplate-' + req.params.count;
            next();
        },
        cache.route(90),
        api.findMangaComplate
    );

    app.get("/api/kumascans/getListMangaComplate/:page/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.getListMangaComplate-' + req.params.count+'' + req.params.page;
            next();
        },
        cache.route(90),
        api.findMangaComplate
    );
     //findMangaHot
     app.get("/api/kumascans/searchterm/:keyword",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.searchterm-' + req.params.keyword;
            next();
        },
        cache.route(90),
        api.findMangaByKeyWord
    );
    app.get("/api/kumascans/searchterms/:page/:keyword/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.searchterm-' + req.params.keyword+'-' + req.params.count+'' + req.params.page;
            next();
        },
        cache.route(90),
        api.findMangaByKeyWord
    );
     //findMangaHot
     app.get("/api/kumascans/searchform/:keyword/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.searchform-' + req.params.keyword+'-'+req.params.count;
            next();
        },
        cache.route(90),
        api.findMangaByKeyWordPage
    );
    app.get("/api/kumascans/searchforms/:page/:keyword/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.searchform-' + req.params.keyword+'-'+req.params.count+'' + req.params.page;
            next();
        },
        cache.route(90),
        api.findMangaByKeyWordPage
    );
    //-- findRandomManga
    app.get("/api/kumascans/getRandomManga", api.findRandomManga);

    /***************SITE MAP************** */
    app.get("/api/kumascans/SiteMapDoc/:skip/:take",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.SiteMapDoc-' + req.params.skip+'-'+req.params.take;
            next();
        },
        cache.route(6020),
        api.findSiteMapDoc
    );
    app.get("/api/kumascans/SiteMapDetail/:skip/:take",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.SiteMapDetail-' + req.params.skip+'-'+req.params.take;
            next();
        },
        cache.route(6020),
        api.findSiteMapDetail
    );
    app.get("/api/kumascans/SiteMapGenres/:skip/:take",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.SiteMapGenres-' + req.params.skip+'-'+req.params.take;
            next();
        },
        cache.route(6020),
        api.findSiteMapGenres
    );
    app.get("/api/kumascans/SiteMapAuthor/:skip/:take",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.SiteMapAuthor-' + req.params.skip+'-'+req.params.take;
            next();
        },
        cache.route(6020),
        api.findSiteMapAuthor
    );
    app.get("/api/kumascans/SiteMapArt/:skip/:take",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.SiteMapArt-' + req.params.skip+'-'+req.params.take;
            next();
        },
        cache.route(6020),
        api.findSiteMapArt
    );
    app.get("/api/kumascans/SiteMapScan/:skip/:take",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.SiteMapScan-' + req.params.skip+'-'+req.params.take;
            next();
        },
        cache.route(6020),
        api.findSiteMapScan
    );
    app.get("/api/kumascans/SiteMapType/:skip/:take",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.SiteMapType-' + req.params.skip+'-'+req.params.take;
            next();
        },
        cache.route(6020),
        api.findSiteMapType
    );
    app.get("/api/kumascans/SiteMapYear/:skip/:take",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.SiteMapYear-' + req.params.skip+'-'+req.params.take;
            next();
        },
        cache.route(6020),
        api.findSiteMapYear
    );

    app.get("/api/kumascans/AutoSiteMapDoc/:take",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumascans.AutoSiteMapDoc-'+req.params.take;
            next();
        },
        cache.route(6020),
        api.findAutoSiteMapDoc
    );
    //-- GetListTopViewHome
    app.get("/api/kumascans/GetListTopViewHome",
    function (req, res, next) {
        // set cache name
        res.express_redis_cache_name = 'api.kumascans.GetListTopViewHome';
        next();
    },
    // cache middleware 86400 second :1 day
    cache.route(6020),
    api.findMangaTopViewHome
    );

};

  