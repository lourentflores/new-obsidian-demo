import { BrowserCache, React, useObsidian } from '../deps.ts';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      button: any;
      div: any;
      h1: any;
      p: any;
    }
  }
}
const Test = () => {
  const { cache, query, mutate, setCache, clearCache } = useObsidian();
  const queryStr = `
    {
      movies {
        id
        __typename
        title
        genre
      }
    }
  `;

  const mutationStr = `
    mutation {
      addMovie(input: {title: "Inglorious Bastards", genre: ACTION, releaseYear: 2009}){
        id
        title
        genre
      }
    }
  `;

  async function updateFunc(cache: any, respObj: any) {
    const result = await cache.read(queryStr);
    if (result) {
      const { movies } = result.data;
      console.log('movies', movies);
      const newMovie = respObj.data.addMovie;
      const updatedMovieArr = [...movies, newMovie];
      console.log('updatedMovieArr', updatedMovieArr);
      const updatedRespObj = { data: { movies: updatedMovieArr } };
      console.log('updatedRespObj', updatedRespObj);
      cache.write(queryStr, updatedRespObj);
    }
  }

  async function handleClick() {
    const result = await query(queryStr);
    console.log('result from query', result);
    setTimeout(() => setCache(new BrowserCache(cache.storage)), 1);
  }
  async function handleClick2() {
    const result = await mutate(mutationStr, { update: updateFunc });
    console.log('result from mutation', result);
    setTimeout(() => setCache(new BrowserCache(cache.storage)), 1);
  }
  return (
    <div className="app">
      <h1>I'm a sub component. do I have cache access?</h1>
      <button onClick={handleClick}>query</button>
      <button onClick={handleClick2}>mutation</button>
      {JSON.stringify(cache.storage)}
    </div>
  );
};
export default Test;
