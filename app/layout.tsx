import "@/assets/styles/globals.css";

export const metadata = {
  title: "Property Pulse",
  keywords: "real estate, property, home, house, rental",
    description: "Find the perfect rental property for you",
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
