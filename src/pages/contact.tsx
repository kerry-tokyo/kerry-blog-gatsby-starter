import React from "react";
import { Helmet } from "react-helmet";

import BaseLayout from "components/layout/BaseLayout";
import { Hero } from "components/hero/Hero";

// tslint:disable no-default-export
export default () => (
  <BaseLayout>
    <Helmet title="Contact" />

    <Hero normal title="Contact" text="This is Contact page." />
  </BaseLayout>
);
