import { useState, useEffect } from "react";
import { CHEFS_DATA, POLICY_DATA } from "../../data/infoContentData";

export default function InfoModal({
  isOpen,
  contentType, // "chefs" | "privacy" | "terms" | "contact"
  onClose,
  showToast,
}) {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactErrors, setContactErrors] = useState({});
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactAlert, setContactAlert] = useState("");

  useEffect(() => {
    if (isOpen) {
      setContactName("");
      setContactEmail("");
      setContactSubject("");
      setContactMessage("");
      setContactErrors({});
      setContactAlert("");
    }
  }, [isOpen, contentType]);

  if (!isOpen) return null;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!contactName.trim()) errors.name = "Name is required.";
    if (!contactEmail.trim() || !emailRegex.test(contactEmail.trim())) {
      errors.email = "Valid email required.";
    }
    if (!contactSubject.trim()) errors.subject = "Subject is required.";
    if (!contactMessage.trim() || contactMessage.trim().length < 10) {
      errors.message = "Please enter your message (min 10 characters).";
    }

    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      return;
    }

    setContactSubmitting(true);
    setTimeout(() => {
      setContactAlert(
        "Message sent successfully! Our culinary coordinators will reply within 24 hours."
      );
      setContactSubmitting(false);
      showToast("Thank you! Your message has been received. 📨");

      setTimeout(() => {
        onClose();
      }, 2000);
    }, 800);
  };

  let title = "CHT Food Network Information";
  if (contentType === "chefs") title = "Indigenous Culinary Custodians & Chefs";
  if (contentType === "privacy") title = POLICY_DATA.privacy.title;
  if (contentType === "terms") title = POLICY_DATA.terms.title;
  if (contentType === "contact") title = "Connect with CHT Food Network";

  return (
    <div
      className="modal-backdrop fixed inset-0 bg-[rgba(6,28,22,0.75)] backdrop-blur-md z-1000 flex items-center justify-center p-5sition-opacity duration-300 opacity-100 open"
      id="infoModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="infoModalTitle"
      onClick={(e) => {
        if (e.target.id === "infoModal") onClose();
      }}
    >
      <div className="modal-window modal-window-lg bg-white rounded-3xl w-full max-w-190 max-h-[90vh] overflow-y-auto shadow-[0_25px_60px_rgba(0,0,0,0.3)] flex flex-col transition-transform duration-300 transform translate-y-0 scale-100 max-md:w-[95%]">
        <div className="modal-header p-[24px_28px_18px] flex items-center justify-between border-b border-border-subtle sticky top-0 bg-white z-10">
          <h3 className="modal-title font-serif text-[1.35rem] font-bold text-text-dark" id="infoModalTitle">
            {title}
          </h3>
          <button
            type="button"
            className="modal-close-btn bg-bg-soft border-none w-8.5 h-8.5 rounded-full text-[1.3rem] text-text-body flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#fee2e2] hover:text-[#e11d48]"
            id="infoModalClose"
            aria-label="Close modal"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className="modal-body p-[26px_28px_32px]" id="infoModalBody">
          {/* Chefs View */}
          {contentType === "chefs" && (
            <div className="chef-grid grid grid-cols-2 gap-5 max-md:grid-cols-1">
              {CHEFS_DATA.map((chef, idx) => (
                <div
                  key={idx}
                  className="chef-card bg-bg-soft rounded-2xl p-5 flex gap-[gap-4er border-border-subtle"
                >
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="chef-portrait w-16 h-16 rounded-full object-cover shrink-0"
                  />
                  <div>
                    <h4 className="chef-name font-serif text-[1.05rem] font-bold">
                      {chef.name}
                    </h4>
                    <span className="chef-tribal-role text-[0.74rem] text-primary-green font-semibold">
                      {chef.role}
                    </span>
                    <p className="chef-bio text-[0.8rem] text-text-body mt-1.5 leading-[1.45]">
                      {chef.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Privacy Policy View */}
          {contentType === "privacy" && (
            <div className="policy-text text-[0.88rem] text-text-body leading-[1.7]">
              {POLICY_DATA.privacy.sections.map((sec, idx) => (
                <div key={idx}>
                  <h4 className="font-serif text-[1.1rem] text-text-dark mt-4.5-[6px] first:mt-0">
                    {sec.heading}
                  </h4>
                  <p>{sec.text}</p>
                </div>
              ))}
            </div>
          )}

          {/* Terms of Service View */}
          {contentType === "terms" && (
            <div className="policy-text text-[0.88rem] text-text-body leading-[1.7]">
              {POLICY_DATA.terms.sections.map((sec, idx) => (
                <div key={idx}>
                  <h4 className="font-serif text-[1.1rem] text-text-dark mt-4.5 mb-1.5 first:mt-0">
                    {sec.heading}
                  </h4>
                  <p>{sec.text}</p>
                </div>
              ))}
            </div>
          )}

          {/* Contact View */}
          {contentType === "contact" && (
            <form id="contactFormModal" noValidate onSubmit={handleContactSubmit}>
              {contactAlert && (
                <div
                  className="form-feedback-alert p-[12px_16px] rounded-[10px] text-[0.82rem] mb-4.5 leading-[1.4] bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0] success block"
                  id="contactModalAlert"
                >
                  {contactAlert}
                </div>
              )}

              <div className="form-row flex gap-4 max-md:flex-col max-md:gap-0">
                <div className="form-group col-half flex-1 mb-4.5">
                  <label htmlFor="contactName" className="form-label block text-[0.8rem] font-bold text-text-dark mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    className={`form-control w-full p-[12px_16px] rounded-[10px] border bg-bg-soft font-sans text-[0.88rem] text-text-dark transition-all duration-200 outline-none focus:border-primary-green focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,91,70,0.12)] ${
                      contactErrors.name ? "is-invalid border-[#e11d48] bg-[#fff1f2]" : "border-border-light"
                    }`}
                    placeholder="Enter your full name"
                    required
                    value={contactName}
                    onChange={(e) => {
                      setContactName(e.target.value);
                      if (contactErrors.name) setContactErrors((p) => ({ ...p, name: null }));
                    }}
                  />
                  {contactErrors.name && (
                    <div className="invalid-feedback text-[0.74rem] text-[#e11d48] font-medium mt-1">
                      {contactErrors.name}
                    </div>
                  )}
                </div>

                <div className="form-group col-half flex-1 mb-4.5">
                  <label htmlFor="contactEmail" className="form-label block text-[0.8rem] font-bold text-text-dark mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    className={`form-control w-full p-[12px_16px] rounded-[10px] border bg-bg-soft font-sans text-[0.88rem] text-text-dark transition-all duration-200 outline-none focus:border-primary-green focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,91,70,0.12)] ${
                      contactErrors.email ? "is-invalid border-[#e11d48] bg-[#fff1f2]" : "border-border-light"
                    }`}
                    placeholder="name@example.com"
                    required
                    value={contactEmail}
                    onChange={(e) => {
                      setContactEmail(e.target.value);
                      if (contactErrors.email) setContactErrors((p) => ({ ...p, email: null }));
                    }}
                  />
                  {contactErrors.email && (
                    <div className="invalid-feedback text-[0.74rem] text-[#e11d48] font-medium mt-1">
                      {contactErrors.email}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group mb-4.5">
                <label htmlFor="contactSubject" className="form-label block text-[0.8rem] font-bold text-text-dark mb-1.5">
                  Subject *
                </label>
                <input
                  type="text"
                  id="contactSubject"
                  className={`form-control w-full p-[12px_16px] rounded-[10px] border bg-bg-soft font-sans text-[0.88rem] text-text-dark transition-all duration-200 outline-none focus:border-primary-green focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,91,70,0.12)] ${
                    contactErrors.subject ? "is-invalid border-[#e11d48] bg-[#fff1f2]" : "border-border-light"
                  }`}
                  placeholder="e.g. Recipe archive inquiry, cultural partnership"
                  required
                  value={contactSubject}
                  onChange={(e) => {
                    setContactSubject(e.target.value);
                    if (contactErrors.subject) setContactErrors((p) => ({ ...p, subject: null }));
                  }}
                />
                {contactErrors.subject && (
                  <div className="invalid-feedback text-[0.74rem] text-[#e11d48] font-medium mt-1">
                    {contactErrors.subject}
                  </div>
                )}
              </div>

              <div className="form-group mb-4.5">
                <label htmlFor="contactMessage" className="form-label block text-[0.8rem] font-bold text-text-dark mb-1.5">
                  Message *
                </label>
                <textarea
                  id="contactMessage"
                  className={`form-control w-full p-[12px_16px] rounded-[10px] border bg-bg-soft font-sans text-[0.88rem] text-text-dark transition-all duration-200 outline-none focus:border-primary-green focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,91,70,0.12)] ${
                    contactErrors.message ? "is-invalid border-[#e11d48] bg-[#fff1f2]" : "border-border-light"
                  }`}
                  rows={4}
                  placeholder="How can we assist you in celebrating CHT cuisine?"
                  required
                  value={contactMessage}
                  onChange={(e) => {
                    setContactMessage(e.target.value);
                    if (contactErrors.message) setContactErrors((p) => ({ ...p, message: null }));
                  }}
                />
                {contactErrors.message && (
                  <div className="invalid-feedback text-[0.74rem] text-[#e11d48] font-medium mt-1">
                    {contactErrors.message}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary form-submit-btn w-full p-3.5 text-[0.84rem] tracking-[0.08em] mt-2 inline-flex items-center justify-center gap-2 font-sans font-bold uppercase rounded-full cursor-pointer transition-all duration-200 border-none bg-primary-green text-white shadow-[0_8px_20px_rgba(11,91,70,0.22)] hover:bg-primary-green-dark hover:-translate-y-0.5 disabled:opacity-75 disabled:cursor-not-allowed"
                id="contactSubmitBtn"
                disabled={contactSubmitting}
              >
                {contactSubmitting ? "SENDING..." : "SEND MESSAGE"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
