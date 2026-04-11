import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function BestSellingError({ onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <Card className="max-w-md w-full border-red-200 dark:border-red-800">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
              <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Oops! Something went wrong
          </h3>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We couldn&apos;t load our best-selling products. Please try again later.
          </p>

          <Button onClick={onRetry} className="bg-red-600 hover:bg-red-700 text-white">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
