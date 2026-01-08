
import React, { useState, useEffect } from 'https://esm.sh/react@19.2.3';
import ReactDOM from 'https://esm.sh/react-dom@19.2.3/client';

const initialCanvasState = {
  hojeEmpresa: '', ofertaPublico: '', ofertaInvestidores: '', portfolio: '', preco: '',
  equipe: '', parceiros: '', limitacao: '', barreiras: '', segmentoRegiao: '',
  segmentoIdade: '', segmentoSexo: '', segmentoCCEB: '', segmentoCaracteristica: '',
  segmentoObs: '', canaisPlataformas: '', canaisMidias: '', macro: '',
  projecaoPortfolio: '', smart: '', okr: '',
};

const InputGroup = ({ label, value, onChange, className = "" }) => (
  React.createElement('div', { className: `flex flex-col gap-0.5 ${className}` },
    React.createElement('label', { className: "text-[9px] font-black text-slate-400 uppercase tracking-tighter" }, label),
    React.createElement('input', {
      type: "text",
      value: value,
      onChange: (e) => onChange(e.target.value),
      className: "border-b border-slate-100 focus:border-indigo-400 outline-none pb-0.5 font-medium transition-all"
    })
  )
);

const CanvasSection = ({ title, subtitle, className, field, value, onChange, titleClassName = "", icon }) => (
  React.createElement('div', { className: `p-4 flex flex-col relative group transition-all ${className}` },
    React.createElement('div', { className: "flex justify-between items-start mb-1 pointer-events-none" },
      React.createElement('div', null,
        React.createElement('h4', { className: `font-black text-[10px] uppercase tracking-wide ${titleClassName}` }, title),
        subtitle && React.createElement('p', { className: "text-[8px] opacity-60 font-bold uppercase" }, subtitle)
      ),
      icon && React.createElement('i', { className: `fas ${icon} opacity-20 text-xs` })
    ),
    React.createElement('textarea', {
      className: "w-full bg-transparent resize-none flex-1 focus:outline-none transition-all py-1 placeholder:opacity-30 placeholder:italic leading-relaxed",
      value: value,
      onChange: (e) => onChange(field, e.target.value),
      placeholder: "..."
    }),
    React.createElement('div', { className: "absolute left-0 top-0 h-full w-0.5 bg-indigo-500 opacity-0 group-focus-within:opacity-100 transition-all" })
  )
);

const App = () => {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem('canvas_state_v2');
    return saved ? JSON.parse(saved) : initialCanvasState;
  });

  useEffect(() => {
    localStorage.setItem('canvas_state_v2', JSON.stringify(state));
  }, [state]);

  const handleChange = (field, value) => setState(prev => ({ ...prev, [field]: value }));
  const handleClear = () => window.confirm('Limpar dados?') && setState(initialCanvasState);
  const handlePrint = () => window.print();

  return React.createElement('div', { className: "flex flex-col items-center p-4 lg:p-10 min-h-screen" },
    React.createElement('header', { className: "w-full max-w-[1440px] flex flex-col md:flex-row justify-between items-center mb-8 gap-6 no-print" },
      React.createElement('div', { className: "flex items-center gap-4" },
        React.createElement('div', { className: "bg-slate-900 text-white p-3 rounded-2xl shadow-xl" }, React.createElement('i', { className: "fas fa-layer-group text-2xl" })),
        React.createElement('div', null,
          React.createElement('h1', { className: "text-2xl font-extrabold tracking-tight text-slate-900" }, "Canvas Estratégico"),
          React.createElement('p', { className: "text-slate-500 text-sm font-medium" }, "@Thinking Inovação Gerencial")
        )
      ),
      React.createElement('div', { className: "flex bg-white p-2 rounded-2xl shadow-sm border border-slate-200 gap-2" },
        React.createElement('button', { onClick: handlePrint, className: "flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all shadow-md active:scale-95" }, React.createElement('i', { className: "fas fa-print opacity-80" }), " Imprimir"),
        React.createElement('button', { onClick: handleClear, className: "flex items-center gap-2 px-5 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl font-semibold transition-all active:scale-95" }, React.createElement('i', { className: "fas fa-eraser opacity-80" }), " Limpar")
      )
    ),
    React.createElement('main', { className: "canvas-container bg-white w-full max-w-[1440px] aspect-[1.414/1] shadow-2xl rounded-[2rem] border border-slate-200 flex flex-col overflow-hidden text-[12px]" },
      React.createElement('div', { className: "flex w-full h-20 border-b border-slate-200" },
        React.createElement('div', { className: "w-[18%] bg-slate-50 flex items-center px-6 gap-3 border-r border-slate-200" },
          React.createElement('div', { className: "flex items-center justify-center w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl" }, React.createElement('i', { className: "fas fa-history text-lg" })),
          React.createElement('div', null, React.createElement('span', { className: "block font-black text-indigo-900" }, "STATUS QUO"), React.createElement('span', { className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest" }, "A Empresa Hoje"))
        ),
        React.createElement('div', { className: "flex-1 bg-slate-900 flex items-center px-10 relative" },
          React.createElement('label', { className: "text-slate-400 font-bold mr-4 text-[10px] uppercase tracking-widest" }, "Empresa:"),
          React.createElement('input', {
            type: "text",
            className: "bg-transparent text-white flex-1 focus:outline-none font-bold text-lg border-b border-slate-700 focus:border-indigo-400 py-1 transition-all",
            placeholder: "Nome da Organização",
            value: state.hojeEmpresa,
            onChange: (e) => handleChange('hojeEmpresa', e.target.value)
          }),
          React.createElement('div', { className: "absolute right-[-1px] top-0 h-full w-12 bg-white skew-x-[-20deg] border-l border-slate-200" })
        ),
        React.createElement('div', { className: "w-[20%] bg-emerald-50 flex items-center justify-end px-8 gap-3" },
          React.createElement('div', { className: "text-right" }, React.createElement('span', { className: "block font-black text-emerald-900 uppercase" }, "Visão Futura"), React.createElement('span', { className: "text-[10px] font-bold text-emerald-600/60 uppercase tracking-widest" }, "Objetivos Estratégicos")),
          React.createElement('div', { className: "flex items-center justify-center w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl" }, React.createElement('i', { className: "fas fa-rocket text-lg" }))
        )
      ),
      React.createElement('div', { className: "flex-1 flex w-full" },
        React.createElement('div', { className: "w-[22%] flex flex-col border-r border-slate-200" },
          React.createElement(CanvasSection, { title: "Oferta Público", className: "flex-1 bg-indigo-50/30 text-indigo-900 border-b border-indigo-100", field: "ofertaPublico", value: state.ofertaPublico, onChange: handleChange, icon: "fa-users" }),
          React.createElement(CanvasSection, { title: "Oferta Investidores", className: "flex-1 bg-indigo-50/30 text-indigo-900 border-b border-indigo-100", field: "ofertaInvestidores", value: state.ofertaInvestidores, onChange: handleChange, icon: "fa-hand-holding-dollar" }),
          React.createElement('div', { className: "flex flex-1 border-b border-indigo-100" },
            React.createElement(CanvasSection, { title: "Portfólio", className: "flex-1 border-r border-indigo-100", field: "portfolio", value: state.portfolio, onChange: handleChange }),
            React.createElement(CanvasSection, { title: "Preço", className: "flex-[0.7]", field: "preco", value: state.preco, onChange: handleChange })
          ),
          React.createElement(CanvasSection, { title: "Equipe & Talentos", className: "flex-1 border-b border-indigo-100", field: "equipe", value: state.equipe, onChange: handleChange, icon: "fa-people-group" }),
          React.createElement(CanvasSection, { title: "Parceiros-Chave", className: "flex-1 border-b border-indigo-100", field: "parceiros", value: state.parceiros, onChange: handleChange, icon: "fa-handshake" }),
          React.createElement(CanvasSection, { title: "Limitações Atuais", className: "flex-1 bg-rose-50 text-rose-900", field: "limitacao", value: state.limitacao, onChange: handleChange, titleClassName: "text-rose-700", icon: "fa-triangle-exclamation" })
        ),
        React.createElement('div', { className: "w-[7%] bg-slate-800 text-white flex flex-col border-r border-slate-200" },
          React.createElement('div', { className: "p-2 py-4 flex flex-col items-center h-full" },
            React.createElement('i', { className: "fas fa-road-barrier mb-2 opacity-50 text-lg" }),
            React.createElement('h4', { className: "font-black text-[9px] uppercase tracking-tighter vertical-text text-center mb-4" }, "Barreiras"),
            React.createElement('textarea', {
              className: "w-full bg-transparent resize-none flex-1 focus:outline-none p-1 text-center text-xs text-slate-300 placeholder:text-slate-600",
              placeholder: "...",
              value: state.barreiras,
              onChange: (e) => handleChange('barreiras', e.target.value)
            })
          )
        ),
        React.createElement('div', { className: "w-[46%] flex flex-col p-6 space-y-6 border-r border-slate-200 bg-slate-50/50" },
          React.createElement('div', { className: "flex-[1.2] bg-white rounded-3xl p-5 border border-slate-200 shadow-sm" },
            React.createElement('h3', { className: "text-slate-900 font-extrabold text-sm flex items-center gap-2 mb-4" }, React.createElement('i', { className: "fas fa-bullseye text-rose-500" }), " SEGMENTOS DE CLIENTES"),
            React.createElement('div', { className: "grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4" },
              React.createElement(InputGroup, { label: "Região", value: state.segmentoRegiao, onChange: (v) => handleChange('segmentoRegiao', v) }),
              React.createElement(InputGroup, { label: "Idade", value: state.segmentoIdade, onChange: (v) => handleChange('segmentoIdade', v) }),
              React.createElement(InputGroup, { label: "Sexo/Gênero", value: state.segmentoSexo, onChange: (v) => handleChange('segmentoSexo', v) }),
              React.createElement(InputGroup, { label: "Classe", value: state.segmentoCCEB, onChange: (v) => handleChange('segmentoCCEB', v) }),
              React.createElement(InputGroup, { label: "Comportamento", value: state.segmentoCaracteristica, className: "col-span-2", onChange: (v) => handleChange('segmentoCaracteristica', v) })
            ),
            React.createElement('textarea', {
              className: "w-full bg-slate-50 rounded-xl p-3 resize-none h-24 focus:outline-none text-slate-700",
              placeholder: "Observações do público...",
              value: state.segmentoObs,
              onChange: (e) => handleChange('segmentoObs', e.target.value)
            })
          ),
          React.createElement('div', { className: "flex-1 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm" },
            React.createElement('h3', { className: "text-slate-900 font-extrabold text-sm flex items-center gap-2 mb-4" }, React.createElement('i', { className: "fas fa-paper-plane text-blue-500" }), " ESTRATÉGIA DE CANAIS"),
            React.createElement('div', { className: "grid grid-cols-2 gap-5 h-full pb-8" },
              React.createElement('div', { className: "flex flex-col h-full" },
                React.createElement('span', { className: "text-[10px] text-slate-400 font-bold uppercase mb-2" }, "Plataformas"),
                React.createElement('textarea', { className: "w-full bg-blue-50/30 rounded-xl p-3 resize-none flex-1 focus:outline-none", value: state.canaisPlataformas, onChange: (e) => handleChange('canaisPlataformas', e.target.value) })
              ),
              React.createElement('div', { className: "flex flex-col h-full" },
                React.createElement('span', { className: "text-[10px] text-slate-400 font-bold uppercase mb-2" }, "Mídias"),
                React.createElement('textarea', { className: "w-full bg-blue-50/30 rounded-xl p-3 resize-none flex-1 focus:outline-none", value: state.canaisMidias, onChange: (e) => handleChange('canaisMidias', e.target.value) })
              )
            )
          )
        ),
        React.createElement('div', { className: "w-[25%] flex flex-col bg-emerald-50/30" },
          React.createElement(CanvasSection, { title: "Ambiente Macro", field: "macro", value: state.macro, onChange: handleChange, titleClassName: "text-emerald-800", icon: "fa-globe" }),
          React.createElement(CanvasSection, { title: "Projeção Portfólio", field: "projecaoPortfolio", value: state.projecaoPortfolio, onChange: handleChange, titleClassName: "text-emerald-800", icon: "fa-box-open" }),
          React.createElement(CanvasSection, { title: "Metas SMART", className: "bg-emerald-100/50", field: "smart", value: state.smart, onChange: handleChange, titleClassName: "text-emerald-900", icon: "fa-bullseye" }),
          React.createElement(CanvasSection, { title: "Resultados (OKR)", field: "okr", value: state.okr, onChange: handleChange, titleClassName: "text-emerald-800", icon: "fa-chart-pie" })
        )
      ),
      React.createElement('div', { className: "h-10 border-t border-slate-100 flex items-center justify-between px-8 bg-white no-print" },
        React.createElement('span', { className: "text-[10px] font-bold text-slate-300 uppercase tracking-widest" }, "Strategy Planning Framework"),
        React.createElement('span', { className: "text-slate-900 font-extrabold text-[12px]" }, "by @Thinking ", React.createElement('span', { className: "text-indigo-600" }, "Inovação Gerencial"))
      )
    ),
    React.createElement('footer', { className: "mt-8 no-print text-center" },
      React.createElement('p', { className: "text-slate-400 text-xs italic" }, "Dados salvos automaticamente no navegador."),
      React.createElement('div', { className: "text-slate-300 font-bold text-[10px] uppercase tracking-[0.3em]" }, "Efficiency through Innovation")
    ),
    React.createElement('div', { className: "hidden print:block fixed bottom-4 right-8 text-slate-400 font-bold text-xs italic" }, "@Thinking Inovação Gerencial")
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
