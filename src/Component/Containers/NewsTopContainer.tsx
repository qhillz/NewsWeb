import React from 'react';
import { useQuery } from 'react-query';
import NewsTop from '../Presentational/NewsTop';

function NewsTopContainer() {

const category = "general";

const fetchNews = async () => {
  const response = await fetch(`https://newsapi.org/v2/everything?q=${category}&pageSize=5&apiKey=abe245f54440465c8aa82ed625c69cda`);
  const data = await response.json();
  return data;
};

const { data } = useQuery(category, fetchNews,{
  refetchOnWindowFocus : false, 
  staleTime : 500000,
}); 
// fetch the data and caching

  return (
    <>
      <NewsTop datas={data}/>
    </>
  );
}

export default NewsTopContainer;