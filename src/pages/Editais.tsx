import { useMemo, useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, ExternalLink } from "lucide-react";

type Edital = {
  id: string;
  titulo: string;
  resumo: string;
  orgao: string;
  area: string;
  prazo: string; // YYYY-MM-DD
  status: "Aberto" | "Encerrado" | "Em Análise";
  url?: string;
};

const SAMPLE_EDITAIS: Edital[] = [
  {
    id: "e-001",
    titulo: "Incentivo à Inovação em Iluminação Pública",
    resumo: "Chamamento para projetos aplicados que proponham soluções de iluminação pública inteligente com foco em segurança e eficiência energética.",
    orgao: "Secretaria de Infraestrutura - Gurupi",
    area: "Infraestrutura",
    prazo: "2025-12-15",
    status: "Aberto",
    url: "/src/assets/edital-e-001.pdf",
  },
  {
    id: "e-002",
    titulo: "Fomento a Projetos de Saúde Comunitária",
    resumo: "Edital para apoiar pesquisas e intervenções em saúde pública voltadas a prevenção e atenção primária em municípios do Tocantins.",
    orgao: "FAPTO",
    area: "Saúde",
    prazo: "2026-01-20",
    status: "Em Análise",
    url: "/src/assets/edital-e-002.pdf",
  },
  {
    id: "e-003",
    titulo: "Programa de Capacitação em Educação Digital",
    resumo: "Recursos para iniciativas que promovam alfabetização digital em escolas públicas e formação de professores.",
    orgao: "Secretaria de Educação",
    area: "Educação",
    prazo: "2025-10-01",
    status: "Encerrado",
    url: "/src/assets/edital-e-001.pdf",
  },
];

// Pagination settings
const PAGE_SIZE = 2;

const Editais = () => {
  const [query, setQuery] = useState("");
  const [areaFilter, setAreaFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    return SAMPLE_EDITAIS.filter((e) => {
      const matchesQuery =
        query.trim() === "" ||
        e.titulo.toLowerCase().includes(query.toLowerCase()) ||
        e.resumo.toLowerCase().includes(query.toLowerCase()) ||
        e.orgao.toLowerCase().includes(query.toLowerCase());

  const matchesArea = areaFilter === "all" || e.area === areaFilter;
  const matchesStatus = statusFilter === "all" || e.status === statusFilter;

      return matchesQuery && matchesArea && matchesStatus;
    });
  }, [query, areaFilter, statusFilter]);

  // pagination state
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  // reset page when filters/search change
  useEffect(() => {
    setPage(1);
  }, [query, areaFilter, statusFilter]);

  const toggle = (id: string) => setExpanded((s) => ({ ...s, [id]: !s[id] }));

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              Editais Abertos
            </h1>
            <p className="text-muted-foreground mt-2">
              Aqui você encontra oportunidades de financiamento, chamadas públicas e editais relevantes para universidades, grupos de pesquisa e gestores públicos. Use os filtros para encontrar editais por área, status ou busca livre.
            </p>
          </div>

          {/* Filtros */}
          <div className="flex flex-col md:flex-row items-start md:items-end gap-4 mb-6">
            <Input
              placeholder="Buscar por título, órgão ou palavras"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />

            <Select onValueChange={(v) => setAreaFilter(v)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por área" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="Infraestrutura">Infraestrutura</SelectItem>
                <SelectItem value="Saúde">Saúde</SelectItem>
                <SelectItem value="Educação">Educação</SelectItem>
                <SelectItem value="Meio Ambiente">Meio Ambiente</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(v) => setStatusFilter(v)}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Aberto">Aberto</SelectItem>
                <SelectItem value="Em Análise">Em Análise</SelectItem>
                <SelectItem value="Encerrado">Encerrado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Lista de editais */}
          <div className="grid gap-4">
            {filtered.length === 0 && (
              <Card className="p-6">
                <p className="text-muted-foreground">Nenhum edital encontrado com os filtros selecionados.</p>
              </Card>
            )}

            {pageItems.map((e) => (
              <Card key={e.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground">{e.titulo}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{e.resumo}</p>

                    <div className="mt-3 flex flex-wrap gap-2 text-sm text-muted-foreground">
                      <span className="font-medium">Órgão:</span>
                      <span>{e.orgao}</span>
                      <span className="mx-2">•</span>
                      <span className="font-medium">Área:</span>
                      <span>{e.area}</span>
                      <span className="mx-2">•</span>
                      <span className="font-medium">Prazo:</span>
                      <span>{e.prazo}</span>
                      <span className="mx-2">•</span>
                      <span className="font-medium">Status:</span>
                      <span>{e.status}</span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 flex items-center gap-3">
                    <Button variant="outline" onClick={() => toggle(e.id)}>
                      {expanded[e.id] ? "Ocultar" : "Ver detalhes"}
                    </Button>
                    <Button asChild>
                      <a href={e.url ?? '#'} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                        Inscrever-se
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" asChild>
                      <a href={e.url ?? '#'} download>
                        <Download className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>

                {expanded[e.id] && (
                  <div className="mt-4 border-t pt-4 text-sm text-foreground">
                    <p className="mb-2"><strong>Descrição completa:</strong></p>
                    <p className="text-muted-foreground">{e.resumo} Para mais informações consulte o documento oficial do edital e o cronograma detalhado no link de inscrição.</p>
                    <ul className="mt-3 list-disc ml-5 text-muted-foreground">
                      <li>Objetivo: Selecionar projetos com impacto local e viabilidade técnica.</li>
                      <li>Recursos: Verifique o valor e a forma de repasse no documento.</li>
                      <li>Prazos: envio de proposta, homologação e início das atividades.</li>
                    </ul>
                  </div>
                )}
              </Card>
            ))}

            {/* Pagination controls */}
            {filtered.length > PAGE_SIZE && (
              <div className="flex items-center justify-center gap-3 mt-6">
                <Button variant="ghost" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                  Anterior
                </Button>
                <span className="text-sm text-muted-foreground">Página {page} de {totalPages}</span>
                <Button variant="ghost" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                  Próxima
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Editais;
