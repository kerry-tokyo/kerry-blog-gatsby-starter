import React from "react";
import { Helmet } from "react-helmet";

import BaseLayout from "components/layout/BaseLayout";
import { Hero } from "components/hero/Hero";

export default () => (
  <BaseLayout>
    <Helmet title="404" />

    <Hero normal title="404" text="This is 404 page." />
  </BaseLayout>
);
