import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-white">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
