import Leads from "../../schema/Leads";

export const getAllLeadsService = async (
  page: number,
  limit: number,
  search?: string,
  status?: string
) => {
  const query: any = {};

  if (status) {
    query.status = status;
  }

  if (search) {
    query.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        email: {
          $regex: search,
          $options: "i",
        },
      },
      {
        companyName: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const total = await Leads.countDocuments(query);

  const leads = await Leads.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    total,
    page,
    limit,
    leads,
  };
};
