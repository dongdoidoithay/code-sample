import parse from 'html-react-parser';
const AdsMobile=()=>{
    //destop
    return(
        <>
      <div className='d-none d-sm-block'>
      {  
        parse(`<iframe src="https://media.aso1.net/js/ifr.html#id=81329" width="300" height="250" align="center" frameborder="0" hspace="0" vspace="0" marginheight="0" marginwidth="0" scrolling="no" style="width:300px; height:250px; overflow:hidden; border:none;display: block;"></iframe>`)
      } 
      </div>
     
        </>
    )
}
export default AdsMobile