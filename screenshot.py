from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    # 使用系统自带的 Edge 浏览器
    browser = p.chromium.launch(channel="msedge", headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto('https://luxiyuan-portfolio.pages.dev')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(2000)
    
    page.screenshot(path='d:/code/personal_resume/screenshot_top.png', full_page=False)
    page.screenshot(path='d:/code/personal_resume/screenshot_full.png', full_page=True)
    
    print("Screenshots saved!")
    print(f"Title: {page.title()}")
    browser.close()
