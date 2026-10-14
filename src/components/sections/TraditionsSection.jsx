import { TRADITIONS_DATA } from "../../data/traditionsData";

export default function TraditionsSection({
  activeCategory,
  onCategoryChange,
  showToast,
}) {
  const handleTraditionClick = (category) => {
    const isAlreadyActive = activeCategory.toLowerCase() === category.toLowerCase();
    if (isAlreadyActive) {
      onCategoryChange("all");
      showToast("Showing all Featured Hill Recipes.");
    } else {
      onCategoryChange(category);
      showToast(`Filtered by "${category}". 🎋`);
      const section = document.getElementById("featured-recipes");
      if (section) {
        const headerOffset = 80;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="tradition-section bg-bg-soft py-19 my-6" id="traditions">
      <div className="app-container">
        <div className="tradition-header text-center max-w-160 mx-auto mb-11">
          <span className="section-eyebrow block text-[0.72rem] font-bold tracking-[0.14em] text-primary-green uppercase mb-1.5">
            REGIONAL TAXONOMY
          </span>
          <h2 className="section-title font-serif text-[2.15rem] font-bold text-text-dark">
            Explore by Cooking Tradition
          </h2>
          <p className="tradition-subtitle text-[0.94rem] text-text-body mt-2.5">
            The Chittagong Hill Tracts culinary identity is shaped by deep-forest foraging,
            open-fire smoking, and bamboo-vessel cooking. Click any category to filter.
          </p>
        </div>

        <div className="tradition-grid grid grid-cols-5 gap-5.5 max-[1100px]:grid-cols-3 max-md:grid-cols-1">
          {TRADITIONS_DATA.map((tradition) => {
            const isActive = activeCategory.toLowerCase() === tradition.filter.toLowerCase();
            return (
              <div
                key={tradition.id}
                className={`tradition-card bg-white border rounded-2xl p-[32px_20px] text-center cursor-pointer shadow-[0_4px_16px_rgba(17,24,39,0.03)] transition-all duration-250 hover:border-primary-green hover:-translate-y-1 hover:shadow-(--shadow-hover) ${
                  isActive
                    ? "active border-primary-green -translate-y-1 shadow-(--shadow-hover)"
                    : "border-border-subtle"
                }`}
                data-filter={tradition.filter}
                role="button"
                tabIndex={0}
                aria-label={`Filter ${tradition.title} recipes`}
                onClick={() => handleTraditionClick(tradition.filter)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleTraditionClick(tradition.filter);
                  }
                }}
              >
                <div className="tradition-icon text-[1.9rem] mb-3.5">
                  {tradition.icon}
                </div>
                <h3 className="tradition-title font-serif text-[1.02rem] font-bold text-text-dark mb-1.5">
                  {tradition.title}
                </h3>
                <p className="tradition-desc text-[0.76rem] text-text-muted leading-[1.45]">
                  {tradition.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
