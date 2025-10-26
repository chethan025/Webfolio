import React from "react";
import data from "../utils/data.json";

export default function GmailIcon() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        class="iconify iconify--cib"
        width="24"
        height="24"
        viewBox="0 0 32 32"
        style="color: currentcolor; width: 24px; height: 24px;"
        id="gmail"
        stroke="currentColor"
        fill="currentColor"
      >
        <title>gmail</title>
        <path
          fill="currentColor"
          d="M32 6v20c0 1.135-.865 2-2 2h-2V9.849l-12 8.62l-12-8.62V28H2c-1.135 0-2-.865-2-2V6c0-.568.214-1.068.573-1.422A1.97 1.97 0 0 1 2 4h.667L16 13.667L29.333 4H30c.568 0 1.068.214 1.427.578c.359.354.573.854.573 1.422"
        />
      </svg>
    </>
  );
}
