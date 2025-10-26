import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeroSection from '../../components/HeroSection'
import About from '../../components/About'
import Qualities from '../../components/Qualities'
import Menu from '../../components/Menu'
import WhoAreWe from '../../components/WhoAreWe'
import Team from '../../components/Team'
import Reservation from '../../components/Reservation'
import Footer from '../../components/Footer'

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reservationRef = useRef();

  useEffect(() => {
    if (location.state?.scrollToReservation && reservationRef.current) {
      reservationRef.current.scrollIntoView({ behavior: "smooth" });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <>
      <HeroSection />
      <About />
      <Qualities />
      <Menu />
      <WhoAreWe />
      <Team />
      <div ref={reservationRef}>
        <Reservation />
      </div>
      <Footer />
    </>
  );
};

export default Home;
