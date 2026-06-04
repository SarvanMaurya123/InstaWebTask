import Leads from "../../schema/Leads";

export const leadStatsService = async () => {
  const totalLeads = await Leads.countDocuments();

  const rawStats = await Leads.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const statusMap: Record<string, number> = {
    NEW: 0,
    CONTACTED: 0,
    QUALIFIED: 0,
    CONVERTED: 0,
    LOST: 0,
  };



  rawStats.forEach((item) => {
    const key = item._id?.toString().trim().toUpperCase();
    if (key && key in statusMap) {
      statusMap[key] = item.count;
    }

    
  });

  return {
    totalLeads,
    statusStats: statusMap,

  };
};