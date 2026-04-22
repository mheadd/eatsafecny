const NAV_LINKS = [
  { label: "Latest", href: "/?latest=true", external: false },
  { label: "Worst", href: "/?worst=true", external: false },
  { label: "About", href: "/about.html", external: false },
  {
    label: "Data",
    href: "https://health.data.ny.gov/Health/Onondaga-County-Restaurant-Inspections/tbxv-5tbd",
    external: true,
  },
];

export function renderNav(): void {
  const nav = document.getElementById("main-nav");
  if (!nav) return;

  const brand = document.createElement("a");
  brand.href = "/";
  brand.className = "nav-brand";
  brand.textContent = "Eat Safe CNY";
  nav.appendChild(brand);

  const toggle = document.createElement("button");
  toggle.className = "nav-toggle";
  toggle.setAttribute("aria-label", "Toggle navigation menu");
  toggle.setAttribute("aria-expanded", "false");
  toggle.innerHTML = '<span class="nav-toggle-icon"></span>';
  nav.appendChild(toggle);

  const ul = document.createElement("ul");
  ul.className = "nav-links";
  ul.setAttribute("role", "list");

  for (const link of NAV_LINKS) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = link.href;
    a.textContent = link.label;
    if (link.external) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    li.appendChild(a);
    ul.appendChild(li);
  }

  nav.appendChild(ul);

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    ul.classList.toggle("open");
  });
}
