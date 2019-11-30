import React from "react";
import { useOnlyOffice } from "./utils/hooks";

const OnlyOfficeDocument = () => {
  const { onlyOfficeId } = useOnlyOffice();
  return <div id={onlyOfficeId} />;
};

export default OnlyOfficeDocument;
