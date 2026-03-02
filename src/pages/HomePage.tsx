import { Button } from '@components/ui';

/**
 * Home page – entry point for authenticated users.
 */
export default function HomePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 py-12 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        Welcome to <span className="text-blue-600">MyApp</span>
      </h1>

      <p className="text-lg text-gray-500">
        Your React + Vite + TypeScript + Tailwind CSS starter is ready.
        <br />
        Start building something great.
      </p>

      <div className="flex justify-center gap-3">
        <Button variant="primary" size="lg">
          Get Started
        </Button>
        <Button variant="outline" size="lg">
          View Docs
        </Button>
      </div>
    </div>
  );
}
