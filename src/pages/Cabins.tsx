import Heading from "../components/Heading";
import Row from "../components/Row";
import CabinsTable from "@/components/cabin/CabinsTable";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/Sort</p>
      </Row>

      <CabinsTable />
    </>
  );
}

export default Cabins;
