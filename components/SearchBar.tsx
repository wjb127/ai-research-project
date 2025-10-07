'use client';

import { useState, FormEvent } from 'react';
import { useSearchStore } from '@/store/useSearchStore';

interface SearchBarProps {
  compact?: boolean;
}

export default function SearchBar({ compact = false }: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');
  const { setQuery, setIsSearching, setSources, reset } = useSearchStore();

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    reset();
    setQuery(inputValue);
    setIsSearching(true);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: inputValue }),
      });

      if (!response.ok) throw new Error('Search failed');

      const data = await response.json();
      setSources(data.sources || []);
    } catch (error) {
      console.error('Search error:', error);
      alert('검색 중 오류가 발생했습니다.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleNewSearch = () => {
    setInputValue('');
    reset();
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className={`flex gap-3 ${compact ? 'flex-row' : 'flex-col sm:flex-row'}`}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="예: 양자컴퓨팅의 최신 트렌드는?"
          className={`flex-1 px-6 py-4 rounded-lg border border-gray-300 dark:border-gray-600
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
            focus:ring-2 focus:ring-indigo-500 focus:border-transparent
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            ${compact ? 'text-sm' : 'text-lg'}`}
        />
        <div className="flex gap-3">
          <button
            type="submit"
            className={`px-8 bg-indigo-600 text-white rounded-lg
              hover:bg-indigo-700 transition-colors font-medium
              ${compact ? 'py-2 text-sm' : 'py-4'}`}
          >
            검색
          </button>
          {compact && (
            <button
              type="button"
              onClick={handleNewSearch}
              className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200
                rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors text-sm"
            >
              새 검색
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
