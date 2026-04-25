export default function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-20 py-10 text-center text-gray-500 text-sm">
      <p className="font-semibold text-gray-400 mb-1">MicroFin</p>
      <p>FinTech microfinance platform for small businesses.</p>
      <p className="mt-3 text-xs text-gray-600">© {new Date().getFullYear()} MicroFin. Built for Hash IT Out Hackathon.</p>
    </footer>
  )
}
