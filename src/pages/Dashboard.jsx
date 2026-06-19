import { useNavigate } from 'react-router-dom';
import {
  Monitor, CheckCircle, XCircle, Clock, TrendingUp, TrendingDown,
  Activity, Package, PlusCircle, ArrowRight, Wifi, WifiOff,
  RefreshCw, AlertTriangle, Server, Cpu, MemoryStick, HardDrive
} from 'lucide-react';

const statCards = [
  {
    title: 'Máquinas Disponíveis',
    value: '147',
    sub: 'de 163 cadastradas',
    icon: Monitor,
    color: 'bg-blue-50 text-blue-700',
    iconBg: 'bg-blue-100',
    trend: '+3 esta semana',
    trendUp: true,
  },
  {
    title: 'Máquinas Online',
    value: '132',
    sub: '89.8% de disponibilidade',
    icon: Wifi,
    color: 'bg-emerald-50 text-emerald-700',
    iconBg: 'bg-emerald-100',
    trend: '↑ 2.1% vs ontem',
    trendUp: true,
  },
  {
    title: 'Instalações Ativas',
    value: '7',
    sub: 'em andamento agora',
    icon: Activity,
    color: 'bg-orange-50 text-orange-700',
    iconBg: 'bg-orange-100',
    trend: '3 aguardando',
    trendUp: null,
  },
  {
    title: 'Concluídas Hoje',
    value: '34',
    sub: 'implantações bem-sucedidas',
    icon: CheckCircle,
    color: 'bg-green-50 text-green-700',
    iconBg: 'bg-green-100',
    trend: '+12 vs ontem',
    trendUp: true,
  },
  {
    title: 'Falhas Hoje',
    value: '2',
    sub: '5.5% taxa de falha',
    icon: XCircle,
    color: 'bg-red-50 text-red-700',
    iconBg: 'bg-red-100',
    trend: '↓ melhor que ontem',
    trendUp: false,
  },
];

const recentActivities = [
  { type: 'success', icon: CheckCircle, msg: 'Google Chrome 120.0 instalado em WS-FIN-001', time: '2 min atrás', user: 'C. Lima', color: 'text-green-600' },
  { type: 'success', icon: CheckCircle, msg: '7-Zip 23.01 implantado em 8 máquinas — Setor RH', time: '18 min atrás', user: 'M. Santos', color: 'text-green-600' },
  { type: 'error', icon: XCircle, msg: 'Falha ao instalar Microsoft Teams em WS-ADM-041 — timeout', time: '31 min atrás', user: 'C. Lima', color: 'text-red-600' },
  { type: 'info', icon: Package, msg: 'VLC Media Player 3.0.20 adicionado ao catálogo', time: '1h 12min atrás', user: 'Admin', color: 'text-blue-600' },
  { type: 'success', icon: CheckCircle, msg: 'Notepad++ 8.6.1 instalado em WS-TI-015', time: '2h 05min atrás', user: 'C. Lima', color: 'text-green-600' },
  { type: 'warning', icon: AlertTriangle, msg: 'WS-OPS-033 — último contato há mais de 48 horas', time: '2h 40min atrás', user: 'Sistema', color: 'text-amber-600' },
  { type: 'success', icon: CheckCircle, msg: 'Mozilla Firefox 121.0 atualizado em 15 máquinas', time: '3h 15min atrás', user: 'M. Santos', color: 'text-green-600' },
];

const latestDeployments = [
  { name: 'Google Chrome', version: '120.0.6099', machines: 14, status: 'Concluído', date: '13/06 08:42', success: 14, fail: 0 },
  { name: '7-Zip', version: '23.01', machines: 8, status: 'Concluído', date: '13/06 08:21', success: 8, fail: 0 },
  { name: 'Microsoft Teams', version: '1.6.00', machines: 12, status: 'Parcial', date: '13/06 07:55', success: 11, fail: 1 },
  { name: 'VLC Media Player', version: '3.0.20', machines: 6, status: 'Em andamento', date: '13/06 09:10', success: 4, fail: 0 },
  { name: 'Mozilla Firefox', version: '121.0', machines: 15, status: 'Concluído', date: '12/06 17:30', success: 15, fail: 0 },
];

const systemHealth = [
  { label: 'Servidor de Deploy', status: 'Operacional', ok: true },
  { label: 'Serviço de Agentes', status: 'Operacional', ok: true },
  { label: 'Banco de Tarefas', status: 'Operacional', ok: true },
  { label: 'Monitoramento', status: 'Operacional', ok: true },
  { label: 'Autenticação AD', status: 'Atenção', ok: false },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="stat-card bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg ${card.iconBg} flex items-center justify-center`}>
                  <Icon size={18} className={card.color.split(' ')[1]} />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-0.5">{card.value}</div>
              <div className="text-xs font-medium text-slate-600 mb-1">{card.title}</div>
              <div className="text-xs text-slate-400">{card.sub}</div>
              {card.trend && (
                <div className={`mt-2 text-xs font-medium flex items-center gap-1 ${card.trendUp === true ? 'text-emerald-600' : card.trendUp === false ? 'text-emerald-600' : 'text-slate-500'}`}>
                  {card.trendUp === true && <TrendingUp size={11} />}
                  {card.trend}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800 text-sm">Atividade Recente</h3>
            <button className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1">
              Ver tudo <ArrowRight size={12} />
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {recentActivities.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className="flex items-start gap-3 px-5 py-3 hover:bg-slate-50/70 transition-colors">
                  <Icon size={15} className={`${a.color} mt-0.5 flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-700 leading-snug">{a.msg}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-400">{a.time}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs text-slate-400">{a.user}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="font-semibold text-slate-800 text-sm mb-3">Ações Rápidas</h3>
            <div className="space-y-2">
              <button onClick={() => navigate('/new-installation')} className="w-full flex items-center gap-3 px-3 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-sm font-medium transition-colors">
                <PlusCircle size={16} />
                Nova Instalação
              </button>
              <button onClick={() => navigate('/machines')} className="w-full flex items-center gap-3 px-3 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-sm font-medium border border-slate-200 transition-colors">
                <Monitor size={16} />
                Gerenciar Máquinas
              </button>
              <button onClick={() => navigate('/monitoring')} className="w-full flex items-center gap-3 px-3 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-sm font-medium border border-slate-200 transition-colors">
                <Activity size={16} />
                Ver Monitoramento
              </button>
              <button onClick={() => navigate('/software')} className="w-full flex items-center gap-3 px-3 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-sm font-medium border border-slate-200 transition-colors">
                <Package size={16} />
                Catálogo de Software
              </button>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-slate-800 text-sm">Status do Sistema</h3>
              <RefreshCw size={13} className="text-slate-400 cursor-pointer hover:text-slate-600" />
            </div>
            <div className="space-y-2">
              {systemHealth.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.ok ? 'bg-emerald-500 status-pulse' : 'bg-amber-500'}`}></div>
                    <span className="text-xs text-slate-600">{item.label}</span>
                  </div>
                  <span className={`text-xs font-medium ${item.ok ? 'text-emerald-600' : 'text-amber-600'}`}>{item.status}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Última verificação</span>
                <span className="text-xs text-slate-400">há 2 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Deployments table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800 text-sm">Últimas Implantações</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Taxa de sucesso hoje:</span>
            <span className="text-xs font-bold text-emerald-600">94.5%</span>
            <button onClick={() => navigate('/history')} className="ml-2 text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1">
              Histórico completo <ArrowRight size={12} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left font-semibold text-slate-500 uppercase tracking-wider px-5 py-2.5">Software</th>
                <th className="text-left font-semibold text-slate-500 uppercase tracking-wider px-5 py-2.5">Versão</th>
                <th className="text-left font-semibold text-slate-500 uppercase tracking-wider px-5 py-2.5">Máquinas</th>
                <th className="text-left font-semibold text-slate-500 uppercase tracking-wider px-5 py-2.5">Sucesso/Falha</th>
                <th className="text-left font-semibold text-slate-500 uppercase tracking-wider px-5 py-2.5">Status</th>
                <th className="text-left font-semibold text-slate-500 uppercase tracking-wider px-5 py-2.5">Data/Hora</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {latestDeployments.map((d, i) => (
                <tr key={i} className="table-row-hover cursor-pointer">
                  <td className="px-5 py-3 font-medium text-slate-800">{d.name}</td>
                  <td className="px-5 py-3 text-slate-500 font-mono">{d.version}</td>
                  <td className="px-5 py-3 text-slate-600">{d.machines}</td>
                  <td className="px-5 py-3">
                    <span className="text-emerald-600 font-medium">{d.success}</span>
                    <span className="text-slate-300 mx-1">/</span>
                    <span className={d.fail > 0 ? 'text-red-500 font-medium' : 'text-slate-400'}>{d.fail}</span>
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={d.status} />
                  </td>
                  <td className="px-5 py-3 text-slate-500">{d.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    'Concluído': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    'Em andamento': 'bg-blue-50 text-blue-700 border border-blue-200',
    'Parcial': 'bg-amber-50 text-amber-700 border border-amber-200',
    'Falha': 'bg-red-50 text-red-700 border border-red-200',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${map[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  );
}
