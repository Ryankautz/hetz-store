import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingProduto() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50/40 dark:bg-zinc-950/20">
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="bg-white dark:bg-zinc-900/60 rounded-3xl border border-zinc-200 dark:border-zinc-800/80 p-6 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image Skeleton */}
            <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl flex items-center justify-center p-8">
              <Skeleton className="w-3/4 h-3/4 rounded-xl bg-zinc-200 dark:bg-zinc-700" />
            </div>

            {/* Details Skeleton */}
            <div className="flex flex-col">
              <Skeleton className="h-6 w-32 rounded-full bg-zinc-200 dark:bg-zinc-800 mb-6" />
              <Skeleton className="h-10 md:h-12 w-full bg-zinc-200 dark:bg-zinc-800 mb-4" />
              <Skeleton className="h-10 md:h-12 w-2/3 bg-zinc-200 dark:bg-zinc-800 mb-6" />

              <div className="flex items-center gap-4 mb-8">
                <Skeleton className="h-5 w-32 bg-zinc-200 dark:bg-zinc-800" />
                <Skeleton className="h-5 w-40 bg-zinc-200 dark:bg-zinc-800" />
              </div>

              <div className="space-y-2 mb-10 pb-10 border-b border-zinc-200 dark:border-zinc-800">
                <Skeleton className="h-12 w-48 bg-zinc-200 dark:bg-zinc-800 mb-2" />
                <Skeleton className="h-5 w-64 bg-zinc-200 dark:bg-zinc-800" />
              </div>

              <div className="space-y-4 mb-10">
                <Skeleton className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800 mb-2" />
                <Skeleton className="h-4 w-full bg-zinc-100 dark:bg-zinc-900" />
                <Skeleton className="h-4 w-full bg-zinc-100 dark:bg-zinc-900" />
                <Skeleton className="h-4 w-3/4 bg-zinc-100 dark:bg-zinc-900" />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Skeleton className="h-14 w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
