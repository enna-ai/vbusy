import "@/styles/main.scss";
import "react-toastify/ReactToastify.css";

import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
