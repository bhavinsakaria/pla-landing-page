# Pharma Links Agencies - Landing Website

This project is a modern landing page for Pharma Links Agencies, built with [Astro](https://astro.build), [Alpine.js](https://alpinejs.dev/), and Vanilla CSS. It is designed to be fast, responsive, and easy to deploy.

## Quick Start

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Locally**:
    ```bash
    npm run dev
    ```
    Visit `http://localhost:4321` to view the site.

## Build for Production

Run the following command to generate the static files:

```bash
npm run build
```

This will create a `dist/` directory containing your optimized static website.

---

## Deployment Guide

### Option 1: Cloudflare Pages (Recommended)

Cloudflare Pages is the easiest way to deploy this site.

#### **Method A: Connect to Git (Automatic)**
1.  Push your code to a GitHub/GitLab repository.
2.  Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and go to **Compute (Workers & Pages)** > **Pages**.
3.  Click **Connect to Git** and select your repository.
4.  **Configure Build Settings**:
    *   **Framework Preset**: `Astro`
    *   **Build Command**: `npm run build`
    *   **Build Output Directory**: `dist`
5.  Click **Save and Deploy**. Cloudflare will automatically build and deploy your site on every push.

#### **Method B: Direct Upload**
1.  Run `npm run build` locally.
2.  Go to Cloudflare Pages and select **Upload Assets**.
3.  Upload the contents of the `dist/` folder.

---

### Option 2: Nginx VPS

If you prefer hosting on your own server:

1.  **Upload Files**: Transfer the contents of the `dist/` folder to your VPS web root (e.g., `/var/www/pharmalinks`).

    ```bash
    scp -r dist/* user@your-vps-ip:/var/www/pharmalinks
    ```

2.  **Nginx Configuration**: Create or update your Nginx server block config.

    ```nginx
    server {
        listen 80;
        server_name pharmalinks.in www.pharmalinks.in;

        root /var/www/pharmalinks;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 30d;
            add_header Cache-Control "public, no-transform";
        }
    }
    ```

3.  **Restart Nginx**:
    ```bash
    sudo systemctl reload nginx
    ```
