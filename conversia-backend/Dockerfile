FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
