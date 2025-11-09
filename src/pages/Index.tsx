import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, FlaskConical, ArrowRight, Brain, BarChart3 } from "lucide-react";
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
            {/* Botão WhatsApp */}
            <div className="flex justify-center mt-8">
              <a
                href="https://wa.me/556392014881"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition-colors text-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M12 2C6.477 2 2 6.477 2 12c0 1.93.547 3.73 1.5 5.25L2 22l4.92-1.47A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Zm0 18c-1.61 0-3.13-.488-4.4-1.33l-.31-.2-2.92.87.87-2.84-.2-.32A7.963 7.963 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8Zm4.29-5.71c-.25-.13-1.47-.73-1.7-.81-.23-.08-.4-.13-.57.13-.17.25-.65.81-.8.98-.15.17-.3.19-.55.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.12-.15.16-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.88-.2-.48-.41-.41-.57-.42-.15-.01-.32-.01-.5-.01-.17 0-.45.06-.68.29-.23.23-.9.88-.9 2.14 0 1.26.92 2.48 1.05 2.65.13.17 1.81 2.77 4.39 3.77.61.21 1.09.33 1.46.42.61.15 1.16.13 1.6.08.49-.06 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.29Z"/></svg>
                Fale conosco no WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="container mx-auto px-4 pb-16 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
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

            {/* Card 2 - Visualização de Sugestões */}
            <Card className="p-8 shadow-[var(--shadow-medium)] hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-purple-500">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Visualização de Sugestões
                  </h2>
                  <p className="text-muted-foreground">
                    Visualize dados e métricas
                  </p>
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <ArrowRight className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                  <span>Visualize sugestões agrupadas por categoria</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <ArrowRight className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                  <span>Analise KPIs e indicadores de desempenho</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <ArrowRight className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                  <span>Acompanhe o status e resolução</span>
                </li>
              </ul>

              <Link to="/visualizacao-sugestoes">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 transition-colors">
                  Ver Visualização
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
