'use client';

import { useSearchStore } from '@/store/useSearchStore';

export default function SearchResults() {
  const { query, sources, setIsGenerating, setReport } = useSearchStore();

  const handleGenerateReport = async () => {
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          context: sources.map(s => s.snippet).join('\n\n'),
          sources,
        }),
      });

      if (!response.ok) throw new Error('Report generation failed');

      const data = await response.json();
      setReport(data.report || '');

      // Save to history
      const historyItem = {
        id: Date.now().toString(),
        query,
        report: data.report,
        sources,
        createdAt: Date.now(),
      };

      await fetch('/api/save-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(historyItem),
      });
    } catch (error) {
      console.error('Report generation error:', error);
      alert('리포트 생성 중 오류가 발생했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          검색 결과
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          &quot;{query}&quot;에 대한 {sources.length}개의 정보를 찾았습니다.
        </p>
      </div>

      {/* Source Cards */}
      <div className="grid gap-4">
        {sources.map((source, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {source.title || `출처 ${index + 1}`}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {source.snippet}
                </p>
                {source.url && (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
                  >
                    {source.url}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Generate Report Button */}
      <div className="flex justify-center pt-6">
        <button
          onClick={handleGenerateReport}
          className="px-8 py-4 bg-indigo-600 text-white rounded-lg
            hover:bg-indigo-700 transition-colors font-medium text-lg
            shadow-lg hover:shadow-xl"
        >
          📝 리포트 생성하기
        </button>
      </div>
    </div>
  );
}
