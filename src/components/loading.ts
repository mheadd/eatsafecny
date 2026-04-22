export function showLoading(container: HTMLElement): void {
  let loader = container.querySelector(".loading-indicator");
  if (!loader) {
    loader = document.createElement("div");
    loader.className = "loading-indicator";
    loader.setAttribute("role", "status");
    loader.setAttribute("aria-live", "polite");
    loader.textContent = "Fetching data…";
    container.prepend(loader);
  }
  (loader as HTMLElement).style.display = "block";
}

export function hideLoading(container: HTMLElement): void {
  const loader = container.querySelector(".loading-indicator") as HTMLElement | null;
  if (loader) {
    loader.style.display = "none";
  }
}
