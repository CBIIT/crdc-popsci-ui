import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import LineBreaksRenderer from "./LineBreaksRenderer";

describe("LineBreaksRenderer", () => {
  it("preserves angle-bracket text and renders br tags as line breaks", () => {
    const markup = renderToStaticMarkup(
      <LineBreaksRenderer
        htmlContent={
          "<The type of information contained in an electronic record.> A curated indicator<br>CDE ID = 14824731"
        }
        classes="copy"
      />,
    );

    expect(markup).toContain('class="copy"');
    expect(markup).toContain(
      "&lt;The type of information contained in an electronic record.&gt;",
    );
    expect(markup).toContain("A curated indicator<br/>CDE ID = 14824731");
    expect(markup).not.toContain("<The type of information");
  });

  it("renders other markup as literal text", () => {
    const markup = renderToStaticMarkup(
      <LineBreaksRenderer
        htmlContent="Alpha<script>alert('unsafe')</script><br>Beta"
        classes="copy"
      />,
    );

    expect(markup).toContain(
      'Alpha&lt;script&gt;alert(&#x27;unsafe&#x27;)&lt;/script&gt;',
    );
    expect(markup).toContain("<br/>Beta");
  });
});
