import { useState } from "react";
import { useSearchParams } from "react-router";
import { format, isToday } from "date-fns";
import { formatDistanceFromNow } from "@/lib/utils";
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
import Stacked from "../Stacked";

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
    <div className="@container mt-5">
      <div className="overflow-x-auto rounded-lg border-none shadow shadow-primary/10 dark:border-primary/30">
        <Table>
          <TableHeader className="bg-primary/10 dark:bg-primary/20">
            <TableRow>
              <TableHead className="w-[100px] text-center">CABIN</TableHead>
              <TableHead className="text-left w-[300px] ">GUEST NAME</TableHead>
              <TableHead className="text-left w-[150px]">DATES</TableHead>
              <TableHead className="text-center">STATUS</TableHead>
              <TableHead className="text-center">AMOUNT</TableHead>
              <TableHead className="text-center">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings?.map((booking: Booking) => (
              <TableRow key={booking.id}>
                <TableCell className="text-center">
                  {booking.cabins.name}
                </TableCell>
                <TableCell className="text-left">
                  <Stacked>
                    <span>{booking.guests.fullName}</span>
                    <span>{booking.guests.email}</span>
                  </Stacked>
                </TableCell>
                <TableCell className="text-left">
                  <Stacked>
                    <span>
                      {isToday(new Date(booking.startDate as string))
                        ? "Today"
                        : formatDistanceFromNow(
                            booking.startDate as string
                          )}{" "}
                      &rarr; {booking.numNights} night stay
                    </span>
                    <span>
                      {format(
                        new Date(booking.startDate as string),
                        "MMM dd yyyy"
                      )}{" "}
                      &mdash;{" "}
                      {format(
                        new Date(booking.endDate as string),
                        "MMM dd yyyy"
                      )}
                    </span>
                  </Stacked>
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
      </div>
    </div>
  );
};

export default BookingsTable;
