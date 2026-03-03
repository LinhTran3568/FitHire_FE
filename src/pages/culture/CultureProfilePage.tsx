import { Badge, Button, CultureRadarChart, SectionTitle, SurfaceCard } from '@components/ui';
import { BookmarkPlus, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const cultureDimensions = [
  { label: 'Sang tao', value: 84 },
  { label: 'Ky luat', value: 71 },
  { label: 'Teamwork', value: 88 },
  { label: 'Ap luc', value: 76 },
  { label: 'Thau cam', value: 81 },
];

export default function CultureProfilePage() {
  return (
    <div className="space-y-6">
      <SectionTitle
        title="Your Culture Profile"
        subtitle="Ket qua van hoa sau bai test va tong hop bang AI."
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_22rem]">
        <SurfaceCard>
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Spider Chart</h3>
          <div className="flex justify-center">
            <CultureRadarChart data={cultureDimensions} />
          </div>
        </SurfaceCard>

        <SurfaceCard className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-900">AI Summary</h3>
          </div>

          <p className="rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-sm leading-relaxed text-slate-700">
            Ban la mau nhan su "Nguoi ket noi", phu hop moi truong lam viec mo, de cao hop tac va
            sang tao. Ban giu duoc su binh tinh trong ap luc va co kha nang ket noi team tot. Neu
            lam trong startup, ban co the tao tac dong nhanh va ro net.
          </p>

          <div className="flex flex-wrap gap-2">
            <Badge variant="success">Top trait: Teamwork</Badge>
            <Badge variant="info">Growth: Ky luat</Badge>
          </div>

          <Button className="w-full">
            <BookmarkPlus size={16} />
            <span>Luu vao ho so</span>
          </Button>
          <Link to="/culture/matching">
            <Button variant="outline" className="w-full">
              Di toi Culture Matching
            </Button>
          </Link>
        </SurfaceCard>
      </div>
    </div>
  );
}
