import { useState } from "react";
import { useCreateCabin } from "./useCreateCabin";
import { useCabins } from "./useCabins";

import { formatCurrency } from "@/lib/utils";

import { z } from "zod";
import type { CabinFormData, Cabin } from "@/types";

import { DotsLoader } from "react-loadly";
import { Copy, Edit, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { toast } from "sonner";
import type { editCabinSchema } from "@/validators/cabinValidators";
import CabinForm from "./CabinForm";
import CabinDeletionConfirm from "./CabinDeletionConfirm";
import Modal from "../Modal";

const CabinsTable = () => {
  const [cabinToEdit, setCabinToEdit] = useState<Cabin>();
  const [cabinToDelete, setCabinToDelete] = useState<number>(0);
  const { cabins, isLoading } = useCabins();
  const { createCabin, isCreating } = useCreateCabin();

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

  const handleCrateCopy = (cabin: CabinFormData) => {
    createCabin(
      {
        name: `Copy of ${cabin.name}`,
        image: cabin.image,
        maxCapacity: cabin.maxCapacity,
        regularPrice: cabin.regularPrice,
        discount: cabin.discount,
        description: cabin.description,
      },
      {
        onSuccess: () => {
          toast.success("Cabin Copy Created Successfully");
        },
      }
    );
  };

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
            <TableCell className="text-center space-x-3">
              {/* Compound Component pattern is applied here */}
              <Modal>
                {/* Delete */}
                <Modal.Open opens="delete-cabin">
                  <Button
                    className="bg-red-500 cursor-pointer"
                    onClick={() => {
                      setCabinToDelete(cabin.id);
                    }}
                  >
                    <Trash />
                  </Button>
                </Modal.Open>
                <Modal.Window name="delete-cabin">
                  <CabinDeletionConfirm cabinId={cabinToDelete} />
                </Modal.Window>

                {/* Edit */}
                <Modal.Open opens="edit-cabin">
                  <Button
                    onClick={() => {
                      setCabinToEdit(cabin);
                    }}
                    className="cursor-pointer"
                  >
                    <Edit />
                  </Button>
                </Modal.Open>
                <Modal.Window name="edit-cabin">
                  <CabinForm
                    cabinToEdit={cabinToEdit as z.infer<typeof editCabinSchema>}
                  />
                </Modal.Window>
              </Modal>
              <Button
                disabled={isCreating}
                onClick={() => {
                  handleCrateCopy(cabin as CabinFormData);
                }}
                className="cursor-pointer"
              >
                <Copy />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CabinsTable;
