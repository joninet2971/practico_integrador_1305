FROM node:18-alpine

WORKDIR /app

# Crear directorio db si no existe
RUN mkdir -p /app/db

COPY package*.json ./
RUN npm install

COPY . .

RUN touch /app/db/db.json && \
    chmod 777 /app/db/db.json && \
    chmod -R 777 /app/db

EXPOSE 4000

CMD ["node", "index.js"]
