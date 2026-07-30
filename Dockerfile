# SmartOne website — production image for Coolify
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Both of these are resolved during `next build`, NOT at run time, so they have
# to be build args – setting them as runtime environment variables in Coolify
# has no effect at all, and fails silently:
#   NEXT_PUBLIC_SITE_URL is inlined into the client bundle;
#   ENABLE_HSTS is read by next.config.ts, whose headers() is compiled into
#   .next/routes-manifest.json at build time.
# Leaving them unset is the normal production case: SITE_URL then falls back to
# the canonical domain, and HSTS stays off until TLS is confirmed working.
ARG NEXT_PUBLIC_SITE_URL=""
ARG ENABLE_HSTS=""
ENV NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    ENABLE_HSTS=$ENABLE_HSTS
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
USER nextjs

EXPOSE 3000
CMD ["node", "server.js"]
