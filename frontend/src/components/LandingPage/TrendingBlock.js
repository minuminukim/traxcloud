import './TrendingBlock.css';

const TrendingBlock = () => {
  return (
    <div className="trending-block">
      <div className="trending-art" />
      <a href="#" className="trending-title">
        Song Name
      </a>
      <a href="#" className="trending-artist">
        Artist Name
      </a>
    </div>
  );
};

export default TrendingBlock;
