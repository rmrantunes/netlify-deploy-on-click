import { useEffect, useState } from "react";

export default function useStaging(stagingBranchName = "dev") {
  const [isStaging, setIsStaging] = useState(
    process.env.CONTEXT !== "production"
  );
  const [deployId, setDeployId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isStaging = window
        ? window.location.href.split("//")[1].startsWith(stagingBranchName)
        : false;

      setIsStaging(isStaging);

      if (isStaging) setDeployId(window.location.host);
    }
  }, []);

  return { isStaging, deployId };
}
