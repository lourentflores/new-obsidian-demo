import { React, useObsidian, BrowserCache } from '../../../deps.ts';
declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      article: any;
      h3: any;
      ul: any;
      li: any;
      button: any;
      form: any;
      input: any;
      label: any;
      select: any;
      option: any;
    }
  }
}

const CardDisplay = (props: any) => {
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
  const [nickName, setNickName] = (React as any).useState('');
  const [value, setValue] = (React as any).useState('');
  const { query, mutate, cache, setCache, clearCache } = useObsidian();

  if (props.display === 'Movies') {
    const { title, releaseYear, actors = [], id } = props.info;
    const handleChange = (event: any) => {
      setValue(event.target.value);
    };

    const handleSubmit = (event: any) => {
      event.preventDefault();
    };

    const deleteMovie = async (e: any) => {
      console.log(e.target.parentNode.id);

      const deleteMovieMutation = `mutation {deleteMovie(id:${e.target.parentNode.id}){
            id
            title
          }
          }`;
      const res = await mutate(deleteMovieMutation, { toDelete: true });
      console.log('res', res);
      const newResponse = query(allMoviesQuery);
      console.log('newResponse', newResponse);
      setTimeout(() => setCache(new BrowserCache(cache.storage)), 1);
    };

    const arrOfOptions: any = [];
    let outputActor: any = '';
    actors.forEach((actor: any) => {
      outputActor = outputActor + actor.firstName + ' ' + actor.lastName + ', ';
    });
  
    return (
      <article className="card movieCard" id={props.id}>
        <div className="movieHeadContainer">
          <h3 className="movieTitle">{title}</h3>
        </div>
        <ul className="movieDetailsList">
          <li className="movDetail"> Release Year: {releaseYear}</li>
          <li className="movDetail"> Actors: {outputActor}</li>
        </ul>
        
        <button className="btn btn-primary" onClick={deleteMovie}>
          Delete Movie
        </button>
      </article>
    );
  } else if (props.display === 'Actors') {
    const { firstName, lastName, movies = [], nickname = '', id } = props.info;
    const handleChange = (event: any) => {
      setValue(event.target.value);
    };

    const handleSubmit = async (event: any) => {
      const associateActorWithMovie = `
  mutation {
    associateActorWithMovie(input:{actorId:${id},movieId: ${
        props.movieList[event.target.value]
      }, respType:ACTOR}){
      __typename
      firstName
      lastName
      movies
    }
  }
`;
    
      event.preventDefault();
    };
    
    const updateNickname = `
    mutation {
      updateNickname(input: ${nickName}){
        __typename
        id
        nickname
      }
    }
  `;

    const handleChangeNickname = (event: any) => {
      setNickName(event.target.value);
    };
    const handleSubmitNickname = async (event: any) => {
      const start = Date.now();
      const res = await mutate(updateNickname);
      props.setQueryTime(Date.now() - start);
      props.setResponse(JSON.stringify(res.data));
      event.preventDefault();
    };

    const arrOfOptions: any = [];
    
    let outputMovie: any = '';
    movies.forEach((movie: any) => {
      outputMovie = outputMovie + movie.title + ', ';
    });
    const deleteActor = async (id: any) => {
      const deleteActorMutation = `mutation {deleteActor(id:${id}){
      id
      firstName
    }
    }`;
      const start = Date.now();
      const res = await mutate(deleteActorMutation, { toDelete: true });
      props.setQueryTime(Date.now() - start);
      props.setResponse(JSON.stringify(res.data));
    };

    return (
      <article className="card actorCard">
        <div className="actorHeadContainer">
          <h3 className="actorName">{firstName}</h3>
        </div>
        <ul className="actorDetailsList">
          <li className="actorDetail"> Last Name: {lastName}</li>
          <li className="actorDetail"> Movies: {outputMovie}</li>
          <li className="actorDetail"> Nickname: {nickname}</li>
        </ul>
        <form onSubmit={handleSubmitNickname}>
          <label>
            Nickname:
            <input type="text" value={value} onChange={handleChangeNickname} />
          </label>
          <input className="btn btn-primary" type="submit" value="Submit" />
        </form>
        <button onClick={deleteActor}>Delete Actor</button>
      </article>
    );
  }
};
export default CardDisplay;
