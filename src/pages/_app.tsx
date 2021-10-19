import "../styles/globals.css";
import type { AppProps } from "next/app";
import useStaging from "../hooks/useStaging";
import axios from "axios";

async function promoteToProd(deploy_id: string) {
  await axios.post(`/api/promote-to-prod?deploy_id=${deploy_id}`, undefined);
}

function MyApp({ Component, pageProps }: AppProps) {
  const staging = useStaging();

  return (
    <>
      {staging.isStaging && (
        <button
          style={{ position: "fixed", right: "3rem", top: "3rem" }}
          onClick={() => promoteToProd(staging.deployId!)}
        >
          Aprovar e publicar
        </button>
      )}
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
