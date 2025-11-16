import { createPortal } from "react-dom";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import React, { cloneElement, createContext, useContext, useState } from "react";



type ModalContextType = {
  openName: string;
  close: () => void;
  open: (name: string) => void;
};

export const ModalContext = createContext<ModalContextType>({
  openName: "",
  close: () => {},
  open: () => {},
});

const Modal = ({children}: { children: React.ReactNode }) => {
  const [openName , setOpenName] = useState<string>("");

  const close = () => setOpenName("");
  const open = (name: string) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName , close , open }}>
      {children}
    </ModalContext.Provider>
  )

}

const Open = ({
  children,
  opens: opensWindowName,
}: {
  children: React.ReactElement<{ onClick?: React.MouseEventHandler }>;
  opens: string;
}) => {
  const { open } = useContext(ModalContext);

  if (!React.isValidElement(children)) return null;

  return cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      if (children.props.onClick) children.props.onClick(e);
      open(opensWindowName);
    },
  });
}

const Window = ({
  children,
  name,

}: {
  children: React.ReactNode;
  name: string;

}) => {
  const { openName, close } = useContext(ModalContext);

  let isOpen ;
  let dialogTitle = "";
  let dialogDescription = "";
  if (name !== openName)  {
    return null;
  }
  else {
    isOpen = true;
  }

  switch (name) {
    case "cabin-form":
      dialogTitle = "Create New Cabin";
      dialogDescription = "Fill the form below to create a new cabin.";
      break;
    case "edit-cabin":
      dialogTitle = "Edit Cabin";
      dialogDescription = "Modify the details of the cabin below.";
      break;
    case "delete-cabin":
      dialogTitle = "Delete Cabin";
      dialogDescription = "Are you sure you want to delete this cabin? This action cannot be undone.";
      break;
    default:
      break;
  }

  return createPortal(
    <Dialog  open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>,
    document.body
  );
};



Modal.Open = Open;
Modal.Window = Window;
export default Modal;
