from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_live_editor(page: Page):
    print("Verifying Live Editor...")
    page.goto("http://localhost:4200/poster-generator/live-editor")

    # Check title
    expect(page.get_by_text("Editor en Vivo")).to_be_visible()

    # Input Text
    input_field = page.get_by_placeholder("ESCRIBE AQUÍ...")
    input_field.fill("HOLA MUNDO")

    # Check Preview
    # Note: text is uppercase in preview
    expect(page.get_by_role("heading", name="HOLA MUNDO")).to_be_visible()

    page.screenshot(path="verification/live_editor.png")
    print("Live Editor screenshot taken.")

def verify_official_panel(page: Page):
    print("Verifying Official Panel...")
    page.goto("http://localhost:4200/poster-generator/official-panel")

    # Check title
    expect(page.get_by_text("Tarjeta Oficial")).to_be_visible()

    # Input Name
    input_field = page.get_by_placeholder("Escribe tu nombre aquí")
    input_field.fill("Maria")

    # Check Preview for "Maria VOTA POR XAVIER"
    # Note: text is uppercase in HTML: "font-display text-4xl text-black uppercase"
    # The binding is {{ name() }} VOTA POR XAVIER
    # So it should be "Maria VOTA POR XAVIER"
    # But css uppercase transforms it.

    # Using text locator with exact or partial match
    expect(page.get_by_text("Maria VOTA POR XAVIER")).to_be_visible()

    page.screenshot(path="verification/official_panel.png")
    print("Official Panel screenshot taken.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_live_editor(page)
            verify_official_panel(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()
