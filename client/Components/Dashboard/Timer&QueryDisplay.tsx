import { React, useObsidian } from '../../../deps.ts';
declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      br: any;
      pre: any;
      code: any;
      label: any;
      select: any;
      option: any;
      p: any;
      input: any;
    }
  }
}

const TimerQueryDisplay = (props: any) => {
  
  const { queryTime, gqlRequest } = props;
  const query = `query AllMoviesByDate {
    movies(sort: { release: ASC }) {
      __typename
      id
      title
      releaseYear
      genre
      isFavorite
    }
  }
`;
  
  return (
    <div className="timer-query">
      <div className="timer">
        <code className="code-block query-timer code-black" id="timer">
          {`Request Timer: ${queryTime}ms`}
        </code>
      </div>
      <div className="query">
        <div className="showQuery">
          <pre className="pre-block">
            Query:
            <code className="code-block code-black">{gqlRequest}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
export default TimerQueryDisplay;
