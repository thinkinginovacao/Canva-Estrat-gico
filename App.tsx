
import React, { useState, useEffect } from 'react';
import { CanvasState, initialCanvasState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<CanvasState>(() => {
    const saved = localStorage.getItem('canvas_state_v2');
    return saved ? JSON.parse(saved) : initialCanvasState;
  });

  useEffect(() => {
    localStorage.setItem('canvas_state_v2', JSON.stringify(state));
  }, [state]);

  const handleChange = (field: keyof CanvasState, value: string) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    if (window.confirm('Deseja limpar todos os dados do canvas? Esta ação não pode ser desfeita.')) {
      setState(initialCanvasState);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center p-4 lg:p-10 min-h-screen">
      {/* Header & Controls */}
      <header className="w-full max-w-[1440px] flex flex-col md:flex-row justify-between items-center mb-8 gap-6 no-print">
        <div className="flex items-center gap-4">
          <div className="bg-slate-900 text-white p-3 rounded-2xl shadow-xl">
            <i className="fas fa-layer-group text-2xl"></i>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Canvas Estratégico</h1>
            <p className="text-slate-500 text-sm font-medium">@Thinking Inovação Gerencial</p>
          </div>
        </div>

        <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-slate-200 gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-indigo-200 active:scale-95"
          >
            <i className="fas fa-print opacity-80"></i> Imprimir
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-5 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl font-semibold transition-all active:scale-95"
          >
            <i className="fas fa-eraser opacity-80"></i> Limpar
          </button>
        </div>
      </header>

      {/* Main Canvas Container */}
      <main className="canvas-container bg-white w-full max-w-[1440px] aspect-[1.414/1] shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2rem] border border-slate-200 flex flex-col overflow-hidden text-[12px]">
        
        {/* Top Header Bar */}
        <div className="flex w-full h-20 border-b border-slate-200">
          {/* HOJE label */}
          <div className="w-[18%] bg-slate-50 flex items-center px-6 gap-3 border-r border-slate-200">
            <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl">
              <i className="fas fa-history text-lg"></i>
            </div>
            <div>
              <span className="block font-black text-indigo-900 leading-none">STATUS QUO</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">A Empresa Hoje</span>
            </div>
          </div>
          
          {/* Company Name Input */}
          <div className="flex-1 bg-slate-900 flex items-center px-10 relative">
            <label className="text-slate-400 font-bold mr-4 text-[10px] uppercase tracking-widest">Empresa:</label>
            <input
              type="text"
              className="bg-transparent text-white flex-1 focus:outline-none font-bold text-lg border-b border-slate-700 focus:border-indigo-400 py-1 transition-all"
              placeholder="Nome da Organização ou Unidade de Negócio"
              value={state.hojeEmpresa}
              onChange={(e) => handleChange('hojeEmpresa', e.target.value)}
            />
            <div className="absolute right-[-1px] top-0 h-full w-12 bg-white skew-x-[-20deg] border-l border-slate-200"></div>
          </div>

          {/* FUTURO label */}
          <div className="w-[20%] bg-emerald-50 flex items-center justify-end px-8 gap-3">
            <div className="text-right">
              <span className="block font-black text-emerald-900 leading-none uppercase">Visão Futura</span>
              <span className="text-[10px] font-bold text-emerald-600/60 uppercase tracking-widest">Objetivos Estratégicos</span>
            </div>
            <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl">
              <i className="fas fa-rocket text-lg"></i>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex w-full">
          
          {/* LEFT: CURRENT STATE (HOJE) */}
          <div className="w-[22%] flex flex-col border-r border-slate-200">
            <CanvasSection 
              title="Oferta Público" 
              subtitle="Valor entregue ao cliente"
              className="flex-1 bg-indigo-50/30 text-indigo-900 border-b border-indigo-100" 
              field="ofertaPublico" 
              value={state.ofertaPublico} 
              onChange={handleChange}
              icon="fa-users"
            />
            <CanvasSection 
              title="Oferta Investidores" 
              subtitle="Atração de capital/valor"
              className="flex-1 bg-indigo-50/30 text-indigo-900 border-b border-indigo-100" 
              field="ofertaInvestidores" 
              value={state.ofertaInvestidores} 
              onChange={handleChange}
              icon="fa-hand-holding-dollar"
            />
            <div className="flex flex-1 border-b border-indigo-100">
               <CanvasSection 
                title="Portfólio" 
                className="flex-1 border-r border-indigo-100" 
                field="portfolio" 
                value={state.portfolio} 
                onChange={handleChange}
              />
               <CanvasSection 
                title="Preço" 
                className="flex-[0.7]" 
                field="preco" 
                value={state.preco} 
                onChange={handleChange}
              />
            </div>
            <CanvasSection 
              title="Equipe & Talentos" 
              className="flex-1 border-b border-indigo-100" 
              field="equipe" 
              value={state.equipe} 
              onChange={handleChange}
              icon="fa-people-group"
            />
            <CanvasSection 
              title="Parceiros-Chave" 
              className="flex-1 border-b border-indigo-100" 
              field="parceiros" 
              value={state.parceiros} 
              onChange={handleChange}
              icon="fa-handshake"
            />
            <CanvasSection 
              title="Limitações Atuais" 
              className="flex-1 bg-rose-50 text-rose-900" 
              field="limitacao" 
              value={state.limitacao} 
              onChange={handleChange} 
              titleClassName="text-rose-700"
              icon="fa-triangle-exclamation"
            />
          </div>

          {/* CENTER NARROW: BARRIERS */}
          <div className="w-[7%] bg-slate-800 text-white flex flex-col border-r border-slate-200">
            <div className="p-2 py-4 flex flex-col items-center h-full">
              <i className="fas fa-road-barrier mb-2 opacity-50 text-lg"></i>
              <h4 className="font-black text-[9px] uppercase tracking-tighter vertical-text text-center mb-4">Barreiras de Mercado</h4>
              <textarea
                className="w-full bg-transparent resize-none flex-1 focus:outline-none p-1 text-center text-xs text-slate-300 placeholder:text-slate-600"
                placeholder="O que impede?"
                value={state.barreiras}
                onChange={(e) => handleChange('barreiras', e.target.value)}
              />
            </div>
          </div>

          {/* MIDDLE: TARGET & CHANNELS */}
          <div className="w-[46%] flex flex-col p-6 space-y-6 border-r border-slate-200 bg-slate-50/50">
            {/* Segmentos */}
            <div className="flex-[1.2] bg-white rounded-3xl p-5 border border-slate-200 shadow-sm relative group transition-all hover:shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-slate-900 font-extrabold text-sm flex items-center gap-2">
                    <i className="fas fa-bullseye text-rose-500"></i> SEGMENTOS DE CLIENTES
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Perfil de Cliente Ideal (ICP)</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                 <InputGroup label="Região" value={state.segmentoRegiao} onChange={(v) => handleChange('segmentoRegiao', v)} />
                 <InputGroup label="Idade" value={state.segmentoIdade} onChange={(v) => handleChange('segmentoIdade', v)} />
                 <InputGroup label="Sexo/Gênero" value={state.segmentoSexo} onChange={(v) => handleChange('segmentoSexo', v)} />
                 <InputGroup label="Classe (CCEB)" value={state.segmentoCCEB} onChange={(v) => handleChange('segmentoCCEB', v)} />
                 <InputGroup label="Comportamento" value={state.segmentoCaracteristica} className="col-span-2" onChange={(v) => handleChange('segmentoCaracteristica', v)} />
              </div>
              
              <textarea
                className="w-full bg-slate-50 rounded-xl p-3 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-rose-100 transition-all text-slate-700 placeholder:italic"
                placeholder="Notas adicionais sobre o público e suas dores..."
                value={state.segmentoObs}
                onChange={(e) => handleChange('segmentoObs', e.target.value)}
              />
            </div>

            {/* Canais */}
            <div className="flex-1 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm transition-all hover:shadow-md">
               <h3 className="text-slate-900 font-extrabold text-sm flex items-center gap-2 mb-4">
                <i className="fas fa-paper-plane text-blue-500"></i> ESTRATÉGIA DE CANAIS
              </h3>
              <div className="grid grid-cols-2 gap-5 h-full pb-8">
                <div className="flex flex-col h-full">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">Plataformas Digitais</span>
                  <textarea
                    className="w-full bg-blue-50/30 rounded-xl p-3 resize-none flex-1 focus:outline-none border border-transparent focus:border-blue-100 transition-all"
                    placeholder="Sistemas, Apps, Web..."
                    value={state.canaisPlataformas}
                    onChange={(e) => handleChange('canaisPlataformas', e.target.value)}
                  />
                </div>
                <div className="flex flex-col h-full">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">Mídias & Atendimento</span>
                  <textarea
                    className="w-full bg-blue-50/30 rounded-xl p-3 resize-none flex-1 focus:outline-none border border-transparent focus:border-blue-100 transition-all"
                    placeholder="Redes Sociais, TV, Físico..."
                    value={state.canaisMidias}
                    onChange={(e) => handleChange('canaisMidias', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: FUTURE (OBJETIVOS) */}
          <div className="w-[25%] flex flex-col bg-emerald-50/30">
            <CanvasSection 
              title="Ambiente Macro" 
              subtitle="Tendências e Mercado"
              className="flex-[0.7] border-b border-emerald-100" 
              field="macro" 
              value={state.macro} 
              onChange={handleChange} 
              titleClassName="text-emerald-800"
              icon="fa-globe"
            />
            <CanvasSection 
              title="Projeção de Portfólio" 
              subtitle="Novas soluções"
              className="flex-1 border-b border-emerald-100" 
              field="projecaoPortfolio" 
              value={state.projecaoPortfolio} 
              onChange={handleChange} 
              titleClassName="text-emerald-800"
              icon="fa-box-open"
            />
            <CanvasSection 
              title="Metas SMART" 
              subtitle="Curto/Médio Prazo"
              className="flex-[0.8] bg-emerald-100/50 border-b border-emerald-200" 
              field="smart" 
              value={state.smart} 
              onChange={handleChange} 
              titleClassName="text-emerald-900"
              icon="fa-bullseye"
            />
            <CanvasSection 
              title="Resultados-Chave (OKR)" 
              subtitle="Métricas de sucesso"
              className="flex-1" 
              field="okr" 
              value={state.okr} 
              onChange={handleChange} 
              titleClassName="text-emerald-800"
              icon="fa-chart-pie"
            />
          </div>
        </div>

        {/* Brand Footer */}
        <div className="h-10 border-t border-slate-100 flex items-center justify-between px-8 bg-white no-print">
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Strategy Planning Framework</span>
            <span className="text-slate-900 font-extrabold text-[12px] flex items-center gap-1">
              <span className="text-slate-400 font-medium tracking-tight">by</span> @Thinking <span className="text-indigo-600">Inovação Gerencial</span>
            </span>
        </div>
      </main>

      {/* Footer / Info Section */}
      <div className="mt-8 no-print text-center">
        <p className="text-slate-400 text-xs mb-1 italic">
          Os dados são salvos automaticamente no seu navegador.
        </p>
        <div className="text-slate-300 font-bold text-[10px] uppercase tracking-[0.3em]">
          Efficiency through Innovation
        </div>
      </div>
      
      {/* Signature for Print */}
      <div className="hidden print:block fixed bottom-4 right-8 text-slate-400 font-bold text-xs italic">
        @Thinking Inovação Gerencial
      </div>
    </div>
  );
};

/* Helper Components */

interface InputGroupProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  className?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, value, onChange, className = "" }) => (
  <div className={`flex flex-col gap-0.5 ${className}`}>
    <label className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{label}</label>
    <input 
      type="text" 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="border-b border-slate-100 focus:border-indigo-400 outline-none pb-0.5 font-medium transition-all"
    />
  </div>
);

interface CanvasSectionProps {
  title: string;
  subtitle?: string;
  className: string;
  field: keyof CanvasState;
  value: string;
  onChange: (field: keyof CanvasState, value: string) => void;
  titleClassName?: string;
  icon?: string;
}

const CanvasSection: React.FC<CanvasSectionProps> = ({ 
  title, 
  subtitle,
  className, 
  field, 
  value, 
  onChange,
  titleClassName = "",
  icon
}) => {
  return (
    <div className={`p-4 flex flex-col relative group transition-all ${className}`}>
      <div className="flex justify-between items-start mb-1 pointer-events-none">
        <div>
          <h4 className={`font-black text-[10px] uppercase tracking-wide ${titleClassName}`}>
            {title}
          </h4>
          {subtitle && <p className="text-[8px] opacity-60 font-bold uppercase">{subtitle}</p>}
        </div>
        {icon && <i className={`fas ${icon} opacity-20 text-xs`}></i>}
      </div>
      <textarea
        className="w-full bg-transparent resize-none flex-1 focus:outline-none transition-all py-1 placeholder:opacity-30 placeholder:italic leading-relaxed"
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
        placeholder="..."
      />
      {/* Visual Hover Indicator */}
      <div className="absolute left-0 top-0 h-full w-0.5 bg-indigo-500 opacity-0 group-focus-within:opacity-100 transition-all"></div>
    </div>
  );
};

export default App;
