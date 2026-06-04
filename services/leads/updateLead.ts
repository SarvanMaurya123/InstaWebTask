import Leads, { ILead } from "../../schema/Leads";

export const updateLeadService = async (
  id: string,
  data: Partial<ILead>
) => {
  return await Leads.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};