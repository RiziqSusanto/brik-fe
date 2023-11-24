import React from "react";
import {Button, Form, Input, message, Select, Upload, UploadProps, Modal} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import {categoryRepository} from "@/src/repository/category";
import {TokenUtil} from "@/src/utils/token";
import {appConfig} from "@/src/configs/app";
const { Dragger } = Upload;

interface Props {
    modeForm: string;
    isVisibleModal: boolean;
    onSubmitForm: () => void;
    setIsVisibleModal: (b: boolean) => void;
    form: any
    isLoading: boolean;
}

const ModalProduct: React.FC<Props> = ({modeForm, isVisibleModal, onSubmitForm, setIsVisibleModal, form, isLoading}) => {
    const { data: categories } = categoryRepository.hooks.useGetData();

    const propsImage: UploadProps = {
        name: "image",
        multiple: false,
        headers: {
            Authorization: `Bearer ${TokenUtil.accessToken}`,
        },
        action: `${appConfig.apiUrl}/products/upload`,
        onChange(info) {
            // Handle file status changes here.
            const { status } = info.file;
            if (status === "done") {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files);
        },
    };

    return (
        <Modal
            title={modeForm === "add" ? "Add Product" : "Edit Product"}
            open={isVisibleModal}
            onOk={onSubmitForm}
            onCancel={() => {
                setIsVisibleModal(false);
                form.resetFields();
                form.setFieldsValue(null);
            }}
            loading={isLoading}
            footer={[
                <div className="w-full">
                    <Button
                        className="w-full bg-[#41A0E4] h-[2.75rem] border-none text-sm font-semibold rounded-none"
                        loading={isLoading}
                        key={"submit"}
                        type="primary"
                        onClick={onSubmitForm}
                    >
                        {modeForm === "add" ? "SIMPAN" : "UBAH"}
                    </Button>
                </div>,
            ]}
        >
            <Form form={form} layout={"vertical"} name="normal_login">
                <Form.Item
                    style={{
                        marginBottom: 30,
                    }}
                    label="Product Name"
                    name="name"
                >
                    <Input
                        className="h-[2.75rem] rounded-none border-px border-gray-400"
                        type="text"
                        placeholder="Masukkan Nama"
                    />
                </Form.Item>

                <Form.Item
                    style={{
                        marginBottom: 30,
                    }}
                    label="categoryId"
                    name="categoryId"
                >
                    <Select placeholder={'Select category'} className="h-[2.75rem] rounded-none border-px border-gray-400">
                        {categories?.data?.map((prop) => {
                            return (
                                <Select.Option key={prop.id} value={prop.id}>
                                    {prop.name}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>

                <Form.Item
                    style={{
                        marginBottom: 30,
                    }}
                    label="SKU"
                    name="sku"
                >
                    <Input
                        className="h-[2.75rem] rounded-none border-px border-gray-400"
                        type="text"
                        placeholder="SKU"
                    />
                </Form.Item>

                <Form.Item
                    style={{
                        marginBottom: 30,
                    }}
                    label="Description"
                    name="description"
                >
                    <Input
                        className="h-[2.75rem] rounded-none border-px border-gray-400"
                        type="text"
                        placeholder="SKU"
                    />
                </Form.Item>

                <Form.Item
                    style={{
                        marginBottom: 30,
                    }}
                    label="Weight"
                    name="weight"
                >
                    <Input
                        className="h-[2.75rem] rounded-none border-px border-gray-400"
                        type="number"
                        placeholder="10"
                    />
                </Form.Item>

                <Form.Item
                    style={{
                        marginBottom: 30,
                    }}
                    label="Width"
                    name="width"
                >
                    <Input
                        className="h-[2.75rem] rounded-none border-px border-gray-400"
                        type="number"
                        placeholder="10"
                    />
                </Form.Item>

                <Form.Item
                    style={{
                        marginBottom: 30,
                    }}
                    label="Length"
                    name="length"
                >
                    <Input
                        className="h-[2.75rem] rounded-none border-px border-gray-400"
                        type="number"
                        placeholder="10"
                    />
                </Form.Item>

                <Form.Item
                    style={{
                        marginBottom: 30,
                    }}
                    label="Height"
                    name="height"
                >
                    <Input
                        className="h-[2.75rem] rounded-none border-px border-gray-400"
                        type="number"
                        placeholder="10"
                    />
                </Form.Item>

                <Form.Item
                    style={{
                        marginBottom: 30,
                    }}
                    label="Harga"
                    name="harga"
                >
                    <Input
                        className="h-[2.75rem] rounded-none border-px border-gray-400"
                        type="number"
                        placeholder="100000"
                    />
                </Form.Item>

                <Form.Item
                    style={{
                        marginBottom: 30,
                    }}
                    label="Image"
                    name="image"
                >
                    <Dragger {...propsImage}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibited from
                            uploading company data or other banned files.
                        </p>
                    </Dragger>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalProduct
