import { Request, Response } from "express";
import { leadStatsService } from "../../services/leads/leadStats";

export const getLeadStats = async (
  req: Request,
  res: Response
) => {
  try {
    const stats =
      await leadStatsService();

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};