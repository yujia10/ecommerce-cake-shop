import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { ShopContext } from "../context/ShopContext";
import { Layout } from "../components";

function MyApp({ Component, pageProps }) {
  return (
    <ShopContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </ShopContext>
  );
}

export default MyApp;
