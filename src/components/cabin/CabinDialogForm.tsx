import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useForm,
  type SubmitHandler,
  type Resolver,
  useController,
} from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { cabinSchema } from "@/validators/cabinValidators";
import { zodResolver } from "@hookform/resolvers/zod";
import { cabinDefalutValues } from "@/lib/constants";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useEffect, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import cabinServices from "@/services/apiCabins";
import { toast } from "sonner";
import type { editCabinSchema } from "@/validators/cabinValidators";

export type CabinFormData = z.infer<typeof cabinSchema>;
export type EditCabinFormData = z.infer<typeof editCabinSchema>;

const CabinDialogForm = ({
  cabinToEdit,
  isOpen,
  setIsOpen,
}: {
  cabinToEdit?: z.infer<typeof editCabinSchema> | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const reformattedCabinToEdit: Partial<EditCabinFormData> = {
    name: cabinToEdit?.name,
    maxCapacity: cabinToEdit?.maxCapacity,
    regularPrice: cabinToEdit?.regularPrice,
    discount: cabinToEdit?.discount,
    description: cabinToEdit?.description,
    image: cabinToEdit?.image,
  };
  const queryClient = useQueryClient();
  const isEditingSession = Boolean(cabinToEdit?.id);

  const form = useForm<CabinFormData>({
    resolver: zodResolver(cabinSchema) as Resolver<CabinFormData>,
    defaultValues: cabinDefalutValues,
  });

  const { field } = useController({ name: "image", control: form.control });

  useEffect(() => {
    if (isEditingSession) {
      form.reset(reformattedCabinToEdit);
    } else {
      form.reset(cabinDefalutValues);
    }
  }, [isEditingSession, cabinToEdit, isOpen]);

  const { mutate, isPending } = useMutation({
    mutationFn: cabinServices.createCabin,
    onSuccess: () => {
      toast.success("Cabin Created Successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      form.reset();
      setIsOpen(false);
    },
    onError: (err) => toast.error(err.message),
  });

  const onSubmit: SubmitHandler<CabinFormData> = (data) => {
    console.log(data);

    // mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Cabin</DialogTitle>
          <DialogDescription>
            Fill the form below to create a new cabin.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 mt-2.5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className="border h-10 shadow-muted rounded-full"
                        placeholder="Enter cabin name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxCapacity"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Max Capacity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="border h-10 shadow-muted rounded-full"
                        placeholder="Enter max capacity"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="regularPrice"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Regular Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="border h-10 shadow-muted rounded-full"
                        placeholder="Enter regular price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Discount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="border h-10 shadow-muted rounded-full"
                        placeholder="Enter discount"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="border h-10 shadow-muted"
                      placeholder="Enter description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem className="w-full">
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      accept="image/*"
                      type="file"
                      className="border h-10 shadow-muted rounded-full"
                      placeholder="Enter image url"
                      onChange={(e: FormEvent<HTMLInputElement>) => {
                        const file = e.currentTarget.files?.[0] ?? null;
                        form.setValue("image", file, { shouldValidate: true });
                      }}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3">
              <Button type="submit" disabled={isPending}>
                {isEditingSession ? "Edit" : "Create"}
              </Button>
              <Button
                onClick={() => {
                  form.reset();
                  setIsOpen(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CabinDialogForm;
