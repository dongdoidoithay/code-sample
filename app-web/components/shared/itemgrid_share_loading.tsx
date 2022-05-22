import Head from 'next/head';
import React from 'react';


const ItemGrid_share_v2_loading = () => {
    let listmanga = [1,2,3,4]

    return (
        <>
          <Head> <link rel="stylesheet" href="/loadding.css" /></Head>
         <div className="section box  my-1">
       
                {listmanga && listmanga.map((data,index) => (
                        <div className="box-loading" key={index}>
                                <div className="box-thumbnail"></div>
                                <div className="box-line-df"></div>
                                <div className="box-line-lg"></div>
                        </div>
                        ))}

            </div>      
               
        </>
    );
}
export default ItemGrid_share_v2_loading;
