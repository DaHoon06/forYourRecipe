FROM node:16-alpine

WORKDIR /app
COPY ../backend .
RUN npm ci
RUN npm build
ENV NODE_EMV production
CMD ["npm", "run", "start:prod"]

