import { React, useObsidian } from '../../../deps.ts';
import CardDisplay from './CardDisplay.tsx';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      h1: any;
    }
  }
}

const CardsDisplay = (props: any) => {
  const { cache, query } = useObsidian();
  const [allActors, setAllActors] = (React as any).useState('');
  const cards: any = [];
  const allActorsQuery = `query {
    actors {
      id
      firstName
      lastName
    }
  }
`;

  const fetch = async () => {
    let output = await query(allActorsQuery);
    setAllActors(output.data);
  };
  const findActors = (arrOfMovies: any) => {
    const output: any = {};
    arrOfMovies.forEach((actor: any) => {
      let act = actor.firstName + ' ' + actor.lastName;
      output[act] = actor.id;
    });
    return output;
  };

  if (!Object.keys(cache.storage.ROOT_QUERY).length) {
    return (
      <div id="no-data">
        <h1> Fetch some movies... </h1>
      </div>
    );
  } else if (props.display === 'all movies') {
    let resp = props.response;
   
    resp.movies.forEach((movie: any) => {
      cards.push(
        <CardDisplay
          info={movie}
          key={movie.id}
          id={movie.id}
          display={'Movies'}
          setQueryTime={props.setQueryTime}
          setResponse={props.setResponse}
          response={props.response}
        ></CardDisplay>
      );
    });

    console.log('working');
    return [cards];
  } else if (props.display === 'all actors') {
    let resp = props.response;

    let actorMovies: any = [];
    const obj: any = {};
    resp.actors.forEach((actor: any) => {
      if (Array.isArray(actor.movies)) {
        actor.movies.forEach((movie: any) => {
          let mov = movie.title;
          obj[mov] = movie.id;
        });
      } else {
        let movie = actor.movies;
        let mov = movie.title;
        obj[mov] = movie.id;
      }
    });
    console.log(resp);
    resp.actors.forEach((actor: any) => {
      cards.push(
        <CardDisplay
          info={actor}
          key={actor.id}
          display={'Actors'}
          movieList={obj}
          setQueryTime={props.setQueryTime}
          setResponse={props.setResponse}
        ></CardDisplay>
      );
    });
    return [cards];
  } else if (props.display === 'by genre') {
    let resp = props.response;

    resp.movies.forEach((movie: any) => {
      cards.push(
        <CardDisplay
          info={movie}
          key={movie.id}
          display={'Movies'}
          setQueryTime={props.setQueryTime}
          setResponse={props.setResponse}
        ></CardDisplay>
      );
    });
    return [cards];
  } else if (props.display === 'by year') {
    let resp = props.response;
 
    resp.movies.forEach((movie: any) => {
      cards.push(
        <CardDisplay
          info={movie}
          key={movie.id}
          id={movie.id}
          display={'Movies'}
          setQueryTime={props.setQueryTime}
          setResponse={props.setResponse}
        ></CardDisplay>
      );
    });
    return [cards];
  }
  return [cards];
};
export default CardsDisplay;
