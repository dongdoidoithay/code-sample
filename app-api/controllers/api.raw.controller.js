const db = require("../models/index-raw");

const cl_auths = db.cl_auths;
const cl_genres = db.cl_genres;
const cl_status = db.cl_status;
const cl_years=db.cl_years;
const cl_types=db.cl_types;
const cl_arts=db.cl_arts;
const cl_posteds=db.cl_posteds;
const cl_serializations=db.cl_serializations;


const comments = db.comments;
const detail_documents = db.detail_documents;
const documents = db.documents;
const documents_trend = db.documents_trend;

const _page_init=32;

//dong bo schemal table
//db.sequelize.sync();


function sendToElasticAndLogToConsole(sql, queryObject) {
  // console.log(sql)
}
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/******************CL*************** */
// Genres
exports.findAllGenres = (req, res) => {
  return cl_genres.findAll().then((genres) => {
    res.set({'Content-Type': 'application/json'});
    res.send(genres);
    //return genres;
  });
};
// Type
exports.findAllType = (req, res) => {
  return cl_types.findAll().then((auths) => {
    res.set({'Content-Type': 'application/json'});
    res.send(auths);
  });
};
// Year
exports.findAllYear = (req, res) => {
  try{
  return cl_years.findAll().then((year) => {
    res.set({'Content-Type': 'application/json'});
    res.send(year);
  });
}catch(ex){
  console.log("--->",ex);
}
};
// Year
exports.findAllStatus = (req, res) => {
  return cl_status.findAll().then((status) => {
    res.set({'Content-Type': 'application/json'});
    res.send(status);
  });
};
// Status
exports.findAllScan = () => {
  return cl_scans.findAll().then((scan) => {
    return scan;
  });
};
// Status
exports.findAllArt = () => {
  return cl_arts.findAll().then((art) => {
    return art;
  });
};
//find root
exports.findRoot = (req, res) => {
  return cl_root_site.findAll({
    limit: 1
  }).then(function(entries){

    res.send(entries[0].LINK);
   
  }); 
};
/*************FIND MANGA BY *****************/
/*************FIND MANGA BY *****************/
exports.findMangaTrend = async(req, res) => {
  let _type=req.params.type
  let _page = _page_init;
  if(req.params.page!=null && req.params.page!='')
      _page=parseInt(req.params.page);
  //let _offset=0;
  let _offset = parseInt(req.params.count) * _page;
  //console.log("_offset - _type",{_offset,_type})

  return documents_trend.findAll({
  /*   logging: (sql, queryObject) => {
      sendToElasticAndLogToConsole(sql, queryObject)
    }, */
  
    where: {type: _type},
    order: [
      ['date', 'DESC'],
    ],
    include:{
      model:documents,
      attributes: [
        'idDoc',
        'nameOther',
        'name',
        'nameSeo',
        'image',
        'desc',
        'genres',
        'year',
        'status',
        'auth',
        'date',
        'type',
        'art'
      ],
    },
    offset: _offset,
    limit: _page
  })
    .then((listItems) => {
      res.set({'Content-Type': 'application/json'});
      res.send(listItems);
    })
    .catch((err) => {
      console.log(">> Error while finding findMangaSlide: ", err);
    });
}
exports.addMangaTrend = async(req, res) => {

  /*
  idDocTrend
  idDoc
  type
  date
  */
  //console.log("item--::",req.body);
  var item = req.body;
  //console.log("item--::",item);
  //const _item = await documents_trend.findByPk(item.id);
  const _item=await documents_trend.findOne({ where: { idDoc: item.idDoc, type:item.type} });


  if (_item == null) {
    if(item.date==null)
      item.date=new Date();
    item.idDocTrend=uuid();
    return documents_trend.create(item)
      .then((item) => {
        //console.log(">> Created auth: " + JSON.stringify(auth, null, 4));
        res.set({ 'Content-Type': 'application/json' });
        res.send(item);
      })
      .catch((err) => {
        res.set({ 'Content-Type': 'application/json' });
        res.send({ "ms": "400", "mg": err });
      });
  }
  else{
    res.set({ 'Content-Type': 'application/json' });
    res.send({ "ms": "302", "mg": "da co trong he thong" });
  }
  
}
exports.findMangaHomeUpdate = async(req, res) => {

 // console.log("check:::",{req})
  let totalRecode=await documents.findAndCountAll();
  let _page = _page_init;
  if(req.params.page!=null && req.params.page!='')
      _page=parseInt(req.params.page);
  //let _offset=0;
  let _offset = parseInt(req.params.count) * _page;
  return documents.findAll({
   /*  logging: (sql, queryObject) => {
      sendToElasticAndLogToConsole(sql, queryObject)
    }, */
    order: [
      ['date', 'DESC'],
    ],
    include: {
      model: detail_documents,
      limit: 3,
      attributes: [
        'slug',
        'idDoc',
        'idDetail',
        'nameChapter',
        'nameDoc',
        'nameSeoChapter',
        'date'
      ],
      order: [
        ['date', 'DESC'],
      ]
    },
    offset: _offset,
    limit: _page
  })
    .then((listItems) => {
      res.set({'Content-Type': 'application/json'});
      if(totalRecode!==null){
        res.send({
          "totalRecode":totalRecode.count,
          "data":listItems
        });
      }
      
    })
    .catch((err) => {
      console.log(">> Error while finding findMangaLastUpdate: ", err);
    });
}
/**select head**/

exports.findMangaSlide = async(req, res) => {
  let _page=9;
  if(req.params.page!=null && req.params.page!='')
      _page=parseInt(req.params.page);
  return documents.findAll({
    order: [
      ['date', 'DESC'],
    ],
    include: {
      model: detail_documents,
      limit: 3,
      attributes: [
        'slug',
        'idDoc',
        'idDetail',
        'nameChapter',
        'nameDoc',
        'nameSeoChapter',
        'date'
      ],
      order: [
        ['date', 'DESC'],
      ]
    },
    limit: _page
  })
    .then((listItems) => {
      res.set({'Content-Type': 'application/json'});
      res.send(listItems);
    })
    .catch((err) => {
      console.log(">> Error while finding findMangaSlide: ", err);
    });
}
exports.findMangaTopViewHome = async(req, res) => {
  let _page=6;
  if(req.params.page!=null && req.params.page!='')
      _page=parseInt(req.params.page);
  return documents.findAll({
    order: [
      ['date', 'DESC'],
    ],
    include: {
      model: detail_documents,
      limit: 3,
      attributes: [
        'slug',
        'idDoc',
        'idDetail',
        'nameChapter',
        'nameDoc',
        'nameSeoChapter',
        'date'
      ],
      order: [
        ['date', 'DESC'],
      ]
    },
    limit: _page
  })
    .then((listItems) => {
      res.set({'Content-Type': 'application/json'});
      res.send(listItems);
    })
    .catch((err) => {
      console.log(">> Error while finding findMangaSlide: ", err);
    });
}
exports.findMangaLastUpdate = async(req, res) => {
  //console.log("req.params.count:"+req.params.count);
  let totalRecode=await documents.findAndCountAll();
  let _page = _page_init;
  if(req.params.page!=null && req.params.page!='')
      _page=parseInt(req.params.page);
  //let _offset=0;
  let _offset = parseInt(req.params.count) * _page;
  return documents.findAll({
    order: [
      ['date', 'DESC'],
    ],
    include: {
      model: detail_documents,
      limit: 3,
      attributes: [
        'slug',
        'idDoc',
        'idDetail',
        'nameChapter',
        'nameDoc',
        'nameSeoChapter',
        'date'
      ],
      order: [
        ['date', 'DESC'],
      ]
    },
    offset: _offset,
    limit: _page
  })
    .then((listItems) => {
      res.set({'Content-Type': 'application/json'});
      if(totalRecode!==null){
        res.send({
          "totalRecode":totalRecode.count,
          "data":listItems
        });
      }
      
    })
    .catch((err) => {
      console.log(">> Error while finding findMangaLastUpdate: ", err);
    });
}

exports.findInfoManga = async (req, res) => {
  let result = {};
  let _arrGenres = [];
  let _arrArt = [];
  let _arrAuth = [];
  let _arrScan = [];
  let _arrStatus = [];
  let _arrType = [];
  const _doc = await documents.findOne({ where: { idDoc: req.params.id_document } });
  if (_doc !== null) {

    if(_doc.genres!==null &&_doc.genres.length>1){
      let lsgenres = _doc.genres.split(',');
      for (const _ele of lsgenres) {
        const _item_genres = await cl_genres.findOne({ where: { id: _ele } });
        if (_item_genres !== null) {
          let _itemadd = {
            id: _item_genres.id,
            name: _item_genres.name
          };    
          console.log('Find!', _itemadd);
          _arrGenres.push(_itemadd);
        }
      }
    }
    if(_doc.AUTHOR!==null&&_doc.auth.length>1){
      let lsauths = _doc.auth.split(',');
      for (const _ele of lsauths) {
        const _item_ = await cl_auths.findOne({ where: { id: _ele } });
        if (_item_ !== null) {
          let _itemadd = {
            id: _item_.id,
            name: _item_.name
          };
          _arrAuth.push(_itemadd);
        }
      }
    }
    if(_doc.art!==null&&_doc.art.length>1){
      let lsarts = _doc.art.split(',');
      for (const _ele of lsarts) {
        const _item_ = await cl_arts.findOne({ where: { id: _ele } });
        if (_item_ !== null) {
          let _itemadd = {
            id: _item_.id,
            name: _item_.name
          };
          _arrArt.push(_itemadd);
        }
      }
    }
    if(_doc.postedBy!==null&&_doc.postedBy.length>1){
      let lsscans = _doc.postedBy.split(',');
      for (const _ele of lsscans) {
        const _item_ = await cl_scans.findOne({ where: { id: _ele } });
        if (_item_ !== null) {
          let _itemadd = {
            id: _item_.id,
            name: _item_.name
          };
          _arrScan.push(_itemadd);
        }
      }
    }
    if(_doc.status!==null&&_doc.status.length>1){
      let lsstatus = _doc.status.split(',');
      for (const _ele of lsstatus) {
        const _item_ = await cl_status.findOne({ where: { id: _ele } });
        if (_item_ !== null) {
          let _itemadd = {
            id: _item_.id,
            name: _item_.name
          };
          _arrStatus.push(_itemadd);
        }
      }
    }
    if(_doc.type!==null&&_doc.type.length>1){
      let lstypes = _doc.type.split(',');
      for (const _ele of lstypes) {
        const _item_ = await cl_types.findOne({ where: { id: _ele } });
        if (_item_ !== null) {
          let _itemadd = {
            id: _item_.id,
            name: _item_.name
          };
          _arrType.push(_itemadd);
        }
      }
    }
    let _view=_doc.view +1;
    _doc.update({ view: _view },{ where: { idDoc:_doc.idDoc}}).catch(err =>{console.log(">> Error while update document: ", err);});
    let _rate=Math.round((Math.random() * (10 - 3) + 3) * 10) / 10;
    
    result={
      idDoc:_doc.idDoc,
      name:_doc.name,
      nameOther:_doc.nameOther,
      nameSeo:_doc.nameSeo,
      image:_doc.image!=null?_doc.image:'/image/noimage.jpg',
      desc:_doc.desc,
      year:_doc.year,
      view:_doc.view,
      date:_doc.date,
      tags:_doc.tags,
      view:_view,
      lsgenres:_arrGenres,
      lsarts:_arrArt,
      lsauths:_arrAuth,
      lsscans:_arrScan,
      lsstatus:_arrStatus,
      lstypes:_arrType,
      rate:_rate
    };
    res.set({'Content-Type': 'application/json'});
    res.send(result);
  } else {
    res.set({'Content-Type': 'application/json'});
    res.send('NOTOK');
  }

}
exports.findInfoMangaChapter = async (req, res) => {

  return detail_documents.findAll({ 
    where: { idDoc: req.params.id_document } ,
    attributes: [
      'slug',
      'idDoc',
      'idDetail',
      'nameChapter',
      'nameDoc',
      'nameSeoChapter',
      'date',
      'urlDowload'
    ],
    order: [
      ['date', 'DESC'],
    ]}).then((detail) => {
      res.set({'Content-Type': 'application/json'});
      res.send(detail);
    });
  

}
exports.findImageChapter = async (req, res) => {

  return detail_documents.findOne({ 
    where: { 
      idDoc: req.params.id_document ,
      idDetail: req.params.id_detail 
    } ,
    attributes: [
      'slug',
      'idDoc',
      'idDetail',
      'nameChapter',
      'nameDoc',
      'nameSeoChapter',
      'date',
      'source'
    ]}).then((detail) => {
      res.set({'Content-Type': 'application/json'});
      res.send(detail);
    });
}

exports.findGenresManga = async(req, res) => {
  let _where = {
    genres: {
          [db.Op.like]: {}
     }
  }
  if(req.params.id_genres!=="all" && req.params.id_genres!=="ALL")
  _where.genres[db.Op.like]='%' + req.params.id_genres + '%';
else
  _where={}
  let totalRecode=await documents.findAndCountAll({
    where:_where
    });
  let _itemselect=await cl_genres.findOne({
      where: {
        id:  req.params.id_genres
      }});
  let _page = _page_init;
  if(req.params.page!=null && req.params.page!='')
      _page=parseInt(req.params.page);
  let _offset = parseInt(req.params.count) * _page;
  return documents.findAll({
    
    order: [
      ['date', 'DESC'],
    ],
    where:_where,
    include: {
      model: detail_documents,
      limit: 3,
      attributes: [
        'slug',
      'idDoc',
      'idDetail',
      'nameChapter',
      'nameDoc',
      'nameSeoChapter',
      'date'
      ],
      order: [
        ['date', 'DESC'],
      ]
    },
    /*  order: [
       [detail_documents, 'TIME_LAST', 'DESC']
     ], */
    offset: _offset,
    limit: _page
  })
    .then((listItems) => {
      res.set({'Content-Type': 'application/json'});
     /*  if(totalRecode!==null &&_itemselect!==null){
        res.send({
          "totalRecode":totalRecode.count,
          "idSelect":_itemselect.ID,
          "nameSelect":_itemselect.NAME,
          "data":listItems
        });
      }
    })  */
    if(totalRecode!==null &&_itemselect!==null && req.params.id_genres!=="all" && req.params.id_genres!=="ALL"){
      res.send({
        "totalRecode":totalRecode.count,
        "idSelect":_itemselect.ID,
        "nameSelect":_itemselect.NAME,
        "data":listItems
      });
    }else{
      if(totalRecode!==null && (req.params.id_genres==="all" || req.params.id_genres==="ALL")){
        res.send({
          "totalRecode":totalRecode.count,
          "idSelect":'all',
          "nameSelect":'ALL',
          "data":listItems
        });
      }else{
        res.send({
          "totalRecode":totalRecode.count,
          "idSelect":req.params.id_genres,
          "nameSelect":req.params.id_genres,
          "data":listItems
        });
      }
    }
  })
    .catch((err) => {
      console.log(">> Error while finding findGenresManga: ", err);
    });
}

exports.findAuthManga = async(req, res) => {
 
  let _where = {
    auth: {
          [db.Op.like]: {}
     }
  }
  if(req.params.id_auth!=="all" && req.params.id_auth!=="ALL")
  _where.auth[db.Op.like]='%' + req.params.id_auth + '%';
else
  _where={}



  let totalRecode=await documents.findAndCountAll({
    where:_where});
  let _itemselect=await cl_auths.findOne({
      where: {
        id:  req.params.id_auth
      }});

  let _page = _page_init;
  if(req.params.page!=null && req.params.page!='')
      _page=parseInt(req.params.page);
  let _offset = parseInt(req.params.count) * _page;
  return documents.findAll({
     logging: (sql, queryObject) => {
      sendToElasticAndLogToConsole(sql, queryObject)
    }, 
    order: [
      ['date', 'DESC'],
    ],
    where:_where,
    include: {
      model: detail_documents,
      limit: 3,
      attributes: [
        'slug',
        'idDoc',
        'idDetail',
        'nameChapter',
        'nameDoc',
        'nameSeoChapter',
        'date'
      ],
      order: [
        ['date', 'DESC'],
      ]
    },
    offset: _offset,
    limit: _page
  })
    .then((listItems) => {
     // console.log(" item:::",listItems)

      res.set({'Content-Type': 'application/json'});
     
    if(totalRecode!=null &&_itemselect!==null && req.params.id_auth!="all" && req.params.id_auth!="ALL"){
      res.send({
        "totalRecode":totalRecode.count,
        "idSelect":_itemselect.id,
        "nameSelect":_itemselect.NAME,
        "data":listItems
      });
    }else{
      if(totalRecode!=null && (req.params.id_auth=="all" || req.params.id_auth=="ALL")){
       res.send({
          "totalRecode":totalRecode.count,
          "idSelect":'all',
          "nameSelect":'ALL',
          "data":listItems
        });
      }else{
        res.send({
          "totalRecode":totalRecode.count,
          "idSelect":req.params.id_auth,
          "nameSelect":req.params.id_auth,
          "data":listItems
        });
      }
    }
  }).catch((err) => {
      console.log(">> Error while finding findGenresManga: ", err);
    });
  console.log("end");
}

exports.findStatusManga = async(req, res) => {
  let _where = {
    status: {
          [db.Op.like]: {}
     }
  }
  if(req.params.id_status!=="all" && req.params.id_status!=="ALL")
  _where.status[db.Op.like]='%' + req.params.id_status + '%';
else
  _where={}
  let totalRecode=await documents.findAndCountAll({
    where:_where
  });
  let _itemselect=await cl_status.findOne({
      where: {
        id:  req.params.id_status
      }});
  let _page = _page_init;
  if(req.params.page!=null && req.params.page!='')
      _page=parseInt(req.params.page);
  let _offset = parseInt(req.params.count) * _page;
  return documents.findAll({
    order: [
      ['date', 'DESC'],
    ], where:_where,
    include: {
      model: detail_documents,
      limit: 3,
      attributes: [
        'slug',
        'idDoc',
        'idDetail',
        'nameChapter',
        'nameDoc',
        'nameSeoChapter',
        'date'
      ],
      order: [
        ['date', 'DESC'],
      ]
    },
    offset: _offset,
    limit: _page
  })
    .then((listItems) => {
      res.set({'Content-Type': 'application/json'});
      /* if(totalRecode!==null &&_itemselect!==null){
        res.send({
          "totalRecode":totalRecode.count,
          "idSelect":_itemselect.ID,
          "nameSelect":_itemselect.NAME,
          "data":listItems
        });
      }
    }) */
    if(totalRecode!==null &&_itemselect!==null && req.params.id_status!=="all" && req.params.id_status!=="ALL"){
      res.send({
        "totalRecode":totalRecode.count,
        "idSelect":_itemselect.id,
        "nameSelect":_itemselect.NAME,
        "data":listItems
      });
    }else{
      if(totalRecode!==null && (req.params.id_status==="all" || req.params.id_status==="ALL")){
        res.send({
          "totalRecode":totalRecode.count,
          "idSelect":'all',
          "nameSelect":'ALL',
          "data":listItems
        });
      }else{
        res.send({
          "totalRecode":totalRecode.count,
          "idSelect":req.params.id_status,
          "nameSelect":req.params.id_status,
          "data":listItems
        });
      }
    }
  })
    .catch((err) => {
      console.log(">> Error while finding findGenresManga: ", err);
    });
}

exports.findTypesManga=async(req, res) => {
  let _where = {
    type: {
          [db.Op.like]: {}
     }
  }
  if(req.params.id_type!=="all" && req.params.id_type!=="ALL")
    _where.type[db.Op.like]='%' + req.params.id_type + '%';
  else
    _where={}
  let totalRecode=await documents.findAndCountAll({
    where:_where
   });
  let _itemselect=await cl_types.findOne({
      where: {
        id:  req.params.id_type
      }});
  let _page = _page_init;
  if(req.params.page!=null && req.params.page!='')
      _page=parseInt(req.params.page);
  let _offset = parseInt(req.params.count) * _page;
  return documents.findAll({
    order: [
      ['date', 'DESC'],
    ],
    where:_where,
    include: {
      model: detail_documents,
      limit: 3,
      attributes: [
        'slug',
        'idDoc',
        'idDetail',
        'nameChapter',
        'nameDoc',
        'nameSeoChapter',
        'date'
      ],
      order: [
        ['date', 'DESC'],
      ]
    },
    offset: _offset,
    limit: _page
  })
    .then((listItems) => {
      res.set({'Content-Type': 'application/json'});
      /* if(totalRecode!==null &&_itemselect!==null){
        res.send({
          "totalRecode":totalRecode.count,
          "idSelect":_itemselect.ID,
          "nameSelect":_itemselect.NAME,
          "data":listItems
        });
      }
    }) */
    if(totalRecode!==null &&_itemselect!==null && req.params.id_type!=="all" && req.params.id_type!=="ALL"){
      res.send({
        "totalRecode":totalRecode.count,
        "idSelect":_itemselect.id,
        "nameSelect":_itemselect.name,
        "data":listItems
      });
    }else{
      if(totalRecode!==null && (req.params.id_type==="all" || req.params.id_type==="ALL")){
        res.send({
          "totalRecode":totalRecode.count,
          "idSelect":'all',
          "nameSelect":'ALL',
          "data":listItems
        });
      }else{
        res.send({
          "totalRecode":totalRecode.count,
          "idSelect":req.params.id_type,
          "nameSelect":req.params.id_type,
          "data":listItems
        });
      }
    }
  })
    .catch((err) => {
      console.log(">> Error while finding findGenresManga: ", err);
    });
}

exports.findArtsManga=async(req, res) => {
  let _where = {
    art: {
          [db.Op.like]: {}
     }
  }
  if(req.params.id_art!=="all" && req.params.id_art!=="ALL")
  _where.art[db.Op.like]='%' + req.params.id_art + '%';
  else
    _where={}
  let totalRecode=await documents.findAndCountAll({
    where:_where
  });
  let _itemselect=await cl_arts.findOne({
      where: {
        id:  req.params.id_art
      }});
  let _page = _page_init;
  if(req.params.page!=null && req.params.page!='')
      _page=parseInt(req.params.page);
  let _offset = parseInt(req.params.count) * _page;
  return documents.findAll({
    
    order: [
      ['date', 'DESC'],
    ], where:_where
    ,
    include: {
      model: detail_documents,
      limit: 3,
      attributes: [
        'slug',
        'idDoc',
        'idDetail',
        'nameChapter',
        'nameDoc',
        'nameSeoChapter',
        'date'
      ],
      order: [
        ['date', 'DESC'],
      ]
    },
    offset: _offset,
    limit: _page
  })
    .then((listItems) => {
      res.set({'Content-Type': 'application/json'});
      /* if(totalRecode!==null &&_itemselect!==null){
        res.send({
          "totalRecode":totalRecode.count,
          "idSelect":_itemselect.ID,
          "nameSelect":_itemselect.NAME,
          "data":listItems
        });
      }
    }) */
    if(totalRecode!==null &&_itemselect!==null && req.params.id_art!=="all" && req.params.id_art!=="ALL"){
      res.send({
        "totalRecode":totalRecode.count,
        "idSelect":_itemselect.id,
        "nameSelect":_itemselect.name,
        "data":listItems
      });
    }else{
      if(totalRecode!==null && (req.params.id_art==="all" || req.params.id_art==="ALL")){
        res.send({
          "totalRecode":totalRecode.count,
          "idSelect":'all',
          "nameSelect":'ALL',
          "data":listItems
        });
      }else{
        res.send({
          "totalRecode":totalRecode.count,
          "idSelect":req.params.id_art,
          "nameSelect":req.params.id_art,
          "data":listItems
        });
      }
    }
  })
    .catch((err) => {
      console.log(">> Error while finding findGenresManga: ", err);
    });
}

exports.findScansManga=async(req, res) => {
  let _where = {
    postedBy: {
          [db.Op.like]: {}
     }
  }
  if(req.params.id_scan!=="all" && req.params.id_scan!=="ALL")
  _where.postedBy[db.Op.like]='%' + req.params.id_scan + '%';
  else
    _where={}
  let totalRecode=await documents.findAndCountAll({
    where:_where
  });
  let _itemselect=await cl_posteds.findOne({
      where: {
        id:  req.params.id_scan
      }});
  let _page = _page_init;
  if(req.params.page!=null && req.params.page!='')
      _page=parseInt(req.params.page);
  let _offset = parseInt(req.params.count) * _page;
  return documents.findAll({
    order: [
      ['date', 'DESC'],
    ],
    where:_where,
    include: {
      model: detail_documents,
      limit: 3,
      attributes: [
        'slug',
        'idDoc',
        'idDetail',
        'nameChapter',
        'nameDoc',
        'nameSeoChapter',
        'date'
      ],
      order: [
        ['date', 'DESC'],
      ]
    },
    offset: _offset,
    limit: _page
  })
    .then((listItems) => {
      res.set({'Content-Type': 'application/json'});
      if(totalRecode!==null &&_itemselect!==null && req.params.id_scan!=="all" && req.params.id_scan!=="ALL"){
        res.send({
          "totalRecode":totalRecode.count,
          "idSelect":_itemselect.id,
          "nameSelect":_itemselect.name,
          "data":listItems
        });
      }else{
        if(totalRecode!==null && (req.params.id_scan==="all" || req.params.id_scan==="ALL")){
          res.send({
            "totalRecode":totalRecode.count,
            "idSelect":'all',
            "nameSelect":'ALL',
            "data":listItems
          });
        }else{
          res.send({
            "totalRecode":totalRecode.count,
            "idSelect":req.params.id_scan,
            "nameSelect":req.params.id_scan,
            "data":listItems
          });
        }
      }
    })


/*       if(totalRecode!==null &&_itemselect!==null){
        res.send({
          "totalRecode":totalRecode.count,
          "idSelect":_itemselect.ID,
          "nameSelect":_itemselect.NAME,
          "data":listItems
        });
      }
    }) */
    .catch((err) => {
      console.log(">> Error while finding findGenresManga: ", err);
    });
}

exports.findYearsManga=async(req, res) => {
  let _where = {
    year: {
            [db.Op.like]: {}
       }
    }
  if(req.params.id_year!=="all" && req.params.id_year!=="ALL")
    _where.year[db.Op.like]='%' + req.params.id_year + '%';
  else
    _where={}
  let totalRecode=await documents.findAndCountAll({
    where:_where
  });
  let _itemselect=await cl_years.findOne({
      where: {
        id:  req.params.id_year
      }});

  let _page = _page_init;
  if(req.params.page!=null && req.params.page!='')
      _page=parseInt(req.params.page);
  let _offset = parseInt(req.params.count) * _page;
  return documents.findAll({
    
    order: [
      ['date', 'DESC'],
    ],
    where:_where,
    include: {
      model: detail_documents,
      limit: 3,
      attributes: [
        'slug',
      'idDoc',
      'idDetail',
      'nameChapter',
      'nameDoc',
      'nameSeoChapter',
      'date'
      ],
      order: [
        ['date', 'DESC'],
      ]
    },
    /*  order: [
       [detail_documents, 'TIME_LAST', 'DESC']
     ], */
    offset: _offset,
    limit: _page
    })
    .then((listItems) => {
      res.set({'Content-Type': 'application/json'});
      if(totalRecode!==null &&_itemselect!==null && req.params.id_year!=="all" && req.params.id_year!=="ALL"){
        res.send({
          "totalRecode":totalRecode.count,
          "idSelect":_itemselect.id,
          "nameSelect":_itemselect.name,
          "data":listItems
        });
      }else{
        if(totalRecode!==null && (req.params.id_year==="all" || req.params.id_year==="ALL")){
          res.send({
            "totalRecode":totalRecode.count,
            "idSelect":'all',
            "nameSelect":'ALL',
            "data":listItems
          });
        }else{
          res.send({
            "totalRecode":totalRecode.count,
            "idSelect":req.params.id_year,
            "nameSelect":req.params.id_year,
            "data":listItems
          });
        }
      }
    })
    .catch((err) => {
      console.log(">> Error while finding findGenresManga: ", err);
    });

}

exports.findAlphabetManga=async(req, res) => {
  let _where = {
    nameSeo: {
          [db.Op.like]: {}
     }
  }
if(req.params.id_alpha!=="all" && req.params.id_alpha!=="ALL")
  _where.nameSeo[db.Op.like]= req.params.id_alpha + '%';
else
  _where={}

  let totalRecode=await documents.findAndCountAll({
    where:_where
  });
 
  let _page = _page_init;
  if(req.params.page!=null && req.params.page!='')
      _page=parseInt(req.params.page);
  let _offset = parseInt(req.params.count) * _page;
  return documents.findAll({
   
    order: [
      ['date', 'DESC'],
    ],
    where:_where,
    include: {
      model: detail_documents,
      limit: 3,
      attributes: [
        'slug',
        'idDoc',
        'idDetail',
        'nameChapter',
        'nameDoc',
        'nameSeoChapter',
        'date'
      ],
      order: [
        ['date', 'DESC'],
      ]
    },
    /*  order: [
       [detail_documents, 'TIME_LAST', 'DESC']
     ], */
    offset: _offset,
    limit: _page
  })
    .then((listItems) => {
      res.set({'Content-Type': 'application/json'});
      /* if(totalRecode!==null){
        res.send({
          "totalRecode":totalRecode.count,
          "idSelect":req.params.id_alpha,
          "nameSelect":req.params.id_alpha,
          "data":listItems
        });
      }
    }) */
    if(totalRecode!==null && req.params.id_alpha!=="all" && req.params.id_alpha!=="ALL"){
      res.send({
        "totalRecode":totalRecode.count,
        "idSelect":req.params.id_alpha,
        "nameSelect":req.params.id_alpha,
        "data":listItems
      });
    }else{
      if(totalRecode!==null && (req.params.id_alpha==="all" || req.params.id_alpha==="ALL")){
        res.send({
          "totalRecode":totalRecode.count,
          "idSelect":'all',
          "nameSelect":'ALL',
          "data":listItems
        });
      }else{
        res.send({
          "totalRecode":totalRecode.count,
          "idSelect":req.params.id_alpha,
          "nameSelect":req.params.id_alpha,
          "data":listItems
        });
      }
    }
  })
    .catch((err) => {
      console.log(">> Error while finding findGenresManga: ", err);
    });
}
exports.findMangaHot = async(req, res) => {
  //console.log("req.params.count:"+req.params.count);
  let totalRecode=await documents.findAndCountAll();
  let _page = _page_init;
  if(req.params.page!=null && req.params.page!='')
      _page=parseInt(req.params.page);
  //let _offset=0;
  let _offset = parseInt(req.params.count)* _page;
  return documents.findAll({
    order: [
      ['view', 'DESC'],
    ],
    include: {
      model: detail_documents,
      limit: 3,
      attributes: [
        'slug',
      'idDoc',
      'idDetail',
      'nameChapter',
      'nameDoc',
      'nameSeoChapter',
      'date'
      ],
      order: [
        ['date', 'DESC'],
      ]
    },
    offset: _offset,
    limit: _page
  })
    .then((listItems) => {
      //console.log("totalRecode",totalRecode);
      /*   res.send(listItems);
        res.json(getStandardResponse(true, "", topics)); */
      res.set({'Content-Type': 'application/json'});
      if(totalRecode!==null){
        res.send({
          "totalRecode":totalRecode.count,
          "data":listItems
        });
      }else{
        res.send({
          "totalRecode":0,
          "data":listItems
        });
      }
      
    })
    .catch((err) => {
      console.log(">> Error while finding findMangaLastUpdate: ", err);
    });
}
exports.findMangaComplate = async(req, res) => {
  //console.log("req.params.count:"+req.params.count);
  let totalRecode=await documents.findAndCountAll({
    where: {
      status: {
        [db.Op.like]:  '%completo%'
      }
    }
  });
  let _page = _page_init;
  if(req.params.page!=null && req.params.page!='')
      _page=parseInt(req.params.page);
  //let _offset=0;
  let _offset = parseInt(req.params.count) * _page;
  return documents.findAll({
    where: {
      status: {
        [db.Op.like]:  '%completo%'
      }
    },
    order: [
      ['view', 'DESC'],
    ],
    include: {
      model: detail_documents,
      limit: 3,
      attributes: [
        'slug',
        'idDoc',
        'idDetail',
        'nameChapter',
        'nameDoc',
        'nameSeoChapter',
        'date'
      ],
      order: [
        ['date', 'DESC'],
      ]
    },
    offset: _offset,
    limit: _page
  })
    .then((listItems) => {
      //console.log("totalRecode",totalRecode);
      /*   res.send(listItems);
        res.json(getStandardResponse(true, "", topics)); */
      res.set({'Content-Type': 'application/json'});
      if(totalRecode!==null){
        res.send({
          "totalRecode":totalRecode.count,
          "data":listItems
        });
      }else{
        res.send({
          "totalRecode":0,
          "data":listItems
        });
      }
      
    })
    .catch((err) => {
      console.log(">> Error while finding findMangaLastUpdate: ", err);
    });
}
exports.findMangaByKeyWord = async(req, res) => {
  
  let _page = 5;
  if(req.params.page!=null && req.params.page!='')
      _page=parseInt(req.params.page);
  //let _offset=0;
  let _count=0;
  if(req.params.count!=null && req.params.count!='')
    _count=parseInt(req.params.count);
  let _offset =  _count* _page;
  return documents.findAll({
    where: {
      [db.Op.or]: [
        {  
          name: {
            [db.Op.like]:  '%'+req.params.keyword+'%'
          } 
        },
        {
          nameSeo: {
            [db.Op.like]:  '%'+req.params.keyword+'%'
          } 
        },
        {
          nameOther: {
            [db.Op.like]:  '%'+req.params.keyword+'%'
          } 
        }
      ]
    },
    order: [
      ['view', 'DESC'],
    ],
    offset: _offset,
    limit: _page
  })
    .then((listItems) => {
      //console.log("totalRecode",totalRecode);
      /*   res.send(listItems);
        res.json(getStandardResponse(true, "", topics)); */
      res.set({'Content-Type': 'application/json'});

        res.send(listItems);
     
    })
    .catch((err) => {
      console.log(">> Error while finding findMangaLastUpdate: ", err);
    });
}

exports.findMangaByKeyWordPage = async(req, res) => {
  let totalRecode=await documents.findAndCountAll({
    where: {
      [db.Op.or]: [
        {  
          name: {
            [db.Op.like]:  '%'+req.params.keyword+'%'
          } 
        },
        {
          nameSeo: {
            [db.Op.like]:  '%'+req.params.keyword+'%'
          } 
        },
        {
          nameOther: {
            [db.Op.like]:  '%'+req.params.keyword+'%'
          } 
        }
      ]
    }  
  });
  let _page = _page_init;
  if(req.params.page!=null && req.params.page!='')
      _page=parseInt(req.params.page);
  //let _offset=0;
  let _offset =  parseInt(req.params.count) * _page;
  return documents.findAll({
    where: {
      [db.Op.or]: [
        {  
          name: {
            [db.Op.like]:  '%'+req.params.keyword+'%'
          } 
        },
        {
          nameSeo: {
            [db.Op.like]:  '%'+req.params.keyword+'%'
          } 
        },
        {
          nameOther: {
            [db.Op.like]:  '%'+req.params.keyword+'%'
          } 
        }
      ]
    },
    order: [
      ['view', 'DESC'],
    ],
    include: {
      model: detail_documents,
      limit: 3,
      attributes: [
        'slug',
        'idDoc',
        'idDetail',
        'nameChapter',
        'nameDoc',
        'nameSeoChapter',
        'date'
      ],
      order: [
        ['date', 'DESC'],
      ]
    },
    offset: _offset,
    limit: _page
  })
    .then((listItems) => {
      res.set({'Content-Type': 'application/json'});

      if(totalRecode!==null){
        res.send({
          "totalRecode":totalRecode.count,
          "idSelect":req.params.keyword,
          "nameSelect":req.params.keyword,
          "data":listItems
        });
      }else{
        res.send({
          "totalRecode":0,
          "idSelect":req.params.keyword,
          "nameSelect":req.params.keyword,
          "data":listItems
        });
      }
    })
    .catch((err) => {
      console.log(">> Error while finding findMangaLastUpdate: ", err);
    });
}
//findMangaByKeyWord
exports.findRandomManga = async(req, res) => {
  //console.log("req.params.count:"+req.params.count);
  //let _page=30;
  //let _offset=0;
  //let _offset=parseInt(req.params.count)*_page;
  return documents.findOne({
    include: {
      model: detail_documents,
      /*  order: [
         ['TIME_LAST', 'DESC'],
       ] */
    },
    order: [
      [detail_documents, 'date', 'DESC'],
      db.Sequelize.literal('rand()'),
    ],
    limit: 1
  })
    .then((listItems) => {
      res.set({'Content-Type': 'application/json'});
      res.send(listItems);
    })
    .catch((err) => {
      console.log(">> Error while finding findMangaLastUpdate: ", err);
    });
}
//site map
exports.findSiteMapDoc = async(req, res) => {
  //console.log("req.params.count:"+req.params.count);
  let _page = parseInt(req.params.take);
  //let _offset=0;
  let _offset = parseInt(req.params.skip) * _page;
  return documents.findAll({
    
    order: [
      ['date', 'DESC'],
    ],
    offset: _offset,
    limit: _page
  })
    .then((listItems) => {
      //console.log("totalRecode",totalRecode);
      /*   res.send(listItems);
        res.json(getStandardResponse(true, "", topics)); */
      res.set({'Content-Type': 'application/json'});
      res.send(listItems);

    })
    .catch((err) => {
      console.log(">> Error while finding findMangaLastUpdate: ", err);
    });
}
exports.findSiteMapDetail = async(req, res) => {
  //console.log("req.params.count:"+req.params.count);
  let _page = parseInt(req.params.take);
  //let _offset=0;
  let _offset = parseInt(req.params.skip) * _page;
  return detail_documents.findAll({
    attributes: [
      'slug',
      'idDoc',
      'idDetail',
      'nameChapter',
      'nameDoc',
      'nameSeoChapter',
      'date'
    ],
    order: [
      ['date', 'DESC'],
    ],
    offset: _offset,
    limit: _page
  })
    .then((listItems) => {
      //console.log("totalRecode",totalRecode);
      /*   res.send(listItems);
        res.json(getStandardResponse(true, "", topics)); */
      res.set({'Content-Type': 'application/json'});
      res.send(listItems);
      
    })
    .catch((err) => {
      console.log(">> Error while finding findMangaLastUpdate: ", err);
    });
}
exports.findSiteMapArt = async(req, res) => {
  //console.log("req.params.count:"+req.params.count);
  let _page = parseInt(req.params.take);
  //let _offset=0;
  let _offset = parseInt(req.params.skip) * _page;
  return cl_arts.findAll({
    offset: _offset,
    limit: _page
  })
    .then((listItems) => {
      res.set({'Content-Type': 'application/json'});
      res.send(listItems);
      
    })
    .catch((err) => {
      console.log(">> Error while finding findMangaLastUpdate: ", err);
    });
}
exports.findSiteMapAuthor = async(req, res) => {
  //console.log("req.params.count:"+req.params.count);
  let _page = parseInt(req.params.take);
  //let _offset=0;
  let _offset = parseInt(req.params.skip) * _page;
  return cl_auths.findAll({
    offset: _offset,
    limit: _page
  })
    .then((listItems) => {
      res.set({'Content-Type': 'application/json'});
      res.send(listItems);
      
    })
    .catch((err) => {
      console.log(">> Error while finding findMangaLastUpdate: ", err);
    });
}
exports.findSiteMapYear= async(req, res) => {
  //console.log("req.params.count:"+req.params.count);
  let _page = parseInt(req.params.take);
  //let _offset=0;
  let _offset = parseInt(req.params.skip) * _page;
  return cl_years.findAll({
    offset: _offset,
    limit: _page
  })
    .then((listItems) => {
      res.set({'Content-Type': 'application/json'});
      res.send(listItems);
      
    })
    .catch((err) => {
      console.log(">> Error while finding findMangaLastUpdate: ", err);
    });
}
exports.findSiteMapScan= async(req, res) => {
  //console.log("req.params.count:"+req.params.count);
  let _page = parseInt(req.params.take);
  //let _offset=0;
  let _offset = parseInt(req.params.skip) * _page;
  return cl_scans.findAll({
    offset: _offset,
    limit: _page
  })
    .then((listItems) => {
      res.set({'Content-Type': 'application/json'});
      res.send(listItems);
      
    })
    .catch((err) => {
      console.log(">> Error while finding findMangaLastUpdate: ", err);
    });
}
exports.findSiteMapType= async(req, res) => {
  //console.log("req.params.count:"+req.params.count);
  let _page = parseInt(req.params.take);
  //let _offset=0;
  let _offset = parseInt(req.params.skip) * _page;
  return cl_types.findAll({
    offset: _offset,
    limit: _page
  })
    .then((listItems) => {
      res.set({'Content-Type': 'application/json'});
      res.send(listItems);
      
    })
    .catch((err) => {
      console.log(">> Error while finding findMangaLastUpdate: ", err);
    });
}
exports.findSiteMapGenres= async(req, res) => {
  //console.log("req.params.count:"+req.params.count);
  let _page = parseInt(req.params.take);
  //let _offset=0;
  let _offset = parseInt(req.params.skip) * _page;
  return cl_genres.findAll({
    offset: _offset,
    limit: _page
  })
    .then((listItems) => {
      res.set({'Content-Type': 'application/json'});
      res.send(listItems);
      
    })
    .catch((err) => {
      console.log(">> Error while finding findMangaLastUpdate: ", err);
    });
}

exports.findAutoSiteMapDoc = async(req, res) => {
  //console.log("req.params.count:"+req.params.count);
  let _page = parseInt(req.params.take);
  //let _offset=0;
  let _offset = 0;
  return documents.findAll({
    order: [
      ['date', 'DESC'],
    ],
    offset: _offset,
    limit: _page
  })
    .then((listItems) => {
      res.set({'Content-Type': 'application/json'});
      res.send(listItems);

    })
    .catch((err) => {
      console.log(">> Error while finding findMangaLastUpdate: ", err);
    });
}
