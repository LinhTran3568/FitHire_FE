import { type CompanyInfo } from '@lib/mockJobs';
import { Building2, Calendar, ExternalLink, Globe, MapPin, Users, X } from 'lucide-react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface CompanyModalProps {
  company: CompanyInfo;
  onClose: () => void;
}

export function CompanyModal({ company, onClose }: CompanyModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const initial = company.name.charAt(0).toUpperCase();

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header gradient */}
        <div className="rounded-t-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-4">
              {/* Company avatar */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/20 text-2xl font-bold text-white ring-2 ring-white/30">
                {initial}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{company.name}</h2>
                <p className="mt-0.5 text-sm text-slate-300">{company.industry}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white"
              aria-label="Đóng"
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick stats */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-white/10 px-3 py-2 text-center">
              <p className="text-sm font-bold text-white">{company.founded}</p>
              <p className="text-xs text-slate-400">Thành lập</p>
            </div>
            <div className="rounded-xl bg-white/10 px-3 py-2 text-center">
              <p className="text-sm font-bold text-white">{company.size.split(' ')[0]}+</p>
              <p className="text-xs text-slate-400">Nhân viên</p>
            </div>
            <div className="rounded-xl bg-white/10 px-3 py-2 text-center">
              <p className="text-sm font-bold text-white">
                {company.location.split('.').pop()?.trim() ?? company.location}
              </p>
              <p className="text-xs text-slate-400">Địa điểm</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-4 p-5">
          {/* Info rows */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
              <Building2 size={15} className="shrink-0 text-indigo-500" />
              <div>
                <p className="text-xs text-slate-500">Ngành</p>
                <p className="text-sm font-medium text-slate-800">{company.industry}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
              <Users size={15} className="shrink-0 text-blue-500" />
              <div>
                <p className="text-xs text-slate-500">Quy mô</p>
                <p className="text-sm font-medium text-slate-800">{company.size}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
              <MapPin size={15} className="shrink-0 text-emerald-500" />
              <div>
                <p className="text-xs text-slate-500">Địa chỉ</p>
                <p className="text-sm font-medium text-slate-800">{company.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
              <Calendar size={15} className="shrink-0 text-amber-500" />
              <div>
                <p className="text-xs text-slate-500">Thành lập</p>
                <p className="text-sm font-medium text-slate-800">{company.founded}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="mb-1.5 text-xs font-semibold tracking-wide text-slate-500 uppercase">
              Giới thiệu
            </p>
            <p className="text-sm leading-relaxed text-slate-700">{company.description}</p>
          </div>

          {/* Perks */}
          <div>
            <p className="mb-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
              Quyền lợi nổi bật
            </p>
            <ul className="space-y-1.5">
              {company.perks.map(perk => (
                <li key={perk} className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                    ✓
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          {/* Website */}
          <a
            href={`https://${company.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-sm font-medium text-indigo-700 transition hover:bg-indigo-100"
          >
            <Globe size={15} />
            {company.website}
            <ExternalLink size={13} className="ml-auto" />
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
