'use client';

import { useState } from 'react';
import { useSearchStore } from '@/store/useSearchStore';
import SearchBar from '@/components/SearchBar';
import SearchResults from '@/components/SearchResults';
import ReportView from '@/components/ReportView';
import HistorySidebar from '@/components/HistorySidebar';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  const [showHistory, setShowHistory] = useState(false);
  const { sources, report, isSearching, isGenerating } = useSearchStore();

  const showResults = sources.length > 0 && !report;
  const showReport = report.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            🔍 스마트 리서치 어시스턴트
          </h1>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            히스토리
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar - Always visible at top when results/report are shown */}
        {(showResults || showReport) && (
          <div className="mb-8">
            <SearchBar compact />
          </div>
        )}

        {/* Initial State - Centered Search */}
        {!showResults && !showReport && !isSearching && !isGenerating && (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                무엇이 궁금하신가요?
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                AI가 최신 정보를 검색하고 구조화된 리포트를 생성해드립니다.
              </p>
            </div>
            <div className="w-full max-w-3xl">
              <SearchBar />
            </div>
          </div>
        )}

        {/* Loading State */}
        {(isSearching || isGenerating) && (
          <div className="flex flex-col items-center justify-center min-h-[40vh]">
            <LoadingSpinner />
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {isSearching ? '정보를 검색하는 중...' : '리포트를 생성하는 중...'}
            </p>
          </div>
        )}

        {/* Search Results */}
        {showResults && !isGenerating && <SearchResults />}

        {/* Report View */}
        {showReport && !isGenerating && <ReportView />}
      </main>

      {/* History Sidebar */}
      <HistorySidebar isOpen={showHistory} onClose={() => setShowHistory(false)} />
    </div>
  );
}
