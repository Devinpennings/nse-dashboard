import Repository from "../repository";

const resource = "/topic_trend";

export default {

  get(topicIds) {
    let url = `${resource}/status`;

    if (topicIds) {
      const copy = [...topicIds];
      url += `?topicIds=${copy[0]}`
      copy.shift();
      copy.forEach(t => {
        url += `&topicIds=${t}`
      });
    }

    return Repository.get(url);
  },

};
