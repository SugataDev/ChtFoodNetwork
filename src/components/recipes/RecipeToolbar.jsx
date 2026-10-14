import { useRef } from "react";

export default function RecipeToolbar({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  visibleCount,
  totalCount,
  onResetFilters,
}) {
  const searchInputRef = useRef(null);

  const categories = [
    { key: "all", label: "All" },
    { key: "Bamboo Cooked", label: "Bamboo Cooked" },
    { key: "Leaf Steamed", label: "Leaf Steamed" },
    { key: "Wild Herb & Soups", label: "Wild Herb & Soups" },
    { key: "Smoked Delicacies", label: "Smoked" },
    { key: "Chutneys & Berma", label: "Chutneys & Berma" },
  ];

  const isFiltered = searchQuery.trim() !== "" || activeCategory.toLowerCase() !== "all";

  const handleClearSearch = () => {
    onSearchChange("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <>
      <div className="recipe-toolbar bg-white border border-border-light rounded-[18px] p-[18px_22px] mb-4 shadow-[0_4px_18px_rgba(17,24,39,0.04)] flex flex-col gap-4">
        <div className="search-input-wrapper relative w-full">
          <span className="search-icon absolute left-4.5 top-1/2 -translate-y-1/2 text-text-muted text-[1rem] pointer-events-none" aria-hidden="true">
            &#128269;
          </span>
          <input
            ref={searchInputRef}
            type="text"
            id="recipeSearchInput"
            className="search-input w-full py-3.25 pr-11 pl-12 rounded-full border border-border-light bg-bg-soft font-sans text-[0.9rem] text-text-dark transition-all duration-200 outline-none focus:border-primary-green focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,91,70,0.12)]"
            placeholder="Search hill pork, stream fish, wild herbs, chef, or tribe..."
            aria-label="Search recipes"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              id="clearSearchBtn"
              className="clear-search-btn absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none text-[1.35rem] text-text-muted cursor-pointer p-1 leading-none hover:text-text-dark"
              aria-label="Clear search"
              onClick={handleClearSearch}
            >
              &times;
            </button>
          )}
        </div>

        <div className="toolbar-controls flex items-center justify-between flex-wrap gap-3.5">
          <div className="filter-pills flex items-center flex-wrap gap-2" role="tablist" aria-label="Recipe categories">
            {categories.map((cat) => {
              const isActive = activeCategory.toLowerCase() === cat.key.toLowerCase();
              return (
                <button
                  key={cat.key}
                  type="button"
                  className={`filter-pill px-4 py-1.75 rounded-full font-sans text-[0.76rem] font-semibold cursor-pointer transition-all duration-200 ${
                    isActive
                      ? "active bg-primary-green border border-primary-green text-white shadow-[0_4px_12px_rgba(11,91,70,0.2)]"
                      : "bg-bg-soft border border-border-light text-text-body hover:border-primary-green hover:text-primary-green"
                  }`}
                  data-category={cat.key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onCategoryChange(cat.key)}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="sort-select-wrapper flex items-center gap-2">
            <label htmlFor="recipeSortSelect" className="sort-label text-[0.78rem] font-bold text-text-muted tracking-wider uppercase">
              Sort:
            </label>
            <select
              id="recipeSortSelect"
              className="sort-select px-3.5 py-2 rounded-full border border-border-light bg-white font-sans text-[0.8rem] font-semibold text-text-dark outline-none cursor-pointer transition-colors duration-200 focus:border-primary-green"
              aria-label="Sort recipes"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
            >
              <option value="default">Featured</option>
              <option value="likes">Most Popular (Likes)</option>
              <option value="time-asc">Cooking Time (Fastest)</option>
              <option value="time-desc">Cooking Time (Longest)</option>
              <option value="title">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count Feedback & Reset Trigger */}
      <div className="toolbar-feedback flex items-center justify-between mb-5.5 text-[0.84rem] text-text-muted px-1" id="toolbarFeedback">
        <span id="resultsCountText">
          {isFiltered
            ? `Showing ${visibleCount} of ${totalCount} recipes`
            : `Showing all ${totalCount} recipes`}
        </span>
        {isFiltered && (
          <button
            type="button"
            id="resetActiveFiltersBtn"
            className="btn-link-action bg-transparent border-none text-primary-green font-semibold text-[0.84rem] cursor-pointer underline"
            onClick={onResetFilters}
          >
            Reset all filters
          </button>
        )}
      </div>
    </>
  );
}
