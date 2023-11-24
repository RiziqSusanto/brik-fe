import React, { ReactNode, useState } from "react";
import {
  Button,
  Form,
  Input,
  Table,
  message,
  Card,
} from "antd";
import DashboardLayout from "@/src/components/Dashboard/Layout";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/router";
import {EditFilled, DeleteFilled, EyeFilled} from "@ant-design/icons";
import { mutate } from "swr";
import Image from "next/image";
import { productRepository } from "@/src/repository/products";
import { appConfig } from "@/src/configs/app";
import ModalProduct from "@/src/components/Product/ModalProduct";
import Link from "next/link";

interface DataType {
  name: string;
  image: string;
  harga: string;
}

const Product = () => {
  const router = useRouter();
  const [modeForm, setModeForm] = useState<string>("add");
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [form] = Form.useForm();
  const [search, setSearch] = useState("");

  const { data: products } = productRepository.hooks.useGetProduct(page, search);
  if (!products) {
    return <div />;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "No",
      dataIndex: "no",
      render: (t, r, index) => `${index + 1}`,
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (text, record) => {
        return (
          <div>
            <Image
              src={`${appConfig.apiUrl}/${record?.image}`}
              width={70}
              height={70}
              alt={text}
            />
          </div>
        );
      },
    },
    {
      title: "Product Name",
      dataIndex: "name",
    },
    {
      title: "Price (Rp)",
      dataIndex: "harga",
      sorter: (a, b) => parseInt(a.harga) - parseInt(b.harga),
    },
    {
      title: "",
      key: "action",
      fixed: "right",
      render: (text, record) => {
        return (
          <div className="flex flex-row">
            <Link href={"/product/[id]"} as={`/product/${record.id}`} className={'w-7 h-7 bg-blue-500 flex items-center justify-center rounded-full cursor-pointer'}>
              <EyeFilled style={{ fontSize: "18px", color: "#fff" }} />
            </Link>
            <div
              className="w-7 h-7 bg-[#EC9024] flex items-center justify-center rounded-full cursor-pointer ml-4"
              onClick={() => onClickEdit(record)}
            >
              <EditFilled style={{ fontSize: "18px", color: "#fff" }} />
            </div>
            <div
                className="w-7 h-7 bg-red-500 flex items-center justify-center rounded-full cursor-pointer ml-4"
                onClick={async () => {
                  await productRepository.api.deleteProduct({id: record.id})
                  message.success("Success delete product");
                  await mutate(productRepository.url.get(page))
                }}
            >
              <DeleteFilled style={{ fontSize: "20px", color: "#fff" }} />
            </div>
          </div>
        );
      },
    },
  ];

  const onSubmitForm = async () => {
    setIsLoading(true);
    try {
      const value = await form.validateFields();
      if (modeForm === "add") {
        const data = {
          ...value,
          weight: parseInt(value.weight),
          width: parseInt(value.width),
          length: parseInt(value.length),
          height: parseInt(value.height),
          harga: parseInt(value.harga),
          image: value.image.file.name,
        };
        await productRepository.api.createProduct(data);
        form.resetFields();
        message.success("Success create product");
        await mutate(productRepository.url.get(page));
        setIsVisibleModal(false);
        setIsLoading(false);
      } else {
        const value = await form.validateFields();
        const data = {
          ...value,
          weight: parseInt(value.weight),
          width: parseInt(value.width),
          length: parseInt(value.length),
          height: parseInt(value.height),
          harga: parseInt(value.harga),
          image: value.image?.file ? value.image.file.name : value.image,
        };
        await productRepository.api.updateProduct(data, id);
        form.resetFields();
        await mutate(productRepository.url.get(page));
        message.success("Success update product");
        setIsVisibleModal(false);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onClickEdit = (e: any) => {
    form.setFieldsValue({
      id: e.id,
      name: e.name,
      categoryId: e.categoryId,
      sku: e.sku,
      description: e.description,
      weight: e.weight,
      width: e.width,
      length: e.length,
      height: e.height,
      harga: e.harga,
      image: e.image,
    });
    setId(e.id);
    setIsVisibleModal(true);
    setModeForm("edit");
  };

  return (
    <>
      <div className="flex flex-row justify-between mb-4">
        <div className={'w-1/3 h-10'}>
          <Input.Search
              className={"rounded-lg h-10"}
              placeholder="Search Name Product"
              allowClear
              onSearch={(e) => setSearch(e)}
              size={'large'}
          />
        </div>
        <Button
          onClick={() => setIsVisibleModal(true)}
          style={{ borderRadius: 0 }}
          type="primary"
          className="w-24 h-10 bg-[#41A0E4] text-sm font-semibold text-white tracking-wide border-0 hover:text-white"
        >
          ADD
        </Button>
      </div>
      <Card className={"mt-6 rounded-3xl drop-shadow-md"}>
        <Table
          columns={columns}
          dataSource={products?.data}
          onChange={(page) => setPage(page.current || 1)}
          scroll={{x: 'max-content'}}
          pagination={{
            total: products?.totalData,
            current: page,
            pageSize: 10,
            showSizeChanger: false
          }}
        />
      </Card>
      <ModalProduct
          modeForm={modeForm}
          isVisibleModal={isVisibleModal}
          onSubmitForm={onSubmitForm}
          setIsVisibleModal={setIsVisibleModal}
          form={form}
          isLoading={isLoading}
      />
    </>
  );
};

Product.getLayout = function Layout(page: ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Product;
