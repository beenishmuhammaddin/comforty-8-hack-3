"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import Loader from "../Loader";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";
//import { products, categories } from "@/Lib/data";

interface DashboardData {
  totalProducts: number;
  totalCategories: number;
  randomProducts: {
    _id: string;
    title: string;
    price: number;
    image: string;
  }[];
  categoryDistribution: {
    name: string;
    count: number;
  }[];
}

export default function DashboardPage() {
  useAdminAuth();
  const [dashboardData] = useState<DashboardData | null>(null);
  const [isLoading] = useState(true);

"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import Loader from "../Loader";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";
//import { products, categories } from "@/src/Lib/data";

interface DashboardData {
  totalProducts: number;
  totalCategories: number;
  randomProducts: {
    _id: string;
    title: string;
    price: number;
    image: string;
  }[];
  categoryDistribution: {
    name: string;
    count: number;
  }[];
}

export default function DashboardPage() {
  useAdminAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  if (isLoading) {
    return <Loader />;
  }

  if (!dashboardData) {
    return <div className="text-red-500 text-center">Error loading dashboard data</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalCategories}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Random Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dashboardData.randomProducts.map((product) => (
              <div key={product._id} className="flex items-center space-x-4">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">{product.title}</p>
                  <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Category Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.categoryDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#007580" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
  if (isLoading) {
    return <Loader />;
  }

  if (!dashboardData) {
    return <div className="text-red-500 text-center">Error loading dashboard data</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalCategories}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Random Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dashboardData.randomProducts.map((product) => (
              <div key={product._id} className="flex items-center space-x-4">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">{product.title}</p>
                  <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Category Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.categoryDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#007580" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
