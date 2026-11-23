import ContentLoader from 'react-content-loader';

function Skeleton() {
  return (
    <ContentLoader
      speed={2}
      width={360}
      height={328}
      viewBox="0 0 360 328"
      className="w-full h-auto"
      backgroundColor="#2c364253"
      foregroundColor="#b3b6bb81">
      <rect x="0" y="2" rx="12" ry="12" width="360" height="207" />
      <rect x="0" y="232" rx="0" ry="0" width="360" height="30" />
      <rect x="0" y="274" rx="0" ry="0" width="360" height="30" />
    </ContentLoader>
  );
}

export default Skeleton;
