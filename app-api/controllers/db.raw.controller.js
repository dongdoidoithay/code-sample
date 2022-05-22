const db = require("../models/index-raw");
const cl_auths = db.cl_auths;
const cl_genres = db.cl_genres;
const cl_status = db.cl_status;
const cl_arts = db.cl_arts;
const cl_years = db.cl_years;
const cl_types = db.cl_types;
const cl_posteds = db.cl_posteds;
const cl_serializations = db.cl_serializations;


const comments = db.comments;
const detail_documents = db.detail_documents;
const documents = db.documents;

/******COMMON*****/
function sendToElasticAndLogToConsole(sql, queryObject) {
 // console.log(sql)
}

/**********CREATE**************/
//#region 
//auth
exports.createAuth = (auth) => {
  return cl_auths.create(auth)
    .then((auth) => {
      //console.log(">> Created auth: " + JSON.stringify(auth, null, 4));
      return auth;
    })
    .catch((err) => {
      console.log(">> Error while creating auth: ", err);
    });
};

//genres
exports.createGenres = (genre) => {
  return cl_genres.create(genre)
    .then((genre) => {
      //console.log(">> Created genre: " + JSON.stringify(genre, null, 4));
      return genre;
    })
    .catch((err) => {
      console.log(">> Error while creating genre: ", err);
    });
};

//Status
exports.createStatus = (status) => {
  return cl_status.create(status)
    .then((status) => {
      //console.log(">> Created status: " + JSON.stringify(status, null, 4));
      return status;
    })
    .catch((err) => {
      console.log(">> Error while creating status: ", err);
    });
};
//arts
exports.createArts = (arts) => {
  return cl_arts.create(arts)
    .then((arts) => {
      //console.log(">> Created status: " + JSON.stringify(status, null, 4));
      return arts;
    })
    .catch((err) => {
      console.log(">> Error while creating arts: ", err);
    });
};
//years
exports.createYears = (years) => {
  return cl_years.create(years)
    .then((years) => {
      return years;
    })
    .catch((err) => {
      console.log(">> Error while creating years: ", err);
    });
};

//types
exports.createTypes = (types) => {
  return cl_types.create(types)
    .then((types) => {
      return types;
    })
    .catch((err) => {
      console.log(">> Error while creating types: ", err);
    });
};
//posteds
exports.createPosteds = (posteds) => {
  return cl_posteds.create(posteds)
    .then((posteds) => {
      return posteds;
    })
    .catch((err) => {
      console.log(">> Error while creating posteds: ", err);
    });
};
//cl_serializations
exports.createSerializations = (serializations) => {
  return cl_serializations.create(serializations)
    .then((serializations) => {
      return serializations;
    })
    .catch((err) => {
      console.log(">> Error while creating serializations: ", err);
    });
};


// Comments
exports.createComments = (comment) => {
  return comments.create(comment)
    .then((comment) => {
      //console.log(">> Created comment: " + JSON.stringify(comment, null, 4));
      return comment;
    })
    .catch((err) => {
      //console.log(">> Error while creating comment: ", err);
    });
};

//detail_document
exports.createDetail = (detail) => {
  return detail_documents.create(detail)
    .then((detail) => {
      //console.log(">> Created detail: " + JSON.stringify(detail, null, 4));
      return detail;
    })
    .catch((err) => {
      console.log(">> Error while creating detail: ", err);
    });
};
exports.CreateBulkDetail = (arrdetail) => {
  return detail_documents.bulkCreate(arrdetail,{
    returning:true
  })
    .then((arrdetail) => {
      //console.log(">> Created arrdetail: " + JSON.stringify(arrdetail, null, 4));
      return arrdetail;
    })
    .catch((err) => {
      console.log(">> Error while creating arrdetail: ", err);
    });
};

//document
exports.createDocument = (document) => {
  return documents.create(document)
    .then((document) => {
      //console.log(">> Created document: " + JSON.stringify(document, null, 4));
      return document;
    })
    .catch((err) => {
      console.log(">> Error while creating document: ", err);
    });
};
//#endregion

/*************FIND ALL*****************/
//#region 
// Auh
exports.findAllAuth = () => {
  return cl_auths.findAll({
    logging: (sql, queryObject) => {
      sendToElasticAndLogToConsole(sql, queryObject)
    },

  }).then((auths) => {
    return auths;
  });
};
// Genres
exports.findAllGenres = () => {
  return cl_genres.findAll({
    logging: (sql, queryObject) => {
      sendToElasticAndLogToConsole(sql, queryObject)
    },

  }).then((genres) => {
    return genres;
  });
};
// Status
exports.findAllStatus = () => {
  return cl_status.findAll({
    logging: (sql, queryObject) => {
      sendToElasticAndLogToConsole(sql, queryObject)
    },

  }).then((status) => {
    return status;
  });
};

//#endregion

/**************Find By ID****************/
//#region 
// mục đích check crawl item
exports.findAuthById = (id) => {
  return cl_auths.findByPk(id, {
    logging: (sql, queryObject) => {
      sendToElasticAndLogToConsole(sql, queryObject)
    },
  })
    .then((auths) => {
      return auths;
    })
    .catch((err) => {
      console.log(">> Error while finding auths: ", err);
    });
};

exports.findGenresById = (id) => {
  return cl_genres.findByPk(id).then((genres) => {
      return genres;
    })
    .catch((err) => {
      console.log(">> Error while finding genres: ", err);
    });
};

exports.findStatusById = (id) => {
  return cl_status.findByPk(id).then((status) => {
      return status;
    })
    .catch((err) => {
      console.log(">> Error while finding status: ", err);
    });
};

exports.findArtById = (id) => {
  return cl_arts.findByPk(id).then((arts) => {
      return arts;
    })
    .catch((err) => {
      console.log(">> Error while finding arts: ", err);
    });
};

exports.findYearById = (id) => {
  return cl_years.findByPk(id).then((year) => {
      return year;
    })
    .catch((err) => {
      console.log(">> Error while finding year: ", err);
    });
};

exports.findTypeById = (id) => {
  return cl_types.findByPk(id).then((type) => {
      return type;
    })
    .catch((err) => {
      console.log(">> Error while finding type: ", err);
    });
};

exports.findPostedById = (id) => {
  return cl_posteds.findByPk(id).then((posted) => {
      return posted;
    })
    .catch((err) => {
      console.log(">> Error while finding posted: ", err);
    });
};

exports.findSerializationsById = (id) => {
  return cl_serializations.findByPk(id).then((serialization) => {
      return serialization;
    })
    .catch((err) => {
      console.log(">> Error while finding serialization: ", err);
    });
};

exports.findDetailById = (id) => {
  return detail_documents.findByPk(id).then((detail) => {
      return detail;
    })
    .catch((err) => {
      console.log(">> Error while finding detail: ", err);
    });
};

exports.findDetailByDocAndId = (idDoc,idDetail) => {
  return detail_documents.findOne(
    { where: { idDetail: idDetail,idDoc:idDoc } }).then((detail) => {
    return detail;
  })
  .catch((err) => {
    console.log(">> Error while finding detail: ", err);
  });

};

exports.findDocumentlById = (id) => {
  return documents.findByPk(id).then((document) => {
      return document;
    })
    .catch((err) => {
      console.log(">> Error while finding document: ", err);
    });
};

//#endregion

