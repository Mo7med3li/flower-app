"use client";
import UpdateUserForm from "./_components/update-user-form";
import { useFetchUserData } from "./_hooks/use-fetch-user-data";

const ProfilePage = () => {
  const { data, isLoading, error } = useFetchUserData();
  if (!data) {
    return <div>not found</div>;
  }
  return (
    <div>
      <UpdateUserForm user={data.user} />
    </div>
  );
};

export default ProfilePage;
