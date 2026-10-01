import React from "react";

/**
 * LineBreaksRenderer: A React component for rendering text with line breaks.
 * Optionally utilizes DOMPurify for HTML sanitization and ensures proper rendering in React.
 *
 * @param {string} htmlContent - The text content to be rendered.
 * @param {boolean} [sanitize=true] - Flag to indicate whether HTML sanitization should be applied.
 * @param {string} [props.classes] - Optional classes to apply custom styles.
 * @returns {JSX.Element} - React component
 */
const LineBreaksRenderer = ({ htmlContent, sanitize = true, classes }) => {
  if (!sanitize) {
    return (
      <span
        className={classes}
        dangerouslySetInnerHTML={{ __html: htmlContent || "" }}
      />
    );
  }

  const content =
    htmlContent === null || htmlContent === undefined
      ? ""
      : String(htmlContent);
  const lines = content.split(/<br\s*\/?\s*>/gi);

  return (
    <span className={classes}>
      {lines.map((line, index) => (
        <React.Fragment key={index}>
          {index > 0 && <br />}
          {line}
        </React.Fragment>
      ))}
    </span>
  );
};

export default LineBreaksRenderer;
