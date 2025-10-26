import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";

const About = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="banner">
          <div className="top">
            <h1 className="heading">ABOUT US</h1>
            <p>The only thing we're serious about is food.</p>
          </div>
          <p className="mid">
            At BookYourBite, we believe that every meal should be a celebration — of taste, comfort, and togetherness.
            Our chefs carefully craft every dish using fresh, locally sourced ingredients to bring you a burst of authentic flavors.
            Whether you’re here for a quiet breakfast, a hearty lunch, or a cozy dinner with friends, 
            we make sure every bite feels special. 
            From the kitchen to your table, our mission is simple — to make dining more delightful, memorable, and effortless.
          </p>
          <Link to="/menu" className="explore-link">
            Explore Menu{" "}
            <span>
              <HiOutlineArrowRight />
            </span>
          </Link>
        </div>

        <div className="banner">
          <img src="about.png" alt="about" />
        </div>
      </div>
    </section>
  );
};

export default About;
