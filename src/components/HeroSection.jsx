import PropTypes from "prop-types";

function HeroSection({ inputValue, onInputChange, onSubmit, loading, error, hasResults, query }) {
  return (
    <header className="hero">
      <p className="eyebrow">Beginner friendly project</p>
      <h1>
        Recipe Finder <span role="img" aria-label="chef">👩‍🍳</span>
      </h1>
      <p className="subtitle">
        Search thousands of recipes, check ingredients, follow the steps, and save your favourites for later.
      </p>

      <form className="search-form" onSubmit={onSubmit}>
        <input
          type="search"
          placeholder="Try “pasta”, “chicken”, “salad”..."
          value={inputValue}
          onChange={onInputChange}
          aria-label="Search recipes"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="alert error">{error}</p>}
      {!error && !loading && !hasResults && query && (
        <p className="alert muted">No recipes found for “{query}”. Try another keyword.</p>
      )}
    </header>
  );
}

HeroSection.propTypes = {
  inputValue: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  hasResults: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired
};

export default HeroSection;

