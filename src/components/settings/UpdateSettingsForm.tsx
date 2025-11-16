import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useEffect, type FormEvent } from "react";
import { useSettings } from "./useSettings";

import { settingsSchema } from "@/validators/settingsValidators";
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
import { DotsLoader } from "react-loadly";
import { useUpdateSettings } from "./useUpdateSettings";
const UpdateSettingsForm = () => {
  const { settings, isLoading } = useSettings();
  const { updateSettings } = useUpdateSettings();

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema) as Resolver<
      z.infer<typeof settingsSchema>
    >,
    defaultValues: settings,
  });

  useEffect(() => {
    form.reset(settings);
  }, [settings]);

  const handleSubmit = (e: FormEvent, field: string) => {
    e.preventDefault();
    const { value } = e.target as HTMLFormElement;
    if (!value) return;
    updateSettings({ [field]: value } as z.infer<typeof settingsSchema>);
  };

  if (isLoading)
    return (
      <DotsLoader
        size={20}
        color="#476546"
        speed={1.4}
        loaderCenter={true}
        count={3}
        borderWidth={4}
        secondaryColor="#476546"
      />
    );

  return (
    <div className="mt-5">
      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="minBookingLength"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min Booking Length</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    {...field}
                    onBlur={(e) => {
                      handleSubmit(e, "minBookingLength");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxBookingLength"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Booking Length</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    {...field}
                    onBlur={(e) => {
                      handleSubmit(e, "maxBookingLength");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxGestsPerBooking"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Gests Per Booking</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    {...field}
                    onBlur={(e) => {
                      handleSubmit(e, "maxGestsPerBooking");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="breakfastPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Breakfast Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    {...field}
                    onBlur={(e) => {
                      handleSubmit(e, "breakfastPrice");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default UpdateSettingsForm;
