import Disqus  from "disqus-react"

const DisqusComments = ({ id,title,url,configSeting }) => {
  //const disqusShortname = configSeting.lbl_domain_name;

  //console.log("DiscussionEmbed",{id,url,title})
  const disqusShortname = "rawkuma-1"
 /* const disqusConfig = {
    url: "http://localhost:3000",
    identifier: "article-id",
    title: "Title of Your Article"
  }*/

  const disqusConfig = {
    url: url,
    identifier:id, // Single post id
    title: title // Single post title
  }
  return (
    <>
     <Disqus.DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
    {/* <div className="oke">
      <iframe id="dsq-app2964" name="dsq-app382" allowTransparency={true} frameBorder="0" scrolling="no" tabIndex={0} title="Disqus" width="100%" src={_src} style={{"width":"1px !important","minWidth":"100% !important","border":"none !important","overflow":"hidden !important","height":"2172px!important"}}></iframe>

      <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div> */}
    </>
    
  )
}

export default DisqusComments;