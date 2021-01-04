import { React, useObsidian } from '../../deps.ts';
// import CardsDisplay from './CardsDisplay.tsx';
import QueryDisplay from './QueryDisplay.tsx';
import MutationDisplay from './MutationDisplay.tsx';
import Cache from '../../../obsidian/src/CacheClassBrowser.js';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
    }
  }
}

const initialState = {
  firstName: '',
  lastName: '',
  nickname: '',
  title: '',
  releaseYear: '',
};

const useInput = (init: any) => {
  const [value, setValue] = (React as any).useState(init);
  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  return [value, onChange];
};

const CardsContainer = () => {
  const { query, mutate, cache, setCache, clearCache } = useObsidian();
  const [queryTime, setQueryTime] = (React as any).useState(0);
  const [response, setResponse] = (React as any).useState('');
  const [display, setDisplay] = (React as any).useState('');
  const [genre, setGenre] = useInput('');
  const [cardGenre, setCardGenre] = useInput('')
  
  const [
    { firstName, lastName, nickname, title, releaseYear},
    setState,
  ] = (React as any).useState(initialState);

  const clearState = () => {
    setState({ ...initialState });
  };

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setState((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const allMoviesQuery = `
    query { 
      movies {
        id
        title
        releaseYear
        actors {
          id
          firstName
          lastName
        }
        genre
      }
    }
  `;

  const allActorsQuery = `
    query {
      actors {
        id
        firstName
        lastName
        nickname
        movies {
          id
          title
          releaseYear
          genre
        }
      }
    }
  `;

  const allMoviesByGenre = `
    query {
      movies(input: {genre: ${genre}}){
        id
        title
        releaseYear
        actors {
          id
          firstName
          lastName
        }
      }
    }
  `;

  const moviesByReleaseYear = `
  query {
    movies(input: {order : ASC }) {
      id
      title
      releaseYear
      actors {
        id
        firstName
        lastName
      }
      genre
    }
}
  `;

  const addMovie = `
    mutation {
    addMovie(input: {title: "${title}", releaseYear: ${releaseYear}, genre: ${cardGenre} }) {
      id
      title
      releaseYear
      genre
    }
  }
  `;

  const addActor = `
    mutation {
    addActor(input: {firstName: "${firstName}", lastName: "${lastName}", nickname: "${nickname}" }) {
      id
      firstName
      lastName
      nickname
    }
  }
  `;

  const fetchAllMovies = async (e: any) => {
    const start = Date.now();
    const res = await query(allMoviesQuery);
    setQueryTime(Date.now() - start);
    setResponse(res.data.movie);
    setDisplay('all movies');
    setTimeout(() => setCache(new Cache(cache.storage)), 1);
    console.log('all movies', res);
  };

  const fetchAllActors = async (e: any) => {
    const start = Date.now();
    const res = await query(allActorsQuery);
    setQueryTime(Date.now() - start);
    setResponse(res.data.actor);
    setDisplay('all actors');
    setTimeout(() => setCache(new Cache(cache.storage)), 1);
    console.log('all actors', res);
  };

  const fetchMoviesByGenre = async (e: any) => {
    const start = Date.now();
    const res = await query(allMoviesByGenre);
    setQueryTime(Date.now() - start);
    setResponse(res.data.movies);
    setDisplay('by genre');
    setTimeout(() => setCache(new Cache(cache.storage)), 1);
    console.log('by genre', res);
  };

  const fetchReleaseYear = async (e: any) => {
    const start = Date.now();
    const res = await query(moviesByReleaseYear);
    setQueryTime(Date.now() - start);
    setResponse(res.data.movies);
    setDisplay('by year');
    setTimeout(() => setCache(new Cache(cache.storage)), 1);
    console.log('by year', res);
  };

  const addMovieCard = async (e: any) => {
    e.preventDefault();
    const start = Date.now();
    const res = await mutate(addMovie);
    // option obj with update key on
    setQueryTime(Date.now() - start);
    setResponse(res.data.addMovie);
    setDisplay('all movies');
    setTimeout(() => setCache(new Cache(cache.storage)), 1);
    await clearState();
    console.log('add movie', res);
  };

  const addActorCard = async (e: any) => {
    e.preventDefault();
    const start = Date.now();
    const res = await mutate(addActor);
    if (res.data.addActor.nickname === '') {
      res.data.addActor.nickname = null;
    }
    setQueryTime(Date.now() - start);
    setResponse(res.data.addActor);
    setDisplay('all actors');
    setTimeout(() => setCache(new Cache(cache.storage)), 1);
    await clearState();
    console.log('add card', res);
    console.log('cache', cache.storage);
  };

  return (
    <div className="cardsContainer">
      {/* <CardsDisplay display={display} /> */}
      <QueryDisplay
        allMovies={fetchAllMovies}
        allActors={fetchAllActors}
        byGenre={fetchMoviesByGenre}
        byYear={fetchReleaseYear}
        genre={genre}
        setGenre={setGenre}
      />
      <MutationDisplay
        addMovieCard={addMovieCard}
        addActorCard={addActorCard}
        firstName={firstName}
        lastName={lastName}
        nickname={nickname}
        title={title}
        releaseYear={releaseYear}
        cardGenre={cardGenre}
        setCardGenre={setCardGenre}
        onChange={onChange}
      />
    </div>
  );
};

export default CardsContainer;