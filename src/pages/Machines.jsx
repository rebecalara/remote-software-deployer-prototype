import { useState } from 'react';
import {
  Search, Filter, Monitor, Wifi, WifiOff, Clock, X,
  ChevronDown, RefreshCw, Download, Cpu, MemoryStick,
  HardDrive, Package, AlertTriangle, CheckCircle, Activity,
  MoreHorizontal, SlidersHorizontal
} from 'lucide-react';

const machines = [
  { id: 1, name: 'WS-ADM-001', ip: '10.1.1.10', os: 'Windows 11 Pro', dept: 'Administração', status: 'Online', lastContact: 'Agora', cpu: 12, ram: 45, disk: 67 },
  { id: 2, name: 'WS-ADM-002', ip: '10.1.1.11', os: 'Windows 11 Pro', dept: 'Administração', status: 'Online', lastContact: '1 min atrás', cpu: 34, ram: 62, disk: 41 },
  { id: 3, name: 'WS-ADM-041', ip: '10.1.1.50', os: 'Windows 10 Pro', dept: 'Administração', status: 'Ocupado', lastContact: '3 min atrás', cpu: 88, ram: 78, disk: 55 },
  { id: 4, name: 'WS-FIN-001', ip: '10.1.2.10', os: 'Windows 11 Pro', dept: 'Financeiro', status: 'Online', lastContact: '2 min atrás', cpu: 21, ram: 38, disk: 72 },
  { id: 5, name: 'WS-FIN-002', ip: '10.1.2.11', os: 'Windows 11 Pro', dept: 'Financeiro', status: 'Online', lastContact: 'Agora', cpu: 5, ram: 28, disk: 43 },
  { id: 6, name: 'WS-FIN-022', ip: '10.1.2.31', os: 'Windows 10 Pro', dept: 'Financeiro', status: 'Offline', lastContact: '2h atrás', cpu: 0, ram: 0, disk: 0 },
  { id: 7, name: 'WS-RH-005', ip: '10.1.3.15', os: 'Windows 11 Pro', dept: 'Recursos Humanos', status: 'Online', lastContact: '5 min atrás', cpu: 15, ram: 52, disk: 60 },
  { id: 8, name: 'WS-RH-008', ip: '10.1.3.18', os: 'Windows 11 Pro', dept: 'Recursos Humanos', status: 'Online', lastContact: '1 min atrás', cpu: 9, ram: 33, disk: 29 },
  { id: 9, name: 'WS-TI-015', ip: '10.1.4.25', os: 'Windows 11 Pro', dept: 'Tecnologia da Informação', status: 'Online', lastContact: 'Agora', cpu: 41, ram: 67, disk: 80 },
  { id: 10, name: 'WS-OPS-033', ip: '10.1.5.43', os: 'Windows 10 Pro', dept: 'Operações', status: 'Offline', lastContact: '2 dias atrás', cpu: 0, ram: 0, disk: 0 },
  { id: 11, name: 'WS-JUR-003', ip: '10.1.6.13', os: 'Windows 11 Pro', dept: 'Jurídico', status: 'Online', lastContact: '4 min atrás', cpu: 7, ram: 40, disk: 35 },
  { id: 12, name: 'WS-SAU-010', ip: '10.1.7.20', os: 'Windows 11 Pro', dept: 'Saúde', status: 'Ocupado', lastContact: '2 min atrás', cpu: 75, ram: 81, disk: 48 },
  { id: 13, name: 'WS-EDU-007', ip: '10.1.8.17', os: 'Windows 10 Pro', dept: 'Educação', status: 'Online', lastContact: '8 min atrás', cpu: 18, ram: 44, disk: 53 },
  { id: 14, name: 'WS-URB-002', ip: '10.1.9.12', os: 'Windows 11 Pro', dept: 'Urbanismo', status: 'Online', lastContact: '3 min atrás', cpu: 23, ram: 36, disk: 62 },
  { id: 15, name: 'WS-COM-015', ip: '10.1.10.25', os: 'Windows 11 Pro', dept: 'Comunicação', status: 'Online', lastContact: 'Agora', cpu: 11, ram: 30, disk: 40 },
];

const depts = ['Todos', 'Administração', 'Financeiro', 'Recursos Humanos', 'Tecnologia da Informação', 'Operações', 'Jurídico', 'Saúde', 'Educação', 'Urbanismo', 'Comunicação'];
const statuses = ['Todos', 'Online', 'Offline', 'Ocupado'];

function StatusBadge({ status }) {
  const map = {
    Online: { class: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
    Offline: { class: 'bg-slate-100 text-slate-600 border-slate-200', dot: 'bg-slate-400' },
    Ocupado: { class: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  };
  const s = map[status] || map.Offline;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-xs font-medium ${s.class}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot} ${status === 'Online' ? 'status-pulse' : ''}`}></span>
      {status}
    </span>
  );
}

function MiniBar({ value, color }) {
  if (value === 0) return <span className="text-xs text-slate-300">—</span>;
  const barColor = value > 80 ? 'bg-red-500' : value > 60 ? 'bg-amber-500' : 'bg-emerald-500';
  return (
    <div className="flex items-center gap-2">
      <div className="w-14 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${value}%` }}></div>
      </div>
      <span className="text-xs text-slate-500 w-7">{value}%</span>
    </div>
  );
}

export default function Machines() {
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('Todos');
  const [status, setStatus] = useState('Todos');
  const [selected, setSelected] = useState([]);
  const [detail, setDetail] = useState(null);

  const filtered = machines.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.ip.includes(search) ||
      m.dept.toLowerCase().includes(search.toLowerCase());
    const matchDept = dept === 'Todos' || m.dept === dept;
    const matchStatus = status === 'Todos' || m.status === status;
    return matchSearch && matchDept && matchStatus;
  });

  const toggleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };
  const toggleAll = () => {
    setSelected(selected.length === filtered.length ? [] : filtered.map(m => m.id));
  };

  return (
    <div className="p-6 flex gap-6 h-full">
      {/* Main panel */}
      <div className={`flex-1 min-w-0 flex flex-col gap-4 ${detail ? 'max-w-[calc(100%-320px)]' : ''}`}>
        {/* Header row */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nome, IP ou departamento..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={dept}
              onChange={e => setDept(e.target.value)}
              className="py-2 px-3 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
            >
              {depts.map(d => <option key={d} value={d}>{d === 'Todos' ? 'Todos os Setores' : d}</option>)}
            </select>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="py-2 px-3 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
            >
              {statuses.map(s => <option key={s} value={s}>{s === 'Todos' ? 'Todos os Status' : s}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            {selected.length > 0 && (
              <span className="text-xs text-blue-700 font-medium bg-blue-50 border border-blue-200 px-2 py-1 rounded-lg">
                {selected.length} selecionada(s)
              </span>
            )}
            <button className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
              <RefreshCw size={14} /> Atualizar
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
              <Download size={14} /> Exportar
            </button>
          </div>
        </div>

        {/* Summary badges */}
        <div className="flex items-center gap-3 flex-wrap">
          {[
            { label: 'Online', count: machines.filter(m => m.status === 'Online').length, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
            { label: 'Offline', count: machines.filter(m => m.status === 'Offline').length, color: 'text-slate-600 bg-slate-100 border-slate-200' },
            { label: 'Ocupado', count: machines.filter(m => m.status === 'Ocupado').length, color: 'text-amber-600 bg-amber-50 border-amber-200' },
          ].map((b, i) => (
            <span key={i} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-medium ${b.color}`}>
              {b.label}: <strong>{b.count}</strong>
            </span>
          ))}
          <span className="text-xs text-slate-400">| Mostrando {filtered.length} de {machines.length} máquinas</span>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-1">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-3 text-left">
                    <input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={toggleAll} />
                  </th>
                  {['Nome', 'Endereço IP', 'Sistema Operacional', 'Departamento', 'CPU', 'RAM', 'Status', 'Último Contato', ''].map((h, i) => (
                    <th key={i} className="px-4 py-3 text-left font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((m) => (
                  <tr
                    key={m.id}
                    className={`table-row-hover cursor-pointer ${selected.includes(m.id) ? 'bg-blue-50' : ''} ${detail?.id === m.id ? 'bg-blue-50 border-l-2 border-blue-600' : ''}`}
                    onClick={() => setDetail(detail?.id === m.id ? null : m)}
                  >
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      <input type="checkbox" checked={selected.includes(m.id)} onChange={() => toggleSelect(m.id)} />
                    </td>
                    <td className="px-4 py-3 font-mono font-semibold text-slate-800">{m.name}</td>
                    <td className="px-4 py-3 font-mono text-slate-500">{m.ip}</td>
                    <td className="px-4 py-3 text-slate-600">{m.os}</td>
                    <td className="px-4 py-3 text-slate-600">{m.dept}</td>
                    <td className="px-4 py-3"><MiniBar value={m.cpu} /></td>
                    <td className="px-4 py-3"><MiniBar value={m.ram} /></td>
                    <td className="px-4 py-3"><StatusBadge status={m.status} /></td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{m.lastContact}</td>
                    <td className="px-4 py-3">
                      <button className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600" onClick={e => { e.stopPropagation(); }}>
                        <MoreHorizontal size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Side panel */}
      {detail && (
        <div className="w-80 flex-shrink-0 bg-white rounded-xl border border-slate-200 shadow-sm h-fit sticky top-0">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800 text-sm">Detalhes da Máquina</h3>
            <button onClick={() => setDetail(null)} className="p-1 rounded hover:bg-slate-100 text-slate-400">
              <X size={16} />
            </button>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                <Monitor size={20} className="text-slate-600" />
              </div>
              <div>
                <div className="font-mono font-bold text-slate-900">{detail.name}</div>
                <StatusBadge status={detail.status} />
              </div>
            </div>

            <div className="space-y-2">
              {[
                ['Endereço IP', detail.ip],
                ['Sistema Operacional', detail.os],
                ['Departamento', detail.dept],
                ['Último Contato', detail.lastContact],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-xs">
                  <span className="text-slate-500">{k}</span>
                  <span className="font-medium text-slate-700 text-right max-w-40">{v}</span>
                </div>
              ))}
            </div>

            {detail.status !== 'Offline' && (
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Recursos</div>
                {[
                  { label: 'CPU', value: detail.cpu, icon: Cpu },
                  { label: 'RAM', value: detail.ram, icon: MemoryStick },
                  { label: 'Disco', value: detail.disk, icon: HardDrive },
                ].map(({ label, value, icon: Icon }) => {
                  const color = value > 80 ? 'bg-red-500' : value > 60 ? 'bg-amber-500' : 'bg-emerald-500';
                  return (
                    <div key={label}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5 text-xs text-slate-600"><Icon size={12} />{label}</div>
                        <span className="text-xs font-medium text-slate-700">{value}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full">
                        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Software Instalado</div>
              {['Google Chrome 120.0', 'Microsoft Teams 1.6', 'Adobe Reader 23.0', '7-Zip 23.01'].map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                  <Package size={11} className="text-slate-400" />
                  {s}
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-2">
              <button className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-lg transition-colors">
                Iniciar Implantação
              </button>
              <button className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors">
                Ver Histórico
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
