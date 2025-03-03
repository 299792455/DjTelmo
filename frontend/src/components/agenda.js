import React, { useContext, useState, useEffect } from 'react';
import '../style/agenda.scss';
import { AuthContext } from '../context/authContext';
import { FaTrash, FaPlus } from 'react-icons/fa';

const Agenda = () => {
  const { isAuthenticated, userRole } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: '',
    place: '',
    date: ''
  });

  // Au montage, récupère les événements depuis le backend
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events');
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des événements');
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Supprime un événement via l'API
  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }
      // Met à jour le state en supprimant l'événement supprimé
      setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
    } catch (error) {
      console.error(error);
    }
  };

  // Gestion des changements dans le formulaire de création d'un événement
  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  // Crée un nouvel événement via l'API
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    // Vérifie si la limite de 5 événements est atteinte
    if (events.length >= 5) {
      alert("Limite de 5 événements atteinte");
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newEvent)
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la création de l\'événement');
      }
      const result = await response.json();
      // Ajoute le nouvel événement à la liste locale
      setEvents(prevEvents => [...prevEvents, result.event]);
      setShowModal(false);
      setNewEvent({ name: '', place: '', date: '' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2 className='agenda-title'>AGENDA</h2>
      <div className="agenda-section">
        <div className="agenda-list">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              <div className="event-details">
                <div className="left-block">
                  <h3 className="event-name">{event.name}</h3>
                  <p className="event-location">{event.place}</p>
                </div>
                <span className="event-date">
                  {new Date(event.date).toLocaleDateString()}
                </span>
                {isAuthenticated && userRole === 'Admin' && (
                  <button
                    className="delete-event-btn"
                    onClick={() => handleDeleteEvent(event._id)}
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Bouton pour ajouter un événement (visible seulement pour l'admin et si moins de 5 événements) */}
          {isAuthenticated && userRole === 'Admin' && events.length < 5 && (
            <div className="add-event-container">
              <button className="add-event-btn" onClick={() => setShowModal(true)}>
                <FaPlus /> Añadir un evento
              </button>
            </div>
          )}
        </div>
        <div className="agenda-image" />
      </div>

      {/* Modale d'ajout d'événement */}
      {showModal && (
  <div className="modal-overlay">
    <div className="modal">
      <h3>Añadir un evento</h3>
      <form onSubmit={handleCreateEvent}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={newEvent.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Ubicación</label>
          <input
            type="text"
            name="place"
            value={newEvent.place}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Fecha</label>
          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="modal-buttons">
          <button type="submit" className="modal-btn add-btn">
            Añadir
          </button>
          <button type="button" className="modal-btn cancel-btn" onClick={() => setShowModal(false)}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
)}


    </>
  );
};

export default Agenda;
