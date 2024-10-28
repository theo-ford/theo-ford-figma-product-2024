import * as React from "react";
import { withPrismicUnpublishedPreview } from "gatsby-plugin-prismic-previews";

import Index from "./index";
// import Template from "../templates/template";

const NotFoundPage = () => (
  <>
    <h1>Page not found!</h1>
  </>
);

// If an unpublished `page` document is previewed, PageTemplate will be rendered.
export default withPrismicUnpublishedPreview(NotFoundPage, {
  templateMap: {
    homepage: Index,
  },
});
