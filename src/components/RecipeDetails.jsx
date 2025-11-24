import PropTypes from "prop-types";

function RecipeDetails({ recipe, onToggleFavorite, isFavorite }) {
  if (!recipe) {
    return (
      <aside className="details-panel">
        <div className="placeholder">
          <p>Select a recipe to view details</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="details-panel">
      <div className="details-header">
        <div>
          <p className="tag">
            {recipe.category} • {recipe.area}
          </p>
          <h2>{recipe.name}</h2>
        </div>
        <button className="favorite-btn" onClick={() => onToggleFavorite(recipe)}>
          {isFavorite(recipe.id) ? "★ Saved" : "☆ Save"}
        </button>
      </div>
      <img className="hero-image" src={recipe.thumb} alt={recipe.name} />

      <div className="details-grid">
        <section>
          <h3>Ingredients</h3>
          <ul className="ingredients-list">
            {recipe.ingredients.map((item) => (
              <li key={`${item.ingredient}-${item.measure}`}>
                <span>{item.ingredient}</span>
                <span className="muted">{item.measure}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3>Steps</h3>
          <ol className="steps-list">
            {recipe.steps.map((step, index) => (
              <li key={`${recipe.id}-step-${index}`}>
                <span className="step-index">{index + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {recipe.source && (
        <a className="source-link" href={recipe.source} target="_blank" rel="noreferrer">
          View full recipe
        </a>
      )}
    </aside>
  );
}

RecipeDetails.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    thumb: PropTypes.string,
    category: PropTypes.string,
    area: PropTypes.string,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        ingredient: PropTypes.string.isRequired,
        measure: PropTypes.string
      })
    ).isRequired,
    steps: PropTypes.arrayOf(PropTypes.string).isRequired,
    source: PropTypes.string
  }),
  onToggleFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.func.isRequired
};

RecipeDetails.defaultProps = {
  recipe: null
};

export default RecipeDetails;

