import React, {ReactNode} from "react";
import DashboardLayout from "@/src/components/Dashboard/Layout";
import { productRepository } from "@/src/repository/products";
import {categoryRepository} from "@/src/repository/category";

const Dashboard = () => {
  const { data: products } = productRepository.hooks.useGetProduct(5);
  const { data: categories } = categoryRepository.hooks.useGetData();

  if (!products || !categories) {
    return <div />;
  }

  return (
    <div className="w-full h-full">
      <div className="grid lg:grid-cols-2 gap-4 mb-8">
        <div
          className="flex flex-col justify-center bg-cover bg-center bg-no-repeat rounded-xl h-36"
          style={{
            backgroundImage: `url("../../assets/image/card-bg.png")`,
          }}
        >
          <div className="ml-7">
            <p className="text-[#002060]">Total Product</p>
            <p className="text-[#002060] text-2xl">
              {products?.totalData ?? 0}{" "}
              <span className="text-base">Product(s)</span>
            </p>
          </div>
        </div>
        <div
          className="flex flex-col justify-center bg-cover bg-center bg-no-repeat rounded-xl h-36"
          style={{
            backgroundImage: `url("../../assets/image/card-bg.png")`,
          }}
        >
          <div className="ml-7">
            <p className="text-[#002060]">Total Active Product</p>
            <p className="text-[#002060] text-2xl">
              {categories?.totalData ?? 0}{" "}
              <span className="text-base">Categories</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

Dashboard.getLayout = function Layout(page: ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;
