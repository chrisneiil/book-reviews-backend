const SearchModel = require("../schemas/SearchSchema");

class MongoSearchRepository {
    async save(query) {
        const search = new SearchModel({ query });
        return await search.save();
    }

    async getLastFive() {
        return await SearchModel.find()
            .sort({ createdAt: -1 })
            .limit(5);
    }
}

module.exports = MongoSearchRepository;
