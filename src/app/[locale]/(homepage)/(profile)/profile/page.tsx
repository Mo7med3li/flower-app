"use client";
import UpdateUserFormSkeleton from "@/components/skeletons/profile/update-profile.skeleton";
import UpdateUserForm from "./_components/update-user-form";
import { useFetchUserData } from "./_hooks/use-fetch-user-data";

const ProfilePage = () => {
  const { data, isLoading } = useFetchUserData();
  if (!data || isLoading) {
    return <UpdateUserFormSkeleton />;
  }
  return (
    <div>
      <UpdateUserForm user={data.user} />
    </div>
  );
};

export default ProfilePage;
