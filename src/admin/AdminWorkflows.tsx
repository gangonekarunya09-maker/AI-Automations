import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, X, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { Workflow } from '../types';
import { Storage } from '../lib/storage';

interface AdminWorkflowsProps {
  workflows: Workflow[];
  onRefresh: () => void;
  onPreviewWorkflow: (workflow: Workflow) => void;
}

export const AdminWorkflows: React.FC<AdminWorkflowsProps> = ({
  workflows,
  onRefresh,
  onPreviewWorkflow
}) => {
  const [editingWorkflow, setEditingWorkflow] = useState<Workflow | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'Sales' as Workflow['category'],
    short_description: '',
    long_description: '',
    benefit: '',
    price_inr: 4999,
    price_usd: 69,
    technologies: 'n8n, Gemini 1.5 Flash, Slack API, Google Sheets',
    features: 'Full n8n workflow JSON, Environment setup runbook, Webhook endpoints, 30-day setup support',
    status: 'published' as 'published' | 'draft',
    featured: false
  });

  const handleOpenAdd = () => {
    setEditingWorkflow(null);
    setFormData({
      name: '',
      slug: '',
      category: 'Sales',
      short_description: '',
      long_description: '',
      benefit: '',
      price_inr: 4999,
      price_usd: 69,
      technologies: 'n8n, Gemini 1.5 Flash, Slack API, Google Sheets',
      features: 'Full n8n workflow JSON, Environment setup runbook, Webhook endpoints, 30-day setup support',
      status: 'published',
      featured: false
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (w: Workflow) => {
    setEditingWorkflow(w);
    setFormData({
      name: w.name,
      slug: w.slug,
      category: w.category,
      short_description: w.short_description,
      long_description: w.long_description,
      benefit: w.benefit,
      price_inr: w.price_inr,
      price_usd: w.price_usd,
      technologies: w.technologies.join(', '),
      features: w.features.join('\n'),
      status: w.status,
      featured: w.featured
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const currentList = Storage.getWorkflows();

    const techArray = formData.technologies.split(',').map(s => s.trim()).filter(Boolean);
    const featArray = formData.features.split('\n').map(s => s.trim()).filter(Boolean);

    if (editingWorkflow) {
      // Update
      const updated = currentList.map(item => {
        if (item.id === editingWorkflow.id) {
          return {
            ...item,
            name: formData.name,
            slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            category: formData.category,
            short_description: formData.short_description,
            long_description: formData.long_description,
            benefit: formData.benefit,
            price_inr: Number(formData.price_inr),
            price_usd: Number(formData.price_usd),
            technologies: techArray,
            features: featArray,
            status: formData.status,
            featured: formData.featured
          };
        }
        return item;
      });
      Storage.saveWorkflows(updated);
    } else {
      // Create new
      const newW: Workflow = {
        id: `wf-${Date.now()}`,
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: formData.category,
        short_description: formData.short_description,
        long_description: formData.long_description,
        benefit: formData.benefit,
        price_inr: Number(formData.price_inr),
        price_usd: Number(formData.price_usd),
        technologies: techArray,
        features: featArray,
        architecture_steps: [
          { step: 1, title: 'Input Event Trigger', tool: 'Webhook / Polling', description: 'Listens for raw event trigger.' },
          { step: 2, title: 'Transformation & AI Filter', tool: 'n8n & LLM', description: 'Cleanses data and executes inference.' },
          { step: 3, title: 'Target Destination Action', tool: 'Connected API', description: 'Writes record to destination app.' }
        ],
        delivery_models: ['workflow_json', 'managed', 'hybrid'],
        status: formData.status,
        featured: formData.featured,
        downloads_count: 0,
        created_at: new Date().toISOString()
      };
      Storage.saveWorkflows([newW, ...currentList]);
    }

    setIsModalOpen(false);
    onRefresh();
  };

  const handleTogglePublish = (id: string) => {
    const currentList = Storage.getWorkflows();
    const updated = currentList.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: (item.status === 'published' ? 'draft' : 'published') as Workflow['status']
        };
      }
      return item;
    });
    Storage.saveWorkflows(updated);
    onRefresh();
  };

  const handleDelete = (id: string) => {
    const currentList = Storage.getWorkflows();
    Storage.saveWorkflows(currentList.filter(item => item.id !== id));
    setDeleteConfirmId(null);
    onRefresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
            Workflow Catalog Management
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Create, update pricing, toggle visibility, and edit technologies for all marketplace workflows.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Workflow</span>
        </button>
      </div>

      {/* Workflows Table */}
      <div className="border border-white/[0.08] bg-[#0A0B0F] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#07080B] border-b border-white/[0.08] text-neutral-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="py-3 px-4">Workflow Name & Category</th>
                <th className="py-3 px-4">Tech Stack</th>
                <th className="py-3 px-4">Price (INR / USD)</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {workflows.map(wf => (
                <tr key={wf.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white">{wf.name}</div>
                    <div className="text-[11px] text-neutral-400 flex items-center gap-2 mt-0.5">
                      <span className="text-emerald-400 font-mono">{wf.category}</span>
                      <span>·</span>
                      <span className="font-mono text-neutral-500">/{wf.slug}</span>
                      {wf.featured && (
                        <span className="text-[10px] text-amber-400 font-mono">★ Featured</span>
                      )}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-neutral-300 font-mono text-[11px] max-w-xs truncate">
                    {wf.technologies.join(', ')}
                  </td>

                  <td className="py-3.5 px-4 font-mono">
                    <div className="text-white font-semibold tabular-nums">₹{wf.price_inr.toLocaleString()}</div>
                    <div className="text-[10px] text-neutral-500">${wf.price_usd} USD</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleTogglePublish(wf.id)}
                      className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors ${
                        wf.status === 'published'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-white/[0.05] text-neutral-400 border border-white/10'
                      }`}
                    >
                      {wf.status === 'published' ? (
                        <>
                          <Eye className="w-3 h-3" />
                          <span>Published</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3" />
                          <span>Draft</span>
                        </>
                      )}
                    </button>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onPreviewWorkflow(wf)}
                        title="Preview Public Page"
                        className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(wf)}
                        title="Edit Workflow"
                        className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(wf.id)}
                        title="Delete Workflow"
                        className="p-1.5 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#090A0E] border border-white/[0.12] p-6 max-w-sm w-full space-y-4">
            <h3 className="text-base font-bold text-white tracking-tight">Delete Workflow?</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Are you sure you want to remove this workflow from the catalog? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-3.5 py-1.5 text-xs font-mono uppercase text-neutral-300 hover:text-white bg-white/[0.05] border border-white/10"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-3.5 py-1.5 text-xs font-mono uppercase text-white bg-red-600 hover:bg-red-500 font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#090A0E] border border-white/[0.12] p-6 sm:p-8 max-w-2xl w-full my-8 space-y-5"
          >
            <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
              <h3 className="text-lg font-bold text-white tracking-tight">
                {editingWorkflow ? 'Edit Workflow' : 'Create New Workflow'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">Workflow Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. ai-lead-qualifier"
                    className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white transition-colors font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#0E0F14] border border-white/10 text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
                  >
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operations">Operations</option>
                    <option value="Customer Support">Customer Support</option>
                    <option value="AI & Documents">AI & Documents</option>
                    <option value="E-Commerce">E-Commerce</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">Price (₹ INR) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price_inr}
                    onChange={e => setFormData({ ...formData, price_inr: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white font-mono tabular-nums transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">Price ($ USD) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price_usd}
                    onChange={e => setFormData({ ...formData, price_usd: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white font-mono tabular-nums transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">Short Description *</label>
                <input
                  type="text"
                  required
                  value={formData.short_description}
                  onChange={e => setFormData({ ...formData, short_description: e.target.value })}
                  placeholder="One sentence summarizing the mechanism and result."
                  className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">Measurable Business Benefit *</label>
                <input
                  type="text"
                  required
                  value={formData.benefit}
                  onChange={e => setFormData({ ...formData, benefit: e.target.value })}
                  placeholder="e.g. Cuts lead response latency from 6 hours to under 45 seconds."
                  className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">Long Description & Mechanics</label>
                <textarea
                  rows={3}
                  value={formData.long_description}
                  onChange={e => setFormData({ ...formData, long_description: e.target.value })}
                  className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white resize-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">Connected Technologies (comma-separated)</label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={e => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="n8n, Gemini 1.5, Slack, HubSpot"
                  className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white font-mono transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">Included Features (one per line)</label>
                <textarea
                  rows={3}
                  value={formData.features}
                  onChange={e => setFormData({ ...formData, features: e.target.value })}
                  className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white resize-none transition-colors"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-mono text-xs">
                  <input
                    type="checkbox"
                    checked={formData.status === 'published'}
                    onChange={e => setFormData({ ...formData, status: e.target.checked ? 'published' : 'draft' })}
                    className="accent-white"
                  />
                  <span>Publish to Website</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-mono text-xs">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                    className="accent-white"
                  />
                  <span>Show as Featured on Homepage</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 font-mono uppercase text-xs text-neutral-300 hover:text-white bg-white/[0.04] border border-white/10 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-mono uppercase text-xs text-black bg-white hover:bg-neutral-200 font-semibold cursor-pointer active:scale-[0.98]"
                >
                  Save Workflow
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
