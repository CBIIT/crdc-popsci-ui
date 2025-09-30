/**
 * Assumptions & Purpose:
 *
 * By default, Recharts tooltips render inside the <svg> element of the chart.
 * - If the chart is narrower than the total number of bars, a scrolling container with `overflow: auto` is created.
 * - Tooltips rendered inside the chart’s <svg> can get clipped (cut off) when they should appear outside the visible area.
 *
 * Solution:
 * - Render the tooltip outside of the chart’s DOM hierarchy (e.g., in <body>), where it’s free from clipping.
 * - This is achieved using React Portals.
 *
 * CustomTooltip (old behavior):
 * - Rendered inside the chart.
 * - Got clipped when the chart was scrollable.
 *
 * PortalTooltip (new behavior):
 * - Renders outside the chart (in <body>) using a portal.
 * - Dynamically positions itself relative to the cursor position.
 * - Smart enough to flip to the left side if you’re near the right edge of the viewport.
 * - Clamps vertically so it won’t overflow above/below the window.
 * - Still shows the same content (Group + Participants) as CustomTooltip.
 */

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function PortalTooltip({
  active,
  payload,
  label,

  // optional tuning props to control tooltip layout
  maxWidth = 160,   // match tooltip maxWidth
  offset = 12,      // distance (px) from the cursor
  padding = 8,      // padding from viewport edges
  estHeight = 72,   // estimated tooltip height, used for vertical clamping
}) {
  // Track the current mouse position so we can place tooltip relative to it
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Update mouse position whenever the cursor moves
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY });

    // Attach listener on mount
    window.addEventListener('mousemove', onMove, { passive: true });

    // Cleanup listener on unmount
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Recharts passes these props: only show tooltip when hovering a bar
  if (!active || !payload?.length) return null;

  // Extract value (formatted with commas) for display
  const value = payload[0]?.value != null ? payload[0].value.toLocaleString() : '';

  // ---- Horizontal positioning logic ----

  // Space available to the right of the cursor
  const roomOnRight = window.innerWidth - mouse.x - padding;

  // Decide if we should place tooltip on the right or left of cursor
  const placeRight = roomOnRight > maxWidth + offset;

  // Calculate `left` position: clamp within viewport so it never overflows
  const left = placeRight
    ? Math.min(window.innerWidth - padding - maxWidth, mouse.x + offset) // place on right
    : Math.max(padding, mouse.x - maxWidth - offset);                    // place on left

  // ---- Vertical positioning logic ----

  // Calculate `top` position: slightly above cursor, but clamped inside viewport
  const top = Math.max(
    padding,                                                    // not above viewport
    Math.min(window.innerHeight - padding - estHeight,         // not below viewport
             mouse.y - 24)                                      // lift above cursor
  );
  // ---- Render via React Portal ----
  // Instead of rendering inside the <svg>, this creates a floating <div>
  // directly under <body>. That means it won't get clipped by parent
  // containers (e.g., scrolling wrappers or overflow: hidden).
  return createPortal(
    <div
      style={{
        position: 'fixed',             // lock position relative to viewport
        left,                          // computed horizontal position
        top,                           // computed vertical position
        zIndex: 9999,                  // sit above everything else
        maxWidth,           // match tooltip width
        background: '#fff',          // white background
        border: '1px solid #ccc',    // subtle border
        borderRadius: '5px',               // rounded corners
        padding: 10,                   // inner spacing
        overflowWrap: 'break-word',    // wrap long group names
        pointerEvents: 'none',         // don't block mouse interactions
        boxShadow: '0 6px 24px rgba(0,0,0,.18)', // subtle shadow
        fontFamily: 'Open Sans',
        fontSize: 12,
        lineHeight: 1.35,
      }}
      role="tooltip"
    >
      {/* Tooltip content */}
      <p style={{ margin: 0, fontWeight: 'bold' }}>{`Group: ${label}`}</p>
      <p style={{ margin: 0 }}>{`Participants: ${value}`}</p>
    </div>,
    document.body // <--- injected here instead of inside the chart <svg>
  );
}
