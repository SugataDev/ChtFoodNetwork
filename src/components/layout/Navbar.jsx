import { useState, useEffect } from "react";

export default function Navbar({
  activeSection,
  setActiveSection,
  currentUser,
  savedCount,
  onOpenSavedModal,
  onOpenAuthModal,
  onLogout,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "featured-recipes", label: "Recipes" },
    { id: "traditions", label: "Traditions" },
    { id: "celebrated-recipes", label: "Celebrated" },
    { id: "heritage-faq", label: "Heritage & FAQ" },
  ];

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection(id);
    const target = document.getElementById(id);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="navbar bg-white border-b border-border-subtle py-4.5 sticky top-0 z-100">
      <div className="app-container flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, "home")}
          className="brand-logo flex flex-col leading-[1.1]"
          aria-label="CHT Food Network Home"
        >
          <span className="brand-title font-serif text-[1.55rem] font-bold text-primary-green tracking-[0.02em]">
            CHT
          </span>
          <span className="brand-subtitle text-[0.58rem] font-semibold tracking-[0.22em] text-text-body mt-0.5">
            FOOD NETWORK
          </span>
        </a>

        <nav
          className={`nav-right flex items-center gap-6 max-md:fixed max-md:top-18 max-md:left-0 max-md:right-0 max-md:bg-white max-md:border-b max-md:border-border-light max-md:p-6 max-md:flex-col max-md:items-start max-md:gap-4.5 max-md:shadow-[0_15px_30px_rgba(0,0,0,0.1)] max-md:z-99 max-md:transition-all max-md:duration-300 ${
            mobileMenuOpen
              ? "max-md:translate-y-0 max-md:opacity-100 max-md:pointer-events-auto"
              : "max-md:translate-y-[-120%] max-md:opacity-0 max-md:pointer-events-none"
          }`}
          id="navMenu"
          aria-label="Main navigation"
        >
          <ul className="nav-links flex items-center gap-6 max-md:flex-col max-md:items-start max-md:gap-4 max-md:w-full">
            {navLinks.map((item) => (
              <li key={item.id} className="max-md:w-full">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className={`nav-link text-[0.88rem] py-1.5 relative transition-colors duration-200 block ${
                    activeSection === item.id
                      ? "text-primary-green font-semibold active-nav-link-indicator"
                      : "text-text-body font-medium hover:text-primary-green hover:font-semibold"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <span className="nav-divider w-px h-5.5 bg-border-light max-md:hidden" />

          <div className="nav-actions flex items-center gap-3 max-md:w-full max-md:flex-col max-md:items-stretch">
            {currentUser && (
              <button
                className="btn-saved-indicator inline-flex items-center justify-center gap-2 font-sans font-bold text-[0.74rem] tracking-[0.08em] uppercase rounded-full cursor-pointer transition-all duration-200 border border-[rgba(11,91,70,0.2)] bg-primary-green-light text-primary-green px-4 py-2 hover:bg-primary-green hover:text-white group"
                id="savedRecipesBtn"
                aria-label="View saved recipes"
                title="View your saved recipes"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSavedModal();
                }}
              >
                <span className="saved-icon text-[#f59e0b] text-[0.95rem]">★</span>
                <span className="saved-label">Saved</span>
                <span
                  className="saved-count-badge bg-primary-green text-white px-1.75 py-0.5 rounded-full text-[0.7rem] font-bold ml-1 transition-all duration-200 group-hover:bg-white group-hover:text-primary-green"
                  id="savedCountBadge"
                >
                  {savedCount}
                </span>
              </button>
            )}

            {!currentUser ? (
              <div className="auth-actions flex items-center gap-2.5" id="authNavActions">
                <button
                  className="btn-primary-sm inline-flex items-center justify-center gap-2 font-sans font-bold text-[0.78rem] tracking-[0.08em] uppercase rounded-full cursor-pointer transition-all duration-200 border-none px-6 py-2.5 bg-primary-green text-white hover:bg-primary-green-dark max-md:w-full"
                  id="loginBtn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuthModal("login");
                  }}
                >
                  LOG IN
                </button>
              </div>
            ) : (
              <div
                className="user-profile-badge flex items-center gap-2.5 bg-bg-soft pl-1.5 pr-3.5 py-1 rounded-full border border-border-light"
                id="userNavProfile"
              >
                <span
                  className="user-avatar-initial w-7 h-7 rounded-full bg-primary-green text-white flex items-center justify-center font-bold text-[0.78rem]"
                  id="userAvatarInitial"
                >
                  {(currentUser.name || "C").charAt(0).toUpperCase()}
                </span>
                <span
                  className="user-display-name text-[0.8rem] font-semibold text-text-dark"
                  id="userDisplayName"
                >
                  {currentUser.name || "Member"}
                </span>
                <button
                  className="btn-logout bg-transparent border-none cursor-pointer text-text-muted text-[1.1rem] flex items-center transition-colors duration-200 hover:text-[#e11d48]"
                  id="logoutBtn"
                  title="Log Out"
                  aria-label="Log Out"
                  onClick={onLogout}
                >
                  &#x21AA;
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="hamburger-btn hidden max-md:flex bg-transparent border-none cursor-pointer p-2 flex-col gap-1.25 z-110"
          id="mobileMenuToggle"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span
            className={`hamburger-bar block w-6 h-[2.5px] bg-primary-green rounded-xs transition-all duration-300 ${
              mobileMenuOpen ? "translate-y-[7.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`hamburger-bar block w-6 h-[2.5px] bg-primary-green rounded-xs transition-all duration-300 ${
              mobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`hamburger-bar block w-6 h-[2.5px] bg-primary-green rounded-xs transition-all duration-300 ${
              mobileMenuOpen ? "translate-y-[-7.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>
    </header>
  );
}
