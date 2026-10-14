export default function SavedRecipesModal({
  isOpen,
  savedRecipes,
  onClose,
  onOpenDetail,
  onRemoveSaved,
  onClearAllSaved,
}) {
  if (!isOpen) return null;

  const handleExploreMore = () => {
    onClose();
    const el = document.getElementById("featured-recipes");
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div
      className="modal-backdrop fixed inset-0 bg-[rgba(6,28,22,0.75)] backdrop-blur-md z-1000 flex items-center justify-center p-5 transition-opacity duration-300 opacity-100 open"
      id="savedModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="savedModalTitle"
      onClick={(e) => {
        if (e.target.id === "savedModal") onClose();
      }}
    >
      <div className="modal-window bg-white rounded-3xl w-full max-w-130 max-h-[90vh] overflow-y-auto shadow-[0_25px_60px_rgba(0,0,0,0.3)] flex flex-col transition-transform duration-300 transform translate-y-0 scale-100 max-md:w-[95%]">
        <div className="modal-header p-[24px_28px_18px] flex items-center justify-between border-b border-border-subtle sticky top-0 bg-white z-10">
          <h3 className="modal-title font-serif text-[1.35rem] font-bold text-text-dark" id="savedModalTitle">
            Your Saved Hill Recipes
          </h3>
          <button
            type="button"
            className="modal-close-btn bg-bg-soft border-none w-8.5 h-8.5 rounded-full text-[1.3rem] text-text-body flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#fee2e2] hover:text-[#e11d48]"
            id="savedModalClose"
            aria-label="Close modal"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className="modal-body p-[26px_28px_32px]">
          <div className="saved-items-container flex flex-col gap-3.5 max-h-95 overflow-y-auto mb-5.5" id="savedItemsContainer">
            {savedRecipes.length === 0 ? (
              <div className="saved-empty-state text-center py-9 px-4">
                <div className="saved-empty-icon text-[2.5rem] mb-3 text-text-muted">
                  ☆
                </div>
                <h4 className="saved-empty-title font-serif text-[1.15rem] font-bold text-text-dark mb-1.5">
                  No Saved Recipes Yet
                </h4>
                <p className="saved-empty-desc text-[0.84rem] text-text-body max-w-[320px] mx-auto">
                  Explore our authentic hill delicacies and click "Save" to build your indigenous heritage recipe box.
                </p>
              </div>
            ) : (
              savedRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="saved-item-card flex items-center gap-4 p-[12px_14px] rounded-xl bg-bg-soft border border-border-subtle transition-all duration-200 hover:border-[rgba(11,91,70,0.3)] hover:bg-white"
                  data-recipe-id={recipe.id}
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="saved-item-thumb w-15 h-15 rounded-[10px] object-cover shrink-0"
                  />
                  <div className="saved-item-details flex-1">
                    <h4
                      className="saved-item-title font-serif text-[0.96rem] font-bold text-text-dark cursor-pointer transition-colors duration-200 hover:text-primary-green"
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        onClose();
                        onOpenDetail(recipe.id);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onClose();
                          onOpenDetail(recipe.id);
                        }
                      }}
                    >
                      {recipe.title}
                    </h4>
                    <div className="saved-item-meta text-[0.72rem] text-text-muted mt-0.5">
                      {recipe.category} &bull; &#9201; {recipe.time} mins
                    </div>
                  </div>
                  <div className="saved-item-actions flex items-center gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-sm btn-view-saved px-4.5 py-2 bg-transparent border border-[#9ca3af] text-primary-green font-sans font-bold text-[0.74rem] tracking-[0.08em] uppercase rounded-full cursor-pointer transition-all duration-200 hover:border-primary-green hover:bg-primary-green-light"
                      data-recipe-id={recipe.id}
                      onClick={() => {
                        onClose();
                        onOpenDetail(recipe.id);
                      }}
                    >
                      VIEW
                    </button>
                    <button
                      type="button"
                      className="btn-saved-remove bg-transparent border-none text-[#e11d48] cursor-pointer text-[0.74rem] font-semibold p-1.5 transition-opacity duration-200 hover:opacity-75"
                      data-recipe-id={recipe.id}
                      aria-label="Remove recipe"
                      onClick={() => onRemoveSaved(recipe.id)}
                    >
                      &times; Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="saved-modal-footer flex items-center justify-between gap-3 pt-4 border-t border-border-light">
            {savedRecipes.length > 0 && (
              <button
                type="button"
                className="btn btn-outline-sm px-5.5 py-2.25 bg-transparent border border-[#9ca3af] text-primary-green font-sans font-bold text-[0.78rem] tracking-[0.08em] uppercase rounded-full cursor-pointer transition-all duration-200 hover:border-primary-green hover:bg-primary-green-light"
                id="clearAllSavedBtn"
                onClick={onClearAllSaved}
              >
                CLEAR ALL SAVED
              </button>
            )}
            <button
              type="button"
              className="btn btn-primary-sm px-6 py-2.5 bg-primary-green text-white font-sans font-bold text-[0.78rem] tracking-[0.08em] uppercase rounded-full cursor-pointer transition-all duration-200 border-none hover:bg-primary-green-dark ml-auto"
              id="savedExploreMoreBtn"
              onClick={handleExploreMore}
            >
              EXPLORE MORE RECIPES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
