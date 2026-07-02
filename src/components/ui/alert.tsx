import { AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertProps {
  variant?: "warning" | "info" | "success" | "error";
  children: React.ReactNode;
  className?: string;
}

const Alert = ({ variant = "info", children, className }: AlertProps) => {
  const variants = {
    warning: {
      container: "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950",
      icon: "text-yellow-600 dark:text-yellow-400",
      text: "text-yellow-800 dark:text-yellow-200",
      Icon: AlertTriangle,
    },
    info: {
      container: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950",
      icon: "text-blue-600 dark:text-blue-400",
      text: "text-blue-800 dark:text-blue-200",
      Icon: Info,
    },
    success: {
      container: "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950",
      icon: "text-green-600 dark:text-green-400",
      text: "text-green-800 dark:text-green-200",
      Icon: CheckCircle,
    },
    error: {
      container: "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950",
      icon: "text-red-600 dark:text-red-400",
      text: "text-red-800 dark:text-red-200",
      Icon: XCircle,
    },
  } as const;

  const currentVariant = variants[variant];
  const Icon = currentVariant.Icon;

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg border",
        currentVariant.container,
        className,
      )}
    >
      <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", currentVariant.icon)} />
      <div className={cn("text-sm leading-relaxed", currentVariant.text)}>{children}</div>
    </div>
  );
};

export { Alert };
