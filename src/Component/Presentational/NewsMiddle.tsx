import React, { useEffect } from 'react';
import './NewsMiddle.scss';
import Singular from './Singular';
import { Article } from '../../Typings/types';

function NewsMiddle(props: any) { //middle presentational component
  let NewsInfo = props.datas?.articles; //잘못된 데이터를 가리키고 있었음.
  const normalWidth = "600px";

  if (NewsInfo) {
    NewsInfo = NewsInfo.slice(5);
  }
  else {
    NewsInfo = new Array(15);
    for (let i = 0; i < NewsInfo.length; i++) {
      NewsInfo[i] = undefined;
    }
  }

  console.log(NewsInfo);

  return (
    <div className='Middle_Layout_flex'>
      <div className='Middle_Layout'>
        {NewsInfo.map((article: Article | undefined, index: number) => {
          // 2개씩 자르기 위해 인덱스를 2로 나눈 몫을 계산
          // 짝수 인덱스일 때만 Singular 컴포넌트 렌더링
          if (index % 2 === 0) { // 0 2 4
            // 현재 인덱스 그룹의 다음 인덱스에 해당하는 article을 가져옴
            const nextArticle = NewsInfo[index + 1];
            return (
              <div className='Middle_Div' key={index}>
                <Singular article={article} singleWidth={normalWidth} />
                {
                  index != NewsInfo.length-1 ? <Singular article={nextArticle} singleWidth={normalWidth} /> : null
                }
              </div>
            );
          }
          return null; // 홀수 인덱스일 때는 렌더링하지 않음
        })}
      </div>
    </div>
  );
}

export default NewsMiddle;