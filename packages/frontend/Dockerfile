FROM oven/bun:1.3.6-alpine
WORKDIR /app
COPY package*.json tsconfig*.json  bun*.lock ./
RUN bun install
COPY . .
EXPOSE 5173
CMD [ "bun","run","dev" ]
