import React, {ReactNode} from "react";
import {
    Button,
    Card,
} from "antd";
import DashboardLayout from "@/src/components/Dashboard/Layout";
import { useRouter } from "next/router";
import {LeftOutlined} from "@ant-design/icons";
import Image from "next/image";
import { productRepository } from "@/src/repository/products";
import {appConfig} from "@/src/configs/app";


const ProductDetail: React.FC = () => {
    const router = useRouter();
    const {id} = router.query;
    const { data } = productRepository.hooks.useGetDetail(id as undefined as string);
    if (!data) {
        return <div />;
    }

    return (
        <>
            <Card className={"mt-6 rounded-3xl drop-shadow-md"}>
                <div className={'flex flex-col px-8 py-4'}>
                    <div className={'flex flex-row items-center justify-between lg:justify-start'}>
                        <Button onClick={() => {router.back()}} style={{marginRight: '0.7%'}} className={'flex h-10 items-center'}>
                            <LeftOutlined />
                        </Button>
                        <p className={'text-lg font-medium'}>Detail Product</p>
                    </div>

                    <div className={'flex flex-col lg:flex-row justify-center lg:justify-between items-center mt-12'}>
                        <Image
                            src={`${appConfig.apiUrl}/${data?.data?.image}`}
                            width={120}
                            height={120}
                            alt={data?.data?.name}
                        />
                        <div className={'flex flex-col w-full lg:w-1/3'}>
                            <p className={'text-base font-normal'}>Name: <span className={'font-bold'}>{data?.data?.name}</span></p>
                            <p className={'text-base font-normal'}>SKU: <span className={'font-bold'}>{data?.data?.sku}</span></p>
                            <p className={'text-base font-normal'}>Description: <span className={'font-bold'}>{data?.data?.description}</span></p>
                        </div>
                        <div className={'flex flex-col w-full lg:w-1/3'}>
                            <p className={'text-base font-normal'}>Weight: <span className={'font-bold'}>{data?.data?.weight}</span></p>
                            <p className={'text-base font-normal'}>Width: <span className={'font-bold'}>{data?.data?.width}</span></p>
                            <p className={'text-base font-normal'}>Length: <span className={'font-bold'}>{data?.data?.length}</span></p>
                            <p className={'text-base font-normal'}>Height: <span className={'font-bold'}>{data?.data?.height}</span></p>
                            <p className={'text-base font-normal'}>Price: <span className={'font-bold'}>Rp. {new Intl.NumberFormat('id-ID').format(data?.data?.harga)}</span></p>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    );
};

ProductDetail.getLayout = function Layout(page: ReactNode) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default ProductDetail;
