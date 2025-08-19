export const server =
  process.env.NODE_ENV !== "production"
    ? process.env.NEXT_PUBLIC_LOCAL_API
    : process.env.PROD_API;
