export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[#2a2520] bg-[#0a0a0a] px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Logo + tagline */}
          <div>
            <span className="font-serif text-xl font-semibold text-gradient-gold">Citalia</span>
            <p className="text-[#6b6258] text-xs mt-1 max-w-[200px]">
              Agente IA especializado en medicina estética
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-[#6b6258]">
            <a href="/aviso-legal" className="hover:text-[#9a9080] transition-colors">
              Aviso Legal
            </a>
            <a href="/privacidad" className="hover:text-[#9a9080] transition-colors">
              Política de Privacidad
            </a>
            <a href="/cookies" className="hover:text-[#9a9080] transition-colors">
              Política de Cookies
            </a>
          </div>

          {/* Contact + Social */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:marcos.munoz@citaliaapp.com"
              className="text-[#6b6258] hover:text-[#9a9080] transition-colors text-sm"
            >
              marcos.munoz@citaliaapp.com
            </a>
            <a
              href="https://instagram.com/citaliaapp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6b6258] hover:text-[#c9a96e] transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#2a2520] mt-8 pt-6 text-center">
          <p className="text-[#6b6258] text-xs">
            © {currentYear} Citalia · Todos los derechos reservados · Hecho en España
          </p>
        </div>
      </div>
    </footer>
  )
}
