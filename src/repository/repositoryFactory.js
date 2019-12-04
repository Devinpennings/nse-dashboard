import Institute from './repositories/institute';
import Topic from './repositories/topic';
import Discipline from './repositories/discipline'

const repositories = {
    institutes: Institute,
    topics: Topic,
    disciplines: Discipline
};

export const RepositoryFactory = {
    get: name => repositories[name]
};
