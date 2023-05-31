import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import Question from '../img/Question.jpg';
import { CategoryState } from '../Modules/Category';
import NewsTop from './Presentational/NewsTop';

interface PromiseFulfilledResult<T> {
    status: "fulfilled";
    value: T;
}

interface PromiseRejectedResult {
    status: "rejected";
    reason: any;
}

type PromiseSettledResult<T> = PromiseFulfilledResult<T> | PromiseRejectedResult;

let imagePromiseArr: Promise<string | Blob>[] = [];
let afterPromise: PromiseSettledResult<any>[] = [];
let local_idx = 0;
let blobedImg = new Blob([new ArrayBuffer(Question)], { type: "image/jpg" });

function Backup() {
  const category = useSelector((state : CategoryState) => state.category);
  const [done, imgDownloadDone] = useState(false);

  async function waitForPromises(promises: Promise<string | Blob>[]) {
    try {
      afterPromise = await Promise.allSettled(promises);
      return afterPromise;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  function handleError(event: React.SyntheticEvent<HTMLImageElement, Event>){
    const imgElement = event.currentTarget;
    imgElement.src = Question;
  }
  
  const fetchNews = async () => {
    const response = await fetch(`/api/everything?q=${category}&apiKey=abe245f54440465c8aa82ed625c69cda`);
    const data = await response.json();
    return data;
  };

  const { isLoading, isError, data } = useQuery(category, fetchNews,{refetchOnWindowFocus : false, staleTime : 500000}); 
  // fetch the data and caching

  useEffect(()=>{
    imgDownloadDone(false);
    imagePromiseArr = [];
    afterPromise = [];

    if(data){
      data.articles.map((article: any) =>{
        if(article.urlToImage === null){
          imagePromiseArr.push(Question);
        }
        else{
            imagePromiseArr.push(
            fetch(`https://cors-anywhere.herokuapp.com/${article.urlToImage}`)
              .then((response : Response) =>{ 
                if(!response.ok){
                  return blobedImg;
                }
                return response.blob(); 
              })
              .then(blob => {
                return URL.createObjectURL(blob);
              })
              .catch((error : Error) => {
                return Question;
              })
            );
          }
        }
      );
      
      waitForPromises(imagePromiseArr)
      .then(results => {
          imgDownloadDone(true);
      })
      .catch(error => console.error(error));
    }

  },[category,data]);

  return (
    <div>
      <h1>{category} News </h1>
      {data ? data.articles.slice(0,4).map((article : any,index : number) => (
        <div key={article.url}>
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          {done ? <div><img src={(afterPromise[index] as PromiseFulfilledResult<any>).value} onError={(event)=>handleError(event)} alt={Question}></img></div> : null};
        </div>
      )) : null}
      {/* {data ? <NewsTop data={data.articles.slice(0,4)}/> : null} */}

      {
        /* TOP */
        /* Middle */
        /* BOTTOM */
      }
    </div>
  );
}

export default Backup;