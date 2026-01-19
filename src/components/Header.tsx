export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-5xl">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🕵️</span>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
            Spy<span className="text-zinc-400">Agency</span>
          </h1>
        </div>
        <div className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
          Classified Database
        </div>
      </div>
    </header>
  );
}