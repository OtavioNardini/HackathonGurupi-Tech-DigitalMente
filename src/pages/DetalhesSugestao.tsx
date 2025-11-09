import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Users, 
  AlertCircle,
  TrendingUp,
  FileText
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";
import sugestoesData from "@/data/sugestoesData.json";

const DetalhesSugestao = () => {
  const { categoriaId, sugestaoId } = useParams();
  const navigate = useNavigate();
  const [periodoSelecionado, setPeriodoSelecionado] = useState<"mensal" | "bimestral" | "semestral" | "anual">("mensal");

  // Encontrar a categoria e sugestão
  const categoria = sugestoesData.sugestoesPorCategoria.find(
    (cat) => cat.id === Number(categoriaId)
  );

  const sugestao = categoria?.sugestoes.find(
    (sug) => sug.id === Number(sugestaoId)
  );

  if (!categoria || !sugestao) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Sugestão não encontrada
            </h2>
            <Button onClick={() => navigate("/visualizacao-sugestoes")}>
              Voltar para Visualização
            </Button>
          </Card>
        </main>
      </div>
    );
  }

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

  // Agrupar dados por período selecionado
  const dadosAgrupados = useMemo(() => {
    if (!sugestao) return [];
    
    const dados = sugestao.analiseTemporalMensal.map(item => ({
      ...item,
      data: new Date(item.mes + "-01")
    }));

    if (periodoSelecionado === "mensal") {
      return dados.map(item => ({
        periodo: item.data.toLocaleDateString("pt-BR", { month: "short", year: "numeric" }),
        quantidade: item.quantidade,
        dataCompleta: item.data
      }));
    }

    if (periodoSelecionado === "bimestral") {
      const agrupado: { [key: string]: number } = {};
      dados.forEach(item => {
        const bimestre = Math.floor(item.data.getMonth() / 2);
        const chave = `${bimestre + 1}º Bim ${item.data.getFullYear()}`;
        agrupado[chave] = (agrupado[chave] || 0) + item.quantidade;
      });
      return Object.entries(agrupado).map(([periodo, quantidade]) => ({
        periodo,
        quantidade,
        dataCompleta: new Date()
      }));
    }

    if (periodoSelecionado === "semestral") {
      const agrupado: { [key: string]: number } = {};
      dados.forEach(item => {
        const semestre = item.data.getMonth() < 6 ? 1 : 2;
        const chave = `${semestre}º Sem ${item.data.getFullYear()}`;
        agrupado[chave] = (agrupado[chave] || 0) + item.quantidade;
      });
      return Object.entries(agrupado).map(([periodo, quantidade]) => ({
        periodo,
        quantidade,
        dataCompleta: new Date()
      }));
    }

    if (periodoSelecionado === "anual") {
      const agrupado: { [key: string]: number } = {};
      dados.forEach(item => {
        const ano = item.data.getFullYear().toString();
        agrupado[ano] = (agrupado[ano] || 0) + item.quantidade;
      });
      return Object.entries(agrupado).map(([periodo, quantidade]) => ({
        periodo,
        quantidade,
        dataCompleta: new Date()
      }));
    }

    return [];
  }, [sugestao, periodoSelecionado]);

  // Calcular tendência
  const tendencia = useMemo(() => {
    if (dadosAgrupados.length < 2) return "Sem dados suficientes";
    const primeiro = dadosAgrupados[0].quantidade;
    const ultimo = dadosAgrupados[dadosAgrupados.length - 1].quantidade;
    const diferenca = ultimo - primeiro;
    const percentual = ((diferenca / primeiro) * 100).toFixed(1);
    
    if (diferenca > 0) {
      return `Crescente (+${percentual}%) - O número de registros aumentou ao longo do tempo, indicando agravamento do problema.`;
    } else if (diferenca < 0) {
      return `Decrescente (${percentual}%) - O número de registros diminuiu, sugerindo melhora ou menor incidência.`;
    } else {
      return "Estável - O número de registros permaneceu constante.";
    }
  }, [dadosAgrupados]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Botão Voltar */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/visualizacao-sugestoes")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para Visualização
        </Button>

        {/* Cabeçalho da Sugestão */}
        <Card className="p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="text-sm">
                  {categoria.categoria}
                </Badge>
                <Badge className={getStatusColor(sugestao.status)}>
                  {sugestao.status}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-3">
                {sugestao.titulo}
              </h1>
              <p className="text-muted-foreground text-lg">
                {sugestao.descricao}
              </p>
            </div>
          </div>

          {/* Informações Resumidas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Bairro</p>
                <p className="font-semibold">{sugestao.bairro}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Data de Registro</p>
                <p className="font-semibold">
                  {new Date(sugestao.dataRegistro).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Total de Registros</p>
                <p className="font-semibold text-primary">{sugestao.ocorrencias}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Nível de Impacto</p>
                <p className="font-semibold text-orange-600">{sugestao.impacto}/10</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Análise Temporal */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">
                Análise Temporal - Série Histórica
              </h2>
            </div>

            {/* Seletor de Período */}
            <Select value={periodoSelecionado} onValueChange={(value: any) => setPeriodoSelecionado(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mensal">Mensal</SelectItem>
                <SelectItem value="bimestral">Bimestral</SelectItem>
                <SelectItem value="semestral">Semestral</SelectItem>
                <SelectItem value="anual">Anual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Gráfico de Série Histórica */}
          <div className="w-full h-[400px] mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dadosAgrupados}>
                <defs>
                  <linearGradient id="colorQuantidade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="periodo" 
                  className="text-xs"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                  itemStyle={{ color: '#8b5cf6' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="quantidade" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorQuantidade)"
                  name="Registros"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Resumo da Tendência */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Tendência: </strong>
              {tendencia}
            </p>
          </div>

          {/* Estatísticas do Período */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-xs text-muted-foreground mb-1">Total de Registros</p>
              <p className="text-2xl font-bold text-primary">
                {dadosAgrupados.reduce((acc, item) => acc + item.quantidade, 0)}
              </p>
            </div>
            <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
              <p className="text-xs text-muted-foreground mb-1">Média por Período</p>
              <p className="text-2xl font-bold text-blue-600">
                {(dadosAgrupados.reduce((acc, item) => acc + item.quantidade, 0) / dadosAgrupados.length).toFixed(1)}
              </p>
            </div>
            <div className="p-4 bg-purple-500/5 rounded-lg border border-purple-500/20">
              <p className="text-xs text-muted-foreground mb-1">Pico Máximo</p>
              <p className="text-2xl font-bold text-purple-600">
                {Math.max(...dadosAgrupados.map(d => d.quantidade))}
              </p>
            </div>
          </div>
        </Card>

        {/* Sugestões para Editais */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">
              Sugestões para Editais
            </h2>
          </div>
          <div className="space-y-4">
            {sugestoesData.sugestoesEditais
              .filter((edital) => edital.categoria === categoria.categoria)
              .map((edital, idx) => (
                <Card key={idx} className="p-4 bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap gap-2 items-center mb-1">
                      <Badge variant="outline" className="text-xs">
                        {edital.tipo}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-semibold">
                        Cluster: {edital.cluster}
                      </span>
                    </div>
                    <p className="text-foreground font-bold mb-1">
                      {edital.titulo}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {edital.descricao}
                    </p>
                  </div>
                </Card>
              ))}
            {/* Caso não haja sugestões para edital */}
            {sugestoesData.sugestoesEditais.filter((edital) => edital.categoria === categoria.categoria).length === 0 && (
              <p className="text-muted-foreground text-sm">Nenhuma sugestão de edital para esta categoria.</p>
            )}
          </div>
        </Card>

        {/* Registros Brutos */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">
              Registros Brutos ({sugestao.registrosBrutos.length})
            </h2>
          </div>

          <div className="space-y-4">
            {sugestao.registrosBrutos.map((registro) => (
              <Card key={registro.id} className="p-4 bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className="text-xs">
                        ID: {registro.id}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(registro.data).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                    <p className="text-foreground font-medium mb-2">
                      {registro.descricao}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{registro.cidadao}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{registro.localizacao}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Estatística dos Registros */}
          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total de Registros</p>
                <p className="text-2xl font-bold text-primary">
                  {sugestao.registrosBrutos.length}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Primeiro Registro</p>
                <p className="text-lg font-semibold text-foreground">
                  {new Date(
                    Math.min(
                      ...sugestao.registrosBrutos.map((r) => new Date(r.data).getTime())
                    )
                  ).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Último Registro</p>
                <p className="text-lg font-semibold text-foreground">
                  {new Date(
                    Math.max(
                      ...sugestao.registrosBrutos.map((r) => new Date(r.data).getTime())
                    )
                  ).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default DetalhesSugestao;
