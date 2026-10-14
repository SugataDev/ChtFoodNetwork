import RecipeToolbar from "../recipes/RecipeToolbar";
import RecipeCard from "../recipes/RecipeCard";

export default function FeaturedRecipesSection({
  recipes,
  likedIds,
  savedIds,
  onLike,
  onSave,
  onOpenDetail,
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  visibleCount,
  totalCount,
  onResetFilters,
  newlyAddedId,
}) {
  return (
    <section className="recipes-section py-16" id="featured-recipes">
      <div className="app-container">
        <div className="section-header flex items-end justify-between mb-7.5 max-md:flex-col max-md:items-start max-md:gap-3">
          <div>
            <span className="section-eyebrow block text-[0.72rem] font-bold tracking-[0.14em] text-primary-green uppercase mb-1.5">
              CURATED HERITAGE
            </span>
            <h2 className="section-title font-serif text-[2.15rem] font-bold text-text-dark">
              Featured Hill Recipes
            </h2>
          </div>
          <a
            href="#featured-recipes"
            id="resetFilterLink"
            className="section-link text-[0.88rem] font-semibold text-primary-green inline-flex items-center gap-1.5 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              onResetFilters();
              const el = document.getElementById("featured-recipes");
              if (el) {
                const headerOffset = 80;
                const elementPosition = el.getBoundingClientRect().top;
                const offsetPosition =
                  elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
              }
            }}
          >
            Explore all recipes <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        <RecipeToolbar
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
          sortBy={sortBy}
          onSortChange={onSortChange}
          visibleCount={visibleCount}
          totalCount={totalCount}
          onResetFilters={onResetFilters}
        />

        <div
          className="recipe-grid grid grid-cols-3 gap-7 max-[1100px]:grid-cols-2 max-md:grid-cols-1"
          id="featuredGrid"
        >
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isLiked={likedIds.has(recipe.id)}
              isSaved={savedIds.has(recipe.id)}
              onLike={onLike}
              onSave={onSave}
              onOpenDetail={onOpenDetail}
              isNewlyAdded={newlyAddedId === recipe.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
