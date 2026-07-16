import { Skeleton } from '@/components/ui/skeleton'

export const CheckoutSkeleton = () => (
  <div className="min-h-screen bg-tpl-surface-muted">
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <Skeleton className="mb-8 h-6 w-40" />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_400px]">
        <div className="flex flex-col gap-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-tpl-lg bg-tpl-surface-raised p-6 shadow-sm">
              <Skeleton className="mb-6 h-7 w-48" />
              <div className="flex flex-col gap-4">
                <Skeleton className="h-11 w-full rounded-tpl" />
                <Skeleton className="h-11 w-full rounded-tpl" />
                <div className="flex gap-4">
                  <Skeleton className="h-11 flex-1 rounded-tpl" />
                  <Skeleton className="h-11 flex-1 rounded-tpl" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-fit rounded-tpl-lg bg-tpl-surface-raised p-6 shadow-sm lg:sticky lg:top-24">
          <Skeleton className="mb-6 h-7 w-40" />
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="mb-4 flex gap-4">
              <Skeleton className="h-16 w-16 shrink-0 rounded-tpl" />
              <div className="flex-1">
                <Skeleton className="mb-2 h-5 w-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))}
          <Skeleton className="my-6 h-px w-full" />
          <div className="flex flex-col gap-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-7 w-full" />
          </div>
          <Skeleton className="mt-6 h-12 w-full rounded-full" />
        </div>
      </div>
    </div>
  </div>
)
