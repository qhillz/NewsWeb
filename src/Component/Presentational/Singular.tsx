import React, { useEffect, useState } from 'react';
import Question from '../../img/Question.jpg';
import './Singular.scss';
import { Article } from '../../Typings/types';
import { useMediaQuery } from 'react-responsive';

function Singular(props: { article: Article | undefined, singleWidth : string }) {

  const [image, setImage] = useState<string | null>(null);
  const is_Mb = useMediaQuery({query: "(max-width:768px)"});
  const ErrorImg = new Blob([new ArrayBuffer(Question)], { type: "image/jpg" });
  let title: any = undefined;
  let content = undefined;
  let urlToImage : string | undefined = undefined;
  const single_width = props.singleWidth;
  
  if(props.article){
    title = props.article.title;
    content = props.article.content;
    urlToImage = props.article.urlToImage;
  }

  function handleError(event: React.SyntheticEvent<HTMLImageElement, Event>) {
    const imgElement = event.currentTarget;
    imgElement.src = Question;
  }

  useEffect(() => {
    if(urlToImage !== undefined){

      console.log(urlToImage);
      async function fetchData() {
        await fetch(`https://cors-anywhere.herokuapp.com/${urlToImage}`)
          .then((response: Response) => {
            if (!response.ok) {
              return ErrorImg;
            }
  
            return response.blob();
          })
          .then(blob => {
            return setImage(URL.createObjectURL(blob));
          })
          .catch(() => {
            return Question;
          })
      }
  
      fetchData();
    }
  }, [urlToImage]); //urlToImage 존재해야함.

  useEffect(() => {
    if(title == undefined){
      setImage(null);
    }
  },[title]);

  return (
    <>
      {
        image ?
          (
            !is_Mb ?
              (
                <div style={{ width: "100%", display: "inline-block" }} className='Single_box'>
                  <picture style={{ width: "100%", display: "flex", margin: "5px 0", justifyContent: "center" }} >
                    <img width={single_width} height="400px" src={image!} onError={() => setImage(Question)} />
                  </picture>
                  <div style={{ width: "100%", display: "flex", justifyContent: "center" }} className='Single_box_flex'>
                    <h1 style={{ width: single_width, height: "52px", fontSize: "20px", overflow: "hidden", textOverflow: "ellipsis" }} className='S_title'>{title}</h1>
                  </div>
                  <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "5px 0" }} className='Single_box_flex'>
                    <div style={{ width: single_width, height: "120px", fontSize: "16px", overflow: "hidden", textOverflow: "ellipsis" }} className='S_content'>{content}</div>
                  </div>
                </div>
              )
              :
              (
                <div style={{ width: "100%", display: "inline-block" }} className='Single_box'>
                  <picture style={{ width: "100%", display: "flex", margin: "5px 0", justifyContent: "center" }} >
                    <img width="300px" height="300px" src={image!} onError={() => setImage(Question)} />
                  </picture>
                  <div style={{ width: "100%", display: "flex", justifyContent: "center" }} className='Single_box_flex'>
                    <h1 style={{ width: "300px", height: "52px", fontSize: "20px", overflow: "hidden", textOverflow: "ellipsis" }} className='S_title'>{title}</h1>
                  </div>
                  <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "5px 0" }} className='Single_box_flex'>
                    <div style={{ width: "300px", height: "200px", fontSize: "16px", overflow: "hidden", textOverflow: "ellipsis", display: "flex", alignItems: "center", justifyContent:"center" }} className='S_content'>{content}</div>
                  </div>
                </div>
              )
          )

          :

          (
            !is_Mb ?
              (
                <div style={{ width: "100%", display: "inline-block" }} className='Single_box Single_box_sk'>
                  <div style={{ width: "100%", display: "flex", justifyContent: "center" }} className='Single_box_sk_flex'>
                    <div style={{ display: "inline-block", width: single_width, height: "400px", position: "relative" }} className='Single_box_sk_img'></div>
                  </div>
                  <div style={{ width: "100%", display: "flex", justifyContent: "center" }} className='Single_box_sk_flex'>
                    <div style={{ width: single_width, height: "52px", position: "relative" }} className='S_title Single_box_sk_title'></div>
                  </div>
                  <div style={{ width: "100%", display: "flex", justifyContent: "center" }} className='Single_box_sk_flex'>
                    <div style={{ width: single_width, height: "120px", position: "relative" }} className='S_content Single_box_sk_explain'></div>
                  </div>
                </div>
              )
              :
              (
                <div style={{ width: "100%", display: "inline-block" }} className='Single_box Single_box_sk'>
                  <div style={{ width: "100%", display: "flex", justifyContent: "center" }} className='Single_box_sk_flex'>
                    <div style={{ display: "inline-block", width: "300px", height: "300px", position: "relative" }} className='Single_box_sk_img'></div>
                  </div>
                  <div style={{ width: "100%", display: "flex", justifyContent: "center" }} className='Single_box_sk_flex'>
                    <div style={{ width: "300px", height: "52px", position: "relative" }} className='S_title Single_box_sk_title'></div>
                  </div>
                  <div style={{ width: "100%", display: "flex", justifyContent: "center" }} className='Single_box_sk_flex'>
                    <div style={{ width: "300px", height: "200px", position: "relative" }} className='S_content Single_box_sk_explain'></div>
                  </div>
                </div>
              )
          )
      }
    </>
  );
}

export default Singular;