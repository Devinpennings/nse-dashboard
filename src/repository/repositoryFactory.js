import Institute from './repositories/institute';
import TopicResult from './repositories/topic-result';

const repositories = {
    institutes: Institute,
    topicResults: TopicResult
};

export const RepositoryFactory = {
    get: name => repositories[name]
};
