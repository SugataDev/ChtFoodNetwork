export default function HeroSection({
  onOpenRecipeDetail,
  onOpenShareModal,
  onFilterByCategory,
  showToast,
}) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleStatHerbsClick = () => {
    onFilterByCategory("Wild Herb & Soups");
    scrollTo("featured-recipes");
  };

  const handleRegionCardClick = () => {
    scrollTo("traditions");
    showToast("Discover traditions: Chakma, Marma, and Tripura culinary lore. 🌿");
  };

  return (
    <section className="hero-section pt-17 pb-21" id="home">
      <div className="app-container hero-grid grid grid-cols-[1.05fr_0.95fr] items-center gap-16 max-[1100px]:grid-cols-1">
        {/* Left Column: Hero Content */}
        <div className="hero-content">
          <div className="eyebrow-pill inline-flex items-center gap-2 bg-primary-green-light text-primary-green text-[0.72rem] font-bold tracking-widest px-4 py-1.75 rounded-full mb-6">
            <span className="dot w-1.5 h-1.5 bg-primary-green rounded-full" />
            AUTHENTIC INDIGENOUS HERITAGE
          </div>

          <h1 className="hero-heading font-serif text-[4rem] font-bold leading-[1.1] text-text-dark mb-6 max-md:text-[2.8rem]">
            Discover the Taste of<br />
            <span className="hero-italic italic font-normal text-primary-green">CHT</span>
          </h1>

          <p className="hero-description text-[1.02rem] text-text-body max-w-140 mb-8.5 leading-[1.75]">
            Immerse yourself in the culinary heritage of the Chittagong Hill Tracts. Experience
            ancestral bamboo delicacies, leaf-steamed river fish, wild mountain herbs, and
            time-honored recipes passed down through indigenous generations.
          </p>

          <div className="hero-buttons flex items-center gap-4 mb-12 flex-wrap">
            <a
              href="#featured-recipes"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("featured-recipes");
              }}
              className="btn btn-primary inline-flex items-center justify-center gap-2 font-sans font-bold text-[0.78rem] tracking-[0.08em] uppercase rounded-full cursor-pointer transition-all duration-200 border-none px-7.5 py-3.75 bg-primary-green text-white! shadow-[0_8px_20px_rgba(11,91,70,0.22)] hover:bg-primary-green-dark hover:-translate-y-0.5"
            >
              EXPLORE RECIPES <span className="arrow ml-1">&rarr;</span>
            </a>
            <button
              type="button"
              className="btn btn-secondary inline-flex items-center justify-center gap-2 font-sans font-bold text-[0.78rem] tracking-[0.08em] uppercase rounded-full cursor-pointer transition-all duration-200 px-7.5 py-3.75 bg-white border border-[#d1d5db] text-primary-green hover:border-primary-green hover:bg-primary-green-light"
              id="shareRecipeHeroBtn"
              onClick={onOpenShareModal}
            >
              SHARE YOUR RECIPE
            </button>
          </div>

          <div className="hero-stats flex items-center gap-9 pt-2 max-sm:gap-5">
            <div
              className="stat-item flex flex-col cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
              role="button"
              tabIndex={0}
              title="100% Indigenous Roots"
              id="statIndigenous"
              onClick={() => showToast("100% indigenous recipes archived directly from village elders.")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  showToast("100% indigenous recipes archived directly from village elders.");
                }
              }}
            >
              <span className="stat-number font-serif text-[1.55rem] font-bold text-text-dark leading-[1.2]">
                100%
              </span>
              <span className="stat-label text-[0.65rem] font-semibold tracking-[0.12em] text-text-muted mt-1">
                INDIGENOUS
              </span>
            </div>
            <div className="stat-divider w-px h-9 bg-border-light" />
            <div
              className="stat-item flex flex-col cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
              role="button"
              tabIndex={0}
              title="Explore Tribal Delicacies"
              id="statDelicacies"
              onClick={() => scrollTo("featured-recipes")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  scrollTo("featured-recipes");
                }
              }}
            >
              <span className="stat-number highlight-green font-serif text-[1.55rem] font-bold text-primary-green leading-[1.2]">
                50+
              </span>
              <span className="stat-label text-[0.65rem] font-semibold tracking-[0.12em] text-text-muted mt-1">
                TRIBAL DELICACIES
              </span>
            </div>
            <div className="stat-divider w-px h-9 bg-border-light" />
            <div
              className="stat-item flex flex-col cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
              role="button"
              tabIndex={0}
              title="Organic Mountain Botanicals"
              id="statHerbs"
              onClick={handleStatHerbsClick}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleStatHerbsClick();
                }
              }}
            >
              <span className="stat-number font-serif text-[1.55rem] font-bold text-text-dark leading-[1.2]">
                Organic
              </span>
              <span className="stat-label text-[0.65rem] font-semibold tracking-[0.12em] text-text-muted mt-1">
                WILD HERBS
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Featured Visual Card */}
        <div className="hero-visual-wrapper relative flex justify-end max-[1100px]:justify-center">
          <div
            className="hero-image-card relative w-full max-w-130 h-135 rounded-3xl overflow-hidden shadow-(--shadow-hero) cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_30px_60px_rgba(6,77,59,0.28)]"
            id="heroFeaturedCard"
            role="button"
            tabIndex={0}
            aria-label="View Bamboo Shoot Haringba recipe details"
            onClick={() => onOpenRecipeDetail("bamboo-shoot-haringba")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpenRecipeDetail("bamboo-shoot-haringba");
              }
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80"
              alt="Bamboo Shoot Haringba"
              className="hero-img w-full h-full object-cover"
            />
            <div className="hero-img-overlay absolute inset-0 bg-linear-to-t from-[rgba(6,28,22,0.88)] via-[rgba(6,28,22,0.35)_40%] to-transparent flex flex-col justify-end pt-9 px-8 pb-12 text-white">
              <span className="overlay-badge self-start bg-primary-green text-white text-[0.65rem] font-bold tracking-widest px-3 py-1.25 rounded-full mb-2.5">
                FEATURED CULINARY ART
              </span>
              <h3 className="overlay-title font-serif text-[1.65rem] font-bold mb-1">
                Bamboo Shoot Haringba
              </h3>
              <p className="overlay-subtitle text-[0.85rem] text-[rgba(255,255,255,0.88)]">
                Traditional slow-cooked delicacy with wild hill herbs &bull; Click to view recipe &rarr;
              </p>
            </div>
          </div>

          {/* Floating Region Badge Card */}
          <div
            className="floating-region-card absolute -bottom-4.5 left-4 bg-white rounded-2xl px-5.5 py-3.5 flex items-center gap-3.5 shadow-[0_15px_35px_rgba(17,24,39,0.12)] border border-border-subtle cursor-pointer transition-all duration-250 hover:-translate-y-1 hover:shadow-(--shadow-hover)"
            id="heroRegionCard"
            role="button"
            tabIndex={0}
            aria-label="Learn about CHT Indigenous communities"
            onClick={handleRegionCardClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleRegionCardClick();
              }
            }}
          >
            <div className="floating-icon w-10 h-10 rounded-full bg-accent-mint flex items-center justify-center text-[1.1rem]">
              🌿
            </div>
            <div className="floating-text">
              <h4 className="text-[0.85rem] font-bold text-text-dark">
                Chittagong Hill Tracts
              </h4>
              <p className="text-[0.72rem] text-text-body">
                Chakma &bull; Marma &bull; Tripura &bull; Explore Lore
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
