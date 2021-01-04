import { React } from '../../deps.ts';
import CardsContainer from './CardsContainer.tsx';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      button: any;
      input: any;
      label: any;
      select: any;
      option: any;
      form: any;
    }
  }
}

const QueryDisplay = (props: any) => {
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.byGenre(props.genre)
  };

  return (
    <>
      <div className="queryDisplay">
        <button type="button" id="fetchAllMovies" onClick={props.allMovies}>
          All Movies
        </button>
        <button type="button" id="fetchAllActors" onClick={props.allActors}>
          All Actors
        </button>
        <form onSubmit={handleSubmit}>
            <div id="dropdown-content">
              <select
                id="genres"
                value={props.genre}
                onChange={props.setGenre}
              >
                <option value="ACTION">ACTION</option>
                <option value="SCIFI">SCIFI</option>
                <option value="DRAMA">DRAMA</option>
                <option value="COMEDY">COMEDY</option>
                <option value="ROMANCE">ROMANCE</option>
                <option value="ADVENTURE">ADVENTURE</option>
              </select>
            </div>
          <input type="submit" value="Movies by Genre" />
        </form>
        <button type="button" id="fetchByYear" onClick={props.byYear}>
          Movies by Release Year
        </button>
      </div>
    </>
  );
};

export default QueryDisplay;
