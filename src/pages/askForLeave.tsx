import React, { ReactElement } from "react";

import IndexLayout from "@/layouts/indexLayout";

const AskForLeave = () => {
  return <div></div>;
};

AskForLeave.getLayout = function getLayout(page: ReactElement) {
  return <IndexLayout>{page}</IndexLayout>;
};

export default AskForLeave;
