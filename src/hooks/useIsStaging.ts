import { useEffect, useState } from "react";

export default function useIsStaging(stagingBranchName = "dev") {
  const [isStaging, setIsStaging] = useState(false);

  useEffect(() => {
    const isStaging = window
      ? window.location.href.split("//")[1].startsWith(stagingBranchName)
      : false;

    setIsStaging(isStaging);
  }, []);

  return isStaging;
}
