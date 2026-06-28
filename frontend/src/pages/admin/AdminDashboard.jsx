import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Newspaper, Briefcase, Handshake, Award, Mail,
  MessageSquare, FileText, LogOut, Plus, Pencil, Trash2, Download, Loader2,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { useAuth } from '../../context/AuthContext';
import {
  adminList, adminCreate, adminUpdate, adminDelete,
  adminContacts, adminInquiries, adminApplications, adminResumeBlob,
} from '../../lib/api';
import { toast } from 'sonner';

const RESOURCES = {
  insights: {
    label: 'Insights', icon: Newspaper, columns: ['title', 'category', 'date'],
    fields: [
      { name: 'title', label: 'Title' }, { name: 'slug', label: 'Slug' },
      { name: 'category', label: 'Category' }, { name: 'excerpt', label: 'Excerpt', type: 'textarea', rows: 2 },
      { name: 'content', label: 'Content', type: 'textarea', rows: 8 },
      { name: 'read_time', label: 'Read time (e.g. 5 min read)' },
      { name: 'date', label: 'Date', type: 'date' }, { name: 'image', label: 'Image URL' },
    ],
  },
  jobs: {
    label: 'Jobs', icon: Briefcase, columns: ['title', 'location', 'department'],
    fields: [
      { name: 'title', label: 'Title' }, { name: 'slug', label: 'Slug' },
      { name: 'location', label: 'Location' }, { name: 'department', label: 'Department' },
      { name: 'type', label: 'Type (e.g. Full-time)' }, { name: 'summary', label: 'Summary', type: 'textarea', rows: 2 },
      { name: 'description', label: 'Description', type: 'textarea', rows: 8 },
      { name: 'requirements', label: 'Requirements (one per line)', type: 'list', rows: 5 },
      { name: 'posted_at', label: 'Posted date', type: 'date' },
    ],
  },
  partners: {
    label: 'Partners', icon: Handshake, columns: ['name', 'category'],
    fields: [{ name: 'name', label: 'Name' }, { name: 'category', label: 'Category' }, { name: 'logo', label: 'Logo URL' }],
  },
  memberships: {
    label: 'Memberships', icon: Award, columns: ['name', 'full_name'],
    fields: [{ name: 'name', label: 'Name' }, { name: 'full_name', label: 'Full name' }, { name: 'logo', label: 'Logo URL' }],
  },
};

const INBOX = {
  contacts: { label: 'Contact Inbox', icon: Mail, fetch: adminContacts },
  inquiries: { label: 'Career Inquiries', icon: MessageSquare, fetch: adminInquiries },
  applications: { label: 'Job Applications', icon: FileText, fetch: adminApplications },
};

const isoToDateInput = (v) => (v ? String(v).slice(0, 10) : '');

function toFormValues(key, item) {
  const cfg = RESOURCES[key];
  const vals = {};
  cfg.fields.forEach((f) => {
    let v = item ? item[f.name] : '';
    if (f.type === 'date') v = isoToDateInput(v);
    else if (f.type === 'list') v = Array.isArray(v) ? v.join('\n') : (v || '');
    else v = v ?? '';
    vals[f.name] = v;
  });
  return vals;
}

function fromFormValues(key, vals) {
  const cfg = RESOURCES[key];
  const body = {};
  cfg.fields.forEach((f) => {
    if (f.type === 'list') {
      body[f.name] = (vals[f.name] || '').split('\n').map((s) => s.trim()).filter(Boolean);
    } else {
      body[f.name] = vals[f.name];
    }
  });
  return body;
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState('insights');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null); // item or 'new' or null
  const [formVals, setFormVals] = useState({});
  const [saving, setSaving] = useState(false);

  const isResource = !!RESOURCES[active];
  const isInbox = !!INBOX[active];

  const load = useCallback(() => {
    setLoading(true);
    const fetcher = isResource ? () => adminList(active) : INBOX[active].fetch;
    fetcher()
      .then((res) => setRows(res.data))
      .catch(() => toast.error('Failed to load data'))
      .finally(() => setLoading(false));
  }, [active, isResource]);

  useEffect(() => { load(); }, [load]);

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  const openNew = () => { setFormVals(toFormValues(active, null)); setEditing('new'); };
  const openEdit = (item) => { setFormVals(toFormValues(active, item)); setEditing(item); };

  const save = async () => {
    setSaving(true);
    try {
      const body = fromFormValues(active, formVals);
      if (editing === 'new') await adminCreate(active, body);
      else await adminUpdate(active, editing.id, body);
      toast.success('Saved');
      setEditing(null);
      load();
    } catch (e) {
      toast.error('Save failed');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (item) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await adminDelete(active, item.id);
      toast.success('Deleted');
      load();
    } catch (e) {
      toast.error('Delete failed');
    }
  };

  const downloadResume = async (item) => {
    try {
      const res = await adminResumeBlob(item.id);
      const url = URL.createObjectURL(res.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = item.resume_filename || 'resume';
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      toast.error('Could not download resume');
    }
  };

  const navItem = (key, cfg, group) => {
    const Icon = cfg.icon;
    return (
      <button
        key={key}
        onClick={() => setActive(key)}
        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${active === key ? 'text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
        style={active === key ? { background: '#8A1538' } : {}}
        data-testid={`admin-nav-${key}`}
      >
        <Icon className="w-4 h-4" /> {cfg.label}
      </button>
    );
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#f5f5f7' }} data-testid="admin-dashboard">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 flex flex-col" style={{ background: '#0b1220' }}>
        <div className="px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-2 text-white font-bold">
            <LayoutDashboard className="w-5 h-5" style={{ color: '#8A1538' }} /> Admin Console
          </div>
          <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{user?.email}</p>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <p className="px-4 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.3)' }}>Content</p>
          {Object.entries(RESOURCES).map(([k, c]) => navItem(k, c))}
          <p className="px-4 pt-4 pb-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.3)' }}>Submissions</p>
          {Object.entries(INBOX).map(([k, c]) => navItem(k, c))}
        </nav>
        <div className="p-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors" data-testid="admin-logout">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 lg:p-10 overflow-x-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold" style={{ color: '#0b1220' }}>
            {(RESOURCES[active] || INBOX[active]).label}
          </h1>
          {isResource && (
            <Button onClick={openNew} className="rounded-full" style={{ background: '#8A1538', color: 'white' }} data-testid="admin-add-btn">
              <Plus className="w-4 h-4 mr-1" /> Add New
            </Button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin" style={{ color: '#8A1538' }} /></div>
        ) : (
          <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: '#e5e7eb' }}>
            <Table>
              <TableHeader>
                <TableRow>
                  {isResource && RESOURCES[active].columns.map((c) => <TableHead key={c} className="capitalize">{c.replace('_', ' ')}</TableHead>)}
                  {active === 'contacts' && ['Name', 'Email', 'Message', 'Date'].map((c) => <TableHead key={c}>{c}</TableHead>)}
                  {active === 'inquiries' && ['Name', 'Email', 'Message', 'Date'].map((c) => <TableHead key={c}>{c}</TableHead>)}
                  {active === 'applications' && ['Name', 'Email', 'Phone', 'Resume', 'Date'].map((c) => <TableHead key={c}>{c}</TableHead>)}
                  {isResource && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.length === 0 && (
                  <TableRow><TableCell colSpan={8} className="text-center py-10 text-sm text-gray-400">No records yet.</TableCell></TableRow>
                )}
                {rows.map((item) => (
                  <TableRow key={item.id} data-testid={`admin-row-${item.id}`}>
                    {isResource && RESOURCES[active].columns.map((c) => (
                      <TableCell key={c} className="max-w-xs truncate">{c.includes('date') || c.includes('_at') ? isoToDateInput(item[c]) : String(item[c] ?? '')}</TableCell>
                    ))}
                    {active === 'contacts' && (<>
                      <TableCell>{item.name}</TableCell><TableCell>{item.email}</TableCell>
                      <TableCell className="max-w-sm truncate">{item.message}</TableCell><TableCell>{isoToDateInput(item.created_at)}</TableCell>
                    </>)}
                    {active === 'inquiries' && (<>
                      <TableCell>{item.name}</TableCell><TableCell>{item.email}</TableCell>
                      <TableCell className="max-w-sm truncate">{item.message}</TableCell><TableCell>{isoToDateInput(item.created_at)}</TableCell>
                    </>)}
                    {active === 'applications' && (<>
                      <TableCell>{item.name}</TableCell><TableCell>{item.email}</TableCell><TableCell>{item.phone || '—'}</TableCell>
                      <TableCell>{item.has_resume ? (
                        <Button size="sm" variant="outline" className="h-7 rounded-full text-xs" onClick={() => downloadResume(item)} data-testid={`admin-resume-${item.id}`}>
                          <Download className="w-3 h-3 mr-1" /> {item.resume_filename ? 'Download' : 'File'}
                        </Button>
                      ) : <span className="text-xs text-gray-400">None</span>}</TableCell>
                      <TableCell>{isoToDateInput(item.created_at)}</TableCell>
                    </>)}
                    {isResource && (
                      <TableCell className="text-right whitespace-nowrap">
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => openEdit(item)} data-testid={`admin-edit-${item.id}`}><Pencil className="w-4 h-4" /></Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => remove(item)} data-testid={`admin-delete-${item.id}`}><Trash2 className="w-4 h-4" style={{ color: '#b42318' }} /></Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>

      {/* Edit/Create Dialog */}
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto" data-testid="admin-form-dialog">
          <DialogHeader>
            <DialogTitle>{editing === 'new' ? 'Add' : 'Edit'} {RESOURCES[active]?.label?.replace(/s$/, '')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {isResource && RESOURCES[active].fields.map((f) => (
              <div key={f.name}>
                <Label className="text-sm font-medium" style={{ color: '#374151' }}>{f.label || f.name}</Label>
                {f.type === 'textarea' || f.type === 'list' ? (
                  <Textarea rows={f.rows || 3} value={formVals[f.name] || ''} onChange={(e) => setFormVals({ ...formVals, [f.name]: e.target.value })} className="mt-1 rounded-lg" data-testid={`admin-field-${f.name}`} />
                ) : (
                  <Input type={f.type === 'date' ? 'date' : 'text'} value={formVals[f.name] || ''} onChange={(e) => setFormVals({ ...formVals, [f.name]: e.target.value })} className="mt-1 rounded-lg" data-testid={`admin-field-${f.name}`} />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" className="rounded-full" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={save} disabled={saving} className="rounded-full" style={{ background: '#8A1538', color: 'white' }} data-testid="admin-save-btn">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
