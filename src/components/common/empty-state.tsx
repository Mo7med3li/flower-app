import { Search } from "lucide-react";

function EmptyState({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="col-span-9">
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-200 p-10 text-center dark:border-neutral-800 bg-white dark:bg-zinc-700">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 dark:bg-zinc-500 dark:text-neutral-300">
          {/* Magnifying glass icon */}
          <Search className="h-7 w-7" />
        </div>
        <h3 className="mb-1 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {title}
        </h3>
        {subtitle ? (
          <p className="max-w-md text-sm text-neutral-500 dark:text-neutral-400">{subtitle}</p>
        ) : null}
      </div>
    </div>
  );
}

export default EmptyState;
