import { React, useObsidian, BrowserCache } from '../../../deps.ts';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      p: any;
      span: any;
      br: any;
      pre: any;
      code: any;
      button: any;
    }
  }
}

const CacheResponseDisplay = (props: any) => {
 
  const { cache, clearCache, setCache } = useObsidian();
  const { response } = props;
  function onClick(e: any) {
    console.log('clicked');
    clearCache();
    setTimeout(() => setCache(new BrowserCache(cache.storage)), 1);
  }
  function createCache() {
    return Object.entries(cache.storage).reduce((acc: any, pair: any, i) => {
      if (typeof pair[1] === 'object') {
        const insidePair = [];
        for (const key in pair[1]) {
          insidePair.push(
            <p key={`keyPair${i}`}>
              <span style={{ color: '#cc99ff' }}>
                {' '}
                {JSON.stringify(key)} :{' '}
              </span>{' '}
              {JSON.stringify(pair[1][key])},
            </p>
          );
        }
        acc.push(
          <p key={`pair${i}`}>
            <span style={{ color: '#ff66ff' }}>
              {JSON.stringify(pair[0])} :{' '}
            </span>{' '}
            {'{'}
            {insidePair} {'}'}
          </p>
        );
      }
      return acc;
    }, []);
  }
  const cachedPair = createCache();

  return (
    <div>
      <div className="cacheDisplay">
        <pre className="pre-block" id="cacheDisplay">
          Cache:
          <code className="code-block" id="code-pink">
            {'{'}
            {cachedPair}
            {'}'}
          </code>
          <button type="button" id="clear-cache" onClick={onClick}>
            Clear Cache
          </button>
        </pre>
      </div>
      <div className="responseDisplay">
        <pre className="pre-block">
          Response:
          <code className="code-block" id="code-yellow">
            {JSON.stringify(response)}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CacheResponseDisplay;
