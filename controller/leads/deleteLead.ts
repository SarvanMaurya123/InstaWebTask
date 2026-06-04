import { Request, Response } from "express";
import { deleteLeadService } from "../../services/leads/deletebyId";

export const deleteLead = async (
  req: Request,
  res: Response
) => {
  try {
    const lead =
      await deleteLeadService(
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
      message:
        "Lead deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};