import { Badge, Button, SectionTitle, SurfaceCard } from '@components/ui';
import { Users, Filter, TrendingUp, ArrowRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const candidates = [
  { id: 'minh-nguyen', name: 'Minh Nguyen', cvScore: 81, interviewScore: 84, cultureFit: 88 },
  { id: 'trang-le', name: 'Trang Le', cvScore: 77, interviewScore: 79, cultureFit: 82 },
  { id: 'huy-tran', name: 'Huy Tran', cvScore: 74, interviewScore: 72, cultureFit: 68 },
  { id: 'linh-pham', name: 'Linh Pham', cvScore: 86, interviewScore: 90, cultureFit: 91 },
];

export default function HrCandidatesPage() {
  const [highFitOnly, setHighFitOnly] = useState(true);

  const filteredCandidates = useMemo(() => {
    if (!highFitOnly) return candidates;
    return candidates.filter(c => c.cultureFit > 80);
  }, [highFitOnly]);

  return (
    <div className="space-y-6">
      <SectionTitle
        title="HR SME Dashboard"
        subtitle="Theo dõi ứng viên qua điểm CV, điểm phỏng vấn AI và mức Culture Fit."
      />

      <SurfaceCard className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Users size={16} style={{ color: 'var(--color-primary)' }} />
            <h3 className="font-bold" style={{ color: 'var(--color-text)' }}>
              Danh sách ứng viên
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} style={{ color: 'var(--color-text-muted)' }} />
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

        <div
          className="overflow-x-auto rounded-xl"
          style={{ border: '1px solid var(--color-border)' }}
        >
          <table
            className="min-w-full divide-y text-sm"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <thead
              style={{
                background: 'var(--color-surface-raised)',
                color: 'var(--color-text-muted)',
              }}
            >
              <tr>
                {['Ứng viên', 'Điểm CV', 'Điểm Phỏng vấn AI', 'Culture Fit', 'Hành động'].map(
                  col => (
                    <th
                      key={col}
                      className="px-4 py-3 text-left text-xs font-bold tracking-wide uppercase"
                    >
                      {col}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody
              className="divide-y"
              style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              {filteredCandidates.map(candidate => (
                <tr
                  key={candidate.id}
                  className="transition-colors"
                  style={{ borderColor: 'var(--color-border)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background =
                      'var(--color-surface-raised)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'var(--color-surface)';
                  }}
                >
                  <td className="px-4 py-3 font-semibold" style={{ color: 'var(--color-text)' }}>
                    <div className="flex items-center gap-2.5">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black text-white"
                        style={{ background: 'var(--color-primary)' }}
                      >
                        {candidate.name.charAt(0)}
                      </div>
                      {candidate.name}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp size={13} style={{ color: 'var(--color-success)' }} />
                      <span style={{ color: 'var(--color-text-secondary)' }}>
                        {candidate.cvScore}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3" style={{ color: 'var(--color-text-secondary)' }}>
                    {candidate.interviewScore}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={candidate.cultureFit > 80 ? 'success' : 'warning'}>
                      {candidate.cultureFit}%
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Link to={`/hr/candidates/${candidate.id}`}>
                      <button
                        className="flex items-center gap-1 text-xs font-bold hover:opacity-80"
                        style={{ color: 'var(--color-primary)' }}
                      >
                        Xem chi tiết <ArrowRight size={12} />
                      </button>
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
