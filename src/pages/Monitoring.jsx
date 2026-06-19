import { useState, Fragment } from 'react';
import {
  Activity, CheckCircle, XCircle, Clock, RefreshCw,
  Monitor, Package, ChevronDown, ChevronUp, Terminal,
  AlertTriangle, Pause, StopCircle
} from 'lucide-react';

const activeDeployments = [
  {
    id: 1,
    machine: 'WS-FIN-001',
    software: 'Google Chrome 120.0',
    progress: 85,
    status: 'Instalando',
    startTime: '09:12:34',
    elapsed: '1m 42s',
    user: 'C. Lima',
    dept: 'Financeiro',
    step: 'Configurando entradas de registro...',
    logs: [
      '[09:12:34] Iniciando conexão com WS-FIN-001...',
      '[09:12:36] Conexão estabelecida. Agente v1.6 respondendo.',
      '[09:12:37] Verificando pré-requisitos do sistema...',
      '[09:12:38] Pré-requisitos OK. Iniciando download do pacote.',
      '[09:12:41] Download concluído: GoogleChromeSetup.exe (89 MB)',
      '[09:12:42] Verificando integridade do arquivo (SHA256)... OK',
      '[09:12:43] Executando instalador em modo silencioso...',
      '[09:13:10] Progresso: 45% — Extraindo arquivos...',
      '[09:13:45] Progresso: 72% — Instalando componentes...',
      '[09:14:10] Progresso: 85% — Configurando entradas de registro...',
    ],
  },
  {
    id: 2,
    machine: 'WS-RH-005',
    software: 'VLC Media Player 3.0.20',
    progress: 52,
    status: 'Instalando',
    startTime: '09:13:10',
    elapsed: '1m 06s',
    user: 'C. Lima',
    dept: 'Recursos Humanos',
    step: 'Instalando componentes de codec...',
    logs: [
      '[09:13:10] Iniciando conexão com WS-RH-005...',
      '[09:13:12] Conexão estabelecida.',
      '[09:13:14] Download: vlc-3.0.20-win64.exe (45 MB)',
      '[09:13:28] Verificação de integridade... OK',
      '[09:13:29] Executando instalador...',
      '[09:14:01] Progresso: 52% — Instalando componentes de codec...',
    ],
  },
  {
    id: 3,
    machine: 'WS-TI-015',
    software: 'Notepad++ 8.6.1',
    progress: 100,
    status: 'Concluído',
    startTime: '09:10:00',
    elapsed: '0m 48s',
    user: 'C. Lima',
    dept: 'TI',
    step: 'Instalação concluída com sucesso.',
    logs: [
      '[09:10:00] Iniciando conexão com WS-TI-015...',
      '[09:10:02] Download: npp.8.6.1.Installer.x64.exe (4 MB)',
      '[09:10:08] Instalação concluída com sucesso.',
      '[09:10:08] Atalhos criados. Sem reinicialização necessária.',
    ],
  },
  {
    id: 4,
    machine: 'WS-ADM-041',
    software: 'Microsoft Teams 1.6.00',
    progress: 23,
    status: 'Falhou',
    startTime: '09:08:55',
    elapsed: '2m 10s',
    user: 'C. Lima',
    dept: 'Administração',
    step: 'ERRO: Timeout na conexão com o agente remoto.',
    logs: [
      '[09:08:55] Iniciando conexão com WS-ADM-041...',
      '[09:08:58] Aguardando resposta do agente...',
      '[09:09:30] Tentativa 1/3 — Timeout após 30s.',
      '[09:10:00] Tentativa 2/3 — Timeout após 30s.',
      '[09:10:30] Tentativa 3/3 — Timeout após 30s.',
      '[09:11:05] ERRO FATAL: Não foi possível estabelecer conexão com o agente.',
      '[09:11:05] Causa provável: máquina inacessível ou agente não está em execução.',
      '[09:11:05] Implantação cancelada. Registrando falha.',
    ],
  },
  {
    id: 5,
    machine: 'WS-JUR-003',
    software: 'Adobe Acrobat Reader 23.008',
    progress: 68,
    status: 'Instalando',
    startTime: '09:13:55',
    elapsed: '0m 21s',
    user: 'M. Santos',
    dept: 'Jurídico',
    step: 'Baixando pacote de instalação...',
    logs: [
      '[09:13:55] Iniciando conexão com WS-JUR-003...',
      '[09:13:57] Conexão OK. Iniciando download.',
      '[09:14:08] Baixando AcroRdrDCx6423008.exe (311 MB)... 68%',
    ],
  },
  {
    id: 6,
    machine: 'WS-COM-015',
    software: 'Google Chrome 120.0',
    progress: 100,
    status: 'Concluído',
    startTime: '09:09:20',
    elapsed: '1m 15s',
    user: 'C. Lima',
    dept: 'Comunicação',
    step: 'Instalação concluída com sucesso.',
    logs: [
      '[09:09:20] Download e instalação concluídos com sucesso em WS-COM-015.',
    ],
  },
];

const deployStats = { total: 6, running: 3, done: 2, failed: 1 };

function ProgressBar({ value, status }) {
  const color = status === 'Falhou' ? 'bg-red-500' : status === 'Concluído' ? 'bg-emerald-500' : 'bg-blue-600';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color} ${status === 'Instalando' ? 'progress-active' : ''}`} style={{ width: `${value}%` }}></div>
      </div>
      <span className="text-xs font-medium text-slate-600 w-8 text-right">{value}%</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    Instalando: { class: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
    Concluído: { class: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
    Falhou: { class: 'bg-red-50 text-red-700 border-red-200', dot: 'bg-red-500' },
    Aguardando: { class: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  };
  const s = map[status] || map.Aguardando;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-xs font-medium ${s.class}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot} ${status === 'Instalando' ? 'status-pulse' : ''}`}></span>
      {status}
    </span>
  );
}

export default function Monitoring() {
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState('Todos');

  const filtered = filter === 'Todos' ? activeDeployments :
    activeDeployments.filter(d => d.status === filter);

  return (
    <div className="p-6 space-y-5">
      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Ativas', value: deployStats.total, icon: Activity, color: 'text-blue-700 bg-blue-50 border-blue-200' },
          { label: 'Em Andamento', value: deployStats.running, icon: RefreshCw, color: 'text-blue-700 bg-blue-50 border-blue-200' },
          { label: 'Concluídas', value: deployStats.done, icon: CheckCircle, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
          { label: 'Com Falha', value: deployStats.failed, icon: XCircle, color: 'text-red-700 bg-red-50 border-red-200' },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className={`bg-white rounded-xl border ${s.color.split(' ')[2]} shadow-sm p-4 flex items-center gap-3`}>
              <div className={`w-9 h-9 rounded-lg ${s.color.split(' ')[1]} flex items-center justify-center`}>
                <Icon size={18} className={s.color.split(' ')[0]} />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{s.value}</div>
                <div className="text-xs text-slate-500 font-medium">{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-0">
        {['Todos', 'Instalando', 'Concluído', 'Falhou'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`pb-2.5 px-1 text-sm font-medium border-b-2 transition-colors ${filter === f ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            {f}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 status-pulse"></span>
            Monitoramento ao vivo
          </div>
          <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Deployments table with expandable logs */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {['', 'Máquina', 'Software', 'Departamento', 'Progresso', 'Status', 'Início', 'Tempo Decorrido', 'Usuário', 'Ações'].map((h, i) => (
                <th key={i} className="px-4 py-3 text-left font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((d) => (
              <Fragment key={d.id}>
                <tr
                  className={`table-row-hover cursor-pointer border-b border-slate-50 ${expanded === d.id ? 'bg-slate-50' : ''}`}
                  onClick={() => setExpanded(expanded === d.id ? null : d.id)}
                >
                  <td className="px-4 py-3">
                    {expanded === d.id ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
                  </td>
                  <td className="px-4 py-3 font-mono font-semibold text-slate-800">{d.machine}</td>
                  <td className="px-4 py-3 text-slate-700">{d.software}</td>
                  <td className="px-4 py-3 text-slate-500">{d.dept}</td>
                  <td className="px-4 py-3 w-40"><ProgressBar value={d.progress} status={d.status} /></td>
                  <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                  <td className="px-4 py-3 font-mono text-slate-500">{d.startTime}</td>
                  <td className="px-4 py-3 text-slate-500">{d.elapsed}</td>
                  <td className="px-4 py-3 text-slate-500">{d.user}</td>
                  <td className="px-4 py-3">
                    {d.status === 'Instalando' && (
                      <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                        <button className="p-1 rounded hover:bg-amber-50 text-slate-400 hover:text-amber-600" title="Pausar">
                          <Pause size={13} />
                        </button>
                        <button className="p-1 rounded hover:bg-red-50 text-slate-400 hover:text-red-500" title="Cancelar">
                          <StopCircle size={13} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
                {expanded === d.id && (
                  <tr className="border-b border-slate-100">
                    <td colSpan={10} className="px-6 py-4 bg-slate-50">
                      <div className="flex items-center gap-2 mb-2">
                        <Terminal size={14} className="text-slate-500" />
                        <span className="text-xs font-semibold text-slate-600">Log de Instalação — {d.machine}</span>
                        <span className="text-xs text-slate-400 ml-1">— {d.step}</span>
                      </div>
                      <div className="bg-slate-900 rounded-lg p-4 log-console max-h-40 overflow-y-auto">
                        {d.logs.map((line, i) => {
                          const isError = line.includes('ERRO') || line.includes('Timeout') || line.includes('cancelada');
                          const isWarn = line.includes('Tentativa');
                          const isOk = line.includes('OK') || line.includes('concluíd') || line.includes('estabelecida');
                          return (
                            <div key={i} className={`${isError ? 'text-red-400' : isWarn ? 'text-amber-400' : isOk ? 'text-emerald-400' : 'text-slate-300'}`}>
                              {line}
                            </div>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
