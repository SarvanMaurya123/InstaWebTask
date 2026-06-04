import { Request, Response } from "express";
import { searchLeadsService } from "../../services/leads/searchLeads";

export const searchLeads = async (
  req: Request,
  res: Response
) => {
  try {
    const q =
      (req.query.q as string) || "";

    const leads =
      await searchLeadsService(q);

    return res.status(200).json({
      success: true,
      data: leads,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};