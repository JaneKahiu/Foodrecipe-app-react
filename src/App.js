import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () => {
  const APP_ID = "your_app_id";
  const APP_KEY = "your_app_key";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await fetch(
          `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        const data = await response.json();
        console.log(data); // Log the response data
        if (data.hits) {
          setRecipes(data.hits);
        } else {
          console.error("No recipes found.");
        }
      } catch (error) {
        console.error("Error fetching the recipes:", error);
      }
    };
    getRecipes();
  }, [query]);

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    if (search.trim()) {
      setQuery(search);
      setSearch("");
    }
  };

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.length > 0 ? (
          recipes.map(recipe => (
            <Recipe
              key={recipe.recipe.uri} // Change this if needed
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))
        ) : (
          <p>No recipes found. Try a different search.</p>
        )}
      </div>
    </div>
  );
};

export default App;
