# Gunakan versi Node.js yang sesuai
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy kode aplikasi dan Prisma schema
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build aplikasi Next.js
RUN npm run build

# Expose port aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]
