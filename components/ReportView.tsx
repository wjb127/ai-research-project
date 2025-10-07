'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useSearchStore } from '@/store/useSearchStore';

export default function ReportView() {
  const { query, report, sources } = useSearchStore();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Report Content */}
      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              리포트
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              &quot;{query}&quot;에 대한 연구 리포트
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {report}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Reference Sources Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            참고 자료
          </h3>

          <div className="space-y-4">
            {sources.map((source, index) => (
              <div
                key={index}
                className="border-l-4 border-indigo-500 pl-4 py-2"
              >
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                  {index + 1}. {source.title || `출처 ${index + 1}`}
                </p>
                {source.url && (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline break-all"
                  >
                    {source.url}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => window.print()}
              className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200
                rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
            >
              🖨️ 인쇄하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
