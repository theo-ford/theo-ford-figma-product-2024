import * as React from "react";
import { withPrismicPreviewResolver } from "gatsby-plugin-prismic-previews";

const PreviewPage = ({ isPreview, isLoading }) => {
  if (isPreview === false) return "Not a preview!";

  return (
    <>
      <p>Loading</p>
    </>
  );
};


export default withPrismicPreviewResolver(PreviewPage, {
  repositoryName: `Martinez-2`,
  // linkResolver: ({ node, key, value }) => (post) => `/${post.uid}`,
});
