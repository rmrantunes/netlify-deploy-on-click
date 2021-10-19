import "../styles/globals.css";
import type { AppProps } from "next/app";
import useStaging from "../hooks/useStaging";
import axios from "axios";

async function promoteToProd() {
  await axios.post(`/api/promote-to-prod`);
}

function MyApp({ Component, pageProps }: AppProps) {
  const staging = useStaging();

  return (
    <>
      {staging.isStaging && (
        <button
          style={{ position: "fixed", right: "3rem", top: "3rem" }}
          onClick={promoteToProd}
        >
          Aprovar e publicar
        </button>
      )}
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
