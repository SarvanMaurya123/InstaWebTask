import Leads, { ILead } from "../../schema/Leads";

export const createLeadService = async (data: Partial<ILead>) => {
  try {
    const newLead = await Leads.create(data);
    return newLead;
  } catch (error: any) {
    // Check for Mongoose validation errors
    if (error.name === "ValidationError") {
      throw new Error(`Validation Error: ${error.message}`);
    }
    

    // Throw a generic error for the controller/client
    throw new Error("An unexpected error occurred while creating the lead.");
  }
};