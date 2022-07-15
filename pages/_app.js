import { AqiProvider } from "../context/aqiContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AqiProvider>
      <Component {...pageProps} />
    </AqiProvider>
  );
}

export default MyApp;
