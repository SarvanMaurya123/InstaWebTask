import { Request, Response } from "express";
export const me = async (
  req: any,
  res: Response
) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};