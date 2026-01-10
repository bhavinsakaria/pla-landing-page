# Deployment Instructions

This project is built with [Astro](https://astro.build) and can be deployed as a static site.

## Build for Production

Run the following command to generate the static files:

```bash
npm run build
```

This will create a `dist/` directory containing your optimized static website.

## Deploying to Nginx VPS

1. **Upload Files**: Transfer the contents of the `dist/` folder to your VPS web root (e.g., `/var/www/pharmalinks`).

   ```bash
   scp -r dist/* user@your-vps-ip:/var/www/pharmalinks
   ```

2. **Nginx Configuration**: Create or update your Nginx server block config.

   ```nginx
   server {
       listen 80;
       server_name pharmalinks.in www.pharmalinks.in;

       root /var/www/pharmalinks;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # Optional: Cache static assets
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
           expires 30d;
           add_header Cache-Control "public, no-transform";
       }
   }
   ```

3. **Restart Nginx**:
   ```bash
   sudo systemctl reload nginx
   ```

## Development

To run the project locally:

```bash
npm run dev
```
