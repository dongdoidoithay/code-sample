import { useState } from "react"
import { useSelector } from 'react-redux';


const ImageView = ({src: _src,width,height,alt,classCss,title,index}) => {
 // let root = useSelector(state => state.cl.root)
  const loadingUrl = "/image/ajax-loader.gif"
  const ErrorUrl = "/image/noimage.jpg"
  const [src, setSrc] = useState(loadingUrl)
  const [src1, setSrc1] = useState(_src)
  const [ischangesrc, setischangesrc] = useState(false)
  const onLoad = () => {
    if(src === loadingUrl) {
      setSrc(_src);
    }
  }
  const addDefaultSrc=()=>{
      setSrc(ErrorUrl);
  }
  return <img width={width} height={height} src={src} onLoad={onLoad} alt={alt} className={classCss} onError={addDefaultSrc} title={title}/>

}

export default ImageView