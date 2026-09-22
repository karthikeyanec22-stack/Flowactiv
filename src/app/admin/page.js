'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert, ShieldCheck, Power, RefreshCw, Lock, AlertTriangle, CheckCircle2, Server, Globe } from 'lucide-react';

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isOffline, setIsOffline] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(true);
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  // Modal states
  const [showShutdownModal, setShowShutdownModal] = useState(false);
  const [shutdownInput, setShutdownInput] = useState('');
  const [showRecoverModal, setShowRecoverModal] = useState(false);
  const [recoverInput, setRecoverInput] = useState('');

  const fetchStatus = React.useCallback(async (authToken) => {
    try {
      setStatusLoading(true);
      const res = await fetch('/api/admin/status', {
        headers: {
          'x-admin-token': authToken || token
        }
      });
      const data = await res.json();
      if (res.ok) {
        setIsOffline(data.isOffline);
        setLastUpdated(data.lastUpdated);
      }
    } catch (err) {
      console.error('Failed to fetch status', err);
    } finally {
      setStatusLoading(false);
    }
  }, [token]);

  useEffect(() => {
    // Check saved token in localStorage or cookies
    const savedToken = localStorage.getItem('flowactiv_admin_token');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
      fetchStatus(savedToken);
    } else {
      setStatusLoading(false);
    }
  }, [fetchStatus]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('flowactiv_admin_token', data.token);
        setToken(data.token);
        setIsAuthenticated(true);
        fetchStatus(data.token);
      } else {
        setLoginError(data.error || 'Login failed. Please check admin password.');
      }
    } catch (err) {
      setLoginError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('flowactiv_admin_token');
    setIsAuthenticated(false);
    setToken('');
  };

  const executeEmergencyAction = async (action, confirmation) => {
    setActionError('');
    setActionSuccess('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/emergency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token
        },
        body: JSON.stringify({ action, confirmation })
      });
      const data = await res.json();

      if (res.ok) {
        setActionSuccess(data.message);
        setIsOffline(data.isOffline);
        setShowShutdownModal(false);
        setShowRecoverModal(false);
        setShutdownInput('');
        setRecoverInput('');
        fetchStatus(token);
      } else {
        setActionError(data.error || 'Action failed');
      }
    } catch (err) {
      setActionError('Network or server error during execution.');
    } finally {
      setLoading(false);
    }
  };

  // Login view
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
              <Lock className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">FlowActiv Admin Portal</h1>
          <p className="text-slate-400 text-sm text-center mb-6">
            Enter administrator password to access server emergency operations panel.
          </p>

          {loginError && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Authenticate Admin'}
            </button>
          </form>
          <p className="mt-4 text-xs text-slate-500 text-center">
            FlowActiv AWS EC2 Live Deployment Server: 13.234.16.110
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">
              <Server className="w-4 h-4" /> FlowActiv Operations Center
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">Emergency System Control</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchStatus(token)}
              disabled={statusLoading}
              className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 transition-colors"
              title="Refresh Status"
            >
              <RefreshCw className={`w-4 h-4 ${statusLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 text-sm font-medium transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Global Notifications */}
        {actionError && (
          <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-sm">Error Executing Operation</div>
              <div className="text-xs text-red-300 mt-0.5">{actionError}</div>
            </div>
          </div>
        )}

        {actionSuccess && (
          <div className="p-4 bg-emerald-900/30 border border-emerald-500/50 rounded-xl text-emerald-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-sm">Operation Complete</div>
              <div className="text-xs text-emerald-300 mt-0.5">{actionSuccess}</div>
            </div>
          </div>
        )}

        {/* System Status Banner */}
        <div className={`p-6 rounded-2xl border transition-all ${
          isOffline 
            ? 'bg-red-950/40 border-red-800/80 shadow-[0_0_30px_rgba(239,68,68,0.15)]' 
            : 'bg-emerald-950/40 border-emerald-800/80 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl border ${
                isOffline 
                  ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              }`}>
                {isOffline ? <ShieldAlert className="w-8 h-8" /> : <ShieldCheck className="w-8 h-8" />}
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Current Server Status</div>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`text-2xl font-black ${isOffline ? 'text-red-400' : 'text-emerald-400'}`}>
                    {isOffline ? 'EMERGENCY OFFLINE' : 'ONLINE & ACTIVE'}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    isOffline ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}>
                    {isOffline ? 'HTTP 503 Enforced' : 'Public Access Enabled'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {isOffline 
                    ? 'Nginx is actively blocking public traffic to http://13.234.16.110/ with 503 Service Unavailable.' 
                    : 'All public website pages and API endpoints are functioning normally.'}
                </p>
              </div>
            </div>
            <div className="text-right text-xs text-slate-500 shrink-0">
              <div>Last State Change:</div>
              <div className="font-mono text-slate-300 mt-0.5">{lastUpdated ? new Date(lastUpdated).toLocaleString() : 'N/A'}</div>
            </div>
          </div>
        </div>

        {/* Server Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
              <Globe className="w-4 h-4 text-blue-400" /> Target Deployment
            </div>
            <div className="font-mono text-sm font-semibold text-slate-200">13.234.16.110</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
              <Server className="w-4 h-4 text-purple-400" /> Process Manager
            </div>
            <div className="font-mono text-sm font-semibold text-slate-200">PM2 (flowactiv)</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-4 h-4 text-amber-400" /> Server Safety State
            </div>
            <div className="text-sm font-semibold text-emerald-400">EC2 & DB Intact</div>
          </div>
        </div>

        {/* Action Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          
          {/* Emergency Shutdown Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-red-900/50 transition-colors">
            <div>
              <div className="flex items-center gap-2 text-red-400 font-bold text-lg mb-2">
                <Power className="w-5 h-5" /> Emergency Offline Shutdown
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Immediately block public access to <code className="bg-slate-950 px-1.5 py-0.5 rounded text-red-300">http://13.234.16.110/</code> and return HTTP 503 Service Unavailable. The EC2 instance, database, codebase, and backups remain 100% active and preserved.
              </p>
            </div>
            <button
              onClick={() => {
                setShutdownInput('');
                setShowShutdownModal(true);
              }}
              disabled={isOffline || loading}
              className={`w-full py-3.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                isOffline
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20 active:scale-[0.98]'
              }`}
            >
              <Power className="w-5 h-5" />
              {isOffline ? 'System Is Already Offline' : 'ACTIVATE EMERGENCY OFFLINE'}
            </button>
          </div>

          {/* Recovery Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-900/50 transition-colors">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg mb-2">
                <RefreshCw className="w-5 h-5" /> Restore Website & APIs
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Remove the Emergency Offline state file and restore normal Nginx proxying. FlowActiv public pages and API endpoints will immediately resume serving visitor traffic.
              </p>
            </div>
            <button
              onClick={() => {
                setRecoverInput('');
                setShowRecoverModal(true);
              }}
              disabled={!isOffline || loading}
              className={`w-full py-3.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                !isOffline
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 active:scale-[0.98]'
              }`}
            >
              <RefreshCw className="w-5 h-5" />
              {!isOffline ? 'System Is Currently Online' : 'RECOVER WEBSITE & APIS'}
            </button>
          </div>

        </div>

      </div>

      {/* SHUTDOWN CONFIRMATION MODAL */}
      {showShutdownModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-red-500/40 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-red-400">
              <div className="p-2.5 bg-red-500/10 rounded-xl border border-red-500/30">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Confirm Emergency Offline</h3>
                <p className="text-xs text-red-400">High-Impact Action Required</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              This action will block public access to <span className="font-semibold text-white">http://13.234.16.110/</span> and return HTTP status 503 to all visitors. Server and database remain untouched.
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="block text-xs font-semibold text-slate-400">
                Type <span className="text-red-400 font-mono font-bold select-all">SHUTDOWN</span> to confirm:
              </label>
              <input
                type="text"
                value={shutdownInput}
                onChange={(e) => setShutdownInput(e.target.value)}
                placeholder="SHUTDOWN"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono placeholder-slate-600 focus:outline-none focus:border-red-500"
                autoFocus
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowShutdownModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => executeEmergencyAction('shutdown', 'SHUTDOWN')}
                disabled={shutdownInput !== 'SHUTDOWN' || loading}
                className="px-5 py-2 bg-red-600 hover:bg-red-500 disabled:bg-slate-800 disabled:text-slate-600 text-white text-sm font-bold rounded-lg transition-all flex items-center gap-2"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Confirm Emergency Shutdown'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RECOVER CONFIRMATION MODAL */}
      {showRecoverModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-emerald-400">
              <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/30">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Confirm System Recovery</h3>
                <p className="text-xs text-emerald-400">Restoring Public Website Access</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              This action will remove the Emergency Offline state and immediately restore normal visitor traffic to FlowActiv.
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="block text-xs font-semibold text-slate-400">
                Type <span className="text-emerald-400 font-mono font-bold select-all">RECOVER</span> to confirm:
              </label>
              <input
                type="text"
                value={recoverInput}
                onChange={(e) => setRecoverInput(e.target.value)}
                placeholder="RECOVER"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                autoFocus
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowRecoverModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => executeEmergencyAction('recover', 'RECOVER')}
                disabled={recoverInput !== 'RECOVER' || loading}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 text-white text-sm font-bold rounded-lg transition-all flex items-center gap-2"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Confirm Recovery'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
