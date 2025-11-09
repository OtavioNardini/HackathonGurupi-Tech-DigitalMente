import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, FlaskConical, ArrowRight, Brain } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <img src={logoIcon} alt="Digital Mente" className="h-48 md:h-64 animate-in fade-in duration-700" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-in slide-in-from-bottom-4 duration-700">
              Conectando mentes,
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Construindo Gurupi
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-in slide-in-from-bottom-5 duration-700 delay-150">
              Plataforma que conecta sugestões públicas com soluções acadêmicas, 
              facilitando a colaboração entre universidades e gestão pública.
            </p>
          </div>
        </section>

        {/* Cards Section */}
        <section className="container mx-auto px-4 pb-16 md:pb-24">
          <div className="grid grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
            {/* Card 1 - Problema Público */}
            <Card className="p-8 shadow-[var(--shadow-medium)] hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-primary">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-accent rounded-lg">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Sugestão Pública
                  </h2>
                  <p className="text-muted-foreground">
                    Registre demandas da comunidade
                  </p>
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Identifique e documente sugestões públicas</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Contextualize impacto e localização</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Vincule fontes oficiais e documentação</span>
                </li>
              </ul>

              <Link to="/cadastro-problema">
                <Button className="w-full bg-primary hover:opacity-90 transition-opacity">
                  Cadastrar Sugestão
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </Card>

                {/* Card 3 - Editais */}
            <Card className="p-8 shadow-[var(--shadow-medium)] hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-secondary">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <FlaskConical className="h-8 w-8 text-secondary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Editais
                  </h2>
                  <p className="text-muted-foreground">
                    Verifique os editais disponíveis
                  </p>
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <ArrowRight className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <span>Verifique os editais disponíveis</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <ArrowRight className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <span>Consulte a documentação para mais informações</span>
                </li>
              </ul>

              <Link to="/editais">
                <Button className="w-full bg-secondary hover:opacity-90 transition-opacity">
                  Verifique os Editais
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-foreground mb-12">
                Como Funciona
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Identifique</h3>
                  <p className="text-sm text-muted-foreground">
                    Cadastre problemas públicos detectados em diversas fontes oficiais
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-secondary">2</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Conecte</h3>
                  <p className="text-sm text-muted-foreground">
                    Vincule propostas de pesquisa acadêmica aos problemas identificados
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Construa</h3>
                  <p className="text-sm text-muted-foreground">
                    Gere impacto real unindo academia e gestão pública
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
