import Leads from "../../schema/Leads";

export const deleteLeadService = async (
  id: string
) => {
  return await Leads.findByIdAndDelete(id);
};
