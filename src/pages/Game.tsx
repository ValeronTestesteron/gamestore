import { useParams } from 'react-router-dom';
import { useGetGameByIdQuery } from '../redux/api/gameApi';

import Banner from '../components/Banner';
import Platforms from '../components/gamePage/Platforms';
import GameDescription from '../components/gamePage/GameDescription';
import Photos from '../components/gamePage/Photos';
import GameInfo from '../components/gamePage/GameInfo';

function Game() {
  const { id } = useParams();
  const { data, error } = useGetGameByIdQuery(String(id));

  if (error)
    return (
      <div className="container mx-auto mt-20 px-4 text-3xl font-bold sm:px-0">
        Такой игры нет {(error as { data?: { status_message?: string } })?.data?.status_message}
      </div>
    );

  return (
    <>
      {data && (
        <>
          <Banner
            title={data.title}
            thumbnail={data.thumbnail}
            short_description={data.short_description}
            release_date={data.release_date}
          />

          <div className="container mx-auto mt-10 px-4 sm:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-6 lg:gap-8 mb-8">
              <div className="lg:col-span-2 min-w-0 space-y-4">
                <Platforms platforms={data.platform} />
                <GameDescription description={data.description} />
                {data.screenshots && <Photos screenshots={data.screenshots} />}
              </div>

              <GameInfo
                release_date={data.release_date}
                developer={data.developer}
                publisher={data.publisher}
                genre={data.genre}
                status={data.status}
                minimum_system_requirements={data.minimum_system_requirements}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Game;
