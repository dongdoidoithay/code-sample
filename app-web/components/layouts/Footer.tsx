
import React from 'react';
import configPrefix from '../../config/configRawPrefix';
import configSeting from '../../config/configRawSeting';


//load data
const Footer = () => {

    return (
        <>
            <div id="footer">
                <div className="container">
                    <div className="content">
                        <div className="azlist hidden-sm hidden-xs">
                            <div className="heading"><b>{configSeting.lbl_az_bottom}</b><span>{configSeting.lbl_az_bottom_tip}</span></div>
                            <ul>
                                <li><a title="All" href={`${configPrefix.url_host}${configPrefix.pageALLAlphaBet}/${configPrefix.startAlphaBet}${"all"}`}>All</a></li>
                                {/* <li><a title="0-9" href={`${configPrefix.url_host}${configPrefix.pageALLAlphaBet}/${configPrefix.startAlphaBet}${"0-9"}`}>0-9</a></li> */}
                                <li><a title="A" href={`${configPrefix.url_host}${configPrefix.pageALLAlphaBet}/${configPrefix.startAlphaBet}${"a"}`}>A</a></li>
                                <li><a title="B" href={`${configPrefix.url_host}${configPrefix.pageALLAlphaBet}/${configPrefix.startAlphaBet}${"b"}`}>B</a></li>
                                <li><a title="C" href={`${configPrefix.url_host}${configPrefix.pageALLAlphaBet}/${configPrefix.startAlphaBet}${"c"}`}>C</a></li>
                                <li><a title="D" href={`${configPrefix.url_host}${configPrefix.pageALLAlphaBet}/${configPrefix.startAlphaBet}${"d"}`}>D</a></li>
                                <li><a title="E" href={`${configPrefix.url_host}${configPrefix.pageALLAlphaBet}/${configPrefix.startAlphaBet}${"e"}`}>E</a></li>
                                <li><a title="F" href={`${configPrefix.url_host}${configPrefix.pageALLAlphaBet}/${configPrefix.startAlphaBet}${"f"}`}>F</a></li>
                                <li><a title="G" href={`${configPrefix.url_host}${configPrefix.pageALLAlphaBet}/${configPrefix.startAlphaBet}${"g"}`}>G</a></li>
                                <li><a title="H" href={`${configPrefix.url_host}${configPrefix.pageALLAlphaBet}/${configPrefix.startAlphaBet}${"h"}`}>H</a></li>
                                <li><a title="I" href={`${configPrefix.url_host}${configPrefix.pageALLAlphaBet}/${configPrefix.startAlphaBet}${"i"}`}>I</a></li>
                                <li><a title="J" href={`${configPrefix.url_host}${configPrefix.pageALLAlphaBet}/${configPrefix.startAlphaBet}${"j"}`}>J</a></li>
                                <li><a title="K" href={`${configPrefix.url_host}${configPrefix.pageALLAlphaBet}/${configPrefix.startAlphaBet}${"k"}`}>K</a></li>
                                <li><a title="L" href={`${configPrefix.url_host}${configPrefix.pageALLAlphaBet}/${configPrefix.startAlphaBet}${"l"}`}>L</a></li>
                                <li><a title="M" href={`${configPrefix.url_host}${configPrefix.pageALLAlphaBet}/${configPrefix.startAlphaBet}${"m"}`}>M</a></li>
                                <li><a title="N" href={`${configPrefix.url_host}${configPrefix.pageALLAlphaBet}/${configPrefix.startAlphaBet}${"n"}`}>N</a></li>
                                <li><a title="O" href={`${configPrefix.url_host}${configPrefix.pageALLAlphaBet}/${configPrefix.startAlphaBet}${"o"}`}>O</a></li>
                                <li><a title="P" href={`${configPrefix.url_host}${configPrefix.pageALLAlphaBet}/${configPrefix.startAlphaBet}${"p"}`}>P</a></li>
                                <li><a title="Q" href={`${configPrefix.url_host}${configPrefix.pageALLAlphaBet}/${configPrefix.startAlphaBet}${"q"}`}>Q</a></li>
                                <li><a title="R" href={`${configPrefix.url_host}${configPrefix.pageALLAlphaBet}/${configPrefix.startAlphaBet}${"r"}`}>R</a></li>
                                <li><a title="S" href={`${configPrefix.url_host}${configPrefix.pageALLAlphaBet}/${configPrefix.startAlphaBet}${"s"}`}>S</a></li>
                                <li><a title="T" href={`${configPrefix.url_host}${configPrefix.pageALLAlphaBet}/${configPrefix.startAlphaBet}${"t"}`}>T</a></li>
                                <li><a title="U" href={`${configPrefix.url_host}${configPrefix.pageALLAlphaBet}/${configPrefix.startAlphaBet}${"u"}`}>U</a></li>
                                <li><a title="V" href={`${configPrefix.url_host}${configPrefix.pageALLAlphaBet}/${configPrefix.startAlphaBet}${"v"}`}>V</a></li>
                                <li><a title="W" href={`${configPrefix.url_host}${configPrefix.pageALLAlphaBet}/${configPrefix.startAlphaBet}${"w"}`}>W</a></li>
                                <li><a title="X" href={`${configPrefix.url_host}${configPrefix.pageALLAlphaBet}/${configPrefix.startAlphaBet}${"x"}`}>X</a></li>
                                <li><a title="Y" href={`${configPrefix.url_host}${configPrefix.pageALLAlphaBet}/${configPrefix.startAlphaBet}${"y"}`}>Y</a></li>
                                <li><a title="Z" href={`${configPrefix.url_host}${configPrefix.pageALLAlphaBet}/${configPrefix.startAlphaBet}${"z"}`}>Z</a></li>
                            </ul>
                        </div>
                        <div className="main row no-gutters">
                            <div className="col-sm-12 col-md-6  hidden-sm">
                                <div className="row">
                                    <div className="links col-md-3 col-sm-12">
                                        <div className="heading">Links</div>
                                        <ul>
                                            <li><a title="Site map " href={`${configPrefix.url_host}/server-sitemap.xml`}>SiteMap</a></li>
                                            <li><a title="Site map " href={`http://www.google.sk/ping?sitemap=${configPrefix.url_host}/server-sitemap.xml`}>Google SiteMap</a></li>
                                            <li><a title="Site map " href={`http://www.bing.com/ping?sitemap=${configPrefix.url_host}/server-sitemap.xml`}>Bing SiteMap</a></li>
                                            
                                            <li><a title="A-Z" href={`${configPrefix.url_host}${configPrefix.pageALLAlphaBet}/${configPrefix.startAlphaBet}${"all"}`}>A-Z List</a></li>
                                        </ul>
                                    </div>
                                    <div className="links col-md-3 col-sm-12">
                                        <div className="heading">Others Site</div>
                                        <ul>
                                            <li><a title="kakalomanga.xyz" href="https://kakalomanga.xyz">kakalomanga.xyz</a></li>
                                            <li><a title="sellmanga.xyz" href="https://sellmanga.xyz">sellmanga.xyz</a></li>
                                            <li><a title="kakalotmanga.xyz" href="https://kakalotmanga.xyz">kakalotmanga.xyz</a></li>
                                            <li><a title="mangadc.xyz" href="https://mangadc.xyz">mangadc.xyz</a></li>
                                            <li><a title="domain.com" href="https://domain.com">domain.com</a></li>
                                            <li><a title="supermanga.xyz" href="https://supermanga.xyz">supermanga.xyz</a></li>
                                            <li><a title="mangahere.fit" href="https://mangahere.fit">mangahere.fit</a></li>
                                            <li><a title="domain.com" href="https://domain.com">domain.com</a></li>
                                            <li><a title="leitor.xyz" href="https://leitor.xyz">leitor.xyz</a></li>
                                            <li><a title="leitor.today" href="https://leitor.today">leitor.today</a></li>
                                        </ul>
                                    </div>
                                    <div className="links col-md-3 col-sm-12">
                                        <div className="heading">Others Site</div>
                                        <ul>
                                            <li><a title="mangabat.fit" href="https://mangabat.fit">mangabat.fit</a></li>
                                            <li><a title="mangabat.icu" href="https://mangabat.icu">mangabat.icu</a></li>
                                            <li><a title="manga24.xyz" href="https://manga24.xyz">manga24.xyz</a></li>
                                            <li><a title="manga47.xyz" href="https://manga47.xyz">manga47.xyz</a></li>
                                            <li><a title="yaoi-chan.xyz" href="https://yaoi-chan.xyz">yaoi-chan.xyz</a></li>
                                            <li><a title="unionleitor.xyz" href="https://unionleitor.xyz">unionleitor.xyz</a></li>
                                            <li><a title="unionmangas.xyz" href="https://unionmangas.xyz">unionmangas.xyz</a></li>
                                            <li><a title="unionmanga.xyz" href="https://unionmanga.xyz">unionmanga.xyz</a></li>
                                            <li><a title="mangadragon.xyz" href="https://mangadragon.xyz">mangadragon.xyz</a></li>
                                            <li><a title="mangaquest.xyz" href="https://mangaquest.xyz">mangaquest.xyz</a></li>
                                        </ul>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="col-md-4 mainc">
                                <div className="logo"></div>
                                <p className="mt-4">Copyright ©{configSeting.lbl_domain_Page}</p>
                                <a href="/viewstats/?SID=4639606&f=2" target="_blank" ><div id="histatsC"><img src="//s4is.histats.com/stats/i/4639606.gif?4639606&103"/></div></a>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
        </>
    )
};


export default Footer;
