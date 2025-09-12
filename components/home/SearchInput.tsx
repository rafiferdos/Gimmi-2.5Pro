'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const SearchInput = () => {
  const [value, setValue] = useState('');

  return (
    <div className="max-w-3xl mx-auto mt-4 p-6 rounded-lg bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <div className="mb-6">
        <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
          Hello, Gimmi <span className="animate-bounce inline-block">👋</span>
        </h2>
        <p className="mt-2 text-base md:text-lg text-gray-600 dark:text-gray-400">
          Ask anything — I&apos;ll help you draft, summarize, or brainstorm.
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {['Summarize my notes', 'Write an email', 'Generate product names'].map((t) => (
          <Button
            key={t}
            className="hover:scale-105 transition-all"
            size="sm"
            variant="secondary"
            onClick={() => setValue(t)}
          >
            {t}
          </Button>
        ))}
      </div>
      <form
        className="flex gap-3 items-center"
        onSubmit={(e) => {
          e.preventDefault(); /* future hook into search */
        }}
      >
        <Input
          aria-label="Ask me anything"
          className="flex-1"
          placeholder="Ask me anything... "
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button className="px-6" type="submit" variant="default">
          Go
        </Button>
        {value && (
          <Button size="sm" variant="outline" onClick={() => setValue('')}>
            Clear
          </Button>
        )}
      </form>
    </div>
  );
};
