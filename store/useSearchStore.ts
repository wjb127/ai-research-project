import { create } from 'zustand';
import { Source, SearchHistory } from '@/types';

interface SearchState {
  query: string;
  sources: Source[];
  report: string;
  isSearching: boolean;
  isGenerating: boolean;
  history: SearchHistory[];
  currentHistoryId: string | null;

  setQuery: (query: string) => void;
  setSources: (sources: Source[]) => void;
  setReport: (report: string) => void;
  setIsSearching: (isSearching: boolean) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setHistory: (history: SearchHistory[]) => void;
  setCurrentHistoryId: (id: string | null) => void;
  addToHistory: (item: SearchHistory) => void;
  removeFromHistory: (id: string) => void;
  reset: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  sources: [],
  report: '',
  isSearching: false,
  isGenerating: false,
  history: [],
  currentHistoryId: null,

  setQuery: (query) => set({ query }),
  setSources: (sources) => set({ sources }),
  setReport: (report) => set({ report }),
  setIsSearching: (isSearching) => set({ isSearching }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setHistory: (history) => set({ history }),
  setCurrentHistoryId: (currentHistoryId) => set({ currentHistoryId }),

  addToHistory: (item) => set((state) => ({
    history: [item, ...state.history]
  })),

  removeFromHistory: (id) => set((state) => ({
    history: state.history.filter((item) => item.id !== id)
  })),

  reset: () => set({
    query: '',
    sources: [],
    report: '',
    isSearching: false,
    isGenerating: false,
    currentHistoryId: null
  }),
}));
