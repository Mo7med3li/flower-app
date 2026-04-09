import { useFormatter } from "next-intl";
import React from "react";
import Stars from "./stars";

type RateUserProps = {
  rating: number;
  user: { firstName: string; lastName: string; username: string };
};

export default function RateUser({ rating, user }: RateUserProps) {
  const format = useFormatter();

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        {/* User Avatar */}
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-maroon-500 to-maroon-700 flex items-center text-white justify-center rounded-full shadow-md">
            <span className="text-lg font-semibold">
              {user.firstName.slice(0, 1).toUpperCase()}
            </span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        </div>

        {/* User Info */}
        <div className="flex flex-col">
          <h4 className="text-base font-semibold text-gray-900 dark:text-white leading-tight">
            {user.username}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{format.dateTime(new Date())}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-full">
        <Stars rating={rating} />
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {rating.toFixed(1)}
        </span>
      </div>
    </div>
  );
}
