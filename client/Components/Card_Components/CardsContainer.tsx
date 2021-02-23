import { React, useObsidian, BrowserCache } from '../../../deps.ts';
import CardsDisplay from './CardsDisplay.tsx';
import QueryDisplay from './QueryDisplay.tsx';
import MutationDisplay from './MutationDisplay.tsx';
import Dashboard from '../Dashboard/Dashboard.tsx';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      h2: any;
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

const CardsContainer = (props: any) => {
  const { query, mutate, cache, setCache, clearCache } = useObsidian();
  const [queryTime, setQueryTime] = (React as any).useState(0);
  const [gqlRequest, setGqlRequest] = (React as any).useState('');
  const [response, setResponse] = (React as any).useState('');
  const [display, setDisplay] = (React as any).useState('');
  const [genre, setGenre] = useInput('');
  const [cardGenre, setCardGenre] = useInput('');

  const [
    { firstName, lastName, nickname, title, releaseYear },
    setState,
  ] = (React as any).useState(initialState);

  const clearState = () => {
    setState({ ...initialState });
  };

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setState((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const allMoviesQuery = `query { 
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

  const allActorsQuery = `query {
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

  const allMoviesByGenre = `query {
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

  const moviesByReleaseYear = `query {
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

  const addMovie = `mutation {
    addMovie(input: {title: "${title}", releaseYear: ${releaseYear}, genre: ${cardGenre} }) {
      id
      title
      releaseYear
      genre
    }
  }
  `;

  const addActor = `mutation {
    addActor(input: {firstName: "${firstName}", lastName: "${lastName}", nickname: "${nickname}" }) {
      id
      firstName
      lastName
      nickname
    }
  }
  `;

  const fetchAllMovies = async (e: any) => {
    setGqlRequest(allMoviesQuery);
    const start = Date.now();
    const res = await query(allMoviesQuery);
    setQueryTime(Date.now() - start);
    setDisplay('');
    setResponse(res.data);
    setDisplay('all movies');
    setTimeout(() => setCache(new BrowserCache(cache.storage)), 1);
  };

  const fetchAllActors = async (e: any) => {
    setGqlRequest(allActorsQuery);
    const start = Date.now();
    const res = await query(allActorsQuery);
    setQueryTime(Date.now() - start);
    setDisplay('');
    setResponse(res.data);
    setDisplay('all actors');
    setTimeout(() => setCache(new BrowserCache(cache.storage)), 1);
  };

  const fetchMoviesByGenre = async (e: any) => {
    setGqlRequest(allMoviesByGenre);
    const start = Date.now();
    const res = await query(allMoviesByGenre);
    setQueryTime(Date.now() - start);
    setDisplay('');
    setResponse(res.data);
    setDisplay('by genre');
    setTimeout(() => setCache(new BrowserCache(cache.storage)), 1);
  };

  const fetchReleaseYear = async (e: any) => {
    setGqlRequest(moviesByReleaseYear);
    const start = Date.now();
    const res = await query(moviesByReleaseYear);
    setQueryTime(Date.now() - start);
    setDisplay('');
    setResponse(res.data);
    setDisplay('by year');
    setTimeout(() => setCache(new BrowserCache(cache.storage)), 1);
  };

  const addMovieCard = async (e: any) => {
    e.preventDefault();
    setGqlRequest(addMovie);
    const start = Date.now();
    const res = await mutate(addMovie);
    // option obj with update key on
    setQueryTime(Date.now() - start);
    setDisplay('');
    setResponse(res.data);
    setDisplay('all movies');
    setTimeout(() => setCache(new BrowserCache(cache.storage)), 1);
    await clearState();
  };

  const addActorCard = async (e: any) => {
    e.preventDefault();
    setGqlRequest(addActor);
    const start = Date.now();
    const res = await mutate(addActor);
    if (res.data.addActor.nickname === '') {
      res.data.addActor.nickname = null;
    }
    setQueryTime(Date.now() - start);
    setResponse(res.data);
    setDisplay('');
    setDisplay('all actors');
    setTimeout(() => setCache(new BrowserCache(cache.storage)), 1);
    await clearState();
  };

  return (
    <div id="cardsContainer">
      <div id="query-mutation">
        <h2>Make Requests</h2>
        <QueryDisplay
          id="query-display"
          allMovies={fetchAllMovies}
          allActors={fetchAllActors}
          byGenre={fetchMoviesByGenre}
          byYear={fetchReleaseYear}
          genre={genre}
          setGenre={setGenre}
        />
        <MutationDisplay
          id="mutation-display"
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
      <div id="cards-display">
        <CardsDisplay
          display={display}
          genre={genre}
          setQueryTime={setQueryTime}
          setResponse={setResponse}
          response={response}
        />
      </div>
      <Dashboard
        id="dashboard"
        queryTime={queryTime}
        gqlRequest={gqlRequest}
        response={response}
      />
    </div>
  );
}
export default CardsContainer;
