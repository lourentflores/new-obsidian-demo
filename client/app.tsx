import { React, ReactDOMServer, ObsidianWrapper } from '../deps.ts';
import { CardsContainer } from './Components/Card_Components/CardsContainer.tsx';

declare global {
  namespace JSX {
    // interface IntrinsicElements {
    //   button: any;
    //   div: any;
    //   h1: any;
    //   p: any;
    // }
  }
}
const App = () => {
  return (
    <ObsidianWrapper>
      <div className="app">
        <h1>OBSIDIAN 2.0 DEMO</h1>
        <CardsContainer />
      </div>
    </ObsidianWrapper>
  );
};
export default App;
