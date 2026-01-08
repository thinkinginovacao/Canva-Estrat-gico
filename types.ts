
export interface CanvasState {
  hojeEmpresa: string;
  ofertaPublico: string;
  ofertaInvestidores: string;
  portfolio: string;
  preco: string;
  equipe: string;
  parceiros: string;
  limitacao: string;
  barreiras: string;
  segmentoRegiao: string;
  segmentoIdade: string;
  segmentoSexo: string;
  segmentoCCEB: string;
  segmentoCaracteristica: string;
  segmentoObs: string;
  canaisPlataformas: string;
  canaisMidias: string;
  macro: string;
  projecaoPortfolio: string;
  smart: string;
  okr: string;
}

export const initialCanvasState: CanvasState = {
  hojeEmpresa: '',
  ofertaPublico: '',
  ofertaInvestidores: '',
  portfolio: '',
  preco: '',
  equipe: '',
  parceiros: '',
  limitacao: '',
  barreiras: '',
  segmentoRegiao: '',
  segmentoIdade: '',
  segmentoSexo: '',
  segmentoCCEB: '',
  segmentoCaracteristica: '',
  segmentoObs: '',
  canaisPlataformas: '',
  canaisMidias: '',
  macro: '',
  projecaoPortfolio: '',
  smart: '',
  okr: '',
};
