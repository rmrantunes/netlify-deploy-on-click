import "../styles/globals.css";
import type { AppProps } from "next/app";
import useIsStaging from "../hooks/useIsStaging";

function MyApp({ Component, pageProps }: AppProps) {
  const isStaging = useIsStaging();

  return (
    <>
      {isStaging && (
        <button style={{ position: "fixed", right: "3rem", top: "3rem" }}>
          Aprovar e publicar
        </button>
      )}
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
