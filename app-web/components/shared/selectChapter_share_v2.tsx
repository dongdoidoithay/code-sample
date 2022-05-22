import React from 'react';


const SelectChapter_share_v2 = ({ listchapter, currentChapter, idDoc, configSeting, configPrefix }) => {

  const handleClick = (e) => {
    e.preventDefault()
    //console.log("e.target.value",e.target.value)
    //console.log("currentChapter",currentChapter)
    // router.push(e.target.value)
    // router.
    window.location.href = e.target.value;
  }

  return (
    <>
      <select defaultValue={`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${idDoc}/${configPrefix.startViewmanga}${currentChapter}`} onChange={(e) => handleClick(e)} className="select-chapter">
        {listchapter && listchapter.map((item) => {
          if (item.idDetail != null && item.idDetail != undefined) {
            return (<option value={`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${item.idDoc}/${configPrefix.startViewmanga}${item.idDetail}`} key={item.idDetail} >{configSeting.lbl_start_chapter}{item.idDetail}</option>)

          } else {
            if (item.id != null && item.id != undefined) {
              return (<option value={`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${idDoc}/${configPrefix.startViewmanga}${item.id}`} key={item.id}>{item.name}</option>)

            }
          }
        })
        }
      </select>
    </>
  );
}


export default SelectChapter_share_v2;
