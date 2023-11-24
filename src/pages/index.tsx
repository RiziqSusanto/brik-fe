import { useRouter } from "next/router";
import { useStore } from "../components/StoreProvider";

export default function Home() {
  const router = useRouter();
  const store = useStore();
  if (typeof window !== "undefined") {
    router.push("/login");
  }

  return <div></div>;
}
