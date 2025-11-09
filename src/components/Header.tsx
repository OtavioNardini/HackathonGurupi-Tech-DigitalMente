import { Link } from "react-router-dom";
import logo from "@/assets/logo-icon.png";
import { FileText, FlaskConical } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b border-border bg-card shadow-[var(--shadow-soft)]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Digital Mente" className="h-10 md:h-11" />
          </Link>
          
          <nav className="flex gap-2 md:gap-4">
            <Link
              to="/visualizacao-sugestoes"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground hover:opacity-90 transition-opacity text-sm md:text-base border border-border"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Visualizar Sugestões</span>
              <span className="sm:hidden">Visualizar</span>
            </Link>
            <Link
              to="/cadastro-problema"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-sm md:text-base"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Sugere Gurupi</span>
              <span className="sm:hidden">Sugestão</span>
            </Link>
            <Link
              to="/editais"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity text-sm md:text-base"
            >
              <FlaskConical className="h-4 w-4" />
              <span className="hidden sm:inline">Editais</span>
              <span className="sm:hidden">Editais</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
