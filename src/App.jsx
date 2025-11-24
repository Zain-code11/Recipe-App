import { useEffect, useMemo, useState, useCallback } from "react";
import axios from "axios";
import HeroSection from "./components/HeroSection";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import FavoritesBar from "./components/FavoritesBar";
import "./App.css";

const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const STORAGE_KEY = "recipe-favorites";

const shapeRecipe = (meal) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i += 1) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() ?? ""
      });
    }
  }

  const steps =
    meal.strInstructions
      ?.split(/\r?\n+/)
      .map((step) => step.trim())
      .filter(Boolean) ?? [];

  return {
    id: meal.idMeal,
    name: meal.strMeal,
    thumb: meal.strMealThumb,
    category: meal.strCategory,
    area: meal.strArea,
    tags: meal.strTags?.split(",") ?? [],
    ingredients,
    steps,
    source: meal.strSource
  };
};

function App() {
  const [inputValue, setInputValue] = useState("pasta");
  const [query, setQuery] = useState("pasta");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!query) {
        setRecipes([]);
        setSelectedId(null);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const { data } = await axios.get(`${API_URL}${encodeURIComponent(query)}`);
        const meals = data?.meals ?? [];
        const formatted = meals.map(shapeRecipe);
        setRecipes(formatted);
        if (formatted.length) {
          setSelectedId(formatted[0].id);
        } else {
          setSelectedId(null);
        }
      } catch (err) {
        setError(err.message || "Something went wrong. Please try again.");
        setRecipes([]);
        setSelectedId(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [query]);

  const activeRecipe = useMemo(() => {
    if (selectedId) {
      return (
        recipes.find((recipe) => recipe.id === selectedId) ||
        favorites.find((recipe) => recipe.id === selectedId) ||
        null
      );
    }
    return recipes[0] || favorites[0] || null;
  }, [recipes, favorites, selectedId]);

  const isFavorite = useCallback((id) => favorites.some((recipe) => recipe.id === id), [favorites]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const trimmed = inputValue.trim();
      if (!trimmed) return;
      setQuery(trimmed);
    },
    [inputValue]
  );

  const handleInputChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  const handleSelectRecipe = useCallback((recipeId) => {
    setSelectedId(recipeId);
  }, []);

  const toggleFavorite = useCallback((recipe) => {
    if (!recipe) return;
    setFavorites((prev) => {
      if (isFavorite(recipe.id)) {
        return prev.filter((item) => item.id !== recipe.id);
      }
      return [...prev, recipe];
    });
  }, [isFavorite]);

  return (
    <div className="app-shell">
      <HeroSection
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        hasResults={recipes.length > 0}
        query={query}
      />

      <main className="content">
        <RecipeList recipes={recipes} loading={loading} selectedId={selectedId} onSelect={handleSelectRecipe} />
        <RecipeDetails recipe={activeRecipe} onToggleFavorite={toggleFavorite} isFavorite={isFavorite} />
      </main>

      <FavoritesBar favorites={favorites} onSelect={handleSelectRecipe} />
    </div>
  );
}

export default App;
