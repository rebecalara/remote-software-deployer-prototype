import { useState, Fragment } from 'react';
import {
  Search, Download, Filter, CheckCircle, XCircle, MinusCircle,
  Calendar, ChevronDown, ChevronRight, Eye, FileText,
  Clock, User, Monitor, Package, SlidersHorizontal
} from 'lucide-react';

const historyData = [
  { id: 1, date: '13/06/2024', time: '09:12:34', user: 'Carlos Lima', machine: 'WS-FIN-001', software: 'Google Chrome 120.0', result: 'Sucesso', duration: '1m 42s', dept: 'Financeiro', version: '120.0.6099' },
  { id: 2, date: '13/06/2024', time: '09:10:00', user: 'Carlos Lima', machine: 'WS-TI-015', software: 'Notepad++ 8.6.1', result: 'Sucesso', duration: '0m 48s', dept: 'TI', version: '8.6.1' },
  { id: 3, date: '13/06/2024', time: '09:08:55', user: 'Carlos Lima', machine: 'WS-ADM-041', software: 'Microsoft Teams 1.6.00', result: 'Falha', duration: '2m 10s', dept: 'Administração', version: '1.6.00' },
  { id: 4, date: '13/06/2024', time: '08:45:12', user: 'Marcos Santos', machine: 'WS-RH-005', software: '7-Zip 23.01', result: 'Sucesso', duration: '0m 32s', dept: 'Recursos Humanos', version: '23.01' },
  { id: 5, date: '13/06/2024', time: '08:45:12', user: 'Marcos Santos', machine: 'WS-RH-008', software: '7-Zip 23.01', result: 'Sucesso', duration: '0m 29s', dept: 'Recursos Humanos', version: '23.01' },
  { id: 6, date: '13/06/2024', time: '08:45:12', user: 'Marcos Santos', machine: 'WS-ADM-001', software: '7-Zip 23.01', result: 'Sucesso', duration: '0m 31s', dept: 'Administração', version: '23.01' },
  { id: 7, date: '12/06/2024', time: '17:30:00', user: 'Marcos Santos', machine: 'WS-COM-015', software: 'Mozilla Firefox 121.0', result: 'Sucesso', duration: '1m 18s', dept: 'Comunicação', version: '121.0' },
  { id: 8, date: '12/06/2024', time: '17:30:00', user: 'Marcos Santos', machine: 'WS-JUR-003', software: 'Mozilla Firefox 121.0', result: 'Sucesso', duration: '1m 22s', dept: 'Jurídico', version: '121.0' },
  { id: 9, date: '12/06/2024', time: '17:30:00', user: 'Marcos Santos', machine: 'WS-FIN-002', software: 'Mozilla Firefox 121.0', result: 'Sucesso', duration: '1m 09s', dept: 'Financeiro', version: '121.0' },
  { id: 10, date: '12/06/2024', time: '14:20:10', user: 'Ana Rodrigues', machine: 'WS-SAU-010', software: 'LibreOffice 7.6.4', result: 'Cancelado', duration: '0m 15s', dept: 'Saúde', version: '7.6.4' },
  { id: 11, date: '12/06/2024', time: '11:05:33', user: 'Carlos Lima', machine: 'WS-EDU-007', software: 'VLC Media Player 3.0.20', result: 'Sucesso', duration: '1m 03s', dept: 'Educação', version: '3.0.20' },
  { id: 12, date: '12/06/2024', time: '10:30:00', user: 'Carlos Lima', machine: 'WS-URB-002', software: 'Kaspersky Endpoint 11.11', result: 'Sucesso', duration: '4m 22s', dept: 'Urbanismo', version: '11.11.0' },
  { id: 13, date: '11/06/2024', time: '16:45:21', user: 'Ana Rodrigues', machine: 'WS-ADM-002', software: 'Adobe Acrobat Reader 23.008', result: 'Falha', duration: '1m 05s', dept: 'Administração', version: '23.008' },
  { id: 14, date: '11/06/2024', time: '14:12:05', user: 'Marcos Santos', machine: 'WS-FIN-001', software: 'Microsoft Teams 1.6.00', result: 'Sucesso', duration: '2m 34s', dept: 'Financeiro', version: '1.6.00' },
  { id: 15, date: '11/06/2024', time: '09:00:00', user: 'Admin Sistema', machine: 'WS-TI-015', software: 'GLPI Agent 1.6', result: 'Sucesso', duration: '0m 55s', dept: 'TI', version: '1.6' },
];

function ResultBadge({ result }) {
  const map = {
    Sucesso: { class: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle },
    Falha: { class: 'bg-red-50 text-red-700 border-red-200', icon: XCircle },
    Cancelado: { class: 'bg-slate-100 text-slate-500 border-slate-200', icon: MinusCircle },
  };
  const s = map[result] || map.Cancelado;
  const Icon = s.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-xs font-medium ${s.class}`}>
      <Icon size={11} />
      {result}
    </span>
  );
}

export default function History() {
  const [search, setSearch] = useState('');
  const [resultFilter, setResultFilter] = useState('Todos');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = historyData.filter(h => {
    const matchSearch = h.machine.toLowerCase().includes(search.toLowerCase()) ||
      h.software.toLowerCase().includes(search.toLowerCase()) ||
      h.user.toLowerCase().includes(search.toLowerCase()) ||
      h.dept.toLowerCase().includes(search.toLowerCase());
    const matchResult = resultFilter === 'Todos' || h.result === resultFilter;
    return matchSearch && matchResult;
  });

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  const successCount = filtered.filter(h => h.result === 'Sucesso').length;
  const failCount = filtered.filter(h => h.result === 'Falha').length;
  const cancelCount = filtered.filter(h => h.result === 'Cancelado').length;

  return (
    <div className="p-6 space-y-4">
      {/* Header actions */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por máquina, software, usuário..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={resultFilter}
            onChange={e => { setResultFilter(e.target.value); setPage(1); }}
            className="py-2 px-3 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
          >
            {['Todos', 'Sucesso', 'Falha', 'Cancelado'].map(r => <option key={r}>{r}</option>)}
          </select>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
              className="py-2 px-3 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
            />
            <span className="text-xs text-slate-400">até</span>
            <input
              type="date"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
              className="py-2 px-3 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
            />
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium">
          <Download size={14} /> Exportar CSV
        </button>
      </div>

      {/* Summary row */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
            <CheckCircle size={11} /> Sucesso: {successCount}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded-lg">
            <XCircle size={11} /> Falha: {failCount}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
            <MinusCircle size={11} /> Cancelado: {cancelCount}
          </span>
        </div>
        <span className="text-xs text-slate-400">{filtered.length} registro(s) encontrado(s)</span>
        {filtered.length > 0 && (
          <span className="text-xs text-emerald-600 font-medium ml-auto">
            Taxa de sucesso: {((successCount / filtered.length) * 100).toFixed(1)}%
          </span>
        )}
      </div>

      {/* History table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-4 py-3 text-left w-4"></th>
              {['Data/Hora', 'Usuário', 'Máquina', 'Departamento', 'Software', 'Versão', 'Resultado', 'Duração'].map(h => (
                <th key={h} className="px-4 py-3 text-left font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((h) => (
              <Fragment key={h.id}>
                <tr
                  className={`border-b border-slate-50 table-row-hover cursor-pointer ${expanded === h.id ? 'bg-slate-50' : ''}`}
                  onClick={() => setExpanded(expanded === h.id ? null : h.id)}
                >
                  <td className="px-4 py-3">
                    {expanded === h.id
                      ? <ChevronDown size={13} className="text-slate-400" />
                      : <ChevronRight size={13} className="text-slate-300" />}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-800">{h.date}</div>
                    <div className="text-slate-400 font-mono">{h.time}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-semibold">
                        {h.user.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <span className="text-slate-700">{h.user}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono font-semibold text-slate-800">{h.machine}</td>
                  <td className="px-4 py-3 text-slate-500">{h.dept}</td>
                  <td className="px-4 py-3 text-slate-700">{h.software}</td>
                  <td className="px-4 py-3 font-mono text-slate-400">{h.version}</td>
                  <td className="px-4 py-3"><ResultBadge result={h.result} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-slate-500">
                      <Clock size={11} />
                      <span>{h.duration}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-blue-600" onClick={e => e.stopPropagation()}>
                      <Eye size={13} />
                    </button>
                  </td>
                </tr>
                {expanded === h.id && (
                  <tr className="border-b border-slate-100">
                    <td colSpan={10} className="px-6 py-4 bg-slate-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Detalhes da Execução</div>
                          {[
                            ['ID da Tarefa', `TASK-${String(h.id).padStart(5, '0')}`],
                            ['Máquina', h.machine],
                            ['Endereço IP', `10.1.${h.id}.${h.id * 7}`],
                            ['Software', `${h.software}`],
                            ['Versão instalada', h.version],
                            ['Data de início', `${h.date} ${h.time}`],
                            ['Duração total', h.duration],
                            ['Executado por', h.user],
                          ].map(([k, v]) => (
                            <div key={k} className="flex gap-3 text-xs">
                              <span className="text-slate-400 w-32 flex-shrink-0">{k}</span>
                              <span className="text-slate-700 font-medium font-mono">{v}</span>
                            </div>
                          ))}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Log de Execução</div>
                          <div className="bg-slate-900 rounded-lg p-3 log-console max-h-36 overflow-y-auto">
                            {h.result === 'Sucesso' ? (
                              <>
                                <div className="text-slate-400">[{h.time}] Iniciando conexão com {h.machine}...</div>
                                <div className="text-emerald-400">[{h.time}] Conexão estabelecida. Agente respondendo.</div>
                                <div className="text-slate-400">[{h.time}] Download e verificação de integridade concluídos.</div>
                                <div className="text-slate-400">[{h.time}] Executando instalador em modo silencioso...</div>
                                <div className="text-emerald-400">[{h.time}] Instalação concluída com sucesso. Código de saída: 0</div>
                                <div className="text-slate-400">[{h.time}] Registro de instalação atualizado.</div>
                              </>
                            ) : h.result === 'Falha' ? (
                              <>
                                <div className="text-slate-400">[{h.time}] Iniciando conexão com {h.machine}...</div>
                                <div className="text-amber-400">[{h.time}] Aviso: Resposta do agente lenta.</div>
                                <div className="text-red-400">[{h.time}] ERRO: Timeout após 30 segundos de espera.</div>
                                <div className="text-red-400">[{h.time}] Implantação cancelada. Registrando falha.</div>
                              </>
                            ) : (
                              <>
                                <div className="text-slate-400">[{h.time}] Iniciando implantação...</div>
                                <div className="text-amber-400">[{h.time}] Implantação cancelada pelo usuário {h.user}.</div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-slate-50">
          <span className="text-xs text-slate-500">
            Mostrando {Math.min((page - 1) * perPage + 1, filtered.length)}–{Math.min(page * perPage, filtered.length)} de {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-600 disabled:opacity-40 hover:bg-slate-50"
            >
              ← Anterior
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-7 text-xs rounded-lg border ${p === page ? 'bg-blue-700 text-white border-blue-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                {p}
              </button>
            ))}
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-600 disabled:opacity-40 hover:bg-slate-50"
            >
              Próxima →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
