export default function Toast({ toast }) {
  return (
    <div
      id="toastNotification"
      role="status"
      aria-live="polite"
      className={`fixed bottom-7 right-7 bg-primary-green-dark text-white px-6 py-3.5 rounded-xl text-[0.88rem] font-medium shadow-[0_12px_28px_rgba(0,0,0,0.18)] pointer-events-none transition-all duration-300 z-1200 ${
        toast?.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {toast?.message}
    </div>
  );
}
