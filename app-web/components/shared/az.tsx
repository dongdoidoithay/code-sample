import React from 'react';

const AZ = ({ configSeting, configPrefix }) => {

    return (
        <>
            <div className='section box mt-1 hidden-sm'>
                <div className="section-header">
                    <div className="title">
                        <h2>{`${configSeting.lbl_az_bottom}`}</h2>
                    </div>
                </div>
                <div className="section__categories p-2">
                    <div className="category-item-year"><a title="All" href={`${configPrefix.url_host}${configPrefix.pageAlphaBet}/${configPrefix.startAlphaBet}${"all"}`}>All</a></div>
                    <div className="category-item-year"><a title="A" href={`${configPrefix.url_host}${configPrefix.pageAlphaBet}/${configPrefix.startAlphaBet}${"a"}`}>A</a></div>
                    <div className="category-item-year"><a title="B" href={`${configPrefix.url_host}${configPrefix.pageAlphaBet}/${configPrefix.startAlphaBet}${"b"}`}>B</a></div>
                    <div className="category-item-year"><a title="C" href={`${configPrefix.url_host}${configPrefix.pageAlphaBet}/${configPrefix.startAlphaBet}${"c"}`}>C</a></div>
                    <div className="category-item-year"><a title="D" href={`${configPrefix.url_host}${configPrefix.pageAlphaBet}/${configPrefix.startAlphaBet}${"d"}`}>D</a></div>
                    <div className="category-item-year"><a title="E" href={`${configPrefix.url_host}${configPrefix.pageAlphaBet}/${configPrefix.startAlphaBet}${"e"}`}>E</a></div>
                    <div className="category-item-year"><a title="F" href={`${configPrefix.url_host}${configPrefix.pageAlphaBet}/${configPrefix.startAlphaBet}${"f"}`}>F</a></div>
                    <div className="category-item-year"><a title="G" href={`${configPrefix.url_host}${configPrefix.pageAlphaBet}/${configPrefix.startAlphaBet}${"g"}`}>G</a></div>
                    <div className="category-item-year"><a title="H" href={`${configPrefix.url_host}${configPrefix.pageAlphaBet}/${configPrefix.startAlphaBet}${"h"}`}>H</a></div>
                    <div className="category-item-year"><a title="I" href={`${configPrefix.url_host}${configPrefix.pageAlphaBet}/${configPrefix.startAlphaBet}${"i"}`}>I</a></div>
                    <div className="category-item-year"><a title="J" href={`${configPrefix.url_host}${configPrefix.pageAlphaBet}/${configPrefix.startAlphaBet}${"j"}`}>J</a></div>
                    <div className="category-item-year"><a title="K" href={`${configPrefix.url_host}${configPrefix.pageAlphaBet}/${configPrefix.startAlphaBet}${"k"}`}>K</a></div>
                    <div className="category-item-year"><a title="L" href={`${configPrefix.url_host}${configPrefix.pageAlphaBet}/${configPrefix.startAlphaBet}${"l"}`}>L</a></div>
                    <div className="category-item-year"><a title="M" href={`${configPrefix.url_host}${configPrefix.pageAlphaBet}/${configPrefix.startAlphaBet}${"m"}`}>M</a></div>
                    <div className="category-item-year"><a title="N" href={`${configPrefix.url_host}${configPrefix.pageAlphaBet}/${configPrefix.startAlphaBet}${"n"}`}>N</a></div>
                    <div className="category-item-year"><a title="O" href={`${configPrefix.url_host}${configPrefix.pageAlphaBet}/${configPrefix.startAlphaBet}${"o"}`}>O</a></div>
                    <div className="category-item-year"><a title="P" href={`${configPrefix.url_host}${configPrefix.pageAlphaBet}/${configPrefix.startAlphaBet}${"p"}`}>P</a></div>
                    <div className="category-item-year"><a title="Q" href={`${configPrefix.url_host}${configPrefix.pageAlphaBet}/${configPrefix.startAlphaBet}${"q"}`}>Q</a></div>
                    <div className="category-item-year"><a title="R" href={`${configPrefix.url_host}${configPrefix.pageAlphaBet}/${configPrefix.startAlphaBet}${"r"}`}>R</a></div>
                    <div className="category-item-year"><a title="S" href={`${configPrefix.url_host}${configPrefix.pageAlphaBet}/${configPrefix.startAlphaBet}${"s"}`}>S</a></div>
                    <div className="category-item-year"><a title="T" href={`${configPrefix.url_host}${configPrefix.pageAlphaBet}/${configPrefix.startAlphaBet}${"t"}`}>T</a></div>
                    <div className="category-item-year"><a title="U" href={`${configPrefix.url_host}${configPrefix.pageAlphaBet}/${configPrefix.startAlphaBet}${"u"}`}>U</a></div>
                    <div className="category-item-year"><a title="V" href={`${configPrefix.url_host}${configPrefix.pageAlphaBet}/${configPrefix.startAlphaBet}${"v"}`}>V</a></div>
                    <div className="category-item-year"><a title="W" href={`${configPrefix.url_host}${configPrefix.pageAlphaBet}/${configPrefix.startAlphaBet}${"w"}`}>W</a></div>
                    <div className="category-item-year"><a title="X" href={`${configPrefix.url_host}${configPrefix.pageAlphaBet}/${configPrefix.startAlphaBet}${"x"}`}>X</a></div>
                    <div className="category-item-year"><a title="Y" href={`${configPrefix.url_host}${configPrefix.pageAlphaBet}/${configPrefix.startAlphaBet}${"y"}`}>Y</a></div>
                    <div className="category-item-year"><a title="Z" href={`${configPrefix.url_host}${configPrefix.pageAlphaBet}/${configPrefix.startAlphaBet}${"z"}`}>Z</a></div>
                </div>

            </div>
        </>
    )
}
export default AZ;