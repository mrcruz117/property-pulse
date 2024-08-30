"use client";
import {
  useRouter,
  useParams,
  useSearchParams,
  usePathname,
} from "next/navigation";

const PropertyPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return (
    <div>
      <button onClick={() => router.replace("/")}>Go home</button>
      <div>Page: {id}</div>
      <div>Search params: {searchParams.get("name")}</div>
      <div>Pathname: {pathname}</div>
    </div>
  );
};

export default PropertyPage;
