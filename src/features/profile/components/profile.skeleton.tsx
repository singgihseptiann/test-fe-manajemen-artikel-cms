import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="space-y-4">
      {/* Title Skeleton */}
      <Skeleton className="mx-auto h-6 w-40 rounded-md" />

      {/* Avatar Skeleton */}
      <div className="flex justify-center">
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>

      {/* DetailProfile Skeleton */}
      <div className="mx-auto w-72 max-w-md md:w-96">
        <div className="space-y-2 overflow-hidden rounded-lg border border-gray-200 p-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>

      {/* Button Skeleton */}
      <Skeleton className="mx-auto h-10 w-72 max-w-md md:w-96" />
    </div>
  );
}
