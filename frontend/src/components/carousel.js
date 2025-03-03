import React from 'react';
import pexelsBianca from '../style/Medias/caroussel/_TFP1469.jpg';
import pexelsLloyd from '../style/Medias/caroussel/_TFP1521-Enhanced-NR.jpg';
import pexelsMwabonje from '../style/Medias/caroussel/_TFP1577.jpg';
import pexelsNardo from '../style/Medias/caroussel/_TFP1644.jpg';
import pexelsTima from '../style/Medias/caroussel/_TFP1664.jpg';
import pexelsWendy from '../style/Medias/caroussel/_TFP1785.jpg';

import '../style/carousel.scss';

const images = [
  pexelsBianca,
  pexelsLloyd,
  pexelsMwabonje,
  pexelsNardo,
  pexelsTima,
  pexelsWendy,
  pexelsLloyd,
  pexelsMwabonje,
  pexelsNardo,
  pexelsTima,
  pexelsWendy,
];

const Carousel = () => {
  return (
    <div className="carousel-banner">
      <div className="carousel-track">
        {/* On double la liste pour enchaîner sans coupure */}
        {images.concat(images).map((image, index) => (
          <img 
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className="carousel-image"
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
