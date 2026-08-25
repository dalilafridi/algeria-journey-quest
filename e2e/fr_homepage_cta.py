#!/usr/bin/env python3
"""End-to-end check: French homepage exhibit CTAs.

Verifies, at desktop (1280) and mobile (390) widths, that:
  1. the corrected French wording "Entrer dans l'exposition" is visible,
  2. no visible instance of the French mis-wording "exhibition" remains,
  3. the M'Zab and Football Hall CTAs navigate to /mzab and /football.

Run:  python3 e2e/fr_homepage_cta.py [base_url]
Default base_url is the local dev server, http://localhost:8080
"""

import asyncio
import sys

from playwright.async_api import async_playwright

BASE = (sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8080").rstrip("/")
VIEWPORTS = [("desktop", 1280, 900), ("mobile", 390, 844)]
CTA = "Entrer dans l\u2019exposition"
TARGETS = [("/mzab", "M\u2019Zab"), ("/football", "Football")]

failures: list[str] = []


def check(label: str, ok: bool, detail: str = "") -> None:
    print(("PASS  " if ok else "FAIL  ") + label + (f"  {detail}" if detail else ""))
    if not ok:
        failures.append(label)


async def open_fr_home(context, base: str):
    page = await context.new_page()
    await page.goto(base + "/", wait_until="domcontentloaded")
    await page.wait_for_load_state("networkidle")
    return page


async def run_viewport(browser, name: str, width: int, height: int) -> None:
    context = await browser.new_context(viewport={"width": width, "height": height})
    # French is resolved server-side from the dzo_lang cookie.
    await context.add_cookies(
        [{"name": "dzo_lang", "value": "fr", "url": BASE}]
    )
    page = await open_fr_home(context, BASE)

    html_lang = await page.get_attribute("html", "lang")
    check(f"[{name}] page renders in French", html_lang == "fr", f"lang={html_lang}")

    ctas = page.get_by_role("link", name=CTA)
    count = await ctas.count()
    check(f"[{name}] corrected CTA '{CTA}' present", count >= 2, f"count={count}")
    if count:
        check(f"[{name}] first corrected CTA is visible", await ctas.first.is_visible())

    body = (await page.inner_text("body")).lower()
    check(f"[{name}] no visible French 'exhibition'", "exhibition" not in body)

    for path, label in TARGETS:
        link = page.locator(f'a[href="{path}"]').first
        exists = await link.count() > 0
        check(f"[{name}] {label} card links to {path}", exists)
        if not exists:
            continue
        await link.scroll_into_view_if_needed()
        await link.click()
        await page.wait_for_url(f"**{path}", timeout=15000)
        check(
            f"[{name}] {label} CTA navigates to {path}",
            page.url.endswith(path),
            page.url,
        )
        await page.go_back(wait_until="domcontentloaded")
        await page.wait_for_load_state("networkidle")

    await context.close()


async def main() -> int:
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        for name, w, h in VIEWPORTS:
            await run_viewport(browser, name, w, h)
        await browser.close()
    print("\n" + ("ALL CHECKS PASSED" if not failures else f"{len(failures)} FAILED: {failures}"))
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main()))
