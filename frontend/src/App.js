import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/authContext'; // Import du AuthProvider
import Header from './components/header';
import Footer from './components/footer';
import HomeBanner from './components/homeBanner';
import ContactForm from './components/contactForm';
import About from './components/bio';
import BeatPlaylist from './components/beats';
import Agenda from './components/agenda';
import Carousel from './components/carousel';
import './App.css';
import Loader from './components/loader';
//import bgBeat from './style/Medias/vidBeats.mp4';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 5000); 
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <main>
          <section id="banner"><HomeBanner /></section>
          <section id="Bio">
            <div className="max-width-container">
              <About /><BeatPlaylist />
            </div>
          </section>
          <section id="carousel-container"><Carousel /></section>
          <section id="Agenda">
            <div className="max-width-container"><Agenda /></div>
            <div id="Contact"><ContactForm /></div>
          </section>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;

