import React from 'react';
import api from '../restApi.json';

const Menu = () => {
  const data = api.data[0];

  return (
    <section className='menu' id='menu'>
      <div className="container">
        <div className="heading_section">
          <h1 className="heading">POPULAR DISHES</h1>
          <p>
            Popular for a reason — taste it to believe it.
          </p>
        </div>
        <div className="dishes_container">
          {data.popularDishes.map(element => (
            <div className="card" key={element.id}>
              <img src={element.image} alt={element.title} />
              <h3>{element.title}</h3>
              <button>{element.category}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
