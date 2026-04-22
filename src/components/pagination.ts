export function paginate<T>(items: T[], page: number, perPage = 10): T[] {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}

export function totalPages(itemCount: number, perPage = 10): number {
  return Math.ceil(itemCount / perPage);
}

export function renderPagination(
  container: HTMLElement,
  currentPage: number,
  total: number,
  onPageChange: (page: number) => void,
): void {
  const existing = container.querySelector(".pagination");
  if (existing) existing.remove();

  if (total <= 1) return;

  const nav = document.createElement("nav");
  nav.className = "pagination";
  nav.setAttribute("aria-label", "Results pagination");

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "← Previous";
  prevBtn.disabled = currentPage <= 1;
  prevBtn.addEventListener("click", () => onPageChange(currentPage - 1));

  const pageInfo = document.createElement("span");
  pageInfo.className = "page-info";
  pageInfo.textContent = `Page ${currentPage} of ${total}`;

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next →";
  nextBtn.disabled = currentPage >= total;
  nextBtn.addEventListener("click", () => onPageChange(currentPage + 1));

  nav.appendChild(prevBtn);
  nav.appendChild(pageInfo);
  nav.appendChild(nextBtn);
  container.appendChild(nav);
}
