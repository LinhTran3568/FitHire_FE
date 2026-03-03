import { Button, Badge, SectionTitle, SurfaceCard } from '@components/ui';
import { Compass, Lightbulb, UserRoundSearch } from 'lucide-react';
import { Link } from 'react-router-dom';

const traits = [
  { label: 'Problem Solving', value: 86 },
  { label: 'Collaboration', value: 79 },
  { label: 'Adaptability', value: 83 },
  { label: 'Leadership Potential', value: 72 },
];

export default function SelfDiscoveryPage() {
  return (
    <div className="space-y-6">
      <SectionTitle
        title="Kham pha ban than"
        subtitle="Hieu phong cach lam viec va nang luc hien tai de chon JD phu hop."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <SurfaceCard className="md:col-span-2">
          <div className="mb-4 flex items-center gap-2 text-slate-800">
            <Compass size={18} />
            <h3 className="font-semibold">Ho so nang luc ca nhan</h3>
          </div>
          <div className="space-y-4">
            {traits.map(trait => (
              <div key={trait.label}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-slate-700">{trait.label}</span>
                  <span className="font-medium text-slate-900">{trait.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                    style={{ width: `${trait.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard className="space-y-4">
          <div className="flex items-center gap-2 text-slate-800">
            <Lightbulb size={18} />
            <h3 className="font-semibold">Goi y nghe nghiep</h3>
          </div>
          <Badge variant="info">Product-oriented Engineer</Badge>
          <Badge variant="success">Backend Intern</Badge>
          <Badge variant="warning">QA Automation</Badge>
        </SurfaceCard>
      </div>

      <SurfaceCard>
        <div className="flex items-center gap-2 text-slate-800">
          <UserRoundSearch size={18} />
          <h3 className="font-semibold">Insight tu AI</h3>
        </div>
        <p className="mt-3 leading-relaxed text-slate-700">
          Ban phu hop cac moi truong hoc nhanh, trao quyen va co nhip do trien khai cao. De tang kha
          nang trung tuyen, hay tap trung cai thien cach ke ve impact dinh luong trong cac du an da
          lam.
        </p>

        <div className="mt-4">
          <Link to="/culture/tests">
            <Button>Lam Culture Fit Test</Button>
          </Link>
        </div>
      </SurfaceCard>
    </div>
  );
}
