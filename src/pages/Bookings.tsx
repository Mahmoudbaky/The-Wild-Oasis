import Heading from "../components/Heading";
import Row from "../components/Row";

import BookingsTable from "@/components/bookings/BookingsTable";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <p>TEST</p>
      </Row>

      <BookingsTable />
    </>
  );
}

export default Bookings;
