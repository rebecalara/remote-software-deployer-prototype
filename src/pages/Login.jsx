import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, Lock, User, AlertCircle } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Preencha o nome de usuário e a senha.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#f0f4f8' }}>
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 flex-col justify-between p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-900/30"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-800/20"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-blue-700/10 border border-blue-700/20"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Gov logo area */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <div className="text-center">
                <div className="text-xs font-bold text-blue-800 leading-tight">PMJ</div>
                <div className="text-xs text-slate-600 leading-tight">JLLE</div>
              </div>
            </div>
            <div>
              <div className="text-white font-semibold text-sm">Prefeitura Municipal</div>
              <div className="text-blue-300 text-sm">de Joinville</div>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield size={24} className="text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-xl">Remote Software</div>
                <div className="text-blue-300 font-bold text-xl">Deployer</div>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Plataforma centralizada para gerenciamento e implantação remota de software em toda a infraestrutura municipal.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: '🖥️', title: 'Implantação Remota', desc: 'Deploy para múltiplas máquinas simultaneamente' },
              { icon: '📊', title: 'Monitoramento em Tempo Real', desc: 'Acompanhe cada instalação com logs detalhados' },
              { icon: '📋', title: 'Trilha de Auditoria', desc: 'Histórico completo para conformidade e rastreabilidade' },
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="text-lg">{f.icon}</span>
                <div>
                  <div className="text-white text-sm font-medium">{f.title}</div>
                  <div className="text-slate-400 text-xs">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-slate-500 text-xs">
            Sistema desenvolvido para o Departamento de Tecnologia da Informação — Prefeitura de Joinville, SC
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Shield size={20} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-slate-800">Remote Software Deployer</div>
            <div className="text-xs text-slate-500">Prefeitura de Joinville</div>
          </div>
        </div>

        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">Entrar no sistema</h2>
              <p className="text-sm text-slate-500 mt-1">Utilize suas credenciais institucionais</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle size={15} className="text-red-500 flex-shrink-0" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Usuário</label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="usuário ADM"
                    className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-slate-700">Senha</label>
                </div>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="rounded border-slate-300" />
                <label htmlFor="remember" className="text-xs text-slate-600 cursor-pointer">Manter conectado</label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500 text-center">
                Problemas com acesso? Contate o suporte de TI:
              </p>
              <p className="text-xs text-blue-600 text-center mt-0.5">ti@joinville.sc.gov.br</p>
            </div>
          </div>

          {/* Security notice */}
          <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200 flex items-start gap-2">
            <Shield size={14} className="text-slate-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-slate-500 leading-relaxed">
              Acesso restrito a servidores autorizados da Prefeitura de Joinville. Todas as ações são registradas e auditadas.
            </p>
          </div>
        </div>

        <footer className="mt-8 text-center">
          <p className="text-xs text-slate-400">© 2024 Prefeitura Municipal de Joinville · Secretaria de TI</p>
          <p className="text-xs text-slate-400 mt-0.5">Remote Software Deployer v1.0 · Desenvolvido para fins acadêmicos — PAC VII</p>
        </footer>
      </div>
    </div>
  );
}
