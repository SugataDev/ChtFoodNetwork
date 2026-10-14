export default function RecipeCard({
  recipe,
  isLiked,
  isSaved,
  onLike,
  onSave,
  onOpenDetail,
  isNewlyAdded,
}) {
  const currentLikes = recipe.likes + (isLiked ? 1 : 0);

  return (
    <article
      className={`recipe-card bg-white rounded-[18px] overflow-hidden border border-border-subtle shadow-(--shadow-card) transition-all duration-250 flex flex-col hover:-translate-y-1.5 hover:shadow-(--shadow-hover) group ${
        isNewlyAdded ? "ring-3 ring-primary-green" : ""
      }`}
      data-recipe-id={recipe.id}
      data-category={recipe.category}
    >
      <div
        className="card-img-wrapper relative h-55 overflow-hidden cursor-pointer"
        role="button"
        tabIndex={0}
        title="Click to view recipe details"
        onClick={() => onOpenDetail(recipe.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpenDetail(recipe.id);
          }
        }}
      >
        <img
          src={recipe.image}
          alt={recipe.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.05]"
        />
        <span className="card-badge-category absolute top-3.5 left-3.5 bg-primary-green text-white text-[0.64rem] font-bold tracking-[0.06em] px-3 py-1.25 rounded-full uppercase">
          {recipe.category}
        </span>
        <span className="card-badge-time absolute top-3.5 right-3.5 bg-[rgba(255,255,255,0.95)] text-text-dark text-[0.66rem] font-bold px-2.75 py-1.25 rounded-full uppercase">
          &#9201; {recipe.time} MINS
        </span>
      </div>

      <div className="card-body p-[22px_20px_18px] flex flex-col flex-1">
        <h3
          className="card-title font-serif text-[1.15rem] font-bold text-text-dark mb-2 cursor-pointer transition-colors duration-200 hover:text-primary-green"
          role="button"
          tabIndex={0}
          onClick={() => onOpenDetail(recipe.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onOpenDetail(recipe.id);
            }
          }}
        >
          {recipe.title}
        </h3>
        <p className="card-desc text-[0.84rem] text-text-body leading-[1.55] mb-4.5 flex-1">
          {recipe.description}
        </p>

        <div className="card-footer flex items-center justify-between pt-3.5 border-t border-border-subtle">
          <div className="author-info flex items-center gap-2">
            <img
              src={recipe.avatar}
              alt={recipe.author}
              className="author-avatar w-6 h-6 rounded-full object-cover"
            />
            <span className="author-name text-[0.76rem] font-semibold text-text-dark">
              {recipe.author}
            </span>
          </div>

          <div className="card-actions flex items-center gap-3">
            <button
              type="button"
              className={`action-btn like-btn bg-transparent border-none font-sans text-[0.76rem] cursor-pointer inline-flex items-center gap-1 transition-colors duration-200 hover:text-primary-green ${
                isLiked ? "liked text-[#e11d48] font-semibold" : "text-text-muted"
              }`}
              aria-label="Like recipe"
              data-recipe-id={recipe.id}
              onClick={(e) => {
                e.stopPropagation();
                onLike(recipe.id);
              }}
            >
              <span className="heart-icon">&hearts;</span>
              <span className="like-count">{currentLikes}</span>
            </button>

            <button
              type="button"
              className={`action-btn save-btn bg-transparent border-none font-sans text-[0.76rem] cursor-pointer inline-flex items-center gap-1 transition-colors duration-200 hover:text-primary-green ${
                isSaved
                  ? "saved text-primary-green font-bold"
                  : "text-text-muted"
              }`}
              aria-label="Save recipe"
              data-recipe-id={recipe.id}
              onClick={(e) => {
                e.stopPropagation();
                onSave(recipe.id);
              }}
            >
              {isSaved ? "★ Saved" : "☆ Save"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
