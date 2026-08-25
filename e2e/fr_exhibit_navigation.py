#!/usr/bin/env python3
"""End-to-end check: French exhibit card navigation (M'Zab and Football Hall).

At desktop (1280) and mobile (390) widths, in French, verifies that:
  1. the homepage cards link to the correct hrefs (/mzab, /football),
  2. clicking a card lands on that URL and renders the expected French H1,
  3. going back to the French homepage still shows both cards and the
     "Entrer dans l'exposition" CTA wording,
  4. direct navigation to /mzab and /football renders the correct French
     document titles.

Run:  python3 e2e/fr_exhibit_navigation.py [base_url]
Default base_url is the local dev server, http://localhost:8080
"""

import asyncio
import re
import sys

from playwright.async_api import async_playwright

BASE = (sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8080").rstrip("/")
VIEWPORTS = [("desktop", 1280, 900), ("mobile", 390, 844)]

# Accept either apostrophe form so the test fails on wording, not punctuation.
CTA_RE = re.compile(r"Entrer dans l['\u2019]exposition", re.IGNORECASE)

TARGETS = [
    {
        "path": "/mzab",
        "name": "M\u2019Zab",
        "h1": re.compile(r"Vall\u00e9e du M['\u2019]Zab", re.IGNORECASE),
        "title": re.compile(r"vall\u00e9e du M['\u2019]Zab", re.IGNORECASE),
    },
    {
        "path": "/football",
        "name": "Football",
        "h1": re.compile(r"football alg\u00e9rien", re.IGNORECASE),
        "title": re.compile(r"football alg\u00e9rien", re.IGNORECASE),
    },
]

failures: list[str] = []


def check(label: str, ok: bool, detail: str = "") -> None:
    print(f"{'PASS' if ok else 'FAIL'}  {label}{(' :: ' + detail) if detail else ''}")
    if not ok:
        failures.append(label)


async def open_fr_home(page) -> None:
    await page.goto(f"{BASE}/", wait_until="domcontentloaded")
    await page.wait_for_timeout(1200)


async def run() -> None:
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        try:
            for vp_name, width, height in VIEWPORTS:
                ctx = await browser.new_context(viewport={"width": width, "height": height})
                # The site resolves language from the dzo_lang cookie.
                await ctx.add_cookies(
                    [{"name": "dzo_lang", "value": "fr", "url": BASE}]
                )
                page = await ctx.new_page()

                for target in TARGETS:
                    path, name = target["path"], target["name"]
                    tag = f"[{vp_name}] {name}"

                    await open_fr_home(page)
                    cards = page.locator(f'a[href="{path}"]:visible')
                    count = await cards.count()
                    check(f"{tag} card links to {path}", count > 0, f"{count} visible link(s)")
                    if count == 0:
                        continue

                    card = cards.first
                    await card.scroll_into_view_if_needed()
                    await card.click()
                    await page.wait_for_url(re.compile(re.escape(path) + r"/?$"), timeout=15000)
                    await page.wait_for_timeout(1200)

                    check(f"{tag} navigated to {path}", page.url.rstrip("/").endswith(path))

                    h1s = [t.strip() for t in await page.locator("h1").all_text_contents()]
                    check(
                        f"{tag} French H1 on {path}",
                        any(target["h1"].search(t) for t in h1s),
                        str(h1s),
                    )

                    # Return to the French homepage and confirm it is intact.
                    await page.go_back(wait_until="domcontentloaded")
                    await page.wait_for_timeout(1200)
                    check(
                        f"{tag} back on French homepage",
                        page.url.rstrip("/") == BASE,
                        page.url,
                    )
                    for other in TARGETS:
                        n = await page.locator(f'a[href="{other["path"]}"]:visible').count()
                        check(
                            f"{tag} back: {other['name']} card still visible",
                            n > 0,
                            f"{n} link(s)",
                        )
                    body = await page.locator("body").inner_text()
                    check(f"{tag} back: CTA wording intact", bool(CTA_RE.search(body)))
                    check(
                        f"{tag} back: no French 'exhibition' mis-wording",
                        "exhibition" not in body.lower(),
                    )

                    # Direct navigation renders the correct French title.
                    await page.goto(f"{BASE}{path}", wait_until="domcontentloaded")
                    await page.wait_for_timeout(1200)
                    title = await page.title()
                    check(
                        f"{tag} direct load French title",
                        bool(target["title"].search(title)),
                        title,
                    )

                await ctx.close()
        finally:
            await browser.close()

    print()
    if failures:
        print(f"{len(failures)} check(s) failed:")
        for f in failures:
            print(f"  - {f}")
        sys.exit(1)
    print("All checks passed.")


asyncio.run(run())
