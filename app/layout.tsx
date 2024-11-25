import '@/assets/styles/globals.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MsgStoreProvider } from '@/providers/msg-store-provider';

export const metadata = {
  title: 'Property Pulse',
  keywords: 'real estate, property, home, house, rental',
  description: 'Find the perfect rental property for you',
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <MsgStoreProvider>
        <html>
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </MsgStoreProvider>
    </AuthProvider>
  );
};

export default MainLayout;
