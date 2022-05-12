import './App.css';
import { Navbar, Main, Footer } from './components'
import {  GlobalStore } from './app/GlobalState'

function App() {
  return (
    <GlobalStore>
      <div className="app">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="main">
          <Main />
          <div className="footer">
            <Footer />
          </div>
        </div>
      </div>
    </GlobalStore>
  );
}

export default App;
