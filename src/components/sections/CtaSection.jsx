import { useState } from "react";

export default function CtaSection({
  onOpenAuthModal,
  onOpenShareModal,
  showToast,
}) {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState({ text: "", type: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmed = email.trim();

    if (!trimmed || !emailRegex.test(trimmed)) {
      setFeedback({
        text: "Please enter a valid email address.",
        type: "error",
      });
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setFeedback({
        text: "✓ Subscribed! Welcome to our monthly hill harvest stories.",
        type: "success",
      });
      setEmail("");
      setSubmitting(false);
      showToast("Thank you for subscribing to monthly CHT culinary stories! 💌");
      setTimeout(() => {
        setFeedback({ text: "", type: "" });
      }, 5000);
    }, 700);
  };

  return (
    <section className="cta-section pt-10 pb-20">
      <div className="app-container">
        <div
          className="cta-banner rounded-3xl py-18 px-8 text-center text-white shadow-[0_24px_48px_rgba(6,77,59,0.25)]"
          style={{
            background:
              "radial-gradient(circle at 85% 20%, rgba(16, 124, 95, 0.55) 0%, transparent 55%), linear-gradient(135deg, #064d3b 0%, #0b5b46 100%)",
          }}
        >
          <span className="cta-eyebrow inline-block text-[0.7rem] font-bold tracking-[0.16em] text-[rgba(255,255,255,0.78)] mb-3.5">
            COMMUNITY FOOD NETWORK
          </span>
          <h2 className="cta-title font-serif text-[2.55rem] font-bold leading-[1.2] mb-4.5 max-md:text-[2rem]">
            Preserve &amp; Share Your Tribal<br />
            Family Recipes
          </h2>
          <p className="cta-description text-[0.96rem] text-[rgba(255,255,255,0.85)] max-w-145 mx-auto mb-8">
            Every kitchen in the hill tracts carries unique herbal secrets, ancestral bamboo
            delicacies, and wild spice blends. Join our collective archive today.
          </p>

          <div className="cta-buttons-group flex items-center justify-center gap-4 mb-9 flex-wrap">
            <button
              type="button"
              className="btn btn-white inline-flex items-center justify-center gap-2 font-sans font-bold text-[0.78rem] tracking-[0.08em] uppercase rounded-full cursor-pointer transition-all duration-200 border-none px-8.5 py-3.75 bg-white text-primary-green-dark shadow-[0_10px_25px_rgba(0,0,0,0.15)] hover:bg-primary-green-light hover:-translate-y-0.5"
              id="ctaLoginBtn"
              onClick={() => onOpenAuthModal("login")}
            >
              LOG IN TO CHT NETWORK
            </button>
            <button
              type="button"
              className="btn btn-secondary-white inline-flex items-center justify-center gap-2 font-sans font-bold text-[0.78rem] tracking-[0.08em] uppercase rounded-full cursor-pointer transition-all duration-200 px-8 py-3.75 bg-transparent border-2 border-white text-white hover:bg-[rgba(255,255,255,0.15)] hover:-translate-y-0.5"
              id="ctaShareBtn"
              onClick={onOpenShareModal}
            >
              SHARE A FAMILY RECIPE
            </button>
          </div>

          {/* Newsletter Subscription Form */}
          <div className="cta-newsletter-box max-w-135 mx-auto pt-7 border-t border-[rgba(255,255,255,0.2)]">
            <p className="newsletter-lead text-[0.88rem] text-[rgba(255,255,255,0.88)] mb-3.5">
              Stay connected with seasonal harvest alerts &amp; heirloom cooking stories.
            </p>
            <form className="newsletter-form" id="newsletterForm" noValidate onSubmit={handleSubmit}>
              <div className="newsletter-input-group flex bg-white rounded-full p-1.25 shadow-[0_8px_24px_rgba(0,0,0,0.2)] max-sm:flex-col max-sm:rounded-2xl max-sm:p-2.5 max-sm:gap-2">
                <input
                  type="email"
                  id="newsletterEmail"
                  className="newsletter-input flex-1 border-none bg-transparent px-5 py-2.5 font-sans text-[0.88rem] outline-none text-text-dark"
                  placeholder="Enter your email address..."
                  required
                  aria-label="Email address for monthly recipes"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (feedback.text) setFeedback({ text: "", type: "" });
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-primary inline-flex items-center justify-center gap-2 font-sans font-bold text-[0.78rem] tracking-[0.08em] uppercase rounded-full cursor-pointer transition-all duration-200 border-none px-6 py-2.5 bg-primary-green text-white hover:bg-primary-green-dark disabled:opacity-75 disabled:cursor-not-allowed"
                  id="newsletterSubmitBtn"
                  disabled={submitting}
                >
                  {submitting ? "SUBSCRIBING..." : "SUBSCRIBE"}
                </button>
              </div>
              {feedback.text && (
                <div
                  className={`form-feedback-msg text-[0.82rem] mt-2 font-medium ${
                    feedback.type === "success" ? "text-[#a7f3d0]" : "text-[#fecdd3]"
                  }`}
                  id="newsletterFeedback"
                  aria-live="polite"
                >
                  {feedback.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
