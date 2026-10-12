"""Fails if any page links to a missing local file or a missing #anchor,
or uses an inline style/script (the site's CSP blocks those)."""
import html.parser, pathlib, sys

SITE = pathlib.Path(__file__).resolve().parent.parent / "site"
problems = []


class Page(html.parser.HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.refs = set(), []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            self.ids.add(a["id"])
        if "style" in a:
            problems.append(f"{self.name}: inline style on <{tag}>")
        if tag == "script" and "src" not in a:
            problems.append(f"{self.name}: inline <script>")
        for key in ("href", "src"):
            if a.get(key):
                self.refs.append(a[key])


for path in sorted(SITE.rglob("*.html")):
    page = Page()
    page.name = path.name
    page.feed(path.read_text(encoding="utf-8"))
    for ref in page.refs:
        if ref.startswith("#"):
            if ref[1:] not in page.ids:
                problems.append(f"{path.name}: missing anchor {ref}")
        elif ref.startswith("/"):
            target = SITE / ref.split("#")[0].split("?")[0].lstrip("/")
            if target.is_dir() or ref == "/":
                target = target / "index.html"
            if not target.exists():
                problems.append(f"{path.name}: missing file {ref}")

for p in problems:
    print(p)
print(f"{len(problems)} problem(s)")
sys.exit(1 if problems else 0)
