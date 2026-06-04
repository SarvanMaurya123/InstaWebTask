import Leads from "../../schema/Leads";

export const searchLeadsService = async (
  keyword: string
) => {
  return await Leads.find({
    $or: [
      {
        name: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        email: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        companyName: {
          $regex: keyword,
          $options: "i",
        },
      },
    ],
  });
};