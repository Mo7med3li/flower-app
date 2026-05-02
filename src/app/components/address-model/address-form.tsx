"use client";
import React, { useCallback } from "react";
import { ArrowLeft, ArrowRight, MapPinHouse } from "lucide-react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
import { Marker } from "@react-google-maps/api";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  AddDressFormType,
  useAddressFormSchema,
} from "@/lib/schemas/address-model/address-form.schema";
import useAddAddress from "@/hooks/address/use-add-address";
import useUpdateAddress from "@/hooks/address/use-update-address";
import { Address } from "@/lib/types/user-addresses";

// types
declare global {
  interface Window {
    google: typeof google;
  }
}

// Type definitions
interface GoogleMapInstance {
  // eslint-disable-next-line no-unused-vars
  panTo: (latLng: { lat: number; lng: number }) => void;
  // eslint-disable-next-line no-unused-vars
  setZoom: (zoom: number) => void;
}

interface MapMouseEvent {
  latLng: google.maps.LatLng | null;
}

// Variables
const GOOGLE_MAPS_API_KEY = "AIzaSyA9WBTeIarf_WTg_STfDRLahYDgxLLMyRQ";

export default function AddressForm({
  steps,
  setSteps,
  setOpenDialog,
  address,
}: {
  steps: number;
  setSteps: React.Dispatch<React.SetStateAction<number>>;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  address?: Address;
}) {
  // Translations
  const t = useTranslations();
  const locale = useLocale();

  // States
  const [center, setCenter] = useState({
    lat: Number(address?.latitude) || 30.0123,
    lng: Number(address?.longitude) || 31.0123,
  });
  const [map, setMap] = useState<GoogleMapInstance | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>({
    lat: center.lat,
    lng: center.lng,
  });

  // Hooks
  const { addAddressFn, isPending } = useAddAddress();
  const { updateAddressFn, updateAddressPending } = useUpdateAddress();

  // Schema
  const addressFormSchema = useAddressFormSchema();

  // Form
  const form = useForm<AddDressFormType>({
    defaultValues: {
      title: address?.title || "",
      isPrimary: address?.isPrimary || false,
      street: address?.street || "",
      phone: address?.phone || "",
      city: address?.city || "",
      latitude: address?.latitude?.toString() || "",
      longitude: address?.longitude?.toString() || "",
    },
    resolver: zodResolver(addressFormSchema),
  });

  // Functions
  const onLoad = useCallback(function callback(map: GoogleMapInstance) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const getCurrentLocation = () => {
    if (!map) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(pos);
          map.panTo(pos);
          map.setZoom(15);

          // Update both state and form
          setSelectedLocation(pos);
          form.setValue("latitude", pos.lat.toString());
          form.setValue("longitude", pos.lng.toString());
        },
        () => {
          // Use console.warn instead of console.error, or handle the error properly
        },
      );
    }
  };

  const onMapClick = useCallback(
    (event: MapMouseEvent) => {
      if (!event.latLng) return;

      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      setSelectedLocation({ lat, lng });
      form.setValue("latitude", lat.toString());
      form.setValue("longitude", lng.toString());
    },
    [form],
  );

  // Submit handler
  const onsubmit: SubmitHandler<AddDressFormType> = (values) => {
    if (address) {
      updateAddressFn(
        { values, id: address.id },
        {
          onSuccess: () => {
            setOpenDialog(false);
            setSteps(1);
          },
        },
      );
    } else {
      addAddressFn(values, {
        onSuccess: () => {
          setOpenDialog(false);
          setSteps(1);
          form.reset();
        },
      });
    }
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (loadError) {
    // Set default coordinates when maps fail
    form.setValue("latitude", "30.0123");
    form.setValue("longitude", "31.0123");
  }

  if (!isLoaded && !loadError) {
    return <div>{t("loading-map")}</div>;
  }

  return (
    // Form
    <Form {...form}>
      <form className="space-y-4 " onSubmit={form.handleSubmit(onsubmit)}>
        {/* Step 1 form */}
        {steps === 1 && (
          <>
            <div className="border-b pb-3">
              <h3 className="font-medium text-2xl text-maroon-600 dark:text-soft-pink-300 ">
                {t("enter-address-details")}
              </h3>
            </div>
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("title")}</FormLabel>
                  {/* Field */}
                  <FormControl>
                    <Input placeholder={t("enter-your-title")} {...field} />
                  </FormControl>
                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="city"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("city")}</FormLabel>
                  {/* Field */}
                  <FormControl>
                    <Input placeholder={t("enter-your-city")} {...field} />
                  </FormControl>
                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("address")}</FormLabel>
                  {/* Field */}
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={t("enter-your-full-address")}
                      className="min-h-36 resize-none"
                    />
                  </FormControl>
                  {/* FeedBack */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("phone")}</FormLabel>
                  {/* Field */}
                  <FormControl>
                    <Input {...field} placeholder={t("enter-your-phone-number")} />
                  </FormControl>
                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPrimary"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">{t("primary-address")}</FormLabel>
                    <FormDescription>{t("set-as-default-address")}</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-4">
              <Button
                type="button"
                className="w-full"
                onClick={async () => {
                  if (await form.trigger(["city", "street", "phone"])) {
                    setSteps((prev) => prev + 1);
                  }
                }}
              >
                {t("next")}
              </Button>
            </div>
          </>
        )}
        {/* Step 2 form */}
        {steps === 2 && (
          <>
            <div className="border-b pb-3 flex items-center gap-4">
              <Button
                className="text-white bg-maroon-600 dark:bg-soft-pink-300 size-9 rounded-full flex items-center justify-center"
                onClick={() => setSteps((prev) => prev - 1)}
              >
                {locale === "en" ? (
                  <ArrowLeft width={20} height={20} />
                ) : (
                  <ArrowRight width={20} height={20} />
                )}
              </Button>
              <h3 className="font-medium text-2xl text-maroon-600  dark:text-soft-pink-300 ">
                {t("find-your-location")}
              </h3>
            </div>

            <div className="relative">
              {/* Google Map */}
              {loadError ? (
                <div className="w-full h-[400px] bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center">
                  <MapPinHouse className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-gray-600 text-center mb-4">{t("map-unavailable")}</p>
                  <p className="text-sm text-gray-500 text-center">{t("using-default-location")}</p>
                </div>
              ) : (
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "400px" }}
                  center={center}
                  zoom={12}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                  onClick={onMapClick}
                  options={{
                    zoomControl: true,
                    streetViewControl: true,
                    mapTypeControl: true,
                    fullscreenControl: true,
                  }}
                >
                  {selectedLocation && (
                    <Marker
                      position={{
                        lat: selectedLocation.lat || center.lat,
                        lng: selectedLocation.lng || center.lng,
                      }}
                      title={`Selected Location: ${selectedLocation.lat.toFixed(
                        6,
                      )}, ${selectedLocation.lng.toFixed(6)}`}
                    />
                  )}
                </GoogleMap>
              )}

              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <Button
                  variant="outline"
                  type="button"
                  onClick={getCurrentLocation}
                  className="bg-white shadow-md"
                  disabled={!!loadError}
                >
                  <MapPinHouse className="w-4 h-4 mr-2" />
                  {t("find-my-location")}
                </Button>
              </div>
            </div>
            {form.formState.errors.longitude && (
              <p className="text-3xl font-semibold text-red-500">
                {form.formState.errors.longitude.message}
              </p>
            )}
            <div className="pt-4">
              <Button
                className="w-full"
                type="submit"
                disabled={
                  isPending ||
                  updateAddressPending ||
                  (form.formState.isSubmitted && !form.formState.isValid)
                }
              >
                {address ? t("update-address") : t("add-address")}
              </Button>
            </div>
          </>
        )}
      </form>
    </Form>
  );
}
