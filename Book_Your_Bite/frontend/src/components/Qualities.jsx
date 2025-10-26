import React from 'react';
import api from '../restApi.json';

const Qualities = () => {
  const data = api.data[0];

  return (
    <section className='qualities' id='qualities'>
      <div className="container">
        {data.ourQualities.map(element => (
          <div className='card' key={element.id}>
            <img src={element.image} alt={element.title} />
            <p className='title'>{element.title}</p>
            <p className='description'>{element.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Qualities;
