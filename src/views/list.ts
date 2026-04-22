import type { InspectionSummary } from "../api";
import { paginate, totalPages, renderPagination } from "../components/pagination";
import { formatDate, toTitleCase } from "../utils";

function renderPage(
  container: HTMLElement,
  items: InspectionSummary[],
  page: number,
  total: number,
  title: string,
  showViolations: boolean,
): void {
  container.innerHTML = "";

  const heading = document.createElement("h1");
  heading.textContent = title;
  container.appendChild(heading);

  if (items.length === 0) {
    const msg = document.createElement("p");
    msg.className = "no-results";
    msg.textContent = "No results found.";
    container.appendChild(msg);
    return;
  }

  const pageItems = paginate(items, page);

  const table = document.createElement("table");
  table.className = "results-table";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const headers = ["Name", "Address", "City", "Date"];
  if (showViolations) headers.push("Violations");

  for (const h of headers) {
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = h;
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  for (const item of pageItems) {
    const tr = document.createElement("tr");

    const nameTd = document.createElement("td");
    nameTd.setAttribute("data-label", "Name");
    const link = document.createElement("a");
    link.href = `/?id=${encodeURIComponent(item.nys_health_operation_id)}`;
    link.textContent = toTitleCase(item.operation_name);
    nameTd.appendChild(link);
    tr.appendChild(nameTd);

    const addrTd = document.createElement("td");
    addrTd.setAttribute("data-label", "Address");
    addrTd.textContent = toTitleCase(item.facility_address);
    tr.appendChild(addrTd);

    const cityTd = document.createElement("td");
    cityTd.setAttribute("data-label", "City");
    cityTd.textContent = toTitleCase(item.city);
    tr.appendChild(cityTd);

    const dateTd = document.createElement("td");
    dateTd.setAttribute("data-label", "Date");
    dateTd.textContent = item.date ? formatDate(item.date) : "N/A";
    tr.appendChild(dateTd);

    if (showViolations) {
      const violTd = document.createElement("td");
      violTd.setAttribute("data-label", "Violations");
      violTd.textContent = item.total_critical_violations ?? "0";
      tr.appendChild(violTd);
    }

    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  container.appendChild(table);

  renderPagination(container, page, total, (newPage) => {
    renderPage(container, items, newPage, total, title, showViolations);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

export function renderList(
  container: HTMLElement,
  items: InspectionSummary[],
  title: string,
  showViolations = false,
): void {
  const total = totalPages(items.length);
  renderPage(container, items, 1, total, title, showViolations);
}
