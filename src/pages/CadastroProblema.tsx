import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { FileText, MapPin, AlertCircle, Calendar } from "lucide-react";

const problemSchema = z.object({
  titulo: z.string().min(5, "Título deve ter no mínimo 5 caracteres").max(200, "Título muito longo"),
  descricao: z.string().min(20, "Descrição deve ter no mínimo 20 caracteres").max(2000, "Descrição muito longa"),
  categoria: z.string().min(1, "Selecione uma categoria"),
  palavrasChave: z.string().min(3, "Adicione palavras-chave"),
  fonte: z.string().min(1, "Selecione a fonte do dado"),
  dataRegistro: z.string().min(1, "Data é obrigatória"),
  quantidadeOcorrencias: z.coerce.number().min(1, "Quantidade deve ser no mínimo 1"),
  orgaoResponsavel: z.string().min(3, "Informe o órgão responsável"),
  urlFonte: z.string().url("URL inválida").optional().or(z.literal("")),
  municipio: z.string().min(2, "Informe o município"),
  bairro: z.string().optional(),
  nivelImpacto: z.string().min(1, "Selecione o nível de impacto"),
  situacao: z.string().min(1, "Selecione a situação atual"),
});

type ProblemForm = z.infer<typeof problemSchema>;

const CadastroProblema = () => {
  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm<ProblemForm>({
    resolver: zodResolver(problemSchema),
  });

  const [previewData, setPreviewData] = useState<ProblemForm | null>(null);

  const onSubmit = (data: ProblemForm) => {
    console.log("Sugestão cadastrada:", data);
    toast.success("Sugestão cadastrada com sucesso!", {
      description: "A sugestão foi registrada no sistema.",
    });
    reset();
  };

  const openPreview = () => {
    const values = getValues();
    setPreviewData(values as ProblemForm);
  };

  const confirmPreview = () => {
    if (previewData) {
      onSubmit(previewData);
      setPreviewData(null);
    }
  };

  const exampleData: ProblemForm = {
    titulo: "Falta de iluminação na rua das Flores",
    descricao: "Ao longo dos últimos meses, moradores reportaram ausência de iluminação pública na Rua das Flores, aumentando insegurança noturna e queda de movimentação comercial.",
    categoria: "infraestrutura",
    palavrasChave: "iluminação,segurança,rua das flores",
    fonte: "ouvidoria",
    dataRegistro: "2025-11-01",
    quantidadeOcorrencias: 12,
    orgaoResponsavel: "Secretaria de Infraestrutura",
    urlFonte: "",
    municipio: "Gurupi",
    bairro: "Centro",
    nivelImpacto: "medio",
    situacao: "aberto",
  };

  const fillExample = () => reset(exampleData);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground flex items-center gap-3 mb-2">
              <FileText className="h-8 w-8 text-primary" />
              Cadastro de Sugestão
            </h1>
            <p className="text-muted-foreground">
              Registre demandas e necessidades detectadas em fontes públicas para criar uma base estruturada de sugestões.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Identificação */}
            <Card className="p-6 shadow-[var(--shadow-medium)]">
              <h2 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Identificação
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="titulo">Título da Sugestão *</Label>
                  <Input
                    id="titulo"
                    {...register("titulo")}
                    placeholder="Ex: Falta de iluminação pública em bairros periféricos"
                    className="mt-1"
                  />
                  {errors.titulo && (
                    <p className="text-sm text-destructive mt-1">{errors.titulo.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="descricao">Descrição Detalhada *</Label>
                  <Textarea
                    id="descricao"
                    {...register("descricao")}
                    placeholder="Contextualização e impacto da sugestão..."
                    rows={5}
                    className="mt-1"
                  />
                  {errors.descricao && (
                    <p className="text-sm text-destructive mt-1">{errors.descricao.message}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="categoria">Categoria / Tema *</Label>
                    <Select {...register("categoria")}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="infraestrutura">Infraestrutura</SelectItem>
                        <SelectItem value="saude">Saúde</SelectItem>
                        <SelectItem value="educacao">Educação</SelectItem>
                        <SelectItem value="mobilidade">Mobilidade</SelectItem>
                        <SelectItem value="seguranca">Segurança</SelectItem>
                        <SelectItem value="meio-ambiente">Meio Ambiente</SelectItem>
                        <SelectItem value="saneamento">Saneamento</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.categoria && (
                      <p className="text-sm text-destructive mt-1">{errors.categoria.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="palavrasChave">Palavras-Chave (Tags) *</Label>
                    <Input
                      id="palavrasChave"
                      {...register("palavrasChave")}
                      placeholder="iluminação, segurança, periferia"
                      className="mt-1"
                    />
                    {errors.palavrasChave && (
                      <p className="text-sm text-destructive mt-1">{errors.palavrasChave.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Origem e Contexto */}
            <Card className="p-6 shadow-[var(--shadow-medium)]">
              <h2 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Origem e Contexto
              </h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fonte">Fonte do Dado *</Label>
                    <Select {...register("fonte")}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione a fonte" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ouvidoria">Ouvidoria</SelectItem>
                        <SelectItem value="esic">e-SIC</SelectItem>
                        <SelectItem value="diario-oficial">Diário Oficial</SelectItem>
                        <SelectItem value="portal-transparencia">Portal da Transparência</SelectItem>
                        <SelectItem value="protocolo-interno">Protocolo Interno</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.fonte && (
                      <p className="text-sm text-destructive mt-1">{errors.fonte.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="dataRegistro">Data do Registro / Ocorrência *</Label>
                    <Input
                      id="dataRegistro"
                      type="date"
                      {...register("dataRegistro")}
                      className="mt-1"
                    />
                    {errors.dataRegistro && (
                      <p className="text-sm text-destructive mt-1">{errors.dataRegistro.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantidadeOcorrencias">Quantidade de Ocorrências *</Label>
                    <Input
                      id="quantidadeOcorrencias"
                      type="number"
                      {...register("quantidadeOcorrencias")}
                      placeholder="Ex: 23"
                      className="mt-1"
                      min="1"
                    />
                    {errors.quantidadeOcorrencias && (
                      <p className="text-sm text-destructive mt-1">{errors.quantidadeOcorrencias.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="orgaoResponsavel">Órgão / Secretaria Responsável *</Label>
                    <Input
                      id="orgaoResponsavel"
                      {...register("orgaoResponsavel")}
                      placeholder="Ex: Secretaria de Infraestrutura"
                      className="mt-1"
                    />
                    {errors.orgaoResponsavel && (
                      <p className="text-sm text-destructive mt-1">{errors.orgaoResponsavel.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="urlFonte">URL / Link da Fonte (opcional)</Label>
                  <Input
                    id="urlFonte"
                    type="url"
                    {...register("urlFonte")}
                    placeholder="https://..."
                    className="mt-1"
                  />
                  {errors.urlFonte && (
                    <p className="text-sm text-destructive mt-1">{errors.urlFonte.message}</p>
                  )}
                </div>
              </div>
            </Card>

            {/* Localização e Impacto */}
            <Card className="p-6 shadow-[var(--shadow-medium)]">
              <h2 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Localização e Impacto
              </h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="municipio">Município *</Label>
                    <Input
                      id="municipio"
                      {...register("municipio")}
                      placeholder="Ex: Palmas - TO"
                      className="mt-1"
                    />
                    {errors.municipio && (
                      <p className="text-sm text-destructive mt-1">{errors.municipio.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="bairro">Bairro / Região (opcional)</Label>
                    <Input
                      id="bairro"
                      {...register("bairro")}
                      placeholder="Ex: Aureny III"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nivelImpacto">Nível de Impacto *</Label>
                    <Select {...register("nivelImpacto")}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione o nível" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baixo">Baixo</SelectItem>
                        <SelectItem value="medio">Médio</SelectItem>
                        <SelectItem value="alto">Alto</SelectItem>
                        <SelectItem value="critico">Crítico</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.nivelImpacto && (
                      <p className="text-sm text-destructive mt-1">{errors.nivelImpacto.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="situacao">Situação Atual *</Label>
                    <Select {...register("situacao")}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione a situação" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aberto">Aberto</SelectItem>
                        <SelectItem value="em-analise">Em análise</SelectItem>
                        <SelectItem value="em-andamento">Em andamento</SelectItem>
                        <SelectItem value="resolvido">Resolvido</SelectItem>
                        <SelectItem value="sem-resposta">Sem resposta</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.situacao && (
                      <p className="text-sm text-destructive mt-1">{errors.situacao.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => reset()}>
                Limpar Formulário
              </Button>
              <Button type="button" variant="ghost" onClick={fillExample}>
                Exemplo
              </Button>
              <Button type="button" variant="secondary" onClick={openPreview}>
                Pré-visualizar
              </Button>
              <Button type="submit" className="bg-primary hover:opacity-90">
                Cadastrar Sugestão
              </Button>
            </div>
          </form>
        </div>
      </main>

      {/* Preview Modal */}
      {previewData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setPreviewData(null)} />
          <Card className="z-60 p-6 w-11/12 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Pré-visualização da Sugestão</h3>
            <div className="space-y-2 text-sm text-foreground">
              <p><strong>Título:</strong> {previewData.titulo}</p>
              <p><strong>Descrição:</strong> {previewData.descricao}</p>
              <p><strong>Categoria:</strong> {previewData.categoria}</p>
              <p><strong>Palavras-chave:</strong> {previewData.palavrasChave}</p>
              <p><strong>Fonte:</strong> {previewData.fonte}</p>
              <p><strong>Data:</strong> {previewData.dataRegistro}</p>
              <p><strong>Ocorrências:</strong> {previewData.quantidadeOcorrencias}</p>
              <p><strong>Órgão:</strong> {previewData.orgaoResponsavel}</p>
              <p><strong>Município:</strong> {previewData.municipio} {previewData.bairro ? ` - ${previewData.bairro}` : ''}</p>
              <p><strong>Nível de Impacto:</strong> {previewData.nivelImpacto}</p>
              <p><strong>Situação:</strong> {previewData.situacao}</p>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button type="button" variant="outline" onClick={() => setPreviewData(null)}>Editar</Button>
              <Button type="button" className="bg-primary" onClick={confirmPreview}>Confirmar e Enviar</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CadastroProblema;
