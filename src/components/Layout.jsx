import { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Monitor, Package, PlusCircle,
  Activity, History, Bell, Search, ChevronDown,
  LogOut, Settings, User, Shield, HelpCircle,
  Menu, X
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/machines', icon: Monitor, label: 'Máquinas' },
  { to: '/software', icon: Package, label: 'Catálogo de Software' },
  { to: '/new-installation', icon: PlusCircle, label: 'Nova Instalação' },
  { to: '/monitoring', icon: Activity, label: 'Monitoramento' },
  { to: '/history', icon: History, label: 'Histórico' },
];

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const pageTitles = {
    '/dashboard': 'Dashboard',
    '/machines': 'Gerenciamento de Máquinas',
    '/software': 'Catálogo de Software',
    '/new-installation': 'Nova Instalação',
    '/monitoring': 'Monitoramento',
    '/history': 'Histórico de Instalações',
  };

  const currentTitle = pageTitles[location.pathname] || 'Remote Software Deployer';

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      {/* Sidebar */}
      <aside
        className={`sidebar-scroll flex flex-col bg-slate-900 text-slate-300 transition-all duration-300 overflow-y-auto overflow-x-hidden flex-shrink-0 ${sidebarOpen ? 'w-64' : 'w-16'}`}
        style={{ minHeight: '100vh' }}
      >
        {/* Logo area */}
        <div className="flex items-center h-16 px-4 border-b border-slate-700 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield size={18} className="text-white" />
            </div>
            {sidebarOpen && (
              <div className="min-w-0">
                <div className="text-sm font-semibold text-white leading-tight truncate">Remote Software</div>
                <div className="text-xs text-slate-400 leading-tight truncate">Deployer</div>
              </div>
            )}
          </div>
        </div>

        {/* Organization label */}
        {sidebarOpen && (
          <div className="px-4 py-3 border-b border-slate-700">
            <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">Organização</div>
            <div className="text-xs text-slate-300 mt-1 font-medium">Prefeitura de Joinville</div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {!sidebarOpen && <div className="border-b border-slate-700 mb-3" />}
          {sidebarOpen && (
            <div className="px-3 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Menu Principal</span>
            </div>
          )}
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-blue-700 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`
              }
              title={!sidebarOpen ? label : undefined}
            >
              <Icon size={18} className="flex-shrink-0" />
              {sidebarOpen && <span className="truncate">{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-slate-700 p-2 space-y-1">
          <NavLink
            to="#"
            className="nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <Settings size={18} className="flex-shrink-0" />
            {sidebarOpen && <span>Configurações</span>}
          </NavLink>
          <NavLink
            to="#"
            className="nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <HelpCircle size={18} className="flex-shrink-0" />
            {sidebarOpen && <span>Ajuda & Suporte</span>}
          </NavLink>
          <button
            onClick={() => navigate('/login')}
            className="nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-900/40 hover:text-red-400"
          >
            <LogOut size={18} className="flex-shrink-0" />
            {sidebarOpen && <span>Sair</span>}
          </button>
        </div>

        {/* Toggle button area */}
        <div className="border-t border-slate-700 p-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-lg text-slate-500 hover:bg-slate-800 hover:text-white transition-colors"
            title={sidebarOpen ? 'Recolher menu' : 'Expandir menu'}
          >
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-base font-semibold text-slate-800">{currentTitle}</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Busca global..."
                className="pl-9 pr-4 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg w-52 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => { setNotifOpen(!notifOpen); setUserMenuOpen(false); }}
                className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-lg z-50">
                  <div className="p-3 border-b border-slate-100">
                    <h3 className="text-sm font-semibold text-slate-800">Notificações</h3>
                  </div>
                  {[
                    { msg: 'Instalação do Chrome concluída em 12 máquinas', time: '2 min atrás', color: 'bg-green-500' },
                    { msg: 'Falha na instalação do Teams em WS-ADM-041', time: '15 min atrás', color: 'bg-red-500' },
                    { msg: 'Nova versão do 7-Zip disponível no catálogo', time: '1 hora atrás', color: 'bg-blue-500' },
                    { msg: 'Máquina WS-FIN-022 está offline', time: '2 horas atrás', color: 'bg-yellow-500' },
                  ].map((n, i) => (
                    <div key={i} className="p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50 flex items-start gap-3">
                      <div className={`w-2 h-2 ${n.color} rounded-full mt-1.5 flex-shrink-0`}></div>
                      <div>
                        <p className="text-xs text-slate-700">{n.msg}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                  <div className="p-2">
                    <button className="w-full text-xs text-blue-600 hover:text-blue-700 py-1">Ver todas as notificações</button>
                  </div>
                </div>
              )}
            </div>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => { setUserMenuOpen(!userMenuOpen); setNotifOpen(false); }}
                className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-slate-100"
              >
                <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white text-sm font-semibold">
                  CL
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-xs font-medium text-slate-800 leading-tight">Rebeca Lara</div>
                  <div className="text-xs text-slate-500 leading-tight">Analista de TI</div>
                </div>
                <ChevronDown size={14} className="text-slate-400 hidden md:block" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-lg z-50">
                  <div className="p-3 border-b border-slate-100">
                    <p className="text-sm font-medium text-slate-800">Rebeca Lara</p>
                    <p className="text-xs text-slate-500">rebeca.lara@joinville.sc.gov.br</p>
                  </div>
                  <div className="p-1">
                    <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"><User size={15} /> Meu Perfil</button>
                    <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"><Settings size={15} /> Configurações</button>
                    <hr className="my-1 border-slate-100" />
                    <button onClick={() => navigate('/login')} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"><LogOut size={15} /> Sair</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
