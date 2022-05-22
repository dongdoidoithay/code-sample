import Head from 'next/head';
import React from 'react';


const HomeFeatureLoading = () => {
    let listmanga = [1,2,3,4,5,6,7,8,9]

    return (
        <>
          <Head> <link rel="stylesheet" href="/loadding.css" /></Head>
         <div className="section box  my-1">
       
                {listmanga && listmanga.map((data,index) => (
                        <div className="box-loading" key={index}>
                                <div className="box-thumbnail"></div>

                                <div className="box-line-sm"></div>
                                <div className="box-line-xs"></div>
                        </div>
                        ))}

            </div>      
               
        </>
    );
}
export default HomeFeatureLoading;
