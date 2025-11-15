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
import { Button } from "../ui/button";
import { useEffect, type FormEvent } from "react";
import { useSettings } from "./useSettings";
import { toast } from "sonner";
import { settingsSchema } from "@/validators/settingsValidators";
import { useForm, type Resolver } from "react-hook-form";

const UpdateSettingsForm = () => {
  const { settings, error, isLoading } = useSettings();

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema) as Resolver<
      z.infer<typeof settingsSchema>
    >,
    defaultValues: settings,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log(data);
        })}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="minBookingLength"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Min Booking Length</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
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
                <Input placeholder="Your name" {...field} />
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
                <Input placeholder="Your name" {...field} />
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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save Settings</Button>
      </form>
    </Form>
  );
};

export default UpdateSettingsForm;
