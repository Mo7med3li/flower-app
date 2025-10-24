"use client";

import { useForm } from "react-hook-form";
import { useRef } from "react";
import { CloudUpload, Loader } from "lucide-react";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useUpdateProfilePhoto from "../_hooks/use-update-profile-photo";

const UserPhotoSection = ({ user }: { user: ApplicationUser }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const form = useForm({
    defaultValues: {
      photo: user.photo,
    },
  });

  const { updateProfilePhotoMutation, isPending, error } = useUpdateProfilePhoto();
  const onSubmit = async () => {
    const formData = new FormData(formRef.current ?? undefined);
    updateProfilePhotoMutation(formData);
  };
  return (
    <section className="flex items-center gap-4">
      <Form {...form}>
        <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-9">
          <div className="relative ">
            {isPending && (
              <div className="w-full h-full rounded-full overflow-hidden bg-maroon-600 dark:bg-soft-pink-300 absolute top-0 left-0 flex items-center justify-center animate-spin">
                <Loader className="size-5" />
              </div>
            )}
            <Image
              src={user.photo || "/placeholder.jpg"}
              className="rounded-full"
              alt={user.firstName}
              width={120}
              height={120}
            />
            <div
              onClick={handleUploadClick}
              className=" absolute bottom-0 end-0 rounded-full border bg-zinc-50  border-zinc-200 p-2"
            >
              <CloudUpload size={20} />
              <FormField
                control={form.control}
                name="photo"
                render={({}) => (
                  <FormItem>
                    {/* Label */}
                    <FormLabel className="sr-only">Upload Photo</FormLabel>

                    {/* Field */}
                    <FormControl>
                      <input
                        name="photo"
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={form.handleSubmit(onSubmit)}
                        className="hidden"
                      />
                    </FormControl>

                    {/* Feedback */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>

      <div className="flex flex-col gap-4 text-zinc-800 dark:text-zinc-200">
        <p className="font-semibold text-xl">Update Photo</p>
        <p className="text-zinc-500">
          You can upload a .jpg, .png, or .gif photo with max size of 4MB.
        </p>

        {error && <p className="text-red-500 text-xl font-semibold">{error.message}</p>}
      </div>
    </section>
  );
};

export default UserPhotoSection;
