import { useState, useEffect } from "react";

export default function AuthModal({
  isOpen,
  initialTab = "login",
  onClose,
  onLoginSuccess,
  showToast,
}) {
  const [activeTab, setActiveTab] = useState(initialTab);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginRemember, setLoginRemember] = useState(false);
  const [loginErrors, setLoginErrors] = useState({});
  const [loginSubmitting, setLoginSubmitting] = useState(false);
  const [loginAlert, setLoginAlert] = useState("");

  // Join form state
  const [joinName, setJoinName] = useState("");
  const [joinEmail, setJoinEmail] = useState("");
  const [joinHeritage, setJoinHeritage] = useState("");
  const [joinPassword, setJoinPassword] = useState("");
  const [joinTerms, setJoinTerms] = useState(false);
  const [joinErrors, setJoinErrors] = useState({});
  const [joinSubmitting, setJoinSubmitting] = useState(false);
  const [joinAlert, setJoinAlert] = useState("");

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setLoginErrors({});
      setJoinErrors({});
      setLoginAlert("");
      setJoinAlert("");
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!loginEmail.trim() || !emailRegex.test(loginEmail.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (!loginPassword || loginPassword.length < 6) {
      errors.password = "Password is required (min 6 characters).";
    }

    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      return;
    }

    setLoginSubmitting(true);
    setTimeout(() => {
      const user = {
        name: loginEmail.split("@")[0].replace(/[._]/g, " "),
        email: loginEmail.trim(),
      };

      setLoginAlert(`Welcome back, ${user.name}! You are now logged in.`);

      setTimeout(() => {
        setLoginSubmitting(false);
        setLoginAlert("");
        setLoginEmail("");
        setLoginPassword("");
        onLoginSuccess(user);
        onClose();
        showToast("Welcome back to CHT Food Network! 🌿");
      }, 1200);
    }, 700);
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!joinName.trim()) {
      errors.name = "Please enter your name.";
    }
    if (!joinEmail.trim() || !emailRegex.test(joinEmail.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (!joinHeritage) {
      errors.heritage = "Please select your background or interest.";
    }
    if (!joinPassword || joinPassword.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
    if (!joinTerms) {
      errors.terms = "You must accept the terms to join.";
    }

    if (Object.keys(errors).length > 0) {
      setJoinErrors(errors);
      return;
    }

    setJoinSubmitting(true);
    setTimeout(() => {
      const user = {
        name: joinName.trim(),
        email: joinEmail.trim(),
        heritage: joinHeritage,
      };

      setJoinAlert(`Welcome to the community, ${user.name}! Your account is active.`);

      setTimeout(() => {
        setJoinSubmitting(false);
        setJoinAlert("");
        setJoinName("");
        setJoinEmail("");
        setJoinHeritage("");
        setJoinPassword("");
        setJoinTerms(false);
        onLoginSuccess(user);
        onClose();
        showToast(`Welcome to CHT Food Network, ${user.name}! ⭐`);
      }, 1200);
    }, 800);
  };

  return (
    <div
      className="modal-backdrop fixed inset-0 bg-[rgba(6,28,22,0.75)] backdrop-blur-md z-1000 flex items-center justify-center p-5sition-opacity duration-300 opacity-100 open"
      id="authModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="authModalTitle"
      onClick={(e) => {
        if (e.target.id === "authModal") onClose();
      }}
    >
      <div className="modal-window bg-white rounded-3xl w-full max-w-130 max-h-[90vh] overflow-y-auto shadow-[0_25px_60px_rgba(0,0,0,0.3)] flex flex-col transition-transform duration-300 transform translate-y-0 scale-100 max-md:w-[95%]">
        <div className="modal-header p-[24px_28px_18px] flex items-center justify-between border-b border-border-subtle sticky top-0 bg-white z-10">
          <h3 className="modal-title font-serif text-[1.35rem] font-bold text-text-dark" id="authModalTitle">
            Welcome to CHT Food Network
          </h3>
          <button
            type="button"
            className="modal-close-btn bg-bg-soft border-none w-8.5 h-8.5 rounded-full text-[1.3rem] text-text-body flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#fee2e2] hover:text-[#e11d48]"
            id="authModalClose"
            aria-label="Close modal"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className="modal-body p-[26px_28px_32px]">
          <div className="modal-tabs flex border-b-2 border-border-subtle mb-6" role="tablist">
            <button
              type="button"
              className={`modal-tab-btn flex-1 py-3 px-4 bg-transparent border-none font-sans text-[0.88rem] cursor-pointer relative transition-all duration-200 text-center ${
                activeTab === "login"
                  ? "active text-primary-green font-bold active-tab-indicator"
                  : "text-text-muted font-semibold hover:text-primary-green"
              }`}
              id="tabBtnLogin"
              role="tab"
              aria-selected={activeTab === "login"}
              onClick={() => setActiveTab("login")}
            >
              Log In
            </button>
            <button
              type="button"
              className={`modal-tab-btn flex-1 py-3 px-4ransparent border-none font-sans text-[0.88rem] cursor-pointer relative transition-all duration-200 text-center ${
                activeTab === "join"
                  ? "active text-primary-green font-bold active-tab-indicator"
                  : "text-text-muted font-semibold hover:text-primary-green"
              }`}
              id="tabBtnJoin"
              role="tab"
              aria-selected={activeTab === "join"}
              onClick={() => setActiveTab("join")}
            >
              Join Community
            </button>
          </div>

          {/* Tab 1: Log In */}
          {activeTab === "login" && (
            <div className="tab-pane active animate-fade-in" id="tabPaneLogin" role="tabpanel">
              <form id="loginForm" noValidate onSubmit={handleLoginSubmit}>
                {loginAlert && (
                  <div
                    className="form-feedback-alert p-[12px_16px] rounded-[10px] text-[0.82rem] mb-4.5 leading-[1.4] bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0] success block"
                    id="loginAlert"
                  >
                    {loginAlert}
                  </div>
                )}

                <div className="form-group mb-4.5">
                  <label htmlFor="loginEmail" className="form-label block text-[0.8rem] font-bold text-text-dark mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="loginEmail"
                    className={`form-control w-full p-[12px_16px] rounded-[10px] border bg-bg-soft font-sans text-[0.88rem] text-text-dark transition-all duration-200 outline-none focus:border-primary-green focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,91,70,0.12)] ${
                      loginErrors.email ? "is-invalid border-[#e11d48] bg-[#fff1f2]" : "border-border-light"
                    }`}
                    placeholder="name@example.com"
                    required
                    autoComplete="email"
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                      if (loginErrors.email) setLoginErrors((p) => ({ ...p, email: null }));
                    }}
                  />
                  {loginErrors.email && (
                    <div className="invalid-feedback text-[0.74rem] text-[#e11d48] font-medium mt-1">
                      {loginErrors.email}
                    </div>
                  )}
                </div>

                <div className="form-group mb-4.5">
                  <div className="form-label-row flex items-center justify-between mb-1.5">
                    <label htmlFor="loginPassword" className="form-label text-[0.8rem] font-bold text-text-dark mb-0">
                      Password
                    </label>
                    <a
                      href="#forgot"
                      className="form-hint-link text-[0.75rem] text-primary-green font-semibold hover:underline"
                      id="forgotPasswordLink"
                      onClick={(e) => {
                        e.preventDefault();
                        showToast("Password reset link sent! Check your email inbox. ✉️");
                      }}
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <input
                    type="password"
                    id="loginPassword"
                    className={`form-control w-full p-[12px_16px] rounded-[10px] border bg-bg-soft font-sans text-[0.88rem] text-text-dark transition-all duration-200 outline-none focus:border-primary-green focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,91,70,0.12)] ${
                      loginErrors.password ? "is-invalid border-[#e11d48] bg-[#fff1f2]" : "border-border-light"
                    }`}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      if (loginErrors.password) setLoginErrors((p) => ({ ...p, password: null }));
                    }}
                  />
                  {loginErrors.password && (
                    <div className="invalid-feedback text-[0.74rem] text-[#e11d48] font-medium mt-1">
                      {loginErrors.password}
                    </div>
                  )}
                </div>

                <div className="form-group form-checkbox-group mt-2 mb-5.5">
                  <label className="checkbox-container flex items-start gap-2.5 cursor-pointer text-[0.82rem] text-text-body leading-[1.4]">
                    <input
                      type="checkbox"
                      id="loginRememberMe"
                      className="mt-0.5 accent-primary-green"
                      checked={loginRemember}
                      onChange={(e) => setLoginRemember(e.target.checked)}
                    />
                    <span className="checkbox-label">Keep me logged in on this device</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary form-submit-btn w-full p-3.5 text-[0.84rem] tracking-[0.08em] mt-2 inline-flex items-center justify-center gap-2 font-sans font-bold uppercase rounded-full cursor-pointer transition-all duration-200 border-none bg-primary-green text-white shadow-[0_8px_20px_rgba(11,91,70,0.22)] hover:bg-primary-green-dark hover:-translate-y-0.5 disabled:opacity-75 disabled:cursor-not-allowed"
                  id="loginSubmitBtn"
                  disabled={loginSubmitting}
                >
                  {loginSubmitting ? "AUTHENTICATING..." : "LOG IN"}
                </button>

                <div className="form-switch-prompt text-[0.82rem] text-text-body text-center mt-4.5">
                  Don't have an account yet?{" "}
                  <button
                    type="button"
                    className="btn-text-link bg-transparent border-none text-primary-green font-bold cursor-pointer underline font-sans text-[0.82rem] p-0 transition-colors duration-200 hover:text-primary-green-dark"
                    id="switchToJoinLink"
                    onClick={() => setActiveTab("join")}
                  >
                    Join CHT Network
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tab 2: Join Community */}
          {activeTab === "join" && (
            <div className="tab-pane active animate-fade-in" id="tabPaneJoin" role="tabpanel">
              <form id="joinForm" noValidate onSubmit={handleJoinSubmit}>
                {joinAlert && (
                  <div
                    className="form-feedback-alert p-[12px_16px] rounded-[10px] text-[0.82rem] mb-4.5 leading-[1.4] bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0] success block"
                    id="joinAlert"
                  >
                    {joinAlert}
                  </div>
                )}

                <div className="form-group mb-4.5">
                  <label htmlFor="joinName" className="form-label block text-[0.8rem] font-bold text-text-dark mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="joinName"
                    className={`form-control w-full p-[12px_16px] rounded-[10px] border bg-bg-soft font-sans text-[0.88rem] text-text-dark transition-all duration-200 outline-none focus:border-primary-green focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,91,70,0.12)] ${
                      joinErrors.name ? "is-invalid border-[#e11d48] bg-[#fff1f2]" : "border-border-light"
                    }`}
                    placeholder="e.g. Minakshi Chakma"
                    required
                    autoComplete="name"
                    value={joinName}
                    onChange={(e) => {
                      setJoinName(e.target.value);
                      if (joinErrors.name) setJoinErrors((p) => ({ ...p, name: null }));
                    }}
                  />
                  {joinErrors.name && (
                    <div className="invalid-feedback text-[0.74rem] text-[#e11d48] font-medium mt-1">
                      {joinErrors.name}
                    </div>
                  )}
                </div>

                <div className="form-group mb-4.5">
                  <label htmlFor="joinEmail" className="form-label block text-[0.8rem] font-bold text-text-dark mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="joinEmail"
                    className={`form-control w-full p-[12px_16px] rounded-[10px] border bg-bg-soft font-sans text-[0.88rem] text-text-dark transition-all duration-200 outline-none focus:border-primary-green focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,91,70,0.12)] ${
                      joinErrors.email ? "is-invalid border-[#e11d48] bg-[#fff1f2]" : "border-border-light"
                    }`}
                    placeholder="name@example.com"
                    required
                    autoComplete="email"
                    value={joinEmail}
                    onChange={(e) => {
                      setJoinEmail(e.target.value);
                      if (joinErrors.email) setJoinErrors((p) => ({ ...p, email: null }));
                    }}
                  />
                  {joinErrors.email && (
                    <div className="invalid-feedback text-[0.74rem] text-[#e11d48] font-medium mt-1">
                      {joinErrors.email}
                    </div>
                  )}
                </div>

                <div className="form-group mb-4.5">
                  <label htmlFor="joinHeritage" className="form-label block text-[0.8rem] font-bold text-text-dark mb-1.5">
                    Indigenous Affiliation / Interest
                  </label>
                  <select
                    id="joinHeritage"
                    className={`form-control w-full p-[12px_16px] rounded-[10px] border bg-bg-soft font-sans text-[0.88rem] text-text-dark transition-all duration-200 outline-none focus:border-primary-green focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,91,70,0.12)] ${
                      joinErrors.heritage ? "is-invalid border-[#e11d48] bg-[#fff1f2]" : "border-border-light"
                    }`}
                    required
                    value={joinHeritage}
                    onChange={(e) => {
                      setJoinHeritage(e.target.value);
                      if (joinErrors.heritage) setJoinErrors((p) => ({ ...p, heritage: null }));
                    }}
                  >
                    <option value="">Select Community...</option>
                    <option value="Chakma">Chakma Heritage</option>
                    <option value="Marma">Marma Heritage</option>
                    <option value="Tripura">Tripura Heritage</option>
                    <option value="Tanchangya">Tanchangya Heritage</option>
                    <option value="Bawm">Bawm Heritage</option>
                    <option value="Enthusiast">Culinary Researcher / Food Lover</option>
                  </select>
                  {joinErrors.heritage && (
                    <div className="invalid-feedback text-[0.74rem] text-[#e11d48] font-medium mt-1">
                      {joinErrors.heritage}
                    </div>
                  )}
                </div>

                <div className="form-group mb-4.5">
                  <label htmlFor="joinPassword" className="form-label block text-[0.8rem] font-bold text-text-dark mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    id="joinPassword"
                    className={`form-control w-full p-[12px_16px] rounded-[10px] border bg-bg-soft font-sans text-[0.88rem] text-text-dark transition-all duration-200 outline-none focus:border-primary-green focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,91,70,0.12)] ${
                      joinErrors.password ? "is-invalid border-[#e11d48] bg-[#fff1f2]" : "border-border-light"
                    }`}
                    placeholder="Create password (min 6 characters)"
                    required
                    autoComplete="new-password"
                    value={joinPassword}
                    onChange={(e) => {
                      setJoinPassword(e.target.value);
                      if (joinErrors.password) setJoinErrors((p) => ({ ...p, password: null }));
                    }}
                  />
                  {joinErrors.password && (
                    <div className="invalid-feedback text-[0.74rem] text-[#e11d48] font-medium mt-1">
                      {joinErrors.password}
                    </div>
                  )}
                </div>

                <div className="form-group form-checkbox-group mt-2 mb-5.5">
                  <label className="checkbox-container flex items-start gap-2.5 cursor-pointer text-[0.82rem] text-text-body leading-[1.4]">
                    <input
                      type="checkbox"
                      id="joinTerms"
                      required
                      className="mt-0.5 accent-primary-green"
                      checked={joinTerms}
                      onChange={(e) => {
                        setJoinTerms(e.target.checked);
                        if (joinErrors.terms) setJoinErrors((p) => ({ ...p, terms: null }));
                      }}
                    />
                    <span className="checkbox-label">
                      I agree to uphold and respect indigenous cultural heritage terms
                    </span>
                  </label>
                  {joinErrors.terms && (
                    <div className="invalid-feedback text-[0.74rem] text-[#e11d48] font-medium mt-1">
                      {joinErrors.terms}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary form-submit-btn w-full p-3.5 text-[0.84rem] tracking-[0.08em] mt-2 inline-flex items-center justify-center gap-2 font-sans font-bold uppercase rounded-full cursor-pointer transition-all duration-200 border-none bg-primary-green text-white shadow-[0_8px_20px_rgba(11,91,70,0.22)] hover:bg-primary-green-dark hover:-translate-y-0.5 disabled:opacity-75 disabled:cursor-not-allowed"
                  id="joinSubmitBtn"
                  disabled={joinSubmitting}
                >
                  {joinSubmitting ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                </button>

                <div className="form-switch-prompt text-[0.82rem] text-text-body text-center mt-4.5">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="btn-text-link bg-transparent border-none text-primary-green font-bold cursor-pointer underline font-sans text-[0.82rem] p-0 transition-colors duration-200 hover:text-primary-green-dark"
                    id="switchToLoginLink"
                    onClick={() => setActiveTab("login")}
                  >
                    Log In
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
