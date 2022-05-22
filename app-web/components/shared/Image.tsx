import { useEffect, useState } from "react"
import { useSelector } from 'react-redux';
import Lazyload from 'react-lazyload'

const Image = ({ src: _src, width, height, alt, classCss, title }) => {
  if (_src === null || _src === undefined)
    _src = "/image/noimage.jpg";
  const loadingUrl = "/image/ajax-loader.gif"
  const ErrorUrl = "/image/noimage.jpg"
  const [src, setSrc] = useState(loadingUrl)
  const [ischangesrc, setischangesrc] = useState(false)
  let root = ''

  const addDefaultSrc = (e) => {
    //console.log("event image ", { e })
    let _type_rp = e.type;
    //console.log("event image ", { _type_rp })
    if (_type_rp == "error") {
      setSrc(ErrorUrl);
    } else {
      if (!ischangesrc) {
        setischangesrc(true)
        let indexOfFirst = _src.indexOf('mangas_files');
        let _src_fix = '';
        if (root != undefined && root != '' && indexOfFirst != '-1') {
          _src_fix = root + '/' + _src.substring(indexOfFirst);
          setSrc(_src_fix);
        }
      }
      else { setSrc(ErrorUrl); }
    }
  }
  const onLoad = () => {
    if (src === loadingUrl) {
      setSrc(_src);
    }
  }
  return (
    <>
      {
        //console.log('build imgae -->src',src)
      }
      <Lazyload throttle={10} width={width} height={height} >
        <img src={src} title={title} onLoad={onLoad} onError={(e) => addDefaultSrc(e)} />
      </Lazyload>
    </>
  )

}

export default Image