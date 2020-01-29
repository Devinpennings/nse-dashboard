import Institute from './repositories/institute';
import Topic from './repositories/topic';
import Discipline from './repositories/discipline';
import Result from './repositories/result';
import Metadata from './repositories/metadata';
import Entry from './repositories/entry';
import Trend from './repositories/trend';

const repositories = {
    institutes: Institute,
    topics: Topic,
    disciplines: Discipline,
    results: Result,
    metadata: Metadata,
    entry: Entry,
    trend: Trend
};

export const RepositoryFactory = {
    get: name => repositories[name]
};
