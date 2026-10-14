import { useState } from "react";
import { FALLBACK_IMAGES } from "../../data/recipesData";

export default function ShareRecipeModal({
  isOpen,
  onClose,
  onPublishRecipe,
  showToast,
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tribe, setTribe] = useState("");
  const [time, setTime] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [lore, setLore] = useState("");

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Recipe title is required.";
    if (!category) newErrors.category = "Please choose a cooking tradition.";
    if (!tribe.trim())
      newErrors.tribe = "Please specify the community or region.";
    if (!time.trim() || isNaN(time) || Number(time) < 5 || Number(time) > 360) {
      newErrors.time = "Enter a valid cooking time.";
    }
    if (!author.trim())
      newErrors.author = "Please provide the submitter's name.";
    if (!ingredients.trim())
      newErrors.ingredients = "Please list key ingredients.";
    if (!instructions.trim())
      newErrors.instructions = "Please provide cooking instructions.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const newId = `recipe-${Date.now()}`;
      const newRecipe = {
        id: newId,
        title: title.trim(),
        category,
        time: parseInt(time.trim(), 10) || 30,
        likes: 1,
        author: author.trim(),
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
        tribe: tribe.trim(),
        image:
          image.trim() ||
          FALLBACK_IMAGES[category] ||
          FALLBACK_IMAGES["Bamboo Cooked"],
        description: instructions.trim().slice(0, 110) + "...",
        ingredients: ingredients
          .split(/[\n,]+/)
          .map((s) => s.trim())
          .filter(Boolean),
        instructions: instructions
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        lore:
          lore.trim() ||
          "A treasured heirloom family recipe preserved across generations in the hills.",
      };

      onPublishRecipe(newRecipe);
      setAlertMsg("Recipe successfully published! Adding to featured grid...");

      setTimeout(() => {
        setSubmitting(false);
        setAlertMsg("");
        setTitle("");
        setCategory("");
        setTribe("");
        setTime("");
        setAuthor("");
        setImage("");
        setIngredients("");
        setInstructions("");
        setLore("");
        onClose();
        showToast(`"${newRecipe.title}" added to CHT Recipe Archive! 🌿`);

        // Smooth scroll to featured recipes
        setTimeout(() => {
          const el = document.getElementById("featured-recipes");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 150);
      }, 1200);
    }, 700);
  };

  return (
    <div
      className="modal-backdrop fixed inset-0 bg-[rgba(6,28,22,0.75)] backdrop-blur-md z-1000 flex items-center justify-center p-5 transition-opacity duration-300 opacity-100 open"
      id="shareRecipeModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="shareModalTitle"
      onClick={(e) => {
        if (e.target.id === "shareRecipeModal") onClose();
      }}
    >
      <div className="modal-window modal-window-lg bg-white rounded-3xl w-full max-w-190 max-h-[90vh] overflow-y-auto shadow-[0_25px_60px_rgba(0,0,0,0.3)] flex flex-col transition-transform duration-300 transform translate-y-0 scale-100 max-md:w-[95%]">
        <div className="modal-header p-[24px_28px_18px] flex items-center justify-between border-b border-border-subtle sticky top-0 bg-white z-10">
          <h3
            className="modal-title font-serif text-[1.35rem] font-bold text-text-dark"
            id="shareModalTitle"
          >
            Share an Indigenous Recipe
          </h3>
          <button
            type="button"
            className="modal-close-btn bg-bg-soft border-none w-8.5 h-8.5 rounded-full text-[1.3rem] text-text-body flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#fee2e2] hover:text-[#e11d48]"
            id="shareRecipeModalClose"
            aria-label="Close modal"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className="modal-body p-[26px_28px_32px]">
          <p className="modal-intro-text text-[0.9rem] text-text-body mb-5.5 leading-[1.6]">
            Help safeguard indigenous culinary wisdom. Document your family's
            bamboo-steamed delicacies, wild herbal curations, and mountain
            traditions.
          </p>

          <form id="shareRecipeForm" noValidate onSubmit={handleSubmit}>
            {alertMsg && (
              <div
                className="form-feedback-alert p-[12px_16px] rounded-[10px] text-[0.82rem] mb-4.5 leading-[1.4] bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0] success block"
                id="shareAlert"
              >
                {alertMsg}
              </div>
            )}

            <div className="form-row flex gap-4 max-md:flex-col max-md:gap-0">
              <div className="form-group col-half flex-1 mb-4.5">
                <label
                  htmlFor="recipeTitleInput"
                  className="form-label block text-[0.8rem] font-bold text-text-dark mb-1.5"
                >
                  Recipe Title *
                </label>
                <input
                  type="text"
                  id="recipeTitleInput"
                  className={`form-control w-full p-[12px_16px] rounded-[10px] border bg-bg-soft font-sans text-[0.88rem] text-text-dark transition-all duration-200 outline-none focus:border-primary-green focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,91,70,0.12)] ${
                    errors.title
                      ? "is-invalid border-[#e11d48] bg-[#fff1f2]"
                      : "border-border-light"
                  }`}
                  placeholder="e.g. Bamboo Shoot Haringba"
                  required
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (errors.title) setErrors((p) => ({ ...p, title: null }));
                  }}
                />
                {errors.title && (
                  <div className="invalid-feedback text-[0.74rem] text-[#e11d48] font-medium mt-1">
                    {errors.title}
                  </div>
                )}
              </div>

              <div className="form-group col-half flex-1 mb-4.5">
                <label
                  htmlFor="recipeCategorySelect"
                  className="form-label block text-[0.8rem] font-bold text-text-dark mb-1.5"
                >
                  Cooking Tradition *
                </label>
                <select
                  id="recipeCategorySelect"
                  className={`form-control w-full p-[12px_16px] rounded-[10px] border bg-bg-soft font-sans text-[0.88rem] text-text-dark transition-all duration-200 outline-none focus:border-primary-green focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,91,70,0.12)] ${
                    errors.category
                      ? "is-invalid border-[#e11d48] bg-[#fff1f2]"
                      : "border-border-light"
                  }`}
                  required
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    if (errors.category)
                      setErrors((p) => ({ ...p, category: null }));
                  }}
                >
                  <option value="">Select Tradition...</option>
                  <option value="Bamboo Cooked">Bamboo Cooked</option>
                  <option value="Leaf Steamed">Leaf Steamed</option>
                  <option value="Wild Herb & Soups">
                    Wild Herb &amp; Soups
                  </option>
                  <option value="Smoked Delicacies">Smoked Delicacies</option>
                  <option value="Chutneys & Berma">Chutneys &amp; Berma</option>
                </select>
                {errors.category && (
                  <div className="invalid-feedback text-[0.74rem] text-[#e11d48] font-medium mt-1">
                    {errors.category}
                  </div>
                )}
              </div>
            </div>

            <div className="form-row flex gap-4 max-md:flex-col max-md:gap-0">
              <div className="form-group col-half flex-1 mb-4.5">
                <label
                  htmlFor="recipeTribeInput"
                  className="form-label block text-[0.8rem] font-bold text-text-dark mb-1.5"
                >
                  Tribal Origin / Region *
                </label>
                <input
                  type="text"
                  id="recipeTribeInput"
                  className={`form-control w-full p-[12px_16px] rounded-[10px] border bg-bg-soft font-sans text-[0.88rem] text-text-dark transition-all duration-200 outline-none focus:border-primary-green focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,91,70,0.12)] ${
                    errors.tribe
                      ? "is-invalid border-[#e11d48] bg-[#fff1f2]"
                      : "border-border-light"
                  }`}
                  placeholder="e.g. Chakma, Marma, Bandarban Hills"
                  required
                  value={tribe}
                  onChange={(e) => {
                    setTribe(e.target.value);
                    if (errors.tribe) setErrors((p) => ({ ...p, tribe: null }));
                  }}
                />
                {errors.tribe && (
                  <div className="invalid-feedback text-[0.74rem] text-[#e11d48] font-medium mt-1">
                    {errors.tribe}
                  </div>
                )}
              </div>

              <div className="form-group col-half flex-1 mb-4.5">
                <label
                  htmlFor="recipeTimeInput"
                  className="form-label block text-[0.8rem] font-bold text-text-dark mb-1.5"
                >
                  Cook Time (Minutes) *
                </label>
                <input
                  type="number"
                  id="recipeTimeInput"
                  className={`form-control w-full p-[12px_16px] rounded-[10px] border bg-bg-soft font-sans text-[0.88rem] text-text-dark transition-all duration-200 outline-none focus:border-primary-green focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,91,70,0.12)] ${
                    errors.time
                      ? "is-invalid border-[#e11d48] bg-[#fff1f2]"
                      : "border-border-light"
                  }`}
                  placeholder="e.g. 45"
                  min="5"
                  max="360"
                  required
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
                    if (errors.time) setErrors((p) => ({ ...p, time: null }));
                  }}
                />
                {errors.time && (
                  <div className="invalid-feedback text-[0.74rem] text-[#e11d48] font-medium mt-1">
                    {errors.time}
                  </div>
                )}
              </div>
            </div>

            <div className="form-row flex gap-4 max-md:flex-col max-md:gap-0">
              <div className="form-group col-half flex-1 mb-4.5">
                <label
                  htmlFor="recipeAuthorInput"
                  className="form-label block text-[0.8rem] font-bold text-text-dark mb-1.5"
                >
                  Chef / Family Cook Name *
                </label>
                <input
                  type="text"
                  id="recipeAuthorInput"
                  className={`form-control w-full p-[12px_16px] rounded-[10px] border bg-bg-soft font-sans text-[0.88rem] text-text-dark transition-all duration-200 outline-none focus:border-primary-green focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,91,70,0.12)] ${
                    errors.author
                      ? "is-invalid border-[#e11d48] bg-[#fff1f2]"
                      : "border-border-light"
                  }`}
                  placeholder="e.g. Chef Mong Cho"
                  required
                  value={author}
                  onChange={(e) => {
                    setAuthor(e.target.value);
                    if (errors.author)
                      setErrors((p) => ({ ...p, author: null }));
                  }}
                />
                {errors.author && (
                  <div className="invalid-feedback text-[0.74rem] text-[#e11d48] font-medium mt-1">
                    {errors.author}
                  </div>
                )}
              </div>

              <div className="form-group col-half flex-1 mb-4.5">
                <label
                  htmlFor="recipeImageInput"
                  className="form-label block text-[0.8rem] font-bold text-text-dark mb-1.5"
                >
                  Photo URL (Optional)
                </label>
                <input
                  type="url"
                  id="recipeImageInput"
                  className="form-control w-full p-[12px_16px] rounded-[10px] border border-border-light bg-bg-soft font-sans text-[0.88rem] text-text-dark transition-all duration-200 outline-none focus:border-primary-green focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,91,70,0.12)]"
                  placeholder="https://example.com/photo.jpg"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group mb-4.5">
              <label
                htmlFor="recipeIngredientsInput"
                className="form-label block text-[0.8rem] font-bold text-text-dark mb-1.5"
              >
                Key Indigenous Ingredients * (one per line or comma-separated)
              </label>
              <textarea
                id="recipeIngredientsInput"
                className={`form-control w-full p-[12px_16px] rounded-[10px] border bg-bg-soft font-sans text-[0.88rem] text-text-dark transition-all duration-200 outline-none focus:border-primary-green focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,91,70,0.12)] ${
                  errors.ingredients
                    ? "is-invalid border-[#e11d48] bg-[#fff1f2]"
                    : "border-border-light"
                }`}
                rows={3}
                placeholder="Wild bamboo shoots, mountain river fish, Sabrang herbs, crushed hill garlic, bird's eye chilies..."
                required
                value={ingredients}
                onChange={(e) => {
                  setIngredients(e.target.value);
                  if (errors.ingredients)
                    setErrors((p) => ({ ...p, ingredients: null }));
                }}
              />
              {errors.ingredients && (
                <div className="invalid-feedback text-[0.74rem] text-[#e11d48] font-medium mt-1">
                  {errors.ingredients}
                </div>
              )}
            </div>

            <div className="form-group mb-4.5">
              <label
                htmlFor="recipeInstructionsInput"
                className="form-label block text-[0.8rem] font-bold text-text-dark mb-1.5"
              >
                Preparation &amp; Cooking Method *
              </label>
              <textarea
                id="recipeInstructionsInput"
                className={`form-control w-full p-[12px_16px] rounded-[10px] border bg-bg-soft font-sans text-[0.88rem] text-text-dark transition-all duration-200 outline-none focus:border-primary-green focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,91,70,0.12)] ${
                  errors.instructions
                    ? "is-invalid border-[#e11d48] bg-[#fff1f2]"
                    : "border-border-light"
                }`}
                rows={4}
                placeholder="Detail how the ingredients are gathered, sealed in bamboo/leaves, and cooked over embers..."
                required
                value={instructions}
                onChange={(e) => {
                  setInstructions(e.target.value);
                  if (errors.instructions)
                    setErrors((p) => ({ ...p, instructions: null }));
                }}
              />
              {errors.instructions && (
                <div className="invalid-feedback text-[0.74rem] text-[#e11d48] font-medium mt-1">
                  {errors.instructions}
                </div>
              )}
            </div>

            <div className="form-group mb-4.5">
              <label
                htmlFor="recipeLoreInput"
                className="form-label block text-[0.8rem] font-bold text-text-dark mb-1.5"
              >
                Cultural Story &amp; Heritage Lore (Optional)
              </label>
              <textarea
                id="recipeLoreInput"
                className="form-control w-full p-[12px_16px] rounded-[10px] border border-border-light bg-bg-soft font-sans text-[0.88rem] text-text-dark transition-all duration-200 outline-none focus:border-primary-green focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,91,70,0.12)]"
                rows={2}
                placeholder="Tell us the story behind this dish, festivals it is prepared for, or ancestral memory..."
                value={lore}
                onChange={(e) => setLore(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary form-submit-btn w-full p-3.5 text-[0.84rem] tracking-[0.08em] mt-2 inline-flex items-center justify-center gap-2t-sans font-bold uppercase rounded-full cursor-pointer transition-all duration-200 border-none bg-primary-green text-white shadow-[0_8px_20px_rgba(11,91,70,0.22)] hover:bg-primary-green-dark hover:-translate-y-0.5 disabled:opacity-75 disabled:cursor-not-allowed"
              id="shareSubmitBtn"
              disabled={submitting}
            >
              {submitting
                ? "PUBLISHING TO ARCHIVE..."
                : "PUBLISH TO CHT ARCHIVE"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
