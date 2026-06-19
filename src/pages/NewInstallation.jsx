import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Monitor, Package, CheckCircle, Play, Search,
  ChevronRight, ChevronLeft, Info, AlertTriangle,
  Globe, Archive, Music, Code, FileText, Shield, Layers, X
} from 'lucide-react';

const allMachines = [
  { id: 1, name: 'WS-ADM-001', ip: '10.1.1.10', os: 'Windows 11 Pro', dept: 'Administração', status: 'Online' },
  { id: 2, name: 'WS-ADM-002', ip: '10.1.1.11', os: 'Windows 11 Pro', dept: 'Administração', status: 'Online' },
  { id: 3, name: 'WS-FIN-001', ip: '10.1.2.10', os: 'Windows 11 Pro', dept: 'Financeiro', status: 'Online' },
  { id: 4, name: 'WS-FIN-002', ip: '10.1.2.11', os: 'Windows 11 Pro', dept: 'Financeiro', status: 'Online' },
  { id: 5, name: 'WS-RH-005', ip: '10.1.3.15', os: 'Windows 11 Pro', dept: 'Recursos Humanos', status: 'Online' },
  { id: 6, name: 'WS-RH-008', ip: '10.1.3.18', os: 'Windows 11 Pro', dept: 'Recursos Humanos', status: 'Online' },
  { id: 7, name: 'WS-TI-015', ip: '10.1.4.25', os: 'Windows 11 Pro', dept: 'TI', status: 'Online' },
  { id: 8, name: 'WS-JUR-003', ip: '10.1.6.13', os: 'Windows 11 Pro', dept: 'Jurídico', status: 'Online' },
  { id: 9, name: 'WS-EDU-007', ip: '10.1.8.17', os: 'Windows 10 Pro', dept: 'Educação', status: 'Online' },
  { id: 10, name: 'WS-URB-002', ip: '10.1.9.12', os: 'Windows 11 Pro', dept: 'Urbanismo', status: 'Online' },
  { id: 11, name: 'WS-COM-015', ip: '10.1.10.25', os: 'Windows 11 Pro', dept: 'Comunicação', status: 'Online' },
  { id: 12, name: 'WS-SAU-010', ip: '10.1.7.20', os: 'Windows 11 Pro', dept: 'Saúde', status: 'Ocupado' },
];

const allSoftware = [
  { id: 1, name: 'Google Chrome', version: '120.0.6099', publisher: 'Google LLC', size: '89 MB', icon: Globe },
  { id: 2, name: 'Mozilla Firefox', version: '121.0', publisher: 'Mozilla Foundation', size: '57 MB', icon: Globe },
  { id: 3, name: '7-Zip', version: '23.01', publisher: 'Igor Pavlov', size: '2 MB', icon: Archive },
  { id: 4, name: 'VLC Media Player', version: '3.0.20', publisher: 'VideoLAN', size: '45 MB', icon: Music },
  { id: 5, name: 'Microsoft Teams', version: '1.6.00', publisher: 'Microsoft', size: '150 MB', icon: Monitor },
  { id: 6, name: 'Notepad++', version: '8.6.1', publisher: 'Don Ho', size: '4 MB', icon: Code },
  { id: 7, name: 'Adobe Acrobat Reader', version: '23.008', publisher: 'Adobe Inc.', size: '311 MB', icon: FileText },
  { id: 8, name: 'LibreOffice', version: '7.6.4', publisher: 'The Document Foundation', size: '370 MB', icon: FileText },
  { id: 9, name: 'Kaspersky Endpoint Security', version: '11.11.0', publisher: 'Kaspersky', size: '260 MB', icon: Shield },
  { id: 10, name: 'GLPI Agent', version: '1.6', publisher: 'Teclib', size: '35 MB', icon: Layers },
];

const steps = [
  { id: 1, label: 'Selecionar Máquinas', icon: Monitor },
  { id: 2, label: 'Selecionar Software', icon: Package },
  { id: 3, label: 'Revisar Instalação', icon: CheckCircle },
  { id: 4, label: 'Executar', icon: Play },
];

function StatusBadge({ status }) {
  const map = {
    Online: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Ocupado: 'bg-amber-50 text-amber-700 border-amber-200',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-medium ${map[status] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1 ${status === 'Online' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
      {status}
    </span>
  );
}

export default function NewInstallation() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [machineSearch, setMachineSearch] = useState('');
  const [softwareSearch, setSoftwareSearch] = useState('');
  const [selectedMachines, setSelectedMachines] = useState([]);
  const [selectedSoftware, setSelectedSoftware] = useState([]);
  const [schedule, setSchedule] = useState('now');
  const [priority, setPriority] = useState('normal');
  const [launched, setLaunched] = useState(false);

  const toggleMachine = (id) => setSelectedMachines(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const toggleSoftware = (id) => setSelectedSoftware(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const filteredMachines = allMachines.filter(m =>
    m.name.toLowerCase().includes(machineSearch.toLowerCase()) ||
    m.dept.toLowerCase().includes(machineSearch.toLowerCase())
  );
  const filteredSoftware = allSoftware.filter(s =>
    s.name.toLowerCase().includes(softwareSearch.toLowerCase()) ||
    s.publisher.toLowerCase().includes(softwareSearch.toLowerCase())
  );

  const canNext = (step === 1 && selectedMachines.length > 0) ||
    (step === 2 && selectedSoftware.length > 0) ||
    step === 3;

  if (launched) {
    return (
      <div className="p-6 flex items-center justify-center" style={{ minHeight: 'calc(100vh - 4rem)' }}>
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={40} className="text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Implantação Iniciada!</h2>
          <p className="text-sm text-slate-500 mb-6">
            A instalação foi enfileirada com sucesso para <strong>{selectedMachines.length} máquina(s)</strong> e <strong>{selectedSoftware.length} software(s)</strong>.
          </p>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 mb-6 text-left space-y-2">
            {selectedSoftware.map(id => {
              const sw = allSoftware.find(s => s.id === id);
              return sw ? (
                <div key={id} className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle size={14} className="text-emerald-500" />
                  {sw.name} {sw.version} → {selectedMachines.length} máquina(s)
                </div>
              ) : null;
            })}
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={() => navigate('/monitoring')} className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-sm font-medium transition-colors">
              Ver Monitoramento
            </button>
            <button onClick={() => { setLaunched(false); setStep(1); setSelectedMachines([]); setSelectedSoftware([]); }} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors">
              Nova Instalação
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Step indicator */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isActive = step === s.id;
            const isDone = step > s.id;
            return (
              <div key={s.id} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 font-bold text-sm transition-colors ${isDone ? 'bg-blue-700 border-blue-700 text-white' : isActive ? 'border-blue-700 text-blue-700 bg-blue-50' : 'border-slate-200 text-slate-400 bg-white'}`}>
                    {isDone ? <CheckCircle size={16} className="text-white" /> : <Icon size={16} />}
                  </div>
                  <div className={`text-xs mt-1.5 font-medium whitespace-nowrap ${isActive ? 'text-blue-700' : isDone ? 'text-slate-600' : 'text-slate-400'}`}>
                    {s.label}
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className={`wizard-step-line mx-3 mb-4 ${isDone ? 'active' : ''}`}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 1: Select Machines */}
      {step === 1 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Selecionar Máquinas de Destino</h2>
            <p className="text-xs text-slate-500 mt-0.5">Selecione as máquinas onde o software será instalado</p>
          </div>
          <div className="p-4 border-b border-slate-100 flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar máquinas..."
                value={machineSearch}
                onChange={e => setMachineSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {selectedMachines.length > 0 && (
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
                {selectedMachines.length} selecionada(s)
              </span>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-4 py-2.5 text-left">
                    <input type="checkbox"
                      checked={selectedMachines.length === filteredMachines.length}
                      onChange={() => setSelectedMachines(selectedMachines.length === filteredMachines.length ? [] : filteredMachines.map(m => m.id))}
                    />
                  </th>
                  {['Nome', 'IP', 'Sistema Operacional', 'Departamento', 'Status'].map(h => (
                    <th key={h} className="px-4 py-2.5 text-left font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredMachines.map(m => (
                  <tr key={m.id} className={`table-row-hover cursor-pointer ${selectedMachines.includes(m.id) ? 'bg-blue-50' : ''}`} onClick={() => toggleMachine(m.id)}>
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}><input type="checkbox" checked={selectedMachines.includes(m.id)} onChange={() => toggleMachine(m.id)} /></td>
                    <td className="px-4 py-3 font-mono font-semibold text-slate-800">{m.name}</td>
                    <td className="px-4 py-3 font-mono text-slate-500">{m.ip}</td>
                    <td className="px-4 py-3 text-slate-600">{m.os}</td>
                    <td className="px-4 py-3 text-slate-600">{m.dept}</td>
                    <td className="px-4 py-3"><StatusBadge status={m.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Step 2: Select Software */}
      {step === 2 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Selecionar Software para Implantar</h2>
            <p className="text-xs text-slate-500 mt-0.5">Escolha um ou mais softwares do catálogo</p>
          </div>
          <div className="p-4 border-b border-slate-100 flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar software..."
                value={softwareSearch}
                onChange={e => setSoftwareSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {selectedSoftware.length > 0 && (
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
                {selectedSoftware.length} selecionado(s)
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4">
            {filteredSoftware.map(s => {
              const Icon = s.icon;
              const sel = selectedSoftware.includes(s.id);
              return (
                <div
                  key={s.id}
                  onClick={() => toggleSoftware(s.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${sel ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${sel ? 'bg-blue-100' : 'bg-slate-100'}`}>
                    <Icon size={18} className={sel ? 'text-blue-700' : 'text-slate-600'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-800">{s.name}</div>
                    <div className="text-xs text-slate-500">{s.version} · {s.publisher} · {s.size}</div>
                  </div>
                  {sel && <CheckCircle size={18} className="text-blue-600 flex-shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-5 py-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900 text-sm">Máquinas Selecionadas ({selectedMachines.length})</h3>
            </div>
            <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
              {selectedMachines.map(id => {
                const m = allMachines.find(x => x.id === id);
                return m ? (
                  <div key={id} className="flex items-center gap-3 p-2 rounded-lg bg-slate-50">
                    <Monitor size={14} className="text-slate-500 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="font-mono text-xs font-semibold text-slate-800">{m.name}</span>
                      <span className="text-xs text-slate-500 ml-2">{m.dept}</span>
                    </div>
                    <StatusBadge status={m.status} />
                  </div>
                ) : null;
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-5 py-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900 text-sm">Software Selecionado ({selectedSoftware.length})</h3>
            </div>
            <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
              {selectedSoftware.map(id => {
                const s = allSoftware.find(x => x.id === id);
                const Icon = s?.icon;
                return s ? (
                  <div key={id} className="flex items-center gap-3 p-2 rounded-lg bg-slate-50">
                    {Icon && <Icon size={14} className="text-slate-500 flex-shrink-0" />}
                    <div className="flex-1">
                      <span className="text-xs font-semibold text-slate-800">{s.name}</span>
                      <span className="text-xs text-slate-500 ml-2">{s.version}</span>
                    </div>
                    <span className="text-xs text-slate-400">{s.size}</span>
                  </div>
                ) : null;
              })}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="font-semibold text-slate-900 text-sm mb-4">Opções de Implantação</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Modo de Execução</label>
                <select value={schedule} onChange={e => setSchedule(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700">
                  <option value="now">Instalação Imediata</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Prioridade</label>
                <select value={priority} onChange={e => setPriority(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700">
                  <option value="low">Baixa</option>
                  <option value="normal">Normal</option>
                  <option value="high">Alta</option>
                  <option value="critical">Crítica</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Reiniciar após instalação</label>
                <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700">
                  <option>Não reiniciar</option>
                  <option>Reiniciar automaticamente</option>
                  <option>Solicitar ao usuário</option>
                </select>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
              <Info size={15} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-blue-700">
                <strong>Resumo:</strong> {selectedSoftware.length} software(s) serão instalados em {selectedMachines.length} máquina(s).
                Total estimado: <strong>{selectedSoftware.reduce((acc, id) => {
                  const sw = allSoftware.find(s => s.id === id);
                  return acc + (sw ? parseInt(sw.size) : 0);
                }, 0)} MB</strong> de download por máquina.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Execute */}
      {step === 4 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play size={32} className="text-blue-700" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Confirmar Implantação</h2>
            <p className="text-sm text-slate-500 mb-5">
              Você está prestes a iniciar a implantação remota. Esta ação irá instalar o software selecionado nas máquinas de destino.
            </p>

            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-left mb-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Máquinas de destino</span>
                <span className="font-semibold text-slate-800">{selectedMachines.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Softwares a instalar</span>
                <span className="font-semibold text-slate-800">{selectedSoftware.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Total de tarefas</span>
                <span className="font-semibold text-slate-800">{selectedMachines.length * selectedSoftware.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Agendamento</span>
                <span className="font-semibold text-slate-800">{schedule === 'now' ? 'Imediato' : 'Agendado'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Prioridade</span>
                <span className="font-semibold text-slate-800 capitalize">{priority}</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2 mb-5 text-left">
              <AlertTriangle size={15} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700">
                Esta ação iniciará instalações remotas imediatamente. Certifique-se de que as máquinas selecionadas estão disponíveis e os usuários foram notificados.
              </p>
            </div>

            <button
              onClick={() => setLaunched(true)}
              className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Play size={16} /> Iniciar Implantação
            </button>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => step > 1 ? setStep(step - 1) : navigate('/dashboard')}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 font-medium"
        >
          <ChevronLeft size={16} />
          {step === 1 ? 'Cancelar' : 'Voltar'}
        </button>
        {step < 4 && (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canNext}
            className="flex items-center gap-2 px-5 py-2 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Próximo <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
