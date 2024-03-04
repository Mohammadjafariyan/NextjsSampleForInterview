FROM node:hydrogen-alpine3.18 as builder 

WORKDIR '/app'

COPY package.json .
RUN npm install

COPY . .

# Copy Prisma schema and run migrations
COPY prisma ./prisma
COPY .env .


# Rebuild bcrypt module inside Docker container
# Install OpenSSL (if necessary)
#RUN apt-get update && apt-get install -y openssl

# Set the library path
ENV LD_LIBRARY_PATH=/usr/lib:/usr/local/lib

# Build your application
RUN npm run build 

# Expose the port on which the Fastify server will run
EXPOSE 3000


# Generate Prisma client and then run the Fastify server
CMD npx prisma generate && node server.js
#FROM nginx 

# Copy the built application from the builder stage
#COPY --from=builder /app/build /usr/share/nginx/html
