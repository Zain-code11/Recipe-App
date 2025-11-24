import PropTypes from "prop-types";

function FavoritesBar({ favorites, onSelect }) {
  return (
    <section className="favorites">
      <header>
        <h3>Favorites</h3>
        <p className="muted">
          Recipes you save stay here thanks to local storage. Perfect for quick access.
        </p>
      </header>
      <div className="favorite-row">
        {favorites.length ? (
          favorites.map((recipe) => (
            <button
              key={recipe.id}
              className="favorite-chip"
              onClick={() => onSelect(recipe.id)}
              title="Show details"
            >
              {recipe.name}
            </button>
          ))
        ) : (
          <p className="muted">No favorites yet. Save one from the details panel.</p>
        )}
      </div>
    </section>
  );
}

FavoritesBar.propTypes = {
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired
};

export default FavoritesBar;

