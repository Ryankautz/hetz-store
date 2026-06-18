import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingGuitarras() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50/40 dark:bg-zinc-950/20">
      <section className="w-full bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800/60 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center flex flex-col items-center">
          <Skeleton className="h-6 w-32 rounded-full bg-zinc-200 dark:bg-zinc-800 mb-4" />
          <Skeleton className="h-10 md:h-12 w-64 md:w-96 bg-zinc-200 dark:bg-zinc-800 mb-3" />
          <Skeleton className="h-5 md:h-6 w-full max-w-xl bg-zinc-100 dark:bg-zinc-900" />
        </div>
      </section>
      <section className="container mx-auto px-4 md:px-6 py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 bg-white dark:bg-zinc-900/60 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 shadow-sm">
              <Skeleton className="h-6 w-24 mb-6 bg-zinc-200 dark:bg-zinc-800" />
              <div className="space-y-6">
                <div>
                  <Skeleton className="h-4 w-20 mb-2 bg-zinc-200 dark:bg-zinc-800" />
                  <Skeleton className="h-10 w-full rounded-lg bg-zinc-100 dark:bg-zinc-900" />
                </div>
                <div>
                  <Skeleton className="h-4 w-24 mb-2 bg-zinc-200 dark:bg-zinc-800" />
                  <Skeleton className="h-1.5 w-full rounded-lg bg-zinc-200 dark:bg-zinc-800 mb-2" />
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-12 bg-zinc-100 dark:bg-zinc-900" />
                    <Skeleton className="h-3 w-12 bg-zinc-100 dark:bg-zinc-900" />
                  </div>
                </div>
                <div>
                  <Skeleton className="h-6 w-full mb-2 bg-zinc-200 dark:bg-zinc-800" />
                </div>
              </div>
            </div>
          </aside>
          <div className="lg:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white dark:bg-zinc-900/40 p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800/50">
              <Skeleton className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800" />
              <Skeleton className="h-9 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
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
        </div>
      </section>
    </div>
  );
}
