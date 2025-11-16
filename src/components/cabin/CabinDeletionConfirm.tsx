import { Button } from "../ui/button";
import { useDeleteCabin } from "./useDeleteCabin";
import { ModalContext } from "../Modal";
import { useContext } from "react";

const CabinDeletionConfirm = ({ cabinId }: { cabinId: number }) => {
  const { close } = useContext(ModalContext);
  const { isDeleting, deleteCabin } = useDeleteCabin();

  return (
    <div className="flex justify-end space-x-4">
      <Button
        variant="outline"
        onClick={() => {
          close();
        }}
      >
        Cancel
      </Button>
      <Button
        variant="destructive"
        onClick={() => {
          deleteCabin(cabinId);
          close();
        }}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </Button>
    </div>
  );
};

export default CabinDeletionConfirm;
