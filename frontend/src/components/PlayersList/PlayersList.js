import { useQueue } from '../../hooks';
import AudioPlayer from '../AudioPlayer';

const PlayersList = ({
  tracks = [],
  nextQueueId,
  listClassName,
  itemClassName,
}) => {
  const { resetQueue } = useQueue(tracks, nextQueueId);

  return (
    <ul className={listClassName}>
      {tracks.map((id) => (
        <li key={id} className={itemClassName}>
          <AudioPlayer
            trackId={id}
            resetQueue={() => resetQueue(id)}
            size="medium"
            withArtwork
            withHeader
            withFooter
            withCommentField
          />
        </li>
      ))}
    </ul>
  );
};

export default PlayersList;
