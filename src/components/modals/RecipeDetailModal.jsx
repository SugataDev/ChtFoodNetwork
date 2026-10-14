import { useState, useEffect } from "react";

export default function RecipeDetailModal({
  recipe,
  isOpen,
  isLiked,
  isSaved,
  onLike,
  onSave,
  onClose,
  showToast,
}) {
  const [activeTab, setActiveTab] = useState("ingredients");

  useEffect(() => {
    if (isOpen) {
      setActiveTab("ingredients");
    }
  }, [isOpen]);

  if (!isOpen || !recipe) return null;

  const currentLikes = recipe.likes + (isLiked ? 1 : 0);

  const handleShareClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast(`Copied link to "${recipe.title}" to clipboard! 📋`);
    } else {
      showToast("Link ready to share with culinary enthusiasts! 🔗");
    }
  };

  return (
    <div
      className="modal-backdrop fixed inset-0 bg-[rgba(6,28,22,0.75)] backdrop-blur-md z-1000 flex items-center justify-center p-5 transition-opacity duration-300 opacity-100 open"
      id="recipeDetailModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detailModalTitle"
      onClick={(e) => {
        if (e.target.id === "recipeDetailModal") onClose();
      }}
    >
      <div className="modal-window modal-window-lg bg-white rounded-3xl w-full max-w-190 max-h-[90vh] overflow-y-auto shadow-[0_25px_60px_rgba(0,0,0,0.3)] flex flex-col transition-transform duration-300 transform translate-y-0 scale-100 max-md:w-[95%]">
        <div className="modal-header p-[24px_28px_18px] flex items-center justify-between border-b border-border-subtle sticky top-0 bg-white z-10">
          <div className="detail-header-badges flex items-center gap-2.5 flex-wrap">
            <span
              className="card-badge-category bg-primary-green text-white text-[0.64rem] font-bold tracking-[0.06em] px-3 py-1.25 rounded-full uppercase"
              id="detailCategoryBadge"
            >
              {recipe.category.toUpperCase()}
            </span>
            <span
              className="card-badge-time bg-bg-soft border border-border-light text-text-dark text-[0.66rem] font-bold px-2.75 py-1.25 rounded-full uppercase"
              id="detailTimeBadge"
            >
              &#9201; {recipe.time} MINS
            </span>
            <span
              className="detail-tribe-badge bg-primary-green-light text-primary-green text-[0.65rem] font-bold px-3 py-1.25 rounded-full"
              id="detailTribeBadge"
            >
              {recipe.tribe || "CHT Heritage"}
            </span>
          </div>
          <button
            type="button"
            className="modal-close-btn bg-bg-soft border-none w-8.5 h-8.5 rounded-full text-[1.3rem] text-text-body flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#fee2e2] hover:text-[#e11d48]"
            id="recipeDetailModalClose"
            aria-label="Close modal"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className="modal-body p-[26px_28px_32px]">
          <div className="recipe-detail-hero grid grid-cols-[280px_1fr] gap-6 mb-6 max-md:grid-cols-1">
            <div className="detail-img-wrapper h-60 rounded-2xl overflow-hidden">
              <img
                id="detailImg"
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="detail-hero-content flex flex-col justify-between">
              <div>
                <h2
                  className="detail-title font-serif text-[1.55rem] font-bold text-text-dark mb-2"
                  id="detailModalTitle"
                >
                  {recipe.title}
                </h2>
                <div className="detail-author-row flex items-center gap-2 mb-3">
                  <img
                    id="detailAuthorAvatar"
                    src={recipe.avatar}
                    alt={recipe.author}
                    className="author-avatar w-6 h-6 rounded-full object-cover"
                  />
                  <div>
                    <span className="author-label text-[0.72rem] text-text-muted mr-1">
                      Curated by
                    </span>
                    <span
                      className="author-name text-[0.76rem] font-semibold text-text-dark"
                      id="detailAuthorName"
                    >
                      {recipe.author}
                    </span>
                  </div>
                </div>
                <p className="detail-desc text-[0.88rem] text-text-body leading-[1.6] mb-4" id="detailDesc">
                  {recipe.description}
                </p>
              </div>

              <div className="detail-actions-row flex items-center gap-3 flex-wrap">
                <button
                  type="button"
                  className={`action-btn like-btn detail-like-btn px-4 py-2 rounded-full bg-bg-soft border border-border-light text-[0.78rem] font-semibold cursor-pointer transition-all duration-200 hover:bg-primary-green-light hover:border-primary-green ${
                    isLiked ? "liked text-[#e11d48] font-semibold" : ""
                  }`}
                  id="detailLikeBtn"
                  aria-label="Like recipe"
                  onClick={() => onLike(recipe.id)}
                >
                  <span className="heart-icon">&hearts;</span>
                  <span className="like-count ml-1" id="detailLikeCount">
                    {currentLikes}
                  </span>{" "}
                  Likes
                </button>
                <button
                  type="button"
                  className={`action-btn save-btn detail-save-btn px-4 py-2 rounded-full bg-bg-soft border border-border-light text-[0.78rem] font-semibold cursor-pointer transition-all duration-200 hover:bg-primary-green-light hover:border-primary-green ${
                    isSaved ? "saved text-primary-green font-bold" : ""
                  }`}
                  id="detailSaveBtn"
                  aria-label="Save recipe"
                  onClick={() => onSave(recipe.id)}
                >
                  {isSaved ? "★ Saved in Archive" : "☆ Save to Archive"}
                </button>
                <button
                  type="button"
                  className="action-btn share-link-btn px-4 py-2 rounded-full bg-bg-soft border border-border-light text-[0.78rem] font-semibold cursor-pointer text-primary-green transition-all duration-200 hover:bg-primary-green-light hover:border-primary-green"
                  id="detailShareBtn"
                  aria-label="Share recipe"
                  onClick={handleShareClick}
                >
                  &#128279; Share Recipe
                </button>
              </div>
            </div>
          </div>

          <div className="detail-tabs-bar flex border-b border-border-light mb-4.5" role="tablist">
            <button
              type="button"
              className={`modal-tab-btn flex-1 py-3 px-4 bg-transparent border-none font-sans text-[0.88rem] cursor-pointer relative transition-all duration-200 text-center ${
                activeTab === "ingredients"
                  ? "active text-primary-green font-bold active-tab-indicator"
                  : "text-text-muted font-semibold hover:text-primary-green"
              }`}
              id="tabBtnIngredients"
              role="tab"
              aria-selected={activeTab === "ingredients"}
              onClick={() => setActiveTab("ingredients")}
            >
              Ingredients
            </button>
            <button
              type="button"
              className={`modal-tab-btn flex-1 py-3 px-4 bg-transparent border-none font-sans text-[0.88rem] cursor-pointer relative transition-all duration-200 text-center ${
                activeTab === "steps"
                  ? "active text-primary-green font-bold active-tab-indicator"
                  : "text-text-muted font-semibold hover:text-primary-green"
              }`}
              id="tabBtnSteps"
              role="tab"
              aria-selected={activeTab === "steps"}
              onClick={() => setActiveTab("steps")}
            >
              Cooking Method
            </button>
            <button
              type="button"
              className={`modal-tab-btn flex-1 py-3 px-4 bg-transparent border-none font-sans text-[0.88rem] cursor-pointer relative transition-all duration-200 text-center ${
                activeTab === "lore"
                  ? "active text-primary-green font-bold active-tab-indicator"
                  : "text-text-muted font-semibold hover:text-primary-green"
              }`}
              id="tabBtnLore"
              role="tab"
              aria-selected={activeTab === "lore"}
              onClick={() => setActiveTab("lore")}
            >
              Cultural Lore
            </button>
          </div>

          {activeTab === "ingredients" && (
            <div className="tab-pane active animate-fade-in" id="tabPaneIngredients" role="tabpanel">
              <ul className="detail-ingredients-list grid grid-cols-2 gap-x-4.5 gap-y-2.5 max-md:grid-cols-1" id="detailIngredientsList">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="recipe-ingredient-item relative pl-5.5 text-[0.88rem] text-text-dark">
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "steps" && (
            <div className="tab-pane active animate-fade-in" id="tabPaneSteps" role="tabpanel">
              <ol className="detail-steps-list pl-5 list-decimal flex flex-col gap-3" id="detailStepsList">
                {recipe.instructions.map((step, idx) => (
                  <li key={idx} className="text-[0.88rem] text-text-body leading-[1.6]">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {activeTab === "lore" && (
            <div className="tab-pane active animate-fade-in" id="tabPaneLore" role="tabpanel">
              <div
                className="detail-lore-content bg-primary-green-light border-l-4 border-primary-green p-[18px_22px] rounded-r-[14px] text-[0.92rem] text-primary-green-dark leading-[1.7] italic"
                id="detailLoreContent"
              >
                {recipe.lore || "A time-honored recipe passed down through generations."}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
