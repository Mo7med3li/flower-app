"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="top-center"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          success:
            "group-[.toaster]:bg-green-300 group-[.toaster]:text-green-700 group-[.toaster]:border-green-600",
          error:
            "group-[.toaster]:bg-red-300 group-[.toaster]:text-red-700 group-[.toaster]:border-red-600",
          warning:
            "group-[.toaster]:bg-yellow-300 group-[.toaster]:text-yellow-700 group-[.toaster]:border-yellow-600",
          info: "group-[.toaster]:bg-blue-300 group-[.toaster]:text-blue-700 group-[.toaster]:border-blue-600",
          loading:
            "group-[.toaster]:bg-gray-300 group-[.toaster]:text-gray-700 group-[.toaster]:border-gray-600",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
