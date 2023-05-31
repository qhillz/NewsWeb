import React from 'react';
import { useSelector } from 'react-redux';
import { CategoryState } from '../../Modules/Category';
import { useQuery } from 'react-query';
import NewsMiddle from '../Presentational/NewsMiddle';

function NewsMiddleContainer() {

const category = useSelector((state : CategoryState) => state.category); //hook

const fetchNews = async () => {
  const response = await fetch(`https://newsapi.org/v2/everything?q=${category}&pageSize=20&apiKey=abe245f54440465c8aa82ed625c69cda`);
  const data = await response.json();
  return data;
};

const { data } = useQuery(`${category}2`, fetchNews,{
  refetchOnWindowFocus : false, 
  staleTime : 500000,
}); 
// fetch the data and caching

  return (
    <div>
      <NewsMiddle datas={data} />
    </div>
  );
}

export default NewsMiddleContainer;