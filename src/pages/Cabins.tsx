import Heading from "../components/Heading";
import Row from "../components/Row";
import CabinsTable from "@/components/cabin/CabinsTable";
import CabinDialogForm from "@/components/cabin/CabinDialogForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function Cabins() {
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <Button
          onClick={() => {
            setDialogIsOpen(true);
          }}
          variant="outline"
        >
          Create Cabin
        </Button>
      </Row>

      <CabinsTable />
      <CabinDialogForm isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen} />
    </>
  );
}

export default Cabins;
