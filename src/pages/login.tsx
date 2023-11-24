import React from "react";
import { Layout, Form, Input, Button, message, Card } from "antd";
import { useStore } from "../components/StoreProvider";
import { useRouter } from "next/router";
import { TokenUtil } from "../utils/token";

const Login: React.FC = () => {
  const store = useStore();
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinishForm = async (params: any) => {
    try {
      await store.authentication.login({
        email: params.email,
        password: params.password,
      });
      await router.push("/dashboard");
    } catch (e: any) {
      if (e.response?.body?.message) {
        message.error(e.response.body.message);
        return;
      }
      message.error(e.message);
    }
  };

  return (
      <Layout className="h-screen flex items-center justify-center bg-blue-50">
        <Card className="w-full md:w-96 bg-white border-px border-slate-300">
          <h2 className="text-xl md:text-2xl text-[#3E3E3E] font-medium mb-2">
            Welcome
          </h2>
          <p className="text-xs md:text-sm text-[#3E3E3E] mb-8">
            Please enter your email and password <br />
            to get started with the app
          </p>
          <Form layout={"vertical"} form={form} onFinish={onFinishForm}>
            <Form.Item
                label={<p className="text-xs text-[#757575]">Email</p>}
                name="email"
                rules={[{
                  required: true, message: 'Please input your email',
                }]}
            >
              <Input
                  placeholder="Contoh: admin@gmail.com"
                  className="h-[2.75rem] rounded-none"
              />
            </Form.Item>
            <Form.Item
                label={<p className="text-xs text-[#757575]">Password</p>}
                name="password"
                rules={[{
                  required: true, message: 'Please input your password',
                }]}
            >
              <Input.Password
                  placeholder="Masukkan password"
                  className="h-[2.75rem] rounded-none"
              />
            </Form.Item>
            <Form.Item>
              <Button
                  type="primary"
                  block
                  htmlType="submit"
                  className="bg-[#41A0E4] h-[2.75rem] border-none text-base font-semibold"
              >
                Log In
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                  type="secondary"
                  block
                  className="bg-blue-50 h-[2.75rem] text-base font-semibold border-px border-gray-300"
                  onClick={() => router.push('/register')}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Layout>
  );
};

export default Login;
