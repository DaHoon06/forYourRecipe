FROM node:16-alpine

RUN mkdir -p /app
WORKDIR /app

COPY ../backend .

RUN npm ci

RUN npm run build

ENV NODE_EMV production
EXPOSE 3666
CMD ["npm", "run", "start:prod"]

