import { React } from '../../../deps.ts';
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
      h3: any;
    }
  }
}

const QueryDisplay = (props: any) => {
  const handleSubmit = (e: any) => {
    props.byGenre(props.genre);
    e.preventDefault();
  };

  const { genre, setGenre } = props;

  return (
    <>
      <div className="query-display">
        <h3>Make a query:</h3>
        <button type="button" id="fetchAllMovies" onClick={props.allMovies}>
          All Movies
        </button>
        <button type="button" id="fetchAllActors" onClick={props.allActors}>
          All Actors
        </button>
        <button type="button" id="fetchByYear" onClick={props.byYear}>
          Movies by Release Year
        </button>

        <form onSubmit={handleSubmit}>
          <div id="dropdown-content">
            <select
              id="genres"
              value={genre}
              onChange={setGenre}
              className="form-select"
              required
            >
              <option value="">Select the genre</option>
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
      </div>
    </>
  );
};

export default QueryDisplay;
