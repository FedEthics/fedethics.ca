# Reconsider 'Navigate' at footer

# Tasks

- Replace Formspree IDs (REPLACE_WITH_...) with actual form endpoints

- Newsletter button

# To develop React

1. Create React project
``` bash
npm create vite@latest fedethics-web -- --template react
```
2. Add/Substitute files from created folder with actual project 


# To deploy

1. Create the Build
``` bash
cd fedethics.ca/fedethics-web
npm run build
```

2. Zip `dist` folder 

3. In cPanel's File Manager, inside `public_html`, backup and erase/move to backup folder the old Namecheap website builder files so it is completely empty

4. Upload the zip into the `public_html` folder and extract, then delete the zip.

5. Fix React cPanel (.htaccess): 
    - with hidden files shown and inside `public_html`, loof for / create if nonexistent `.htaccess`
    - Paste this code into it:
        ```apache
        <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
        </IfModule>
    - This tells the server that if someone asks to be routed to a file or folder that doesnt exist, let React handle the routing.