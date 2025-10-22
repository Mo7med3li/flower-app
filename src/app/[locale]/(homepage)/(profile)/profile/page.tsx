"use client";
import { useFetchUserData } from "./_hooks/use-fetch-user-data";

const ProfilePage = () => {
  const { data, isLoading, error } = useFetchUserData();
  if (!data) {
    return <div>not found</div>;
  }
  return <div>{data.user.email}</div>;
};

export default ProfilePage;
