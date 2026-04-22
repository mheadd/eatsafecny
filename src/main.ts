import { renderNav } from "./components/nav";
import { showLoading, hideLoading } from "./components/loading";
import { renderHome } from "./views/home";
import { renderList } from "./views/list";
import { renderDetail } from "./views/detail";
import { searchByName, fetchLatest, fetchWorst, fetchDetail } from "./api";

function showError(container: HTMLElement, message: string): void {
  container.innerHTML = "";
  const div = document.createElement("div");
  div.className = "error-message";
  div.setAttribute("role", "alert");
  div.textContent = message;
  container.appendChild(div);
}

async function route(): Promise<void> {
  const app = document.getElementById("app");
  if (!app) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const search = params.get("search");
  const latest = params.get("latest");
  const worst = params.get("worst");

  if (id) {
    showLoading(app);
    try {
      const results = await fetchDetail(id);
      hideLoading(app);
      if (results.length === 0) {
        showError(app, "No inspection record found for that ID.");
        return;
      }
      renderDetail(app, results[0]);
    } catch {
      hideLoading(app);
      showError(app, "Failed to load inspection details. Please try again later.");
    }
  } else if (search) {
    showLoading(app);
    try {
      const results = await searchByName(search);
      hideLoading(app);
      renderList(app, results, `Search results for "${search}"`);
    } catch {
      hideLoading(app);
      showError(app, "Search failed. Please try again later.");
    }
  } else if (latest) {
    showLoading(app);
    try {
      const results = await fetchLatest();
      hideLoading(app);
      renderList(app, results, "Latest Inspections");
    } catch {
      hideLoading(app);
      showError(app, "Failed to load latest inspections. Please try again later.");
    }
  } else if (worst) {
    showLoading(app);
    try {
      const results = await fetchWorst();
      hideLoading(app);
      renderList(app, results, "Worst Offenders", true);
    } catch {
      hideLoading(app);
      showError(app, "Failed to load worst offenders. Please try again later.");
    }
  } else {
    renderHome(app);
  }
}

renderNav();
route();
