import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createPortal } from "react-dom";

const CabinDialogForm = ({
  children,
  isOpen,
  setIsOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  return createPortal(
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Cabin</DialogTitle>
          <DialogDescription>
            Fill the form below to create a new cabin.
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>,
    document.body
  );
};

export default CabinDialogForm;
