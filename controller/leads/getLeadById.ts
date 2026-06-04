import { Request, Response } from "express";
import { getLeadByIdService } from "../../services/leads/getleadsbyId";

export const getLeadById = async (
  req: Request,
  res: Response
) => {
  try {
    const lead =
      await getLeadByIdService(
        req.params.id as string
      );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};