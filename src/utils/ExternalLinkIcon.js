import React from "react";
import defaultIcon from "../assets/externalLinkIcon.svg";

/**
 * Configurable ExternalLinkIcon component.
 *
 * Props:
 * - src: custom icon source (default: externalLinkIcon.svg)
 * - width: icon width (default: 14)
 * - height: icon height (default: 14)
 * - alt: alt text (default: 'outbound website icon')
 * - className: additional className(s)
 * - style: inline style object
 */
const ExternalLinkIcon = ({
  src = defaultIcon,
  width = 14,
  height = 14,
  alt = "outbound website icon",
  className = "",
  style = {},
  ...rest
}) => (
  <img
    src={src}
    width={width}
    height={height}
    alt={alt}
    className={className}
    style={style}
    {...rest}
  />
);

export default ExternalLinkIcon;
