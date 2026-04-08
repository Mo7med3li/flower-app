"use client";

import { Bell, BrushCleaning, CheckCheck } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useReadAllNotifications } from "@/hooks/notifications/use-read-all-notification";
import { useDeleteAllNotifications } from "@/hooks/notifications/use-delete-all-notifications";
import { fetchUserNotification } from "@/lib/api/notifications";
import NotificationItemSkeleton from "@/components/skeletons/notifications/notification-item.skeleton";
import NotificationCard from "./notification-card";
import EmptyNotification from "./empty-notification";
import TooltipCom from "../tooltip-com";

export default function Notification() {
  // Translations
  const t = useTranslations();
  const format = useFormatter();

  const {
    data: payload,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["Notifications"],
    queryFn: async ({ pageParam }) => {
      return await fetchUserNotification({ pageParam });
    },
    initialPageParam: 1,
    getNextPageParam: (LastPage) => {
      if (LastPage.payload.metadata.page === LastPage.payload.metadata.totalPages) return undefined;
      return LastPage.payload.metadata.page + 1;
    },
  });

  // Mutations
  const { deletePending, allNotificationsDelete } = useDeleteAllNotifications();
  const { readPending, readAllNotificationsMutate } = useReadAllNotifications();

  // Variables
  const notificationsFetched = payload?.pages?.flatMap((page) => page.payload.data) ?? [];
  const unreadCount = payload?.pages?.[0]?.metadata?.total ?? 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative">
          <div className="relative">
            <TooltipCom
              title={t("open-notifications")}
              icon={<Bell className="cursor-pointer size-6" />}
              isLoading={isLoading}
              count={unreadCount}
            />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-medium leading-none text-white ring-2 ring-white dark:bg-red-500 dark:ring-zinc-900">
                {format.number(unreadCount, "number-base")}
              </span>
            )}
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="relative w-[400px] rounded-2xl border-0 p-0"
        id="notifications"
      >
        {/* Heading */}
        <DropdownMenuLabel className="flex h-[58px] items-center bg-maroon-700 p-4 text-xl font-bold text-white dark:bg-soft-pink-200 dark:text-zinc-800">
          {t("notifications")} ({unreadCount})
        </DropdownMenuLabel>

        {/* Actions */}
        <DropdownMenuGroup className="p-[10px] dark:bg-zinc-700">
          <div className="flex items-center justify-between">
            <div className="flex cursor-pointer items-center">
              {/* Clear All Notifications */}
              <Button
                variant="ghost"
                className="text-xs font-semibold dark:text-zinc-500"
                onClick={() => allNotificationsDelete()}
                disabled={deletePending || notificationsFetched.length === 0}
              >
                <BrushCleaning size={14} color="#71717A" />
                {t("clear-all-notifications")}
              </Button>
            </div>

            <div className="flex cursor-pointer items-center gap-[6px]">
              {/* Read All Notifications */}
              <Button
                className="text-xs font-semibold dark:text-zinc-500"
                variant="ghost"
                onClick={() => readAllNotificationsMutate()}
                disabled={readPending || notificationsFetched.length === 0 || unreadCount === 0}
              >
                <CheckCheck size={14} color="#71717A" />
                {t("mark-all-as-read")}
              </Button>
            </div>
          </div>
        </DropdownMenuGroup>

        <DropdownMenuGroup className="flex flex-col items-center justify-center p-0">
          {/* loading */}
          {isLoading ? (
            // Loading Skeleton
            <div>
              <NotificationItemSkeleton />
              <NotificationItemSkeleton />
              <NotificationItemSkeleton />
              <NotificationItemSkeleton />
            </div>
          ) : notificationsFetched.length === 0 ? (
            <EmptyNotification />
          ) : (
            // Fetching Next Page
            <InfiniteScroll
              next={fetchNextPage}
              scrollableTarget="notifications"
              hasMore={hasNextPage}
              loader={<NotificationItemSkeleton />}
              dataLength={notificationsFetched.length}
            >
              {notificationsFetched.map(
                (notification: {
                  id?: string;
                  message: string;
                  title: string;
                  link: string;
                  userId: string;
                  createdAt: string;
                  updatedAt: string;
                  type: string[];
                  isRead: boolean;
                }) => (
                  <NotificationCard key={notification.id} notification={notification} />
                ),
              )}
            </InfiniteScroll>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
