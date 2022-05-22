import Link from 'next/link';
import React from 'react';
import { useState, useEffect } from 'react';
import configPrefix from '../../config/configRawPrefix';
import configSeting from '../../config/configRawSeting';
import { getStorage } from '../../redux/actions/localFx';


const HistoryManga = () => {
    let _list = JSON.parse(getStorage(configSeting.localReadViewPo));
    const [list, setList] = useState([]);
    useEffect(() => {
        if (_list !== null && _list.length > 0) {
            let incomlist = _list.filter(word => word.comicId != null).reverse().slice(0, 6);
            setList(incomlist);
        }
    }, []);
    return (
        <> {(list && list.length > 0) && <div className="section box mt-1 hidden-sm">
            <div className="section-header">
                <div className="title">
                    <h2>{`${configSeting.lbl_his_history}`}</h2>
                </div>
            </div>
            <div className="section__categories p-2" >
                {(list && list.length > 0) && list.map((item) => {
                    if (item.url_detail == null || item.url_detail == undefined) {
                        return (
                            <div className="novel-reading-item" key={item.comicId}>
                                <div className="title">
                                    <h3>
                                        <Link href={`${configPrefix.url_host}${configPrefix.pageManga}/${configPrefix.startManga}${item.comicId}`}>
                                            <a title={`${item.namecomic}`}>{item.namecomic}</a>
                                        </Link>
                                    </h3>
                                </div>
                                <div className="text-center chapter text-info">
                                    <Link href={`${configPrefix.url_host}${configPrefix.pageViewManga}/${configPrefix.startViewmanga}${item.chapterId}`}>
                                        <a title={`${item.namecomic}-${item.namechapter && item.namechapter}`}>{item.namechapter && item.namechapter.replace('Capítulo ', 'Cap ')}</a>
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div className="novel-reading-item" key={item.comicId}>
                                <div className="title">
                                    <h3>
                                        <Link href={`${item.url_detail}`}>
                                            <a title={`${item.namecomic}`}>{item.namecomic}</a>
                                        </Link>
                                    </h3>
                                </div>
                                <div className="text-center chapter text-info">
                                    <Link href={`${item.url_view}`}>
                                        <a title={`${item.namecomic}|${configSeting.lbl_text_chapter}${item.namechapter && item.namechapter}`}>{configSeting.lbl_start_chapter}{item.namechapter && item.namechapter}</a>
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                }
                )
                }
            </div>
        </div>
        }
        </>
    )

}
export default HistoryManga;
