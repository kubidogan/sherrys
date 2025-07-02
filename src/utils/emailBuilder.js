// File: src/utils/emailBuilder.js

export function buildEmailHtml(data) {
  let rows = "";

  for (const [key, value] of Object.entries(data)) {
    if (value && value !== "N/A") {
      rows += `
        <tr>
          <td style="padding:8px; background:#f7f7f7; font-weight:bold;">${key}</td>
          <td style="padding:8px;">${value}</td>
        </tr>`;
    }
  }

  return `
    <div style="font-family: system-ui, sans-serif;">
      <h2>New Reservation</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}
