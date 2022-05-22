var cache = require('express-redis-cache')();
module.exports = app => {
    const api = require("../controllers/api.raw.controller.js");

    //********** CL ***********/
    //genres
    app.get("/api/kumaraw/AllGenres",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.AllGenres';
            next();
        },
        // cache middleware 86400 second :1 day
        cache.route(100),
        api.findAllGenres
    );
    //gtype
    app.get("/api/kumaraw/AllType",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.AllType';
            next();
        },
        // cache middleware 86400 second :1 day
        cache.route(100),
        api.findAllType
    );
    //year
    app.get("/api/kumaraw/AllYear",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.AllYear';
            next();
        },
        // cache middleware 86400 second :1 day
        cache.route(100),
        api.findAllYear
    );
    //year
    app.get("/api/kumaraw/AllStatus",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.AllStatus';
            next();
        },
        // cache middleware 86400 second :1 day
        cache.route(100),
        api.findAllStatus
    );
    //art
    app.get("/api/kumaraw/AllArts",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.AllArts';
            next();
        },
        // cache middleware 86400 second :1 day
        cache.route(100),
        api.findAllArt
    );
    //get root
    app.get("/api/kumaraw/GetRoot", api.findRoot);
    //************ Source *****************//
    //-- Trend
    app.get("/api/kumaraw/MangaTrend/:page/:count/:type",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.MangaTrend-'  + req.params.page+'-'+ req.params.count+'-'+ req.params.type;
            next();
        },
        // cache middleware 86400 second :1 day
        cache.route(90),
        api.findMangaTrend
    );
    app.post("/api/kumaraw/addTrend",api.addMangaTrend);
    app.get("/api/kumaraw/MangaHomeUpdate/:page/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.MangaHomeUpdate-' + req.params.page+'-'+ req.params.count;
            next();
        },
        // cache middleware 86400 second :1 day
        cache.route(90),
        api.findMangaHomeUpdate
    );
    //-- Slide
    app.get("/api/kumaraw/MangaSlide/:page/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.MangaSlide-' + req.params.page+'-'+ req.params.count;
            next();
        },
        // cache middleware 86400 second :1 day
        cache.route(90),
        api.findMangaSlide
    );

    //-- LastUpdate
    app.get("/api/kumaraw/GetListDocLasteUpdates/:page/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.GetListDocLasteUpdate-' + req.params.page+ req.params.count;
            next();
        },
        cache.route(90),
        api.findMangaLastUpdate
    );
    app.get("/api/kumaraw/GetListDocLasteUpdate/:count",
    function (req, res, next) {
        // set cache name
        res.express_redis_cache_name = 'api.kumaraw.GetListDocLasteUpdate-' + req.params.count;
        next();
    },
    cache.route(90),
    api.findMangaLastUpdate
);

    //-- findInfoManga
    app.get("/api/kumaraw/getInfoManga/:id_document",
     function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.getInfoManga-' + req.params.id_document;
            next();
        },
        cache.route(90), 
        api.findInfoManga
    );
    app.get("/api/kumaraw/GetChapterList/:id_document",
     function (req, res, next) {
           // set cache name
           res.express_redis_cache_name = 'api.kumaraw.GetChapterList-' + req.params.id_document;
           next();
       },
       cache.route(70), 
       api.findInfoMangaChapter
   );
   app.get("/api/kumaraw/GetImageChapter/:id_document/:id_detail",
     function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.GetImageChapter-' + req.params.id_document+'-'+req.params.id_detail;
            next();
        },
        cache.route(100),
        api.findImageChapter
    );
    //-- findGenresManga
    app.get("/api/kumaraw/getGenresManga/:id_genres/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.findGenresManga-' + req.params.id_genres + "-" + req.params.count;
            next();
        },
        cache.route(90),
        api.findGenresManga
    );
    app.get("/api/kumaraw/getGenresMangas/:page/:id_genres/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.findGenresManga-' + req.params.id_genres + "-" + req.params.count+"-"+req.params.page;
            next();
        },
        cache.route(90),
        api.findGenresManga
    );
    //-- findAuthManga
    app.get("/api/kumaraw/getAuthManga/:id_auth/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.findAuthManga-' + req.params.id_auth + "-" + req.params.count;
            next();
        },
        cache.route(90),
        api.findAuthManga
    );
    app.get("/api/kumaraw/getAuthMangas/:page/:id_auth/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.findAuthManga-' + req.params.id_auth + "-" + req.params.count+"-"+req.params.page;
            next();
        },
        cache.route(90),
        api.findAuthManga
    );
    //-- findStatusManga
    app.get("/api/kumaraw/getStatusManga/:id_status/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.findStatusManga-' + req.params.id_status + "-" + req.params.count;
            next();
        },
        cache.route(90),
        api.findStatusManga
    );
    app.get("/api/kumaraw/getStatusMangas/:page/:id_status/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.findStatusManga-' + req.params.id_status + "-" + req.params.count+"-"+req.params.page;
            next();
        },
        cache.route(90),
        api.findStatusManga
    );
    //-- find type
    app.get("/api/kumaraw/getTypeManga/:id_type/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.getTypeManga-' + req.params.id_type + "-" + req.params.count;
            next();
        },
        cache.route(90),
        api.findTypesManga
    );

    app.get("/api/kumaraw/getTypeMangas/:page/:id_type/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.getTypeManga-' + req.params.id_type + "-" + req.params.count+"-"+req.params.page;
            next();
        },
        cache.route(90),
        api.findTypesManga
    );

    //-- find findArtsManga
    app.get("/api/kumaraw/getArtsManga/:id_art/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.getArtsManga-' + req.params.id_art + "-" + req.params.count;
            next();
        },
        cache.route(90),
        api.findArtsManga
    );
    app.get("/api/kumaraw/getArtsMangas/:page/:id_art/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.getArtsManga-' + req.params.id_art + "-" + req.params.count+ "-" + req.params.page;
            next();
        },
        cache.route(90),
        api.findArtsManga
    );
    //-- find scans
    app.get("/api/kumaraw/getScansManga/:id_scan/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.getScansManga-' + req.params.id_scan + "-" + req.params.count;
            next();
        },
        cache.route(90),
        api.findScansManga
    );

    app.get("/api/kumaraw/getScansMangas/:page/:id_scan/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.getScansManga-' + req.params.id_scan + "-" + req.params.count+ "-" + req.params.page;
            next();
        },
        cache.route(90),
        api.findScansManga
    );
    //-- find scans
    app.get("/api/kumaraw/getYearsManga/:id_year/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.getYearsManga-' + req.params.id_year + "-" + req.params.count;
            next();
        },
        cache.route(90),
        api.findYearsManga
    );

    app.get("/api/kumaraw/getYearsMangas/:page/:id_year/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.getYearsManga-' + req.params.id_year + "-" + req.params.count+'-'+req.params.page;
            next();
        },
        cache.route(90),
        api.findYearsManga
    );
    //-- find alphabet
    app.get("/api/kumaraw/getAlphaberManga/:id_alpha/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.getAlphaberManga-' + req.params.id_alpha + "-" + req.params.count;
            next();
        },
        cache.route(90),
        api.findAlphabetManga
    );
    app.get("/api/kumaraw/getAlphaberMangas/:page/:id_alpha/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.getAlphaberMangas-' + req.params.id_alpha + "-" + req.params.count+'-'+req.params.page;
            next();
        },
        cache.route(90),
        api.findAlphabetManga
    );
    //findMangaHot
    app.get("/api/kumaraw/getListMangaHot/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.getListMangaHot-' + req.params.count;
            next();
        },
        cache.route(90),
        api.findMangaHot
    );

    app.get("/api/kumaraw/getListMangaHots/:page/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.getListMangaHot-' + req.params.count+'-' + req.params.page;
            next();
        },
        cache.route(90),
        api.findMangaHot
    );
    //findMangaComplate
    app.get("/api/kumaraw/getListMangaComplate/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.getListMangaComplate-' + req.params.count;
            next();
        },
        cache.route(90),
        api.findMangaComplate
    );

    app.get("/api/kumaraw/getListMangaComplate/:page/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.getListMangaComplate-' + req.params.count+'' + req.params.page;
            next();
        },
        cache.route(90),
        api.findMangaComplate
    );
     //findMangaHot
     app.get("/api/kumaraw/searchterm/:keyword",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.searchterm-' + req.params.keyword;
            next();
        },
        cache.route(90),
        api.findMangaByKeyWord
    );
    app.get("/api/kumaraw/searchterms/:page/:keyword/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.searchterm-' + req.params.keyword+'-' + req.params.count+'' + req.params.page;
            next();
        },
        cache.route(90),
        api.findMangaByKeyWord
    );
     //findMangaHot
     app.get("/api/kumaraw/searchform/:keyword/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.searchform-' + req.params.keyword+'-'+req.params.count;
            next();
        },
        cache.route(90),
        api.findMangaByKeyWordPage
    );
    app.get("/api/kumaraw/searchforms/:page/:keyword/:count",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.searchform-' + req.params.keyword+'-'+req.params.count+'' + req.params.page;
            next();
        },
        cache.route(90),
        api.findMangaByKeyWordPage
    );
    //-- findRandomManga
    app.get("/api/kumaraw/getRandomManga", api.findRandomManga);

    /***************SITE MAP************** */
    app.get("/api/kumaraw/SiteMapDoc/:skip/:take",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.SiteMapDoc-' + req.params.skip+'-'+req.params.take;
            next();
        },
        cache.route(6020),
        api.findSiteMapDoc
    );
    app.get("/api/kumaraw/SiteMapDetail/:skip/:take",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.SiteMapDetail-' + req.params.skip+'-'+req.params.take;
            next();
        },
        cache.route(6020),
        api.findSiteMapDetail
    );
    app.get("/api/kumaraw/SiteMapGenres/:skip/:take",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.SiteMapGenres-' + req.params.skip+'-'+req.params.take;
            next();
        },
        cache.route(6020),
        api.findSiteMapGenres
    );
    app.get("/api/kumaraw/SiteMapAuthor/:skip/:take",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.SiteMapAuthor-' + req.params.skip+'-'+req.params.take;
            next();
        },
        cache.route(6020),
        api.findSiteMapAuthor
    );
    app.get("/api/kumaraw/SiteMapArt/:skip/:take",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.SiteMapArt-' + req.params.skip+'-'+req.params.take;
            next();
        },
        cache.route(6020),
        api.findSiteMapArt
    );
    app.get("/api/kumaraw/SiteMapScan/:skip/:take",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.SiteMapScan-' + req.params.skip+'-'+req.params.take;
            next();
        },
        cache.route(6020),
        api.findSiteMapScan
    );
    app.get("/api/kumaraw/SiteMapType/:skip/:take",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.SiteMapType-' + req.params.skip+'-'+req.params.take;
            next();
        },
        cache.route(6020),
        api.findSiteMapType
    );
    app.get("/api/kumaraw/SiteMapYear/:skip/:take",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.SiteMapYear-' + req.params.skip+'-'+req.params.take;
            next();
        },
        cache.route(6020),
        api.findSiteMapYear
    );

    
    app.get("/api/kumaraw/AutoSiteMapDoc/:take",
        function (req, res, next) {
            // set cache name
            res.express_redis_cache_name = 'api.kumaraw.AutoSiteMapDoc-'+req.params.take;
            next();
        },
        cache.route(6020),
        api.findAutoSiteMapDoc
    );
    //-- GetListTopViewHome
    app.get("/api/kumaraw/GetListTopViewHome",
    function (req, res, next) {
        // set cache name
        res.express_redis_cache_name = 'api.kumaraw.GetListTopViewHome';
        next();
    },
    // cache middleware 86400 second :1 day
    cache.route(6020),
    api.findMangaTopViewHome
    );

};

  