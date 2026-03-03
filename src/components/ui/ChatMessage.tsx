import { cn } from '@lib/utils';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  text: string;
  hint?: string;
}

export function ChatMessage({ role, text, hint }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div className={cn('max-w-[85%] space-y-1', isUser ? 'items-end' : 'items-start')}>
        <div
          className={cn(
            'rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm',
            isUser ? 'rounded-br-md bg-blue-600 text-white' : 'rounded-bl-md bg-slate-100 text-slate-800',
          )}
        >
          {text}
        </div>
        {isUser && hint && <p className="text-xs text-slate-500">{hint}</p>}
      </div>
    </div>
  );
}
