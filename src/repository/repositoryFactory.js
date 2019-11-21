import Institute from './repositories/institute';
import Topic from './repositories/topic';

const repositories = {
    institutes: Institute,
    topics: Topic
};

export const RepositoryFactory = {
    get: name => repositories[name]
};
