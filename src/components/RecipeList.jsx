import PropTypes from "prop-types";

function RecipeList({ recipes, loading, selectedId, onSelect }) {
  return (
    <section className="recipes-panel">
      <div className="panel-header">
        <div>
          <h2>Results</h2>
          <p className="muted">{loading ? "Fetching recipes..." : `${recipes.length} recipes found`}</p>
        </div>
      </div>

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <article
            key={recipe.id}
            className={`recipe-card ${selectedId === recipe.id ? "active" : ""}`}
            onClick={() => onSelect(recipe.id)}
          >
            <img src={recipe.thumb} alt={recipe.name} />
            <div>
              <p className="tag">
                {recipe.category} • {recipe.area}
              </p>
              <h3>{recipe.name}</h3>
              <div className="tag-row">
                {recipe.tags?.slice(0, 3).map((tag) => (
                  <span className="chip" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      thumb: PropTypes.string,
      name: PropTypes.string,
      category: PropTypes.string,
      area: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  selectedId: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};

RecipeList.defaultProps = {
  selectedId: null
};

export default RecipeList;

