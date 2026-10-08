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
      // Create
      const newId = `wf-${Date.now().toString().slice(-4)}`;
      const newW: Workflow = {
        id: newId,
        slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: formData.name,
        category: formData.category,
        short_description: formData.short_description,
        long_description: formData.long_description,
        benefit: formData.benefit,
        price_inr: Number(formData.price_inr),
        price_usd: Number(formData.price_usd),
        technologies: techArray,
        features: featArray,
        status: formData.status,
        featured: formData.featured,
        downloads_count: 0,
        delivery_models: ['workflow_json', 'hybrid', 'managed'],
        created_at: new Date().toISOString(),
        architecture_steps: [
          { step: 1, title: 'Inbound Webhook Trigger', tool: 'Webhook', description: 'Real-time payload ingestion' },
          { step: 2, title: 'Autonomous Logic & LLM Engine', tool: 'n8n & AI', description: 'Deterministic parsing and prompt routing' },
          { step: 3, title: 'Target Dispatch', tool: 'External API', description: 'Instant update to CRM or ERP' }
        ]
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
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#CFCFCC]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block mb-1">
            CATALOG MANAGEMENT // BLUEPRINTS
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#0E0E0E]">
            WORKFLOW CATALOG
          </h1>
          <p className="text-xs text-[#6B6B6B] mt-1 max-w-xl">
            Create, update pricing, toggle visibility, and edit technologies for all marketplace blueprints.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="btn-primary h-11 text-xs rounded-xl shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          <span>CREATE NEW WORKFLOW</span>
        </button>
      </div>

      {/* Workflows Table */}
      <div className="border border-[#CFCFCC] bg-white rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F6F5F3] border-b border-[#CFCFCC] text-[#6B6B6B] uppercase text-[10px] tracking-[0.16em] font-semibold">
              <tr>
                <th className="py-3.5 px-4">Workflow Name & Category</th>
                <th className="py-3.5 px-4">Tech Stack</th>
                <th className="py-3.5 px-4">Price (INR / USD)</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#CFCFCC]">
              {workflows.map(wf => (
                <tr key={wf.id} className="hover:bg-[#F6F5F3] transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-bold text-[#0E0E0E] uppercase text-xs">{wf.name}</div>
                    <div className="text-[11px] text-[#6B6B6B] flex items-center gap-2 mt-0.5">
                      <span className="font-semibold text-[#0E0E0E]">{wf.category}</span>
                      <span>·</span>
                      <span>/{wf.slug}</span>
                      {wf.featured && (
                        <span className="text-[10px] uppercase font-bold text-[#0E0E0E] bg-[#E4E3E0] px-2 py-0.5 rounded-full">
                          ★ Featured
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-4 text-[#0E0E0E] text-xs max-w-xs truncate">
                    {wf.technologies.join(', ')}
                  </td>

                  <td className="py-4 px-4">
                    <div className="text-[#0E0E0E] font-bold text-sm tabular-nums">₹{wf.price_inr.toLocaleString()}</div>
                    <div className="text-[11px] text-[#6B6B6B]">${wf.price_usd} USD</div>
                  </td>

                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleTogglePublish(wf.id)}
                      className={`px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors border ${
                        wf.status === 'published'
                          ? 'bg-[#0E0E0E] text-white border-[#0E0E0E]'
                          : 'bg-[#F6F5F3] text-[#6B6B6B] border-[#CFCFCC]'
                      }`}
                    >
                      {wf.status === 'published' ? (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Published</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Draft</span>
                        </>
                      )}
                    </button>
                  </td>

                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onPreviewWorkflow(wf)}
                        title="Preview Public Page"
                        className="p-1.5 text-[#6B6B6B] hover:text-[#0E0E0E] hover:bg-[#F6F5F3] rounded-lg transition-colors cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(wf)}
                        title="Edit Workflow"
                        className="p-1.5 text-[#6B6B6B] hover:text-[#0E0E0E] hover:bg-[#F6F5F3] rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(wf.id)}
                        title="Delete Workflow"
                        className="p-1.5 text-[#6B6B6B] hover:text-[#0E0E0E] hover:bg-[#F6F5F3] rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none">
          <div className="bg-white border border-[#0E0E0E] rounded-2xl shadow-2xl p-8 max-w-sm w-full space-y-4">
            <h3 className="text-lg font-bold uppercase tracking-tight text-[#0E0E0E]">Delete Workflow?</h3>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Are you sure you want to remove this workflow blueprint from the catalog? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#CFCFCC]">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs uppercase tracking-wider font-semibold text-[#0E0E0E] bg-[#F6F5F3] hover:bg-[#E4E3E0] border border-[#CFCFCC] rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 text-xs uppercase tracking-wider font-bold text-white bg-[#0E0E0E] hover:bg-[#222222] rounded-xl cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none overflow-y-auto">
          <div className="bg-white border border-[#0E0E0E] rounded-2xl shadow-2xl p-6 sm:p-10 max-w-2xl w-full my-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#CFCFCC]">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block">
                  BLUEPRINT SPECIFICATION
                </span>
                <h3 className="text-xl font-extrabold uppercase text-[#0E0E0E] tracking-tight">
                  {editingWorkflow ? 'Edit Blueprint' : 'Create New Blueprint'}
                </h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-[#0E0E0E] hover:opacity-70 rounded-full hover:bg-[#F6F5F3] cursor-pointer p-1.5 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-1.5">
                    Workflow Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#CFCFCC] rounded-xl text-[#0E0E0E] focus:outline-none focus:border-[#0E0E0E] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-1.5">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. ai-lead-qualifier"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#CFCFCC] rounded-xl text-[#0E0E0E] focus:outline-none focus:border-[#0E0E0E] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-1.5">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#CFCFCC] rounded-xl text-[#0E0E0E] focus:outline-none focus:border-[#0E0E0E] transition-colors cursor-pointer"
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
                  <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-1.5">
                    Price (₹ INR) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price_inr}
                    onChange={e => setFormData({ ...formData, price_inr: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#CFCFCC] rounded-xl text-[#0E0E0E] focus:outline-none focus:border-[#0E0E0E] tabular-nums transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-1.5">
                    Price ($ USD) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price_usd}
                    onChange={e => setFormData({ ...formData, price_usd: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#CFCFCC] rounded-xl text-[#0E0E0E] focus:outline-none focus:border-[#0E0E0E] tabular-nums transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-1.5">
                  Short Description *
                </label>
                <input
                  type="text"
                  required
                  value={formData.short_description}
                  onChange={e => setFormData({ ...formData, short_description: e.target.value })}
                  placeholder="One sentence summarizing the mechanism and result."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#CFCFCC] rounded-xl text-[#0E0E0E] focus:outline-none focus:border-[#0E0E0E] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-1.5">
                  Measurable Business Benefit *
                </label>
                <input
                  type="text"
                  required
                  value={formData.benefit}
                  onChange={e => setFormData({ ...formData, benefit: e.target.value })}
                  placeholder="e.g. Cuts lead response latency from 6 hours to under 45 seconds."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#CFCFCC] rounded-xl text-[#0E0E0E] focus:outline-none focus:border-[#0E0E0E] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-1.5">
                  Long Description & Mechanics
                </label>
                <textarea
                  rows={3}
                  value={formData.long_description}
                  onChange={e => setFormData({ ...formData, long_description: e.target.value })}
                  className="w-full p-3.5 bg-white border border-[#CFCFCC] rounded-xl text-[#0E0E0E] focus:outline-none focus:border-[#0E0E0E] resize-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-1.5">
                  Connected Technologies (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={e => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="n8n, Gemini 1.5, Slack, HubSpot"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#CFCFCC] rounded-xl text-[#0E0E0E] focus:outline-none focus:border-[#0E0E0E] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-1.5">
                  Included Features (one per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.features}
                  onChange={e => setFormData({ ...formData, features: e.target.value })}
                  className="w-full p-3.5 bg-white border border-[#CFCFCC] rounded-xl text-[#0E0E0E] focus:outline-none focus:border-[#0E0E0E] resize-none transition-colors"
                />
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-3 pb-2 border-t border-[#CFCFCC]">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold uppercase tracking-wider text-[#0E0E0E]">
                  <input
                    type="checkbox"
                    checked={formData.status === 'published'}
                    onChange={e => setFormData({ ...formData, status: e.target.checked ? 'published' : 'draft' })}
                    className="w-4 h-4 accent-[#0E0E0E]"
                  />
                  <span>Publish to Website</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold uppercase tracking-wider text-[#0E0E0E]">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 accent-[#0E0E0E]"
                  />
                  <span>Show as Featured on Homepage</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#CFCFCC]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 uppercase tracking-wider text-xs font-semibold text-[#0E0E0E] bg-[#F6F5F3] hover:bg-[#E4E3E0] border border-[#CFCFCC] rounded-xl cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary h-11 text-xs rounded-xl"
                >
                  Save Blueprint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
