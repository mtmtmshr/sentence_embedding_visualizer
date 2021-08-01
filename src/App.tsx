import React from 'react';
import Header from './compornents/Header'
import MainCompornet from './compornents/MainCompornet'
import Footer from './compornents/Footer'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <main className="App-main">
        <MainCompornet />
      </main>
      <footer className="App-fotter">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
