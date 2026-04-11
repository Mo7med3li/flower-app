import { Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BestSellingEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
              <Package className="h-8 w-8 text-gray-600 dark:text-gray-400" />
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No Best-Selling Products Yet
          </h3>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Our best-selling collection is being curated. Check back soon for amazing products!
          </p>

          <div className="flex justify-center space-x-4">
            <Button variant="outline" className="border-gray-300 dark:border-gray-600">
              Browse All Products
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white">Explore Categories</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
