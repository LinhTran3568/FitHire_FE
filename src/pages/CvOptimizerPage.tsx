import { Button, SurfaceCard } from '@components/ui';
import { sleep } from '@lib/utils';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronDown,
  Download,
  LoaderCircle,
  Plus,
  Sparkles,
  Star,
  Trash2,
  WandSparkles,
  X,
  Code2,
  Palette,
  BriefcaseBusiness,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

import type { CvDraft, ExperienceEntry, LanguageEntry, Template, Step } from './cvBuilder.types';
import { getKeywords, healthScore, initialDraft, uid } from './cvBuilder.types';

// ─── Field Input ──────────────────────────────────────────────────────────────
function FI({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-medium text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </span>
      <input
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 transition outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

// ─── STEP 0: Template Selector ────────────────────────────────────────────────
function StepTemplate({
  draft,
  setDraft,
}: {
  draft: CvDraft;
  setDraft: React.Dispatch<React.SetStateAction<CvDraft>>;
}) {
  const TMPLS: { id: Template; label: string; sub: string; icon: React.ElementType; g: string }[] =
    [
      {
        id: 'ats',
        label: 'Kỹ thuật (ATS)',
        sub: '1 cột, ATS-friendly, tối ưu lập trình viên',
        icon: Code2,
        g: 'from-slate-700 to-slate-900',
      },
      {
        id: 'creative',
        label: 'Sáng tạo (Creative)',
        sub: 'Màu sắc, skill bars, sidebar nổi bật',
        icon: Palette,
        g: 'from-violet-500 to-fuchsia-600',
      },
      {
        id: 'business',
        label: 'Chuyên nghiệp (Business)',
        sub: '2 cột, Summary nổi bật, trang trọng',
        icon: BriefcaseBusiness,
        g: 'from-blue-600 to-indigo-700',
      },
    ];
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-slate-900">Chọn phong cách CV</h2>
        <p className="mt-1 text-sm text-slate-500">AI sẽ trình bày CV theo phong cách bạn chọn.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {TMPLS.map(t => (
          <button
            key={t.id}
            onClick={() => setDraft(d => ({ ...d, template: t.id }))}
            className={`relative flex flex-col items-center gap-3 rounded-2xl border-2 p-5 text-center transition-all ${draft.template === t.id ? 'border-indigo-500 bg-indigo-50 shadow-md' : 'border-slate-200 bg-white hover:border-indigo-300'}`}
          >
            {draft.template === t.id && (
              <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500">
                <CheckCircle2 size={12} className="text-white" />
              </span>
            )}
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${t.g}`}
            >
              <t.icon size={26} className="text-white drop-shadow-sm" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">{t.label}</p>
              <p className="mt-0.5 text-xs text-slate-500">{t.sub}</p>
            </div>
          </button>
        ))}
      </div>
      <div>
        <h3 className="mb-2 font-semibold text-slate-900">Vị trí mục tiêu</h3>
        <input
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 transition outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          placeholder="Ví dụ: Backend Java Intern, Frontend React Developer..."
          value={draft.targetRole}
          onChange={e => setDraft(d => ({ ...d, targetRole: e.target.value }))}
        />
      </div>
    </div>
  );
}

// ─── STEP 1: Contact & Education ─────────────────────────────────────────────
function StepContact({
  draft,
  setDraft,
}: {
  draft: CvDraft;
  setDraft: React.Dispatch<React.SetStateAction<CvDraft>>;
}) {
  const sc = (k: keyof typeof draft.contact, v: string) =>
    setDraft(d => ({ ...d, contact: { ...d.contact, [k]: v } }));
  const se = (k: keyof typeof draft.education, v: string) =>
    setDraft(d => ({ ...d, education: { ...d.education, [k]: v } }));
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold text-slate-900">Thông tin cơ bản & Học vấn</h2>
      <div className="grid gap-3 md:grid-cols-2">
        <FI
          required
          label="Họ và tên"
          value={draft.contact.fullName}
          onChange={v => sc('fullName', v)}
          placeholder="Nguyễn Văn A"
        />
        <FI
          required
          label="Email"
          value={draft.contact.email}
          onChange={v => sc('email', v)}
          placeholder="hello@email.com"
        />
        <FI
          label="Số điện thoại"
          value={draft.contact.phone}
          onChange={v => sc('phone', v)}
          placeholder="0912 345 678"
        />
        <FI
          label="LinkedIn"
          value={draft.contact.linkedin}
          onChange={v => sc('linkedin', v)}
          placeholder="linkedin.com/in/username"
        />
        <FI
          label="GitHub"
          value={draft.contact.github}
          onChange={v => sc('github', v)}
          placeholder="github.com/username"
        />
        <FI
          label="Portfolio / Website"
          value={draft.contact.portfolio}
          onChange={v => sc('portfolio', v)}
          placeholder="myportfolio.dev"
        />
      </div>
      <hr className="border-slate-100" />
      <h3 className="font-semibold text-slate-900">Học vấn</h3>
      <div className="grid gap-3 md:grid-cols-2">
        <FI
          required
          label="Trường đại học"
          value={draft.education.school}
          onChange={v => se('school', v)}
          placeholder="ĐH FPT Hà Nội"
        />
        <FI
          required
          label="Chuyên ngành / Bằng cấp"
          value={draft.education.degree}
          onChange={v => se('degree', v)}
          placeholder="Kỹ thuật Phần mềm"
        />
        <FI
          label="Năm tốt nghiệp"
          value={draft.education.year}
          onChange={v => se('year', v)}
          placeholder="2025"
        />
        <FI
          label="GPA"
          value={draft.education.gpa}
          onChange={v => se('gpa', v)}
          placeholder="3.6 / 4.0"
        />
      </div>
    </div>
  );
}

// ─── STEP 2: Experience ───────────────────────────────────────────────────────
function StepExperience({
  draft,
  setDraft,
}: {
  draft: CvDraft;
  setDraft: React.Dispatch<React.SetStateAction<CvDraft>>;
}) {
  const add = () =>
    setDraft(d => ({
      ...d,
      experiences: [
        ...d.experiences,
        { id: uid(), company: '', role: '', period: '', description: '', optimizing: false },
      ],
    }));
  const remove = (id: string) =>
    setDraft(d => ({ ...d, experiences: d.experiences.filter(e => e.id !== id) }));
  const upd = (id: string, k: keyof ExperienceEntry, v: string | boolean) =>
    setDraft(d => ({
      ...d,
      experiences: d.experiences.map(e => (e.id === id ? { ...e, [k]: v } : e)),
    }));
  const optimize = async (id: string) => {
    upd(id, 'optimizing', true);
    await sleep(800);
    setDraft(d => ({
      ...d,
      experiences: d.experiences.map(e => {
        if (e.id !== id) return e;
        const raw = e.description.trim();
        return {
          ...e,
          optimizing: false,
          description: raw
            ? `Phát triển và tối ưu ${raw.slice(0, 60)}${raw.length > 60 ? '...' : ''}, giúp giảm 30% thời gian xử lý và tăng hiệu suất 40%.`
            : 'Xây dựng hệ thống Backend, tích hợp API RESTful và tối ưu truy vấn DB, giúp giảm thời gian phản hồi 35%.',
        };
      }),
    }));
  };
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Kinh nghiệm & Dự án</h2>
        <button
          onClick={add}
          className="flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 transition hover:bg-indigo-100"
        >
          <Plus size={14} /> Thêm mục
        </button>
      </div>
      {draft.experiences.map((exp, idx) => (
        <div
          key={exp.id}
          className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/50 p-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700">Mục {idx + 1}</span>
            {draft.experiences.length > 1 && (
              <button
                onClick={() => remove(exp.id)}
                className="text-slate-400 transition hover:text-red-500"
              >
                <Trash2 size={15} />
              </button>
            )}
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-slate-700">Công ty / Dự án</span>
              <input
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 transition outline-none focus:border-indigo-400"
                value={exp.company}
                onChange={e => upd(exp.id, 'company', e.target.value)}
                placeholder="Techify Corp"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-slate-700">Vai trò</span>
              <input
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 transition outline-none focus:border-indigo-400"
                value={exp.role}
                onChange={e => upd(exp.id, 'role', e.target.value)}
                placeholder="Backend Intern"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm md:col-span-2">
              <span className="font-medium text-slate-700">Thời gian</span>
              <input
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 transition outline-none focus:border-indigo-400"
                value={exp.period}
                onChange={e => upd(exp.id, 'period', e.target.value)}
                placeholder="06/2024 – 12/2024"
              />
            </label>
          </div>
          <label className="flex flex-col gap-1 text-sm">
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-700">Mô tả công việc</span>
              <button
                onClick={() => optimize(exp.id)}
                disabled={exp.optimizing}
                className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 px-3 py-1 text-xs font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-60"
              >
                {exp.optimizing ? (
                  <LoaderCircle size={12} className="animate-spin" />
                ) : (
                  <WandSparkles size={12} />
                )}
                {exp.optimizing ? 'Đang tối ưu...' : '✨ AI Optimize'}
              </button>
            </div>
            <textarea
              rows={3}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm transition outline-none focus:border-indigo-400"
              value={exp.description}
              onChange={e => upd(exp.id, 'description', e.target.value)}
              placeholder="Mô tả thô: Viết code Java, fix bug, làm API..."
            />
            <p className="text-xs text-slate-400">
              Nhấn ✨ AI Optimize → AI viết lại theo công thức: Hành động + Kết quả + Số liệu
            </p>
          </label>
        </div>
      ))}
    </div>
  );
}


const Chip = ({ label, onRm, cls }: { label: string; onRm: () => void; cls: string }) => (
  <span className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${cls}`}>
    {label}
    <button onClick={onRm} className="ml-0.5 transition hover:text-red-500">
      <X size={11} />
    </button>
  </span>
);

const Row = ({
  val,
  onChange,
  onAdd,
  ph,
}: {
  val: string;
  onChange: (v: string) => void;
  onAdd: () => void;
  ph: string;
}) => (
  <div className="flex gap-2">
    <input
      className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm transition outline-none focus:border-indigo-400"
      placeholder={ph}
      value={val}
      onChange={e => onChange(e.target.value)}
      onKeyDown={e => e.key === 'Enter' && onAdd()}
    />
    <Button size="sm" onClick={onAdd}>
      <Plus size={14} />
      Thêm
    </Button>
  </div>
);

// ─── STEP 3: Skills, Languages, Achievements ──────────────────────────────────
function StepSkills({
  draft,
  setDraft,
}: {
  draft: CvDraft;
  setDraft: React.Dispatch<React.SetStateAction<CvDraft>>;
}) {
  const [hi, setHi] = useState('');
  const [si, setSi] = useState('');
  const [ln, setLn] = useState('');
  const [ll, setLl] = useState<LanguageEntry['level']>('Fluent');
  const [ai, setAi] = useState('');
  const addH = () => {
    if (!hi.trim()) return;
    setDraft(d => ({ ...d, hardSkills: [...d.hardSkills, { id: uid(), name: hi.trim() }] }));
    setHi('');
  };
  const addS = () => {
    if (!si.trim()) return;
    setDraft(d => ({ ...d, softSkills: [...d.softSkills, { id: uid(), name: si.trim() }] }));
    setSi('');
  };
  const addL = () => {
    if (!ln.trim()) return;
    setDraft(d => ({
      ...d,
      languages: [...d.languages, { id: uid(), name: ln.trim(), level: ll }],
    }));
    setLn('');
  };
  const addA = () => {
    if (!ai.trim()) return;
    setDraft(d => ({
      ...d,
      achievements: [...d.achievements, { id: uid(), text: ai.trim(), highlight: false }],
    }));
    setAi('');
  };
  const rmH = (id: string) =>
    setDraft(d => ({ ...d, hardSkills: d.hardSkills.filter(s => s.id !== id) }));
  const rmS = (id: string) =>
    setDraft(d => ({ ...d, softSkills: d.softSkills.filter(s => s.id !== id) }));
  const rmL = (id: string) =>
    setDraft(d => ({ ...d, languages: d.languages.filter(l => l.id !== id) }));
  const rmA = (id: string) =>
    setDraft(d => ({ ...d, achievements: d.achievements.filter(a => a.id !== id) }));
  const tog = (id: string) =>
    setDraft(d => ({
      ...d,
      achievements: d.achievements.map(a => (a.id === id ? { ...a, highlight: !a.highlight } : a)),
    }));
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-slate-900">Kỹ năng, Ngoại ngữ &amp; Thành tựu</h2>
      <div className="space-y-2">
        <h3 className="font-semibold text-slate-800">Hard Skills (Kỹ năng kỹ thuật)</h3>
        <Row val={hi} onChange={setHi} onAdd={addH} ph="Java, Spring Boot, Docker..." />
        <div className="flex flex-wrap gap-2">
          {draft.hardSkills.map(s => (
            <Chip
              key={s.id}
              label={s.name}
              onRm={() => rmH(s.id)}
              cls="bg-indigo-100 text-indigo-700"
            />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-slate-800">Soft Skills (Kỹ năng mềm)</h3>
        <Row val={si} onChange={setSi} onAdd={addS} ph="Giao tiếp, Làm việc nhóm..." />
        <div className="flex flex-wrap gap-2">
          {draft.softSkills.map(s => (
            <Chip
              key={s.id}
              label={s.name}
              onRm={() => rmS(s.id)}
              cls="bg-emerald-100 text-emerald-700"
            />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-slate-800">Ngoại ngữ</h3>
        <div className="flex gap-2">
          <input
            className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm transition outline-none focus:border-indigo-400"
            placeholder="Tiếng Anh"
            value={ln}
            onChange={e => setLn(e.target.value)}
          />
          <div className="relative">
            <select
              className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pr-8 pl-3 text-sm outline-none focus:border-indigo-400"
              value={ll}
              onChange={e => setLl(e.target.value as LanguageEntry['level'])}
            >
              <option>Beginner</option>
              <option>Fluent</option>
              <option>Native</option>
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute top-2.5 right-2 text-slate-400"
            />
          </div>
          <Button size="sm" onClick={addL}>
            <Plus size={14} />
            Thêm
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {draft.languages.map(l => (
            <Chip
              key={l.id}
              label={`${l.name} – ${l.level}`}
              onRm={() => rmL(l.id)}
              cls="bg-amber-100 text-amber-800"
            />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-slate-800">Thành tựu</h3>
        <Row val={ai} onChange={setAi} onAdd={addA} ph="Giảm thời gian phản hồi API 30%..." />
        <div className="space-y-2">
          {draft.achievements.map(a => (
            <div
              key={a.id}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${a.highlight ? 'border-amber-300 bg-amber-50' : 'border-slate-200 bg-white'}`}
            >
              <button
                onClick={() => tog(a.id)}
                className={`shrink-0 transition ${a.highlight ? 'text-amber-500' : 'text-slate-300 hover:text-amber-400'}`}
              >
                <Star size={14} fill={a.highlight ? 'currentColor' : 'none'} />
              </button>
              <span className="flex-1 text-slate-800">{a.text}</span>
              <button
                onClick={() => rmA(a.id)}
                className="text-slate-400 transition hover:text-red-500"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400">
          Nhấn ⭐ để đánh dấu nổi bật – AI sẽ đưa lên đầu và in đậm.
        </p>
      </div>
    </div>
  );
}

// ─── LIVE PREVIEW ─────────────────────────────────────────────────────────────
function Preview({ draft }: { draft: CvDraft }) {
  const {
    template: t,
    contact: c,
    education: edu,
    experiences: ex,
    hardSkills: hs,
    softSkills: ss,
    languages: lg,
    achievements: ac,
  } = draft;
  const high = ac.filter(a => a.highlight);
  const norm = ac.filter(a => !a.highlight);
  const ach = [...high, ...norm];
  if (t === 'creative')
    return (
      <div className="h-full overflow-auto rounded-xl bg-white text-[11px] shadow-inner">
        <div className="flex min-h-full">
          <div className="w-36 shrink-0 space-y-4 bg-gradient-to-b from-violet-600 to-fuchsia-700 p-4 text-white">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-2xl font-bold">
              {c.fullName ? c.fullName[0].toUpperCase() : '?'}
            </div>
            <div className="space-y-0.5 text-center">
              <p className="text-sm font-bold">{c.fullName || 'Họ và tên'}</p>
              <p className="text-xs text-violet-200">{draft.targetRole || 'Vị trí'}</p>
            </div>
            {hs.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs font-bold text-violet-200 uppercase">Skills</p>
                {hs.map(s => (
                  <div key={s.id}>
                    <p className="text-[10px] text-white/90">{s.name}</p>
                    <div className="mt-0.5 h-1 w-full rounded-full bg-white/20">
                      <div className="h-1 rounded-full bg-white/80" style={{ width: '75%' }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {lg.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-bold text-violet-200 uppercase">Languages</p>
                {lg.map(l => (
                  <p key={l.id} className="text-[10px] text-white/90">
                    {l.name}: {l.level}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div className="flex-1 space-y-3 p-4">
            <div className="space-y-0.5 border-b border-slate-100 pb-2">
              {c.email && <p className="text-slate-500">{c.email}</p>}
              {c.phone && <p className="text-slate-500">{c.phone}</p>}
              {c.linkedin && <p className="text-violet-600">{c.linkedin}</p>}
            </div>
            {ex.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-bold text-violet-700 uppercase">Kinh nghiệm</p>
                {ex.map(e => (
                  <div key={e.id} className="space-y-0.5">
                    <p className="font-semibold text-slate-900">
                      {e.role || 'Vai trò'} – {e.company || 'Công ty'}
                    </p>
                    <p className="text-slate-400">{e.period}</p>
                    <p className="text-slate-700">{e.description}</p>
                  </div>
                ))}
              </div>
            )}
            {ach.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-bold text-violet-700 uppercase">Thành tựu</p>
                {ach.map(a => (
                  <p
                    key={a.id}
                    className={a.highlight ? 'font-bold text-slate-900' : 'text-slate-700'}
                  >
                    • {a.text}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  if (t === 'business')
    return (
      <div className="h-full overflow-auto rounded-xl bg-white p-5 text-[11px] shadow-inner">
        <div className="mb-3 border-b-2 border-indigo-600 pb-3">
          <h1 className="text-lg font-bold text-slate-900">{c.fullName || 'Họ và tên'}</h1>
          <p className="text-sm font-semibold text-indigo-600">{draft.targetRole || 'Vị trí'}</p>
          <div className="mt-1 flex flex-wrap gap-x-4 text-slate-500">
            {c.email && <span>{c.email}</span>}
            {c.phone && <span>{c.phone}</span>}
            {c.linkedin && <span className="text-indigo-500">{c.linkedin}</span>}
          </div>
        </div>
        <div className="grid grid-cols-[1fr_120px] gap-4">
          <div className="space-y-3">
            {ex.length > 0 && (
              <div>
                <p className="mb-1.5 text-xs font-bold text-indigo-700 uppercase">Kinh nghiệm</p>
                {ex.map(e => (
                  <div key={e.id} className="mb-2 space-y-0.5">
                    <div className="flex justify-between">
                      <p className="font-bold text-slate-900">{e.role || 'Vai trò'}</p>
                      <p className="text-slate-400">{e.period}</p>
                    </div>
                    <p className="text-slate-600">{e.company}</p>
                    <p className="text-slate-700">{e.description}</p>
                  </div>
                ))}
              </div>
            )}
            {ach.length > 0 && (
              <div>
                <p className="mb-1.5 text-xs font-bold text-indigo-700 uppercase">Thành tựu</p>
                {ach.map(a => (
                  <p
                    key={a.id}
                    className={`mb-0.5 ${a.highlight ? 'font-bold text-slate-900' : 'text-slate-700'}`}
                  >
                    • {a.text}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-3 border-l border-slate-100 pl-3">
            {edu.school && (
              <div>
                <p className="mb-1 text-xs font-bold text-indigo-700 uppercase">Học vấn</p>
                <p className="font-semibold text-slate-900">{edu.school}</p>
                <p className="text-slate-600">{edu.degree}</p>
                {edu.year && <p className="text-slate-400">{edu.year}</p>}
              </div>
            )}
            {hs.length > 0 && (
              <div>
                <p className="mb-1 text-xs font-bold text-indigo-700 uppercase">Hard Skills</p>
                {hs.map(s => (
                  <p key={s.id} className="text-slate-700">
                    • {s.name}
                  </p>
                ))}
              </div>
            )}
            {ss.length > 0 && (
              <div>
                <p className="mb-1 text-xs font-bold text-indigo-700 uppercase">Soft Skills</p>
                {ss.map(s => (
                  <p key={s.id} className="text-slate-700">
                    • {s.name}
                  </p>
                ))}
              </div>
            )}
            {lg.length > 0 && (
              <div>
                <p className="mb-1 text-xs font-bold text-indigo-700 uppercase">Ngoại ngữ</p>
                {lg.map(l => (
                  <p key={l.id} className="text-slate-700">
                    {l.name}: {l.level}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  return (
    <div className="h-full overflow-auto rounded-xl bg-white p-5 font-sans text-[11px] shadow-inner">
      <div className="mb-3 border-b border-slate-200 pb-2">
        <h1 className="text-base font-bold text-slate-900">{c.fullName || 'Họ và tên'}</h1>
        <p className="font-medium text-slate-600">{draft.targetRole || 'Vị trí mục tiêu'}</p>
        <div className="mt-1 flex flex-wrap gap-x-3 text-slate-500">
          {c.email && <span>{c.email}</span>}
          {c.phone && <span>{c.phone}</span>}
          {c.linkedin && <span>{c.linkedin}</span>}
          {c.github && <span>{c.github}</span>}
        </div>
      </div>
      {edu.school && (
        <div className="mb-3">
          <p className="mb-1 text-xs font-bold text-slate-700 uppercase">EDUCATION</p>
          <p className="font-semibold text-slate-900">{edu.school}</p>
          <p className="text-slate-600">
            {edu.degree}
            {edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
          </p>
          {edu.year && <p className="text-slate-400">{edu.year}</p>}
        </div>
      )}
      {ex.length > 0 && (
        <div className="mb-3">
          <p className="mb-1 text-xs font-bold text-slate-700 uppercase">EXPERIENCE</p>
          {ex.map(e => (
            <div key={e.id} className="mb-2">
              <div className="flex justify-between">
                <p className="font-bold text-slate-900">
                  {e.role || 'Vai trò'} | {e.company || 'Công ty'}
                </p>
                <p className="text-slate-400">{e.period}</p>
              </div>
              <p className="text-slate-700">{e.description}</p>
            </div>
          ))}
        </div>
      )}
      {(hs.length > 0 || ss.length > 0) && (
        <div className="mb-3">
          <p className="mb-1 text-xs font-bold text-slate-700 uppercase">SKILLS</p>
          {hs.length > 0 && (
            <p className="text-slate-700">
              <strong>Technical:</strong> {hs.map(s => s.name).join(', ')}
            </p>
          )}
          {ss.length > 0 && (
            <p className="text-slate-700">
              <strong>Soft:</strong> {ss.map(s => s.name).join(', ')}
            </p>
          )}
        </div>
      )}
      {lg.length > 0 && (
        <div className="mb-3">
          <p className="mb-1 text-xs font-bold text-slate-700 uppercase">LANGUAGES</p>
          {lg.map(l => (
            <p key={l.id} className="text-slate-700">
              {l.name}: {l.level}
            </p>
          ))}
        </div>
      )}
      {ach.length > 0 && (
        <div>
          <p className="mb-1 text-xs font-bold text-slate-700 uppercase">ACHIEVEMENTS</p>
          {ach.map(a => (
            <p
              key={a.id}
              className={`mb-0.5 ${a.highlight ? 'font-bold text-slate-900' : 'text-slate-700'}`}
            >
              • {a.text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── AI SIDEKICK ──────────────────────────────────────────────────────────────
function Sidekick({
  draft,
  setDraft,
}: {
  draft: CvDraft;
  setDraft: React.Dispatch<React.SetStateAction<CvDraft>>;
}) {
  const score = healthScore(draft);
  const kws = useMemo(() => getKeywords(draft.targetRole), [draft.targetRole]);
  const addKw = (kw: string) => {
    if (draft.hardSkills.some(s => s.name === kw)) return;
    setDraft(d => ({ ...d, hardSkills: [...d.hardSkills, { id: uid(), name: kw }] }));
  };
  const hints: string[] = [];
  if (!draft.contact.fullName.trim()) hints.push('Chưa có họ tên.');
  if (!draft.contact.linkedin.trim())
    hints.push('Thiếu LinkedIn – nhà tuyển dụng thường kiểm tra.');
  const hasNum = draft.experiences.some(e => /\d/.test(e.description));
  if (!hasNum && draft.experiences.some(e => e.description.trim()))
    hints.push('Kinh nghiệm thiếu số liệu. Thêm % hoặc con số cụ thể.');
  if (draft.hardSkills.length === 0) hints.push('Chưa có Hard Skills.');
  if (draft.achievements.length === 0) hints.push('Nên thêm ít nhất 1 thành tựu.');
  return (
    <div className="flex flex-col gap-4">
      <SurfaceCard className="space-y-3">
        <div className="flex items-center gap-2">
          <Bot size={16} className="text-indigo-600" />
          <h3 className="text-sm font-semibold text-slate-900">AI Sidekick</h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <svg width="56" height="56" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="22" fill="none" stroke="#e2e8f0" strokeWidth="5" />
              <circle
                cx="28"
                cy="28"
                r="22"
                fill="none"
                stroke={score >= 70 ? '#22c55e' : score >= 40 ? '#f59e0b' : '#ef4444'}
                strokeWidth="5"
                strokeDasharray={`${(score / 100) * 138.2} 138.2`}
                strokeLinecap="round"
                transform="rotate(-90 28 28)"
                style={{ transition: 'stroke-dasharray 0.6s ease' }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-900">
              {score}
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-700">CV Health Score</p>
            <p className="text-xs text-slate-500">
              {score >= 70 ? 'Tốt 🎉' : score >= 40 ? 'Cần cải thiện' : 'Còn thiếu nhiều'}
            </p>
          </div>
        </div>
        {hints.length > 0 ? (
          <div className="space-y-1.5">
            {hints.map((h, i) => (
              <div
                key={i}
                className="flex items-start gap-1.5 rounded-lg border border-amber-100 bg-amber-50 px-2.5 py-2 text-xs text-amber-800"
              >
                <AlertCircle size={13} className="mt-0.5 shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-lg border border-green-100 bg-green-50 px-2.5 py-2 text-xs text-green-700">
            <CheckCircle2 size={13} />
            <span>CV của bạn trông rất tốt!</span>
          </div>
        )}
      </SurfaceCard>
      {kws.length > 0 && (
        <SurfaceCard className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-violet-500" />
            <h3 className="text-sm font-semibold text-slate-900">Từ khóa gợi ý</h3>
          </div>
          <p className="text-xs text-slate-500">Click để thêm vào Hard Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {kws.map(kw => {
              const added = draft.hardSkills.some(s => s.name === kw);
              return (
                <button
                  key={kw}
                  onClick={() => addKw(kw)}
                  disabled={added}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${added ? 'cursor-default bg-indigo-100 text-indigo-400' : 'bg-slate-100 text-slate-700 hover:bg-indigo-100 hover:text-indigo-700'}`}
                >
                  {added ? '✓ ' : '+ '}
                  {kw}
                </button>
              );
            })}
          </div>
        </SurfaceCard>
      )}
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
const STEPS = ['Phong cách', 'Thông tin', 'Kinh nghiệm', 'Kỹ năng'];

export default function CvOptimizerPage() {
  const [draft, setDraft] = useState<CvDraft>(initialDraft);
  const [step, setStep] = useState<Step>(0);
  const leftRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    leftRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col overflow-hidden">
      {/* Header */}
      <div className="mb-4 shrink-0 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-violet-900 px-6 py-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="inline-flex items-center gap-2 text-xl font-bold">
              CV Studio <Sparkles className="text-amber-400" size={18} />
            </h1>
            <p className="mt-0.5 text-sm text-slate-300">
              Tạo CV chuyên nghiệp với AI — xem kết quả ngay khi bạn gõ
            </p>
          </div>
          <div className="hidden items-center gap-1 md:flex">
            {STEPS.map((s, i) => (
              <button
                key={i}
                onClick={() => setStep(i as Step)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition ${step === i ? 'bg-white/20 text-white' : i < step ? 'text-green-400 hover:bg-white/10' : 'text-slate-400 hover:bg-white/10'}`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${i < step ? 'bg-green-500 text-white' : step === i ? 'bg-white text-indigo-900' : 'bg-white/20 text-white'}`}
                >
                  {i < step ? '✓' : i + 1}
                </span>
                <span className="hidden lg:inline">{s}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-3 md:hidden">
          <div className="flex gap-1">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all ${i <= step ? 'bg-indigo-400' : 'bg-white/20'}`}
              />
            ))}
          </div>
          <p className="mt-1 text-xs text-slate-300">
            Bước {step + 1}/5: {STEPS[step]}
          </p>
        </div>
      </div>

      {/* Split screen */}
      <div className="flex min-h-0 flex-1 gap-4">
        {/* Left – Form */}
        <div ref={leftRef} className="flex w-full flex-col overflow-y-auto rounded-2xl lg:w-[55%]">
          <SurfaceCard className="flex-1 space-y-4">
            {step === 0 && <StepTemplate draft={draft} setDraft={setDraft} />}
            {step === 1 && <StepContact draft={draft} setDraft={setDraft} />}
            {step === 2 && <StepExperience draft={draft} setDraft={setDraft} />}
            {step === 3 && <StepSkills draft={draft} setDraft={setDraft} />}
          </SurfaceCard>
          <div className="mt-3 flex shrink-0 justify-between">
            <Button
              variant="outline"
              onClick={() => setStep(s => (s - 1) as Step)}
              disabled={step === 0}
            >
              <ArrowLeft size={15} className="mr-1" />
              Quay lại
            </Button>
            {step < 3 ? (
              <Button onClick={() => setStep(s => (s + 1) as Step)}>
                Tiếp theo
                <ArrowRight size={15} className="ml-1" />
              </Button>
            ) : (
              <Button className="border-0 bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md hover:opacity-90 active:scale-95">
                <Download size={16} className="mr-1.5" /> Tải xuống PDF
              </Button>
            )}
          </div>
        </div>

        {/* Right – Sidekick + Preview */}
        <div className="hidden flex-col gap-4 overflow-y-auto lg:flex lg:w-[45%]">
          <Sidekick draft={draft} setDraft={setDraft} />
          <SurfaceCard className="flex min-h-0 flex-1 flex-col">
            <div className="mb-2 flex shrink-0 items-center gap-2">
              <span className="flex h-2 w-2 animate-pulse rounded-full bg-green-400" />
              <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                Live Preview
              </p>
              <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                {draft.template === 'ats'
                  ? 'ATS'
                  : draft.template === 'creative'
                    ? 'Creative'
                    : 'Business'}
              </span>
            </div>
            <div className="min-h-0 flex-1">
              <Preview draft={draft} />
            </div>
          </SurfaceCard>
        </div>
      </div>
    </div>
  );
}
