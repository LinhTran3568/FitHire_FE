import {
  Badge,
  CircularGauge,
  Button,
  SectionTitle,
  SurfaceCard,
} from '@components/ui';
import { Building2, Link as LinkIcon, WandSparkles } from 'lucide-react';


const alignmentPoints = [
  'Cung de cao su minh bach trong giao tiep va feedback.',
  'Cung uu tien tinh chu dong va toc do trien khai.',
  'Co xu huong hoc nhanh qua du an thuc te.',
];

const cautionPoints = [
  'Cong ty co chu ky release gap, tan suat overtime cao theo mua.',
  'Quy trinh phe duyet nhieu buoc, can kien nhan va ky luat cao.',
  'Can tiep nhan feedback truc dien thuong xuyen tu cap quan ly.',
];

export default function CultureMatchingPage() {
  return (
    <div className="space-y-6">
      <SectionTitle
        title="Culture Matching"
        subtitle="So khop ho so van hoa cua ban voi cong ty/JD muc tieu."
      />

      <SurfaceCard className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Dan link JD</span>
            <div className="flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2">
              <LinkIcon size={16} className="text-slate-400" />
              <input
                type="text"
                placeholder="https://company.com/jobs/backend-intern"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Hoac chon cong ty</span>
            <div className="flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2">
              <Building2 size={16} className="text-slate-400" />
              <select className="w-full bg-transparent text-sm outline-none">
                <option>Techify Vietnam</option>
                <option>NextGen Solutions</option>
                <option>FinStack</option>
              </select>
            </div>
          </label>
        </div>

        <div className="flex justify-end">
          <Button>
            <WandSparkles size={16} />
            <span>Phan tich matching</span>
          </Button>
        </div>
      </SurfaceCard>

      <div className="grid gap-5 xl:grid-cols-[22rem_1fr]">
        <SurfaceCard className="flex flex-col items-center justify-center">
          <CircularGauge value={85} label="Matching Score" />
          <p className="mt-4 text-center text-sm text-slate-600">
            Ban khop <span className="font-semibold text-slate-900">85%</span> voi van hoa cua
            <span className="font-semibold text-slate-900"> Cong ty X</span>.
          </p>
        </SurfaceCard>

        <div className="space-y-5">
          <SurfaceCard>
            <h3 className="text-lg font-semibold text-slate-900">Diem cham</h3>
            <div className="mt-3 space-y-2">
              {alignmentPoints.map(point => (
                <div key={point} className="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                  {point}
                </div>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <h3 className="text-lg font-semibold text-slate-900">Diem can luu y</h3>
            <div className="mt-3 space-y-2">
              {cautionPoints.map(point => (
                <div key={point} className="rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-sm text-amber-800">
                  {point}
                </div>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <div className="flex items-center gap-2">
              <Badge variant="info">Loi khuyen tu FitHire</Badge>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Neu ban lam o day, hay chuan bi tinh than cho quy trinh nghiem ngat va milestone gap.
              Doi lai, ban se hoc duoc rat nhieu ve cach van hanh du an quy mo lon va ky nang phoi
              hop lien phong ban.
            </p>
          </SurfaceCard>
        </div>
      </div>
    </div>
  );
}
