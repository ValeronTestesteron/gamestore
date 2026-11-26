import Spinner from '../Spinner';

function FullScreenLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center fixed inset-0 z-50">
      <Spinner className="w-12 h-12 animate-spin" />
    </div>
  );
}

export default FullScreenLoader;
