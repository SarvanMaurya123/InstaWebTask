import { Request, Response } from "express";
import { createLeadService } from "../../services/leads/createleads.services";

export const createLead = async (
  req: Request,
  res: Response
) => {
  try {
    const lead =
      await createLeadService(req.body);

    return res.status(201).json({
      success: true,
      data: lead,
      message: "Lead created successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};