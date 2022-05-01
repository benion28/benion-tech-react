import './App.css';
import { Navbar, Main, Footer } from './components'

function App() {
  return (
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
  );
}

export default App;
