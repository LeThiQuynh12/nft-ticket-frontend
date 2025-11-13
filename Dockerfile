# ---- Development mode ----
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
# KHÔNG copy code ở đây để tránh cache code cũ
# COPY . .
EXPOSE 5173
# Chạy dev server với hot reload
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
