"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loader from "@/app/admin/Loader"; // Re-added loader

interface Order {
  _id: string;
  orderNumber: string;
  customer: {
    name: string;
  };
  status: string;
  totalAmount: number;
}

export default function OrdersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.replace("/admin/login"); // Ensures smooth redirection
      return;
    }

    // Fetch orders dynamically
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders"); // Adjust endpoint as needed
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    }
   
//Removed useEffect hook that fetches orders data


    fetchOrders();
  }, [user, router]);

  if (!user) return null;

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Orders</h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order Number</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.orderNumber}</TableCell>
                <TableCell>{order.customer.name}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <Button asChild variant="outline" className="mr-2">
                    <Link href={`/admin/orders/${order._id}`}>View Details</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
