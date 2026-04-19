import { Loader } from "lucide-react";
import { useFormatter } from "next-intl";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
const TooltipCom = ({
  title,
  icon,
  isLoading,
  count,
}: {
  title: string;
  icon: React.ReactNode;
  isLoading: boolean;
  count: number;
}) => {
  // translations
  const format = useFormatter();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label={title}
            className="rounded-md p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {icon}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
      {isLoading ? (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-zinc-400 px-1 text-[10px] font-medium leading-none text-white ring-2 ring-white dark:bg-zinc-600 dark:ring-zinc-900">
          <Loader className="size-3 animate-spin" />
        </span>
      ) : count > 0 ? (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-medium leading-none text-white ring-2 ring-white dark:bg-red-500 dark:ring-zinc-900">
          {format.number(count, "number-base")}
        </span>
      ) : null}
    </TooltipProvider>
  );
};

export default TooltipCom;
