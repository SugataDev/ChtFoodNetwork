import { useState, useEffect, useRef } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/sections/HeroSection";
import FeaturedRecipesSection from "./components/sections/FeaturedRecipesSection";
import TraditionsSection from "./components/sections/TraditionsSection";
import CelebratedSection from "./components/sections/CelebratedSection";
import FaqSection from "./components/sections/FaqSection";
import CtaSection from "./components/sections/CtaSection";
import Toast from "./components/ui/Toast";

import AuthModal from "./components/modals/AuthModal";
import ShareRecipeModal from "./components/modals/ShareRecipeModal";
import RecipeDetailModal from "./components/modals/RecipeDetailModal";
import SavedRecipesModal from "./components/modals/SavedRecipesModal";
import InfoModal from "./components/modals/InfoModal";

import { INITIAL_RECIPES } from "./data/recipesData";

function loadFromStorage(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore quota errors in constrained environments
  }
}

export default function App() {
  // Core Application State
  const [recipes, setRecipes] = useState(() => {
    const custom = loadFromStorage("cht_custom_recipes", []);
    return [...custom, ...INITIAL_RECIPES];
  });

  const [likedIds, setLikedIds] = useState(() => {
    return new Set(loadFromStorage("cht_liked_recipes", []));
  });

  const [savedIds, setSavedIds] = useState(() => {
    return new Set(loadFromStorage("cht_saved_recipes", []));
  });

  const [currentUser, setCurrentUser] = useState(() => {
    return loadFromStorage("cht_current_user", null);
  });

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [activeSection, setActiveSection] = useState("home");
  const [newlyAddedId, setNewlyAddedId] = useState(null);

  // Modals state
  const [authModal, setAuthModal] = useState({ isOpen: false, tab: "login" });
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [detailModal, setDetailModal] = useState({ isOpen: false, recipeId: null });
  const [savedModalOpen, setSavedModalOpen] = useState(false);
  const [infoModal, setInfoModal] = useState({ isOpen: false, type: "chefs" });

  // Toast state
  const [toast, setToast] = useState({ show: false, message: "" });
  const toastTimeoutRef = useRef(null);

  const showToast = (message) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ show: true, message });
    toastTimeoutRef.current = setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 3200);
  };

  // Body modal-open lock
  const isAnyModalOpen =
    authModal.isOpen ||
    shareModalOpen ||
    detailModal.isOpen ||
    savedModalOpen ||
    infoModal.isOpen;

  useEffect(() => {
    if (isAnyModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isAnyModalOpen]);

  // Global Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setAuthModal({ isOpen: false, tab: "login" });
        setShareModalOpen(false);
        setDetailModal({ isOpen: false, recipeId: null });
        setSavedModalOpen(false);
        setInfoModal({ isOpen: false, type: "chefs" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Scrollspy
  useEffect(() => {
    const sections = [
      "home",
      "featured-recipes",
      "traditions",
      "celebrated-recipes",
      "heritage-faq",
    ];

    const handleScroll = () => {
      const scrollY = window.pageYOffset + 120;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Like action handler
  const handleLike = (recipeId) => {
    if (!currentUser) {
      showToast("Please log in or sign in to like hill recipes!");
      setAuthModal({ isOpen: true, tab: "login" });
      return;
    }

    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(recipeId)) {
        next.delete(recipeId);
        showToast("Removed from your liked recipes.");
      } else {
        next.add(recipeId);
        showToast("Added to your liked hill recipes! ❤️");
      }
      saveToStorage("cht_liked_recipes", Array.from(next));
      return next;
    });
  };

  // Save action handler
  const handleSave = (recipeId) => {
    if (!currentUser) {
      showToast("Please log in or sign in to save recipes to your collection!");
      setAuthModal({ isOpen: true, tab: "login" });
      return;
    }

    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(recipeId)) {
        next.delete(recipeId);
        showToast("Recipe removed from your saved archive.");
      } else {
        next.add(recipeId);
        showToast("Recipe saved to your personal collection!");
      }
      saveToStorage("cht_saved_recipes", Array.from(next));
      return next;
    });
  };

  // Clear all saved
  const handleClearAllSaved = () => {
    setSavedIds(new Set());
    saveToStorage("cht_saved_recipes", []);
    showToast("Cleared all saved recipes.");
  };

  // Logout handler
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("cht_current_user");
    showToast("You have been logged out.");
  };

  // Login / Join success
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    saveToStorage("cht_current_user", user);
  };

  // Publish new custom recipe
  const handlePublishRecipe = (newRecipe) => {
    const custom = loadFromStorage("cht_custom_recipes", []);
    custom.unshift(newRecipe);
    saveToStorage("cht_custom_recipes", custom);

    setRecipes((prev) => [newRecipe, ...prev]);
    setNewlyAddedId(newRecipe.id);
    setTimeout(() => {
      setNewlyAddedId(null);
    }, 3000);
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setSortBy("default");
    showToast("All filters reset. Showing all recipes.");
  };

  // Open recipe detail
  const handleOpenDetail = (recipeId) => {
    setDetailModal({ isOpen: true, recipeId });
  };

  // Current recipe for Detail Modal
  const detailRecipe = recipes.find((r) => r.id === detailModal.recipeId) || null;

  // Saved recipes list for Saved Modal
  const savedRecipesList = Array.from(savedIds)
    .map((id) => recipes.find((r) => r.id === id))
    .filter(Boolean);

  // Filter & sort recipes for Featured Grid
  const query = searchQuery.toLowerCase().trim();
  const category = activeCategory.toLowerCase();

  const filteredRecipes = recipes.filter((r) => {
    const matchesCat = category === "all" || r.category.toLowerCase() === category;
    if (!matchesCat) return false;

    if (!query) return true;
    const ingText = (r.ingredients || []).join(" ").toLowerCase();
    const tribeText = (r.tribe || "").toLowerCase();
    const titleText = (r.title || "").toLowerCase();
    const descText = (r.description || "").toLowerCase();
    const authorText = (r.author || "").toLowerCase();
    const catText = (r.category || "").toLowerCase();

    return (
      titleText.includes(query) ||
      descText.includes(query) ||
      authorText.includes(query) ||
      catText.includes(query) ||
      ingText.includes(query) ||
      tribeText.includes(query)
    );
  });

  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    if (sortBy === "likes") {
      const likesA = a.likes + (likedIds.has(a.id) ? 1 : 0);
      const likesB = b.likes + (likedIds.has(b.id) ? 1 : 0);
      return likesB - likesA;
    }
    if (sortBy === "time-asc") {
      return a.time - b.time;
    }
    if (sortBy === "time-desc") {
      return b.time - a.time;
    }
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. Header / Navbar */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        currentUser={currentUser}
        savedCount={savedIds.size}
        onOpenSavedModal={() => setSavedModalOpen(true)}
        onOpenAuthModal={(tab) => setAuthModal({ isOpen: true, tab })}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <HeroSection
          onOpenRecipeDetail={handleOpenDetail}
          onOpenShareModal={() => setShareModalOpen(true)}
          onFilterByCategory={(cat) => {
            setActiveCategory(cat);
            showToast(`Filtered by "${cat}". 🎋`);
          }}
          showToast={showToast}
        />

        {/* 3. Featured Hill Recipes Section */}
        <FeaturedRecipesSection
          recipes={sortedRecipes}
          likedIds={likedIds}
          savedIds={savedIds}
          onLike={handleLike}
          onSave={handleSave}
          onOpenDetail={handleOpenDetail}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCategory={activeCategory}
          onCategoryChange={(cat) => {
            setActiveCategory(cat);
            showToast(`Showing: ${cat === "all" ? "All Recipes" : cat}`);
          }}
          sortBy={sortBy}
          onSortChange={(val) => {
            setSortBy(val);
            showToast("Recipes re-sorted.");
          }}
          visibleCount={sortedRecipes.length}
          totalCount={recipes.length}
          onResetFilters={handleResetFilters}
          newlyAddedId={newlyAddedId}
        />

        {/* 4. Explore by Cooking Tradition */}
        <TraditionsSection
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          showToast={showToast}
        />

        {/* 5. Most Celebrated Creations */}
        <CelebratedSection
          recipes={recipes}
          likedIds={likedIds}
          savedIds={savedIds}
          onLike={handleLike}
          onSave={handleSave}
          onOpenDetail={handleOpenDetail}
          onSortByLikes={() => setSortBy("likes")}
          showToast={showToast}
        />

        {/* 5B. Traditional Wisdom & FAQ Accordion */}
        <FaqSection />

        {/* 6. Community CTA Banner */}
        <CtaSection
          onOpenAuthModal={(tab) => setAuthModal({ isOpen: true, tab })}
          onOpenShareModal={() => setShareModalOpen(true)}
          showToast={showToast}
        />
      </main>

      {/* 7. Footer */}
      <Footer
        onFilterByCategory={(cat) => setActiveCategory(cat)}
        onOpenShareModal={() => setShareModalOpen(true)}
        onOpenInfoModal={(type) => setInfoModal({ isOpen: true, type })}
        showToast={showToast}
      />

      {/* 8. Modals */}
      <AuthModal
        isOpen={authModal.isOpen}
        initialTab={authModal.tab}
        onClose={() => setAuthModal({ isOpen: false, tab: "login" })}
        onLoginSuccess={handleLoginSuccess}
        showToast={showToast}
      />

      <ShareRecipeModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        onPublishRecipe={handlePublishRecipe}
        showToast={showToast}
      />

      <RecipeDetailModal
        recipe={detailRecipe}
        isOpen={detailModal.isOpen}
        isLiked={detailRecipe ? likedIds.has(detailRecipe.id) : false}
        isSaved={detailRecipe ? savedIds.has(detailRecipe.id) : false}
        onLike={handleLike}
        onSave={handleSave}
        onClose={() => setDetailModal({ isOpen: false, recipeId: null })}
        showToast={showToast}
      />

      <SavedRecipesModal
        isOpen={savedModalOpen}
        savedRecipes={savedRecipesList}
        onClose={() => setSavedModalOpen(false)}
        onOpenDetail={handleOpenDetail}
        onRemoveSaved={handleSave}
        onClearAllSaved={handleClearAllSaved}
      />

      <InfoModal
        isOpen={infoModal.isOpen}
        contentType={infoModal.type}
        onClose={() => setInfoModal({ isOpen: false, type: "chefs" })}
        showToast={showToast}
      />

      {/* Toast Notification */}
      <Toast toast={toast} />
    </div>
  );
}
