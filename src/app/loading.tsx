import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="relative w-full overflow-hidden bg-black py-24 md:py-32 flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center z-10">
          <Skeleton className="h-6 w-32 rounded-full bg-white/10 mb-6" />
          <Skeleton className="h-12 md:h-16 w-3/4 max-w-3xl bg-white/10 mb-6" />
          <Skeleton className="h-5 md:h-6 w-2/3 max-w-2xl bg-white/10 mb-8" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-40 rounded-full bg-white/20" />
            <Skeleton className="h-12 w-40 rounded-full bg-white/10" />
          </div>
        </div>
      </section>

      {/* Featured Products Skeleton */}
      <section className="w-full py-16 md:py-24 bg-zinc-50 dark:bg-zinc-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-10">
            <div className="space-y-4">
              <Skeleton className="h-8 md:h-10 w-64 bg-zinc-200 dark:bg-zinc-800" />
              <Skeleton className="h-5 w-48 bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col h-[400px] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-5 overflow-hidden">
                <Skeleton className="h-[200px] w-full rounded-xl bg-zinc-100 dark:bg-zinc-800 mb-4" />
                <Skeleton className="h-5 w-1/3 bg-zinc-200 dark:bg-zinc-800 mb-2" />
                <Skeleton className="h-6 w-full bg-zinc-200 dark:bg-zinc-800 mb-4" />
                <div className="mt-auto flex items-center justify-between">
                  <Skeleton className="h-6 w-24 bg-zinc-200 dark:bg-zinc-800" />
                  <Skeleton className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
