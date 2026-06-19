import { useState } from 'react';
import {
  Search, Plus, Package, Filter, Download, RefreshCw,
  MoreHorizontal, ChevronDown, Edit, Trash2, Globe, Code,
  FileText, Shield, Music, Archive, Layers, Monitor
} from 'lucide-react';

const softwares = [
  { id: 1, name: 'Google Chrome', version: '120.0.6099.130', publisher: 'Google LLC', category: 'Navegador', deployments: 89, status: 'Ativo', size: '89 MB', updated: '10/01/2024', desc: 'Navegador web moderno e rápido para acesso à internet corporativa.', icon: Globe },
  { id: 2, name: 'Mozilla Firefox', version: '121.0', publisher: 'Mozilla Foundation', category: 'Navegador', deployments: 54, status: 'Ativo', size: '57 MB', updated: '09/01/2024', desc: 'Navegador web open-source com foco em privacidade.', icon: Globe },
  { id: 3, name: '7-Zip', version: '23.01', publisher: 'Igor Pavlov', category: 'Utilitário', deployments: 147, status: 'Ativo', size: '2 MB', updated: '20/06/2023', desc: 'Compactador/descompactador de arquivos de alto desempenho, open-source.', icon: Archive },
  { id: 4, name: 'VLC Media Player', version: '3.0.20', publisher: 'VideoLAN', category: 'Multimídia', deployments: 63, status: 'Ativo', size: '45 MB', updated: '08/11/2023', desc: 'Player de mídia universal compatível com todos os formatos de vídeo e áudio.', icon: Music },
  { id: 5, name: 'Microsoft Teams', version: '1.6.00.22303', publisher: 'Microsoft Corporation', category: 'Comunicação', deployments: 128, status: 'Ativo', size: '150 MB', updated: '15/01/2024', desc: 'Plataforma de comunicação e colaboração corporativa.', icon: Monitor },
  { id: 6, name: 'Notepad++', version: '8.6.1', publisher: 'Don Ho', category: 'Desenvolvimento', deployments: 38, status: 'Ativo', size: '4 MB', updated: '20/12/2023', desc: 'Editor de texto avançado para desenvolvedores e técnicos.', icon: Code },
  { id: 7, name: 'Adobe Acrobat Reader', version: '23.008.20555', publisher: 'Adobe Inc.', category: 'Escritório', deployments: 147, status: 'Ativo', size: '311 MB', updated: '12/01/2024', desc: 'Leitor e editor de documentos PDF padrão do mercado.', icon: FileText },
  { id: 8, name: 'LibreOffice', version: '7.6.4', publisher: 'The Document Foundation', category: 'Escritório', deployments: 72, status: 'Ativo', size: '370 MB', updated: '08/01/2024', desc: 'Suite de escritório open-source completa compatível com Microsoft Office.', icon: FileText },
  { id: 9, name: 'Kaspersky Endpoint Security', version: '11.11.0', publisher: 'Kaspersky', category: 'Segurança', deployments: 147, status: 'Ativo', size: '260 MB', updated: '05/01/2024', desc: 'Solução de segurança endpoint corporativa para proteção abrangente.', icon: Shield },
  { id: 10, name: 'GLPI Agent', version: '1.6', publisher: 'Teclib', category: 'Gerenciamento', deployments: 147, status: 'Ativo', size: '35 MB', updated: '02/01/2024', desc: 'Agente de inventário e gerenciamento de ativos de TI.', icon: Layers },
  { id: 11, name: 'WinSCP', version: '6.1.2', publisher: 'Martin Prikryl', category: 'Utilitário', deployments: 22, status: 'Ativo', size: '12 MB', updated: '28/11/2023', desc: 'Cliente SFTP/FTP/WebDAV para transferência segura de arquivos.', icon: Download },
  { id: 12, name: 'Zoom', version: '5.17.1', publisher: 'Zoom Video Communications', category: 'Comunicação', deployments: 45, status: 'Descontinuado', size: '185 MB', updated: '01/10/2023', desc: 'Plataforma de videoconferência corporativa.', icon: Monitor },
];

const categories = ['Todas', 'Navegador', 'Utilitário', 'Multimídia', 'Comunicação', 'Desenvolvimento', 'Escritório', 'Segurança', 'Gerenciamento'];

function CategoryBadge({ cat }) {
  const colors = {
    Navegador: 'bg-blue-50 text-blue-700 border-blue-200',
    Utilitário: 'bg-purple-50 text-purple-700 border-purple-200',
    Multimídia: 'bg-pink-50 text-pink-700 border-pink-200',
    Comunicação: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    Desenvolvimento: 'bg-orange-50 text-orange-700 border-orange-200',
    Escritório: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    Segurança: 'bg-red-50 text-red-700 border-red-200',
    Gerenciamento: 'bg-teal-50 text-teal-700 border-teal-200',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-medium ${colors[cat] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
      {cat}
    </span>
  );
}

export default function SoftwareCatalog() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');
  const [view, setView] = useState('table');
  const [showAdd, setShowAdd] = useState(false);

  const filtered = softwares.filter(s => {
    const match = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.publisher.toLowerCase().includes(search.toLowerCase());
    const cat = category === 'Todas' || s.category === category;
    return match && cat;
  });

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar software..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="py-2 px-3 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
          >
            {categories.map(c => <option key={c} value={c}>{c === 'Todas' ? 'Todas as Categorias' : c}</option>)}
          </select>
          <span className="text-xs text-slate-400">{filtered.length} software(s)</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
            <Download size={14} /> Exportar
          </button>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-medium transition-colors"
          >
            <Plus size={16} /> Adicionar Software
          </button>
        </div>
      </div>

      {/* Category pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${category === c ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-4 py-3 text-left"><input type="checkbox" /></th>
              {['Software', 'Versão', 'Fabricante', 'Categoria', 'Implantações', 'Tamanho', 'Atualizado', 'Status', ''].map((h, i) => (
                <th key={i} className="px-4 py-3 text-left font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((s) => {
              const Icon = s.icon;
              return (
                <tr key={s.id} className="table-row-hover cursor-pointer">
                  <td className="px-4 py-3"><input type="checkbox" /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <Icon size={14} className="text-slate-600" />
                      </div>
                      <span className="font-semibold text-slate-800">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-500">{s.version}</td>
                  <td className="px-4 py-3 text-slate-600">{s.publisher}</td>
                  <td className="px-4 py-3"><CategoryBadge cat={s.category} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-slate-100 rounded-full">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(s.deployments, 147) / 147 * 100}%` }}></div>
                      </div>
                      <span className="text-slate-600">{s.deployments}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{s.size}</td>
                  <td className="px-4 py-3 text-slate-500">{s.updated}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-medium ${s.status === 'Ativo' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-blue-600"><Edit size={13} /></button>
                      <button className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-red-500"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Software Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg border border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900">Adicionar Novo Software</h3>
              <button onClick={() => setShowAdd(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Nome do Software *</label>
                  <input type="text" placeholder="Ex: Adobe Reader" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Versão *</label>
                  <input type="text" placeholder="Ex: 23.0.0" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Fabricante</label>
                <input type="text" placeholder="Ex: Adobe Inc." className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Categoria</label>
                  <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700">
                    {categories.filter(c => c !== 'Todas').map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Status</label>
                  <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700">
                    <option>Ativo</option>
                    <option>Descontinuado</option>
                    <option>Em teste</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Arquivo de Instalação</label>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center hover:border-blue-400 cursor-pointer transition-colors">
                  <Package size={24} className="text-slate-300 mx-auto mb-1" />
                  <p className="text-xs text-slate-500">Arraste o instalador (.msi, .exe) ou <span className="text-blue-600">clique para selecionar</span></p>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Descrição</label>
                <textarea rows={2} placeholder="Descrição opcional do software..." className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium">Cancelar</button>
              <button className="px-4 py-2 text-sm text-white bg-blue-700 hover:bg-blue-800 rounded-lg font-medium">Adicionar ao Catálogo</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
