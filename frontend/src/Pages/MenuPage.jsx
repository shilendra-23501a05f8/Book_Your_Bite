import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../restApi.json";
import "./MenuPage.css";

const MenuPage = () => {
  const navigate = useNavigate();
  const data = api.data[0];
  const dishes = data.dishes;

  const categories = ["Breakfast", "Lunch", "Dinner", "All"];
  const [selectedCategory, setSelectedCategory] = useState("Breakfast");
  const dishesWithPrices = dishes.map((dish) => {
    const prices = [
      120, 250, 180, 150, 220, 200, 270, 300, 130, 160, 210, 240,
    ];
    return {
      ...dish,
      price: `₹${prices[dish.id % prices.length]}`,
    };
  });
  const filteredDishes =
    selectedCategory === "All"
      ? dishesWithPrices
      : dishesWithPrices.filter((dish) => dish.category === selectedCategory);

  const goToHome = () => navigate("/");
  const goToReservation = () =>
    navigate("/", { state: { scrollToReservation: true } });

  return (
    <div className="menu-page">
      <h1>Our Menu</h1>

      {/* Category Buttons */}
      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={selectedCategory === cat ? "active" : ""}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Dishes List */}
      <div className="menu-list">
        {filteredDishes.map((dish) => (
          <div className="menu-item" key={dish.id}>
            <img src={dish.image} alt={dish.title} />
            <h3>{dish.title}</h3>
            <p>{dish.category}</p>
            <p className="price">{dish.price}</p>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="menu-actions">
        <button onClick={goToHome}>Back to Home</button>
        <button onClick={goToReservation}>Reserve Now</button>
      </div>
    </div>
  );
};

export default MenuPage;
