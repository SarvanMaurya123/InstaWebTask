import { Request, Response } from "express";
import { getAllLeadsService } from "../../services/leads/getleads";

export const getAllLeads = async (
  req: Request,
  res: Response
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit =
      Number(req.query.limit) || 10;

    const search =
      req.query.search as string;

    const status =
      req.query.status as string;

    const data =
      await getAllLeadsService(
        page,
        limit,
        search,
        status
      );

    return res.status(200).json({
      success: true,
      ...data,
      message: "Leads retrieved successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
