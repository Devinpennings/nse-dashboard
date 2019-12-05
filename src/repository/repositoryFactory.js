import Institute from './repositories/institute';
import Topic from './repositories/topic';
import Discipline from './repositories/discipline';
import Result from './repositories/result';

const repositories = {
    institutes: Institute,
    topics: Topic,
    disciplines: Discipline,
    results: Result
};

export const RepositoryFactory = {
    get: name => repositories[name]
};
