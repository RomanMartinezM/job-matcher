import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type AppState = {
  savedJobIds: number[]
  toggleSavedJob: (jobId: number) => void
}

// Zustand keeps the small piece of cross-page UI state used by this dashboard.
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // The prototype opens with its first and fifth demo listings saved.
      savedJobIds: [1, 5],
      toggleSavedJob: (jobId) =>
        set((state) => ({
          savedJobIds: state.savedJobIds.includes(jobId)
            ? state.savedJobIds.filter((savedId) => savedId !== jobId)
            : [...state.savedJobIds, jobId],
        })),
    }),
    {
      name: "jobmatcher-saved-jobs",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ savedJobIds: state.savedJobIds }),
    },
  ),
)
