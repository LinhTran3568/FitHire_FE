import { Badge, Button, SectionTitle, SurfaceCard } from '@components/ui';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';


const candidates = [
  {
    id: 'minh-nguyen',
    name: 'Minh Nguyen',
    cvScore: 81,
    interviewScore: 84,
    cultureFit: 88,
  },
  {
    id: 'trang-le',
    name: 'Trang Le',
    cvScore: 77,
    interviewScore: 79,
    cultureFit: 82,
  },
  {
    id: 'huy-tran',
    name: 'Huy Tran',
    cvScore: 74,
    interviewScore: 72,
    cultureFit: 68,
  },
  {
    id: 'linh-pham',
    name: 'Linh Pham',
    cvScore: 86,
    interviewScore: 90,
    cultureFit: 91,
  },
];

export default function HrCandidatesPage() {
  const [highFitOnly, setHighFitOnly] = useState(true);

  const filteredCandidates = useMemo(() => {
    if (!highFitOnly) return candidates;
    return candidates.filter(candidate => candidate.cultureFit > 80);
  }, [highFitOnly]);

  return (
    <div className="space-y-6">
      <SectionTitle
        title="HR SME Dashboard"
        subtitle="Theo dõi ứng viên qua điểm CV, điểm phỏng vấn AI và mức Culture Fit."
      />

      <SurfaceCard className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-semibold text-slate-900">Danh sách ứng viên</h3>
          <div className="flex items-center gap-2">
            <Button
              variant={highFitOnly ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setHighFitOnly(true)}
            >
              Culture Fit &gt; 80%
            </Button>
            <Button
              variant={!highFitOnly ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setHighFitOnly(false)}
            >
              Tất cả
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-slate-600">
              <tr>
                <th className="px-4 py-3 font-medium">Ứng viên</th>
                <th className="px-4 py-3 font-medium">Điểm CV</th>
                <th className="px-4 py-3 font-medium">Điểm Phỏng vấn AI</th>
                <th className="px-4 py-3 font-medium">Culture Fit</th>
                <th className="px-4 py-3 font-medium">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredCandidates.map(candidate => (
                <tr key={candidate.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{candidate.name}</td>
                  <td className="px-4 py-3 text-slate-700">{candidate.cvScore}</td>
                  <td className="px-4 py-3 text-slate-700">{candidate.interviewScore}</td>
                  <td className="px-4 py-3">
                    <Badge variant={candidate.cultureFit > 80 ? 'success' : 'warning'}>
                      {candidate.cultureFit}%
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Link to={`/hr/candidates/${candidate.id}`} className="text-blue-600 hover:text-blue-700">
                      Xem chi tiết
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SurfaceCard>
    </div>
  );
}
