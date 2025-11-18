import { useState } from "react";
import { useCreateCabin } from "./useCreateCabin";
import { useCabins } from "./useCabins";
import { useSearchParams } from "react-router";

import { formatCurrency } from "@/lib/utils";

import { z } from "zod";
import type { CabinFormData, Cabin } from "@/types";

import { DotsLoader } from "react-loadly";
import { Copy, Edit, Trash, MoreVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { toast } from "sonner";
import type { editCabinSchema } from "@/validators/cabinValidators";
import CabinForm from "./CabinForm";
import CabinDeletionConfirm from "./CabinDeletionConfirm";
import Modal from "../Modal";

const CabinsTable = () => {
  const [searchParams] = useSearchParams();
  const [cabinToEdit, setCabinToEdit] = useState<Cabin>();
  const [cabinToDelete, setCabinToDelete] = useState<number>(0);
  const { cabins, isLoading } = useCabins();
  const { createCabin: createCabinCopy, isCreating } = useCreateCabin();

  const discountFilter = searchParams.get("discount") || "all";
  const sortOption = searchParams.get("sort");

  const filteredCabins = cabins?.filter((cabin) => {
    if (discountFilter === "with-discount") {
      return cabin.discount && cabin.discount > 0;
    } else if (discountFilter === "no-discount") {
      return !cabin.discount || cabin.discount === 0;
    }
    return true;
  });

  const sortedCabins = filteredCabins?.slice().sort((a, b) => {
    if (!sortOption) return 0;

    const [field, order] = sortOption.split("-");

    let aValue: string | number = "";
    let bValue: string | number = "";

    switch (field) {
      case "name":
        aValue = a.name || "";
        bValue = b.name || "";
        break;
      case "regularPrice":
        aValue = a.regularPrice || 0;
        bValue = b.regularPrice || 0;
        break;
      case "maxCapacity":
        aValue = a.maxCapacity || 0;
        bValue = b.maxCapacity || 0;
        break;
      default:
        break;
    }

    if (aValue < bValue) return order === "asc" ? -1 : 1;
    if (aValue > bValue) return order === "asc" ? 1 : -1;
    return 0;
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

  const handleCrateCopy = (cabin: CabinFormData) => {
    createCabinCopy(
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
    <div className="@container mt-5">
      <div className="overflow-x-auto rounded-lg border-none shadow shadow-primary/10 dark:border-primary/30">
        <Table>
          <TableHeader className="bg-primary/10 dark:bg-primary/20">
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
            {sortedCabins?.map((cabin: Cabin) => (
              <TableRow key={cabin.id}>
                <TableCell className="text-center w-20">
                  <img className="w-20" src={cabin.image!} alt={cabin.name!} />
                </TableCell>
                <TableCell className="text-center">{cabin.name}</TableCell>
                <TableCell className="text-center">
                  {cabin.maxCapacity}
                </TableCell>
                <TableCell className="text-center">
                  {formatCurrency(cabin.regularPrice!)}
                </TableCell>
                <TableCell className="text-center font-mono">
                  {cabin.discount ? `${formatCurrency(cabin.discount)}` : "N/A"}
                </TableCell>

                <TableCell className="text-center space-x-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Modal>
                          {/* Delete */}
                          <Modal.Open opens="delete-cabin">
                            <Button
                              variant="ghost"
                              className="cursor-pointer "
                              onClick={() => {
                                setCabinToDelete(cabin.id);
                              }}
                            >
                              <Trash />
                              Delete
                            </Button>
                          </Modal.Open>
                          <Modal.Window name="delete-cabin">
                            <CabinDeletionConfirm cabinId={cabinToDelete} />
                          </Modal.Window>
                        </Modal>
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Modal>
                          <Modal.Open opens="edit-cabin">
                            <Button
                              variant="ghost"
                              onClick={() => {
                                setCabinToEdit(cabin);
                              }}
                              className="cursor-pointer"
                            >
                              <Edit />
                              Edit
                            </Button>
                          </Modal.Open>
                          <Modal.Window name="edit-cabin">
                            <CabinForm
                              cabinToEdit={
                                cabinToEdit as z.infer<typeof editCabinSchema>
                              }
                            />
                          </Modal.Window>
                        </Modal>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Button
                          variant="ghost"
                          disabled={isCreating}
                          onClick={() => {
                            handleCrateCopy(cabin as CabinFormData);
                          }}
                          className="cursor-pointer w-full"
                        >
                          <Copy />
                          {isCreating ? "Copying..." : "Create Copy"}
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CabinsTable;
