import Institute from "./repositories/institute";

const repositories = {
    institutes: Institute
};

export const RepositoryFactory = {
    get: name => repositories[name]
};
