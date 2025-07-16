//import * as rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';
import { rateLimit } from 'express-rate-limit';



const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: 'Too many requests. Please try again later.',
});

export function RateLimitMiddleware(req: Request, res: Response, next: NextFunction) {
  if (
    (req.method === 'POST' && req.originalUrl.includes('/user')) ||
    (req.method === 'POST' && req.originalUrl.includes('/product'))
  ) {
    return limiter(req, res, next);
  }
  next();
}
