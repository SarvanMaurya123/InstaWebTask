import Leads from "../../schema/Leads";

export const getLeadByIdService = async (
  id: string
) => {
  return await Leads.findById(id);
};
