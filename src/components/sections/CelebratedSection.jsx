import RecipeCard from "../recipes/RecipeCard";
import { CELEBRATED_RECIPE_IDS } from "../../data/recipesData";

export default function CelebratedSection({
  recipes,
  likedIds,
  savedIds,
  onLike,
  onSave,
  onOpenDetail,
  onSortByLikes,
  showToast,
}) {
  const celebratedRecipes = CELEBRATED_RECIPE_IDS.map((id) =>
    recipes.find((r) => r.id === id)
  ).filter(Boolean);

  const handleRankingsClick = (e) => {
    e.preventDefault();
    onSortByLikes();
    const sec = document.getElementById("celebrated-recipes");
    if (sec) {
      const headerOffset = 80;
      const elementPosition = sec.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    showToast("Displaying community-ranked hill favorites!");
  };

  return (
    <section className="recipes-section celebrated-section py-16" id="celebrated-recipes">
      <div className="app-container">
        <div className="section-header flex items-end justify-between mb-7.5 max-md:flex-col max-md:items-start max-md:gap-3">
          <div>
            <span className="section-eyebrow block text-[0.72rem] font-bold tracking-[0.14em] text-primary-green uppercase mb-1.5">
              LOVED BY FOOD ENTHUSIASTS
            </span>
            <h2 className="section-title font-serif text-[2.15rem] font-bold text-text-dark">
              Most Celebrated Creations
            </h2>
          </div>
          <a
            href="#featured-recipes"
            id="viewRankingsLink"
            className="section-link text-[0.88rem] font-semibold text-primary-green inline-flex items-center gap-1.5 hover:underline"
            onClick={handleRankingsClick}
          >
            View popular rankings <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        <div className="recipe-grid grid grid-cols-4 gap-7 max-[1100px]:grid-cols-2 max-md:grid-cols-1" id="celebratedGrid">
          {celebratedRecipes.map((recipe) => (
            <RecipeCard
              key={`celebrated-${recipe.id}`}
              recipe={recipe}
              isLiked={likedIds.has(recipe.id)}
              isSaved={savedIds.has(recipe.id)}
              onLike={onLike}
              onSave={onSave}
              onOpenDetail={onOpenDetail}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
