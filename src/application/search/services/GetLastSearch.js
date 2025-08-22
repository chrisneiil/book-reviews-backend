class GetLastSearch {
    constructor(searchRepository) {
        this.searchRepository = searchRepository;
    }

    async execute() {
        return await this.searchRepository.getLastFive();
    }
}

module.exports = GetLastSearch;
