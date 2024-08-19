import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  max: 100,
  windowMs: 24 * 60 * 60 * 1000, // 24hrs
  message: 'You have exceeded the 100 requests in 24hrs'
})