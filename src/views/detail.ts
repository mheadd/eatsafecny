import type { InspectionDetail } from "../api";
import { formatDate, toTitleCase } from "../utils";

function buildGoogleMapsUrl(address: string, city: string, state: string, zip: string): string {
  const query = `${address}, ${city}, ${state} ${zip}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function sanitizeText(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function formatViolations(raw: string): string {
  const sanitized = sanitizeText(raw);
  return sanitized
    .split(";")
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0)
    .map((segment) => {
      let formatted = segment.replace(
        /(Critical Violation)/gi,
        '<strong class="critical-label">$1</strong>',
      );
      formatted = formatted.replace(
        /\bRED\b/g,
        '<span class="red-highlight">RED</span>',
      );
      return formatted;
    })
    .join("<br>");
}

function addRow(tbody: HTMLElement, label: string, value: string | HTMLElement): void {
  const tr = document.createElement("tr");

  const th = document.createElement("th");
  th.scope = "row";
  th.textContent = label;
  tr.appendChild(th);

  const td = document.createElement("td");
  if (typeof value === "string") {
    td.textContent = value;
  } else {
    td.appendChild(value);
  }
  tr.appendChild(td);

  tbody.appendChild(tr);
}

export function renderDetail(container: HTMLElement, record: InspectionDetail): void {
  container.innerHTML = "";

  const heading = document.createElement("h1");
  heading.textContent = toTitleCase(record.operation_name);
  container.appendChild(heading);

  const table = document.createElement("table");
  table.className = "detail-table";
  const tbody = document.createElement("tbody");

  addRow(tbody, "Facility Name", toTitleCase(record.operation_name));

  const addressLink = document.createElement("a");
  addressLink.href = buildGoogleMapsUrl(
    record.facility_address,
    record.city,
    record.food_service_facility_state,
    record.zip_code,
  );
  addressLink.target = "_blank";
  addressLink.rel = "noopener noreferrer";
  addressLink.textContent = `${toTitleCase(record.facility_address)}, ${toTitleCase(record.city)}, ${record.food_service_facility_state} ${record.zip_code}`;
  addRow(tbody, "Address", addressLink);

  addRow(tbody, "Inspection Date", record.date ? formatDate(record.date) : "N/A");
  addRow(tbody, "Critical Violations", record.total_critical_violations ?? "0");
  addRow(tbody, "Critical Not Corrected", record.total_crit_not_corrected ?? "0");

  if (record.violations) {
    const violationRow = document.createElement("tr");
    const violationTh = document.createElement("th");
    violationTh.scope = "row";
    violationTh.textContent = "Violations";
    violationRow.appendChild(violationTh);

    const violationTd = document.createElement("td");
    violationTd.className = "violation-text";
    // Using innerHTML intentionally here — input is sanitized via sanitizeText in formatViolations
    violationTd.innerHTML = formatViolations(record.violations);
    violationRow.appendChild(violationTd);

    tbody.appendChild(violationRow);
  }

  table.appendChild(tbody);
  container.appendChild(table);

  const backLink = document.createElement("a");
  backLink.href = "/";
  backLink.className = "back-link";
  backLink.textContent = "← Back to search";
  container.appendChild(backLink);
}
