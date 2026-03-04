export function MarketingFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white/75 py-8 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 text-sm text-slate-600 md:flex-row md:items-center md:justify-between lg:px-10">
        <p>&copy; 2026 FitHire AI. All rights reserved.</p>
        <button className="w-fit text-slate-600 transition-colors hover:text-blue-600">
          Contact us
        </button>
      </div>
    </footer>
  );
}
