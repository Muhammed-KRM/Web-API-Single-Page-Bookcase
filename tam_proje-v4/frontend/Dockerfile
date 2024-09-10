# Production aşaması
FROM nginx:alpine

# Statik dosyaları /usr/share/nginx/html dizinine kopyalayın
COPY . /usr/share/nginx/html

# Port 80'i açın
EXPOSE 80

# Nginx'i çalıştırın
CMD ["nginx", "-g", "daemon off;"]
