import React, { useState } from 'react';
import '../style/contactForm.scss';
import logo from '../style/Medias/logoST.png';
//import apiService from '../../services/apiService'

const ContactForm = () => {
  return (
    <div id="contact" className="form-wrapper">
      <form className="contact-form">
        <div className="logo">
          <img src={logo} alt="Logo Web Dev" />
        </div>
        <h2>
          <span className="name-label">CONTACTO</span>
        </h2>
  
        {/* Conteneur avec largeur maximale */}
        <div className="form-fields-container">
          {/* Ligne pour les champs Nombre et E-mail */}
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="name">Nombre</label>
              <input type="text" id="name" name="firstName" placeholder="Juan*" required />
            </div>
  
            <div className="input-group">
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" name="email" placeholder="Juan@gmail.com*" required />
            </div>
          </div>
  
          {/* Champ pour le message */}
          <div className="input-group">
            <label htmlFor="message">Mensaje</label>
            <textarea id="message" name="message" required></textarea>
          </div>
        </div>
  
        {/* Bouton d’envoi */}
        <button type="submit">
          <span>Enviar</span>
        </button>
      </form>
    </div>
  );
  
  };

export default ContactForm;

//const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  //const handleChange = (e) => {
    //const { name, value } = e.target;
    //setFormData({ ...formData, [name]: value });};

  //const handleSubmit = async (e) => {
    //e.preventDefault();
    //try {
      //const response = await apiService.post('/contact/send-email', {
        //to: '75017pi@gmail.com', // Ajoute une adresse email valide ici
        //subject: `Message de ${formData.name}`,
        //message: formData.message,
      //});
      //alert(response.data.message);
    //} catch (error) {
      //console.error('Erreur lors de l\'envoi du message:', error);
      //alert('Erreur lors de l\'envoi du message');
    //}
  //};

  //<form onSubmit={handleSubmit} className="contact-form"></form>
  //<input type="text" name="name" placeholder="Votre nom" value={formData.name} onChange={handleChange} required />
  //<input type="email" name="email" placeholder="Votre email" value={formData.email} onChange={handleChange} required />
  //<textarea name="message" placeholder="Votre message" value={formData.message} onChange={handleChange} required></textarea>
