from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Start server in background if not running (assumed running for this test context or we would need to start it)
        # For this script, we assume the dev server is up at localhost:4200.
        # If not, we'd need to start it.

        try:
            page.goto("http://localhost:4200/poster-generator/official-panel")
            page.wait_for_selector("app-official-panel")

            # Type a name to trigger update
            page.fill("#nameInput", "MARIA")
            page.wait_for_timeout(1000) # Wait for binding update

            # Take screenshot
            os.makedirs("verification", exist_ok=True)
            page.screenshot(path="verification/poster_preview_v2.png")
            print("Screenshot saved to verification/poster_preview_v2.png")

            # Verify Font Family usage
            # We can evaluate JS to check computed style of the h1
            font_family = page.eval_on_selector("h1", "el => window.getComputedStyle(el).fontFamily")
            print(f"H1 Font Family: {font_family}")

            if "Anton" in font_family:
                print("SUCCESS: Anton font is being used.")
            else:
                print("WARNING: Anton font might not be active.")

        except Exception as e:
            print(f"Error during verification: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
