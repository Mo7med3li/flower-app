import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import UpdateUserForm from "./_components/update-user-form";

export async function generateMetadata(): Promise<Metadata> {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return {
    title: ` ${user?.firstName} Profile`,
  };
}

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  return (
    <div>
      <UpdateUserForm user={user} />
    </div>
  );
};

export default ProfilePage;
