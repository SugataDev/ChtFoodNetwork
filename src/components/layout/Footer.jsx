export default function Footer({
  onFilterByCategory,
  onOpenShareModal,
  onOpenInfoModal,
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

  const handleCategoryTrigger = (e, cat) => {
    e.preventDefault();
    onFilterByCategory(cat);
    scrollTo("featured-recipes");
    showToast(`Exploring "${cat}" gastronomy.`);
  };

  return (
    <footer className="site-footer border-t border-border-subtle pt-16 pb-9 bg-white">
      <div className="app-container">
        <div className="footer-grid grid grid-cols-[1.6fr_1fr_1fr] gap-12 mb-13 max-[1100px]:grid-cols-1 max-md:grid-cols-1">
          {/* Brand Column */}
          <div className="footer-brand">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="brand-logo inline-flex flex-col leading-[1.1]"
              aria-label="CHT Food Network Home"
            >
              <span className="brand-title font-serif text-[1.55rem] font-bold text-primary-green tracking-[0.02em]">
                CHT
              </span>
              <span className="brand-subtitle text-[0.58rem] font-semibold tracking-[0.22em] text-text-body mt-0.5">
                FOOD NETWORK
              </span>
            </a>
            <p className="footer-tagline font-serif italic text-[0.92rem] text-text-body mt-3.5 mb-3">
              Preserve. Cook. Share.
            </p>
            <p className="footer-bio text-[0.84rem] text-text-muted max-w-105 leading-[1.65]">
              Dedicated to archiving and celebrating the culinary diversity of the Chittagong Hill
              Tracts &mdash; preserving traditional indigenous ingredients, bamboo-infused aromas,
              and age-old culinary memories.
            </p>
          </div>

          {/* Explore Column */}
          <div className="footer-links-col">
            <h4 className="footer-col-title text-[0.74rem] font-bold tracking-[0.12em] text-text-dark mb-4.5">
              EXPLORE
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-[0.86rem] text-text-body hover:text-primary-green transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#featured-recipes"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("featured-recipes");
                  }}
                  className="text-[0.86rem] text-text-body hover:text-primary-green transition-colors duration-200"
                >
                  All Recipes
                </a>
              </li>
              <li>
                <a
                  href="#featured-recipes"
                  data-filter-trigger="Bamboo Cooked"
                  onClick={(e) => handleCategoryTrigger(e, "Bamboo Cooked")}
                  className="text-[0.86rem] text-text-body hover:text-primary-green transition-colors duration-200"
                >
                  Bamboo Gastronomy
                </a>
              </li>
              <li>
                <a
                  href="#featured-recipes"
                  data-filter-trigger="Leaf Steamed"
                  onClick={(e) => handleCategoryTrigger(e, "Leaf Steamed")}
                  className="text-[0.86rem] text-text-body hover:text-primary-green transition-colors duration-200"
                >
                  Leaf Steamed
                </a>
              </li>
            </ul>
          </div>

          {/* Community Column */}
          <div className="footer-links-col">
            <h4 className="footer-col-title text-[0.74rem] font-bold tracking-[0.12em] text-text-dark mb-4.5">
              COMMUNITY
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="#share"
                  id="footerShareLink"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenShareModal();
                  }}
                  className="text-[0.86rem] text-text-body hover:text-primary-green transition-colors duration-200"
                >
                  Share Your Recipe
                </a>
              </li>
              <li>
                <a
                  href="#chefs"
                  id="footerChefsLink"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenInfoModal("chefs");
                  }}
                  className="text-[0.86rem] text-text-body hover:text-primary-green transition-colors duration-200"
                >
                  Chef Profiles
                </a>
              </li>
              <li>
                <a
                  href="#heritage-faq"
                  id="footerArchiveLink"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("heritage-faq");
                  }}
                  className="text-[0.86rem] text-text-body hover:text-primary-green transition-colors duration-200"
                >
                  Indigenous Heritage Archive
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom border-t border-border-subtle pt-7 flex items-center justify-between text-[0.78rem] text-text-muted max-md:flex-col max-md:items-start max-md:gap-3">
          <p>&copy; 2026 CHT Food Network. All rights reserved.</p>
          <div className="footer-legal flex gap-6">
            <a
              href="#privacy"
              id="privacyLink"
              onClick={(e) => {
                e.preventDefault();
                onOpenInfoModal("privacy");
              }}
              className="hover:text-primary-green transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              id="termsLink"
              onClick={(e) => {
                e.preventDefault();
                onOpenInfoModal("terms");
              }}
              className="hover:text-primary-green transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a
              href="#contact"
              id="contactLink"
              onClick={(e) => {
                e.preventDefault();
                onOpenInfoModal("contact");
              }}
              className="hover:text-primary-green transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
