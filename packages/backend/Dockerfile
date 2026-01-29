FROM oven/bun:1.3.6-alpine
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app
RUN mkdir data
COPY package*.json tsconfig*.json  bun*.lock ./
RUN bun install
COPY . .
RUN bunx prisma generate
EXPOSE 3000
CMD [ "bun","run","index.ts" ]
