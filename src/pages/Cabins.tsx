import CabinForm from "@/components/cabin/CabinForm";
import CabinsTable from "@/components/cabin/CabinsTable";
import Heading from "../components/Heading";
import Row from "../components/Row";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <h1>Sort/Filter</h1>
      </Row>

      <CabinsTable />

      {/* Compound Component pattern is applied here */}
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button variant="outline">Create Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CabinForm />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default Cabins;
