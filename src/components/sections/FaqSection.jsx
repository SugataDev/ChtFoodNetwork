import { useState, useRef } from "react";
import { FAQ_DATA } from "../../data/faqData";

export default function FaqSection() {
  const [openId, setOpenId] = useState(null);

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="faq-section py-20 bg-bg-soft border-t border-border-subtle" id="heritage-faq">
      <div className="app-container">
        <div className="faq-header text-center max-w-170 mx-auto mb-12">
          <span className="section-eyebrow block text-[0.72rem] font-bold tracking-[0.14em] text-primary-green uppercase mb-1.5">
            INDIGENOUS KNOWLEDGE
          </span>
          <h2 className="section-title font-serif text-[2.15rem] font-bold text-text-dark">
            Hill Culinary Lore &amp; Archive FAQ
          </h2>
          <p className="faq-subtitle text-[0.95rem] text-text-body mt-2.5">
            Explore the ancestral techniques, wild forest botanicals, and cultural culinary heritage
            of the Chittagong Hill Tracts.
          </p>
        </div>

        <div className="accordion-container max-w-215 mx-auto flex flex-col gap-3.5" id="faqAccordion">
          {FAQ_DATA.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`accordion-item bg-white border rounded-2xl overflow-hidden shadow-[0_4px_14px_rgba(17,24,39,0.03)] transition-all duration-250 ${
                  isOpen
                    ? "active border-primary-green shadow-[0_8px_24px_rgba(11,91,70,0.08)]"
                    : "border-border-subtle hover:border-[rgba(11,91,70,0.3)]"
                }`}
              >
                <button
                  type="button"
                  className="accordion-header w-full p-[22px_26px] bg-transparent border-none flex items-center justify-between gap-4 cursor-pointer text-left"
                  aria-expanded={isOpen}
                  onClick={() => toggleItem(item.id)}
                >
                  <span
                    className={`accordion-title font-serif text-[1.12rem] font-bold transition-colors duration-200 ${
                      isOpen ? "text-primary-green" : "text-text-dark"
                    }`}
                  >
                    {item.question}
                  </span>
                  <span
                    className={`accordion-toggle-icon w-8 h-8 rounded-full flex items-center justify-center text-[1.25rem] font-semibold shrink-0 transition-all duration-250 ${
                      isOpen
                        ? "bg-primary-green text-white"
                        : "bg-bg-soft text-primary-green"
                    }`}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  className="accordion-body transition-[max-height] duration-350 ease-in-out overflow-hidden"
                  style={{
                    maxHeight: isOpen ? "300px" : "0px",
                  }}
                >
                  <div className="accordion-body-inner px-6.5 pb-6 text-[0.92rem] text-text-body leading-[1.7]">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
