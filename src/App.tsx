import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CadastroProblema from "./pages/CadastroProblema";
import Editais from "./pages/Editais";
import VisualizacaoSugestoes from "./pages/VisualizacaoSugestoes";
import DetalhesSugestao from "./pages/DetalhesSugestao";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/editais" element={<Editais />} />
          <Route path="/cadastro-problema" element={<CadastroProblema />} />
          <Route path="/visualizacao-sugestoes" element={<VisualizacaoSugestoes />} />
          <Route path="/detalhes-sugestao/:categoriaId/:sugestaoId" element={<DetalhesSugestao />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
