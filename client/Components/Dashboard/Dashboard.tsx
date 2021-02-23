import { React, useObsidian } from '../../../deps.ts';
import CacheResponseDisplay from './CacheResponse&Display.tsx';
import TimerQueryDisplay from './Timer&QueryDisplay.tsx';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      button: any;
      div: any;
      h1: any;
      p: any;
      h2: any;
    }
  }
}
const Dashboard = (props: any) => {
  const { queryTime, gqlRequest, response } = props;
  const { query, cache, setCache, clearCache } = useObsidian();
  return (
    <div>
      <h2 style={{ color: '#e83e8c', textAlign: 'center' }}>Dashboard</h2>
      <TimerQueryDisplay queryTime={queryTime} gqlRequest={gqlRequest} />
      <CacheResponseDisplay response={response} />
    </div>
  );
};
export default Dashboard;
