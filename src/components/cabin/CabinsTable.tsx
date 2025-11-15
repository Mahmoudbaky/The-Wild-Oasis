import { DotsLoader } from "react-loadly";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Database } from "@/types/supabase";
import { formatCurrency } from "@/lib/utils";
import { Button } from "../ui/button";
import { Trash, Edit } from "lucide-react";
import CabinDialogForm from "./CabinDialogForm";
import { useState } from "react";
import { z } from "zod";
import { cabinSchema } from "@/validators/cabinValidators";
import type { editCabinSchema } from "@/validators/cabinValidators";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCabins } from "./useCabins";
type Cabin = Database["public"]["Tables"]["cabins"]["Row"];
export type CabinFormData = z.infer<typeof cabinSchema>;

const CabinsTable = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [cabinToEdit, setCabinToEdit] = useState<Cabin>();
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { cabins, isLoading } = useCabins();

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
            <TableCell className="text-center">{cabin.maxCapacity}</TableCell>
            <TableCell className="text-center">
              {formatCurrency(cabin.regularPrice!)}
            </TableCell>
            <TableCell className="text-center">
              {cabin.discount ? `${formatCurrency(cabin.discount)}` : "N/A"}
            </TableCell>
            <TableCell className="text-center  space-x-3">
              <Button
                className="bg-red-500 cursor-pointer"
                onClick={() => {
                  deleteCabin(cabin.id);
                }}
                disabled={isDeleting}
              >
                <Trash />
              </Button>

              <Button
                onClick={() => {
                  setCabinToEdit(cabin);
                  setDialogIsOpen(true);
                }}
                className="cursor-pointer"
              >
                <Edit />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <CabinDialogForm
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        cabinToEdit={cabinToEdit as z.infer<typeof editCabinSchema>}
      />
    </Table>
  );
};

export default CabinsTable;
