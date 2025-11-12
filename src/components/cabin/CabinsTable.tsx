import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import cabinServices from "@/services/apiCabins";
import { DotsLoader } from "react-loadly";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Database } from "@/types/supabase";
import { formatCurrency } from "@/lib/utils";
import { Button } from "../ui/button";
import { toast } from "sonner";

type Cabin = Database["public"]["Tables"]["cabins"]["Row"];

const CabinsTable = () => {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: cabinServices.getCabins,
  });

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: cabinServices.deleteCabin,
    onSuccess: () => {
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

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
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center"></TableHead>
          <TableHead className="text-center">CABIN</TableHead>
          <TableHead className="text-center">CAPACITY</TableHead>
          <TableHead className="text-center">PRICE</TableHead>
          <TableHead className="text-center">DISCOUNT</TableHead>
          <TableHead className="text-center">ACTIONS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cabins?.map((cabin: Cabin) => (
          <TableRow key={cabin.id}>
            <TableCell className="text-center w-20">
              <img className="w-20" src={cabin.image!} alt={cabin.name!} />
            </TableCell>
            <TableCell className="text-center">{cabin.name}</TableCell>
            <TableCell className="text-center">
              {formatCurrency(cabin.maxCapacity!)}
            </TableCell>
            <TableCell className="text-center">
              {formatCurrency(cabin.regularPrice!)}
            </TableCell>
            <TableCell className="text-center">
              {cabin.discount ? `${cabin.discount}%` : "N/A"}
            </TableCell>
            <TableCell className="text-center">
              <Button
                className="text-red-600 hover:text-red-800"
                onClick={() => {
                  mutate(cabin.id);
                }}
                disabled={isPending}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CabinsTable;
