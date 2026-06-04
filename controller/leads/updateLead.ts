import { Request, Response } from "express";
import { updateLeadService } from "../../services/leads/updateLead";

export const updateLead = async (
  req: Request,
  res: Response
) => {
  try {
    const lead =
      await updateLeadService(
        req.params.id as string,
        req.body
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
      message: "Lead updated successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};