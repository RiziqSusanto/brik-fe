import React, {useState} from "react";
import {Avatar, Drawer, Dropdown, Layout, Menu, Typography} from "antd";
import Link from "next/link";
import { TokenUtil } from "@/src/utils/token";
import { useRouter } from "next/router";
import { useStore } from "../StoreProvider";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAlignLeft, faHandHoldingUsd, faHome} from "@fortawesome/free-solid-svg-icons";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  const dataToken = TokenUtil.decodedToken();
  const router = useRouter();
  const store = useStore();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await store.authentication.logout();
    await router.push("/login");
  };

  const menu = (
      <Menu>
        <Menu.Item key="logout" onClick={handleLogout}>
          <div className="flex items-center">
            <Image
                src={"/assets/image/power.png"}
                width={20}
                height={20}
                alt="Logout"
                className="mr-2"
            />
            Keluar
          </div>
        </Menu.Item>
      </Menu>
  );

  return (
      <div className={"flex flex-row h-screen"}>
          <Drawer title={null} placement="left" onClose={() => setCollapsed(false)} closable={false} visible={collapsed}>
              <div>
                  <Link href={'/dashboard'}>
                      <div className={"flex flex-row items-center p-4 text-white bg-active rounded-lg"}>
                          <FontAwesomeIcon className="w-6 h-6" icon={faHome}/>
                          <span className={"ml-5 text-lg font-bold"}>Dashboard</span>
                      </div>
                  </Link>
                  <Link href={'/product'}>
                      <div className={"flex flex-row items-center p-4 text-white bg-active rounded-lg"}>
                          <FontAwesomeIcon className="w-6 h-6" icon={faHandHoldingUsd}/>
                          <span className={"ml-5 text-lg font-bold"}>Product</span>
                      </div>
                  </Link>
              </div>
          </Drawer>
        <div className={'lg:w-20'}>
            <div className={`hover:duration-300 w-20 hover:w-64 hidden lg:flex flex-col justify-center z-40 absolute h-screen bg-[#001529]`}>
                <div className="flex flex-col">
                    <Link href={'/dashboard'}>
                        <div className={"flex flex-row items-center p-4 text-white bg-active rounded-lg ml-[1rem]"}>
                            <FontAwesomeIcon className="w-6 h-6" icon={faHome}/>
                            <span style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}} className={"ml-14 text-base font-bold"}>Dashboard</span>
                        </div>
                    </Link>
                    <Link href={'/product'}>
                        <div className={"flex flex-row items-center p-4 text-white bg-active rounded-lg ml-[1rem]"}>
                            <FontAwesomeIcon className="w-6 h-6" icon={faHandHoldingUsd}/>
                            <span style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}} className={"ml-14 text-base font-bold"}>Product</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
        <div className={"flex-1 flex flex-col h-screen overflow-y-scroll"}>
            <div className={"flex flex-row w-full items-center justify-between px-4 md:px-15 lg:px-20 my-6"}>
                <div className="flex flex-row lg:hidden" onClick={() => setCollapsed(true)}>
                    <FontAwesomeIcon icon={faAlignLeft} size={'2x'}/>
                </div>
                <div className="flex flex-col ml-2">
                    <h1 className={"text-2xl font-normal break-words"}>
                        Hallo, <span className="break-words font-semibold">Welcome back!</span>
                    </h1>
                </div>
                <div className={'cursor-pointer md:pl-7'}>
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <div className={"flex flex-row items-center"}>
                            <Avatar size={40} src={"/assets/image/placeholder_profile.png"}/>
                            <Typography className={"hidden md:flex text-base mx-0 ml-2"}>{dataToken?.name}</Typography>
                        </div>
                    </Dropdown>
                </div>
            </div>

            <div className={"w-full px-4 md:px-15 lg:px-20 md:pb-10"}>
                {children}
            </div>
        </div>
      </div>
  );
};

export default DashboardLayout;
