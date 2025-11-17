import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
interface JwtPayload { id?: string; }
export const protect = (req: Request & { user?: any }, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'No token' });
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as JwtPayload;
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' });
  }
};
