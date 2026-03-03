import { cn } from '@lib/utils';

interface RadarPoint {
  label: string;
  value: number;
}

interface CultureRadarChartProps {
  data: RadarPoint[];
  size?: number;
  className?: string;
}

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInRadians: number,
) {
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

export function CultureRadarChart({ data, size = 320, className }: CultureRadarChartProps) {
  const clampedData = data.map(item => ({
    ...item,
    value: Math.max(0, Math.min(100, item.value)),
  }));
  const center = size / 2;
  const maxRadius = size * 0.33;
  const levels = 5;

  const points = clampedData.map((item, index) => {
    const angle = (Math.PI * 2 * index) / clampedData.length - Math.PI / 2;
    const radius = (item.value / 100) * maxRadius;
    return polarToCartesian(center, center, radius, angle);
  });

  const polygonPoints = points.map(point => `${point.x},${point.y}`).join(' ');

  return (
    <div className={cn('inline-flex flex-col items-center gap-4', className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {Array.from({ length: levels }).map((_, levelIndex) => {
          const radius = maxRadius * ((levelIndex + 1) / levels);
          const ringPoints = clampedData
            .map((_, pointIndex) => {
              const angle = (Math.PI * 2 * pointIndex) / clampedData.length - Math.PI / 2;
              const point = polarToCartesian(center, center, radius, angle);
              return `${point.x},${point.y}`;
            })
            .join(' ');

          return (
            <polygon
              key={`ring-${levelIndex + 1}`}
              points={ringPoints}
              fill="none"
              stroke="#cbd5e1"
              strokeWidth={1}
            />
          );
        })}

        {clampedData.map((item, index) => {
          const angle = (Math.PI * 2 * index) / clampedData.length - Math.PI / 2;
          const axisEnd = polarToCartesian(center, center, maxRadius, angle);
          return (
            <line
              key={`axis-${item.label}`}
              x1={center}
              y1={center}
              x2={axisEnd.x}
              y2={axisEnd.y}
              stroke="#cbd5e1"
              strokeWidth={1}
            />
          );
        })}

        <polygon points={polygonPoints} fill="#2563eb33" stroke="#2563eb" strokeWidth={2} />

        {points.map((point, index) => (
          <circle
            key={`dot-${clampedData[index]?.label ?? index}`}
            cx={point.x}
            cy={point.y}
            r={4}
            fill="#1d4ed8"
          />
        ))}
      </svg>

      <div className="grid w-full grid-cols-2 gap-2 text-xs text-slate-600 sm:grid-cols-3">
        {clampedData.map(item => (
          <div key={`legend-${item.label}`} className="rounded-md bg-slate-100 px-2 py-1">
            {item.label}: <span className="font-semibold text-slate-800">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
