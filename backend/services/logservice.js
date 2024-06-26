const { LogModel } = require("../db/schemas/log");
const moment = require('moment-timezone');

class LogService {
    static async getLogs(queryParams, page, limit = 5) {
        const { username, role, ip, f_name, date } = queryParams;
        const filter = {};
        const skip = (page - 1) * limit;

        if (username) filter["meta.username"] = username;
        if (role) filter["meta.role"] = role;
        if (ip) filter["meta.ip"] = ip;
        if (f_name) filter["meta.f_name"] = f_name;

        if (date) {
            const [startDate, endDate] = date.split("_to_").map(d => moment.tz(d, 'Asia/Seoul').startOf('day').toDate());
            const adjustedEndDate = moment(endDate).endOf('day').toDate();
            filter.timestamp = { $gte: startDate, $lte: adjustedEndDate };
        }

        try {
            const totalLogs = await LogModel.countDocuments(filter);
            const logs = await LogModel.find(filter)
                .skip(skip)
                .limit(limit)
                .exec();
            if (logs.length === 0) {
                return JSON.stringify({
                    status: 204,
                    total_count: totalLogs,
                    items_per_page: limit,
                    current_page: page,
                    data: [],
                    message: "No logs matched the query."
                });
            }
            return JSON.stringify({
                status: 200,
                total_count: totalLogs,
                items_per_page: limit,
                current_page: page,
                data: logs,
                message: "Logs fetched successfully."
            });
        } catch (error) {
            console.error("Error fetching logs: ", error);
            return JSON.stringify({
                status: 500,
                message: "Server error: " + error.message
            });
        }
    }
}

module.exports = { LogService };
