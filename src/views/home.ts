export function renderHome(container: HTMLElement): void {
  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "home-view";

  const heading = document.createElement("h1");
  heading.textContent = "Eat Safe CNY";
  wrapper.appendChild(heading);

  const tagline = document.createElement("p");
  tagline.className = "tagline";
  tagline.textContent = "Search restaurant health inspections for Onondaga County, NY";
  wrapper.appendChild(tagline);

  const form = document.createElement("form");
  form.className = "search-form";
  form.setAttribute("role", "search");

  const label = document.createElement("label");
  label.setAttribute("for", "search-input");
  label.className = "sr-only";
  label.textContent = "Search by establishment name";

  const input = document.createElement("input");
  input.type = "text";
  input.id = "search-input";
  input.placeholder = "Enter restaurant name…";
  input.setAttribute("aria-label", "Search by establishment name");
  input.autocomplete = "off";

  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Search";

  form.appendChild(label);
  form.appendChild(input);
  form.appendChild(button);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value.trim();
    if (value) {
      window.location.search = `?search=${encodeURIComponent(value)}`;
    }
  });

  wrapper.appendChild(form);
  container.appendChild(wrapper);

  input.focus();
}
