import React, { useEffect, useRef, useState, useContext } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '../style/beats.scss';
import { AuthContext } from '../context/authContext';
import { FaTrash } from 'react-icons/fa';
import AnimatedCanvas from './AnimatedCanvas'; // Assurez-vous que le chemin est correct

const Beats = () => {
  const { isAuthenticated, userRole } = useContext(AuthContext);

  const [tracks, setTracks] = useState([]);
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newTrack, setNewTrack] = useState({});
  const [musicFile, setMusicFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [musicPlaying, setMusicPlaying] = useState(false);

  // Chargement des pistes depuis l'API backend
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tracks');
        const data = await response.json();
        console.log('Tracks reçus depuis le backend :', data);
        setTracks(data);
      } catch (error) {
        console.error('Erreur lors du chargement des pistes:', error);
      }
    };

    fetchTracks();
  }, []);

  const trackToShow = currentTrackId
    ? tracks.find((track) => track._id === currentTrackId)
    : tracks[0];

  // Fonctions de suppression et d'ajout de pistes (inchangées)
  const handleDeleteTrack = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tracks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        alert('Piste supprimée avec succès');
        setTracks(tracks.filter((track) => track._id !== id));
      } else {
        const error = await response.json();
        alert(error.error || 'Erreur lors de la suppression');
      }
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      alert('Impossible de supprimer la piste');
    }
  };

  const handleAddTrack = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newTrack.title);
    formData.append('artist', newTrack.artist);
    formData.append('album', newTrack.album);
    formData.append('year', newTrack.year);
    formData.append('genre', newTrack.genre);
    formData.append('musicFile', musicFile);
    formData.append('coverImage', coverImage);

    try {
      const response = await fetch('http://localhost:5000/api/tracks', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: formData
      });

      if (response.ok) {
        const newTrackData = await response.json();
        alert('Suceso');
        setTracks([...tracks, newTrackData.track]);
        setShowModal(false);
      } else {
        const error = await response.json();
        alert(error.error || 'Erreur lors de l’ajout');
      }
    } catch (err) {
      console.error('Erreur lors de l’ajout:', err);
      alert('Impossible d’ajouter la piste');
    }
  };

  return (
    <>
      <div id="beats" className="parent-container">
        <div className="beats-title">
          <span className="dj-label">My</span>
          <span className="skill-label">BEATS</span>
        </div>
      </div>

      <div className={`audio-playlist ${currentTrackId ? 'is-playing' : ''}`}>
        {trackToShow && (
          <div className="now-playing-popup">
            <img
              src={trackToShow.coverImage}
              alt={`Cover for ${trackToShow.title}`}
              className="now-playing-image"
            />
            <div className="now-playing-info">
              <h3>{trackToShow.title}</h3>
              <p>{trackToShow.artist}</p>
              <p>{trackToShow.album}</p>
            </div>
          </div>
        )}

        {/* Utilisation du composant d'animation */}
        <AnimatedCanvas musicPlaying={musicPlaying} />

        <div className="content-wrapper">
          <div className="track-list">
            {tracks.map((track) => (
              <div key={track._id} className="audio-track">
                <img
                  src={track.coverImage}
                  alt={`Cover for ${track.title}`}
                  className="track-image"
                />
                <h3>{track.title}</h3>
                <AudioPlayer
                  crossOrigin="anonymous"
                  src={track.musicFile}
                  showJumpControls={false}
                  onPlay={() => {
                    setCurrentTrackId(track._id);
                    setMusicPlaying(true);
                  }}
                  onPause={() => setMusicPlaying(false)}
                />
                {isAuthenticated && userRole === 'Admin' && (
                  <button
                    className="delete-track-btn"
                    onClick={() => handleDeleteTrack(track._id)}
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {isAuthenticated && userRole === 'Admin' && tracks.length < 5 && (
          <button className="add-track-btn" onClick={() => setShowModal(true)}>
            + Añadir una pista
          </button>
        )}
      </div>

      {showModal && (
  <div className="modal">
    <form onSubmit={handleAddTrack}>
      <input
        type="text"
        placeholder="Titulo"
        onChange={(e) => setNewTrack({ ...newTrack, title: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Artista"
        onChange={(e) => setNewTrack({ ...newTrack, artist: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Album"
        onChange={(e) => setNewTrack({ ...newTrack, album: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Año"
        onChange={(e) => setNewTrack({ ...newTrack, year: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Estilo"
        onChange={(e) => setNewTrack({ ...newTrack, genre: e.target.value })}
        required
      />
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setMusicFile(e.target.files[0])}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setCoverImage(e.target.files[0])}
        required
      />

      <div className="modal-buttons">
        <button type="submit" className="modal-btn add-btn">Añadir</button>
        <button type="button" className="modal-btn cancel-btn" onClick={() => setShowModal(false)}>
          Cancelar
        </button>
      </div>
    </form>
  </div>
)}

    </>
  );
};

export default Beats;
