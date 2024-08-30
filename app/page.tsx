import Link from "next/link";

const HomePage = () => {
  console.log("HomePage");
  return (
    <div>
      <h1 className="text-3xl">HomePage</h1>
      <Link
        href={{
          pathname: "/properties",
        }}
      >
        Go to properties
      </Link>
    </div>
  );
};

export default HomePage;
