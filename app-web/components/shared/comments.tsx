import Link from 'next/link';
import React from 'react';
import configPrefix from '../../config/configRawPrefix';
import configSeting from '../../config/configRawSeting';
import { getStorage } from '../../redux/actions/localFx';
import { useSelector } from 'react-redux';

const CommentsManga = () => {
    let mangacomments = useSelector((state:any) => state.home_raw.mangacomments)
    
    return (
        <>
            {
                mangacomments &&
                <div className='section box mt-1 hidden-sm' >
                    <div className="section-header">
                        <div className="title">
                            <h2>{configSeting.lbl_top_comments}</h2>
                        </div>
                    </div>
                    <div className="section__categories p-2" id="reading-list">
                        {mangacomments.slice(0, 12).map((item) => (

                            <div className="top-item" key={item.iD_DOCUMENT}>
                                <div className="inner">
                                    <div className="meta">
                                        <span className="date-comment">{item.iD_COMMENT}</span>
                                        <h3>
                                            <Link href={`${configPrefix.url_host}/${item.iD_DOCUMENT}`}>
                                                <a title={`${item.namedocument}`}>{item.namedocument}</a>
                                            </Link>
                                        </h3>
                                        <h4 className="chap-item">
                                            {item.commentpost}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
    );
}
export default CommentsManga;
