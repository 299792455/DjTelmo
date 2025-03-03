import React from 'react';
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
//import bgBeat from './style/Medias/vidBeats.mp4';

function App() {
  return (
    <AuthProvider> {/* Ajout du AuthProvider pour gérer l'authentification */}
      <div className="App">
        <Header />
        <main>
          <section id="banner">
            <HomeBanner />
          </section>

          <section id="Bio">
            <div className="max-width-container">
              <About />
              <BeatPlaylist />
            </div>
          </section>

          <section id="carousel-container">
            <div>
              <Carousel />
            </div>
          </section>

          <section id="Agenda">
            <div className="max-width-container">
              <Agenda />
            </div>
            <div id="Contact">
              <ContactForm />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
