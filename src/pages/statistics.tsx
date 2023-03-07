import React, { ReactElement } from "react";

import IndexLayout from "@/layouts/indexLayout";

const Statistics = () => {
  return <div></div>;
};

Statistics.getLayout = function getLayout(page: ReactElement) {
  return <IndexLayout>{page}</IndexLayout>;
};

export default Statistics;
