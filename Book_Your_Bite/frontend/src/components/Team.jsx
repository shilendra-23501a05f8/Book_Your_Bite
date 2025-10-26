import React from "react";
import api from "../restApi.json";

const Team = () => {
  const data = api.data[0];

  return (
    <section className="team" id="team">
      <div className="container">
        <div className="heading_section">
          <h1 className="heading">OUR TEAM</h1>
          <p>The team behind every unforgettable flavor.</p>
        </div>
        <div className="team_container">
          {data.team.map(element => (
            <div className="card" key={element.id}>
              <img src={element.image} alt={element.name} />
              <h3>{element.name}</h3>
              <p>{element.designation}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
