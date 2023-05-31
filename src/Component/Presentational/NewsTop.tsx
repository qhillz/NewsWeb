import React, { useEffect } from 'react';
import './NewsTop.scss';
import Singular from './Singular';

function NewsTop(props : any) { //middle presentational component
  const NewsInfo = props.datas?.articles;
  const normalWidth = "400px";

  return (
  <div className='Layout_flex'>
  <div className='Layout'>
    <div className="Top_view">
      <div className='Layout_1'>
        <div className="l_left_one">
            <Singular article={NewsInfo ? NewsInfo[0] : undefined} singleWidth={normalWidth}/>
        </div>
      </div>
      <div className='Layout_2'>
        <div className="r_left_one">
            <div>
              <Singular article={NewsInfo ? NewsInfo[1] : undefined} singleWidth={normalWidth}/>
            </div>
            <div>
              <Singular article={NewsInfo ? NewsInfo[2] : undefined} singleWidth={normalWidth}/>
            </div>
        </div>
        <div className="r_right_one_ab">
          <div className="r_right_one">
            <div>
              <Singular article={NewsInfo ? NewsInfo[3] : undefined} singleWidth={normalWidth}/>
            </div>
            <div>
              <Singular article={NewsInfo ? NewsInfo[4] : undefined} singleWidth={normalWidth}/>
            </div>
          </div>
        </div>
      </div>  
    </div>
  </div>
  </div>
  );
}

export default NewsTop;