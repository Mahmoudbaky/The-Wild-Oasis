import Heading from "../components/Heading";
import Row from "../components/Row";
import CabinsTable from "@/components/cabin/CabinsTable";
import CabinDialogForm from "@/components/cabin/CabinDialogForm";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinDialogForm />
      </Row>

      <CabinsTable />
    </>
  );
}

export default Cabins;
