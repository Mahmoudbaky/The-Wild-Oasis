import { useState } from "react";
import { useSearchParams } from "react-router";
import { useBookings } from "./useBooking";

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
import { Badge } from "../ui/badge";
import { DotsLoader } from "react-loadly";
import { Copy, Edit, Trash, MoreVertical } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

import type { Booking } from "@/types";

const BookingsTable = () => {
  const { bookings, isLoading } = useBookings();

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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-center">CABIN</TableHead>
          <TableHead className="text-center">GUEST NAME</TableHead>
          <TableHead className="text-center">DATES</TableHead>
          <TableHead className="text-center">STATUS</TableHead>
          <TableHead className="text-center">AMOUNT</TableHead>
          <TableHead className="text-center">ACTIONS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings?.map((booking: Booking) => (
          <TableRow key={booking.id}>
            <TableCell className="text-center">{booking.cabins.name}</TableCell>
            <TableCell className="text-center">
              {booking.guests.fullName}
            </TableCell>
            <TableCell className="text-center">
              {`${new Date(
                booking.startDate as string
              ).toLocaleDateString()} - ${new Date(
                booking.endDate as string
              ).toLocaleDateString()}`}
            </TableCell>
            <TableCell className="text-center">
              <Badge
                className={`
                ${
                  booking.status === "confirmed"
                    ? "bg-green-100 text-green-800"
                    : booking.status === "checked-in"
                    ? "bg-yellow-100 text-yellow-800"
                    : booking.status === "checked-out"
                    ? "bg-red-100 text-red-800"
                    : ""
                }
                `}
              >
                {booking.status}
              </Badge>
            </TableCell>
            <TableCell className="text-center">
              {formatCurrency(booking.cabinPrice as number)}
            </TableCell>
            <TableCell className="text-center"></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BookingsTable;
