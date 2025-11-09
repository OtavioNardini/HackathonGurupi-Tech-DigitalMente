import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Filter,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  TrendingUp,
  CheckCircle2
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import sugestoesData from "@/data/sugestoesData.json";

const VisualizacaoSugestoes = () => {
  const [categoriaExpandida, setCategoriaExpandida] = useState<number | null>(null);
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  const [ordenacao, setOrdenacao] = useState<string>("impacto");

  const toggleCategoria = (id: number) => {
    setCategoriaExpandida(categoriaExpandida === id ? null : id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolvido":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "Em Andamento":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
      case "Aguardando Análise":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "Muito Alta":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500";
      case "Alta":
        return "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500";
      case "Média":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500";
      default:
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Título */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Visualização de Sugestões
          </h1>
          <p className="text-muted-foreground">
            Visualize e analise as sugestões agrupadas por categoria
          </p>
        </div>

        {/* Filtros */}
        <Card className="p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filtros:</span>
            </div>
            
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="resolvido">Resolvido</SelectItem>
                <SelectItem value="andamento">Em Andamento</SelectItem>
                <SelectItem value="aguardando">Aguardando</SelectItem>
              </SelectContent>
            </Select>

            <Select value={ordenacao} onValueChange={setOrdenacao}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="impacto">Impacto (maior)</SelectItem>
                <SelectItem value="total">Total (maior)</SelectItem>
                <SelectItem value="recente">Mais recente</SelectItem>
                <SelectItem value="prioridade">Prioridade</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Categorias com Sugestões */}
        <div className="space-y-4">
          {sugestoesData.sugestoesPorCategoria.map((categoria) => (
            <Card key={categoria.id} className="overflow-hidden">
              {/* Cabeçalho da Categoria */}
              <div 
                className="p-6 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleCategoria(categoria.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-foreground">
                        {categoria.categoria}
                      </h3>
                      <Badge className={getPrioridadeColor(categoria.prioridade)}>
                        {categoria.prioridade}
                      </Badge>
                    </div>
                    
                    {/* KPIs da Categoria - Simplificado */}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Sugestões Agrupadas</p>
                        <p className="text-2xl font-bold text-foreground">{categoria.sugestoes.length}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Total de sugestões fornecidas</p>
                        <p className="text-2xl font-bold text-primary">
                          {categoria.sugestoes.reduce((acc, sug) => acc + sug.ocorrencias, 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="icon">
                    {categoriaExpandida === categoria.id ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Lista de Sugestões (Expandível) */}
              {categoriaExpandida === categoria.id && (
                <div className="border-t bg-muted/30">
                  <div className="p-6">
                    <h4 className="font-semibold text-foreground mb-4">
                      Sugestões da Categoria ({categoria.sugestoes.length})
                    </h4>
                    <div className="space-y-3">
                      {categoria.sugestoes.map((sugestao) => (
                        <Card key={sugestao.id} className="p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex-1">
                              <h5 className="font-semibold text-foreground">
                                {sugestao.titulo}
                              </h5>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2 text-sm">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="font-semibold text-foreground">
                                  {sugestao.ocorrencias} registros
                                </span>
                              </div>
                              
                              <Link to={`/detalhes-sugestao/${categoria.id}/${sugestao.id}`}>
                                <Button variant="outline" size="sm">
                                  Ver Detalhes
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Insights e Recomendações */}
        <Card className="mt-8 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Insights e Recomendações
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
              <span>
                <strong className="text-foreground">Saúde</strong> apresenta a maior prioridade 
                com impacto médio de 9.2/10. Recomenda-se atenção especial para esta categoria.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
              <span>
                <strong className="text-foreground">Infraestrutura</strong> possui o maior número 
                de sugestões (78), indicando demanda significativa de melhorias urbanas.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
              <span>
                Taxa de resolução geral de <strong className="text-foreground">57.5%</strong> está 
                acima da meta, mas há oportunidade de melhorias em Transporte e Meio Ambiente.
              </span>
            </li>
          </ul>
        </Card>
      </main>
    </div>
  );
};

export default VisualizacaoSugestoes;
