import os

def build_project():
    print("Starting build...")
    
    if not os.path.exists('dist'):
        os.makedirs('dist')

    # Read base template
    with open('src/index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Re-inject tabs
    tabs_folder = 'src/tabs'
    if os.path.exists(tabs_folder):
        for f in os.listdir(tabs_folder):
            if f.endswith('.html'):
                tid = 'page-' + f.replace('.html', '')
                with open(os.path.join(tabs_folder, f), 'r', encoding='utf-8') as tf:
                    t_content = tf.read()
                html = html.replace(f'<!-- INJECT_TAB_{tid} -->', t_content)
    
    # Re-inject admin tabs into admin_content
    admin_main_path = 'src/admin/admin-main.html'
    if os.path.exists(admin_main_path):
        with open(admin_main_path, 'r', encoding='utf-8') as f:
            admin_content = f.read()
            
        # Re-inject all individual admin tabs
        admin_tabs = [
            'admin-overview', 'admin-attendance', 'admin-weekly', 'admin-monthly',
            'admin-stats', 'admin-profiles', 'admin-coaching', 'admin-monitoring',
            'admin-rebuttal', 'admin-weekperf'
        ]
        for atid in admin_tabs:
            atid_path = f'src/admin/{atid}.html'
            if os.path.exists(atid_path):
                with open(atid_path, 'r', encoding='utf-8') as af:
                    a_content = af.read()
                admin_content = admin_content.replace(f'<!-- INJECT_ADMIN_TAB_{atid} -->', a_content)
        
        # Inject the fully assembled admin section into the main html
        html = html.replace('<!-- INJECT_TAB_page-admin -->', admin_content)

    # Note: Currently CSS from src/css/main.css and JS from src/js/app.js 
    # are linked via standard tags. If you need a strict single-file HTML 
    # output (e.g. for some CRM system), uncomment the code below to inline them.
    
    # --- UNCOMMENT BELOW TO INLINE EVERYTHING INTO A SINGLE FILE ---
    
    # with open('src/css/main.css', 'r', encoding='utf-8') as f:
    #     css = f.read()
    # html = html.replace('<link rel="stylesheet" href="css/main.css">', f'<style>\n{css}\n</style>')
    #
    # with open('src/js/firebase-config.js', 'r', encoding='utf-8') as f:
    #     fb_js = f.read()
    # html = html.replace('<script src="js/firebase-config.js"></script>', f'<script>\n{fb_js}\n</script>')
    #
    # with open('src/js/app.js', 'r', encoding='utf-8') as f:
    #     app_js = f.read()
    # html = html.replace('<script src="js/app.js"></script>', f'<script>\n{app_js}\n</script>')

    # Write output
    with open('dist/index.html', 'w', encoding='utf-8') as f:
        f.write(html)
        
    print("Build complete! Open dist/index.html to view your project.")

if __name__ == '__main__':
    build_project()
