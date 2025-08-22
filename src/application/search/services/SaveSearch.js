class SaveSearch {
    constructor(searchRepository) {
        this.searchRepository = searchRepository;
    }

    async execute(query) {
        return await this.searchRepository.save(query);
    }
}

module.exports = SaveSearch;
