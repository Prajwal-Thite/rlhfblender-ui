import {Episode} from './types';

function IDfromEpisode(episode: Episode): string {
  if (episode === undefined) {
    throw new Error('Episode is undefined');
  }
  const id = `${episode.env_name}_${episode.benchmark_type}_${episode.benchmark_id}_${episode.checkpoint_step}_${episode.episode_num}`;
  return id;
}

function EpisodeFromID(ID: string): Episode {
  if (ID === undefined) {
    throw new Error('ID is undefined');
  }
  const split  = ID.split('_');
  const episode_num = parseInt(split[split.length - 1]);
  const checkpoint_step = parseInt(split[split.length - 2]);
  const benchmark_id = parseInt(split[split.length - 3]);
  const benchmark_type = split[split.length - 4];
  // Join all remaining parts for env_name to handle underscores in environment name
  const env_name = split.slice(0, split.length - 4).join('_');
  return {
    env_name,
    benchmark_type,
    benchmark_id,
    checkpoint_step,
    episode_num,
  };
}

export {IDfromEpisode, EpisodeFromID};
