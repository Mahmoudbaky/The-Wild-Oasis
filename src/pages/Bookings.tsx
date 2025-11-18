import Heading from "../components/Heading";
import Row from "../components/Row";

import BookingsTable from "@/components/bookings/BookingsTable";
import BookingTableOperations from "@/components/bookings/BookingTableOperations";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>

      <BookingsTable />
    </>
  );
}

export default Bookings;
