import Image from 'next/image'

const myLoader = ({ src, width, quality }:any) => {
  return `${src}?w=${width}&q=${quality || 100}`
}

const ImageShow = ({ src, title }:any) => {
  return (
      
    <Image
      loader={myLoader}
      src={src}
      alt={title}
      width="100%"
       height="100%"
      //height={1200}
      //height={null}
      loading="lazy"
      placeholder="blur"
      //objectPosition='image'
      className="imageShow"
      layout="responsive"
      objectFit="none"
    
    />
   
  )
}
 {/* <Image src="/path/to/image.jpg" alt="" title="" width="100%" height="100%" layout="responsive" objectFit="contain"/> */}
export default ImageShow