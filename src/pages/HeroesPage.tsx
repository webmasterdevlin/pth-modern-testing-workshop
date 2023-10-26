import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Button from '../components/Button';
import FormSubmission from '../components/FormSubmission';
import TitleBar from '../components/TitleBar';
import UpdateUiLabel from '../components/UpdateUiLabel';
import useAddHero from '../features/heroes/hooks/useAddHero';
import useFetchHeroes from '../features/heroes/hooks/useFetchHeroes';
import useRemoveHero from '../features/heroes/hooks/useRemoveHero';
import { keys } from '../features/keyNames';
import type { HeroModel } from '../features/heroes/hero';

const HeroesPage = () => {
  const queryClient = useQueryClient();
  const { data: response, status } = useFetchHeroes();
  const { mutate: removeHero } = useRemoveHero();
  const { mutate: addHero } = useAddHero();
  /* local state*/
  const [tracker, setTracker] = useState('0');

  const handleSoftDelete = (id: string) => {
    queryClient.setQueryData<{ data: HeroModel[] }>([keys.heroes], prevData => {
      return {
        data: prevData?.data?.filter(h => {
          return h.id !== id;
        }) as HeroModel[],
      };
    });
  };

  if (status === 'error') return <p>Error 😟</p>;

  return (
    <div>
      <TitleBar title={'Heroes Page'} />
      <FormSubmission handleMutate={addHero} />
      <UpdateUiLabel />
      {status === 'loading' ? (
        <h2>Loading.. Please wait..</h2>
      ) : (
        response?.data?.map(h => {
          return (
            <div data-testid="hero-card" key={h.id} className={'flex items-center justify-between'}>
              <h1>
                <span>{`${h.firstName} ${h.lastName} is ${h.knownAs}`}</span>
                {tracker === h.id && <span> - marked</span>}
              </h1>
              <div>
                <Button
                  color={'primary'}
                  onClick={() => {
                    setTracker(h.id);
                  }}
                >
                  Mark
                </Button>
                <Button
                  onClick={() => {
                    handleSoftDelete(h.id);
                  }}
                >
                  Remove
                </Button>
                <Button
                  color="secondary"
                  onClick={() => {
                    removeHero(h.id);
                  }}
                >
                  DELETE in DB
                </Button>
              </div>
            </div>
          );
        })
      )}

      {response?.data?.length === 0 && status !== 'loading' && (
        <Button
          color="primary"
          onClick={() => {
            return queryClient.invalidateQueries([keys.heroes]);
          }}
        >
          Re-Fetch
        </Button>
      )}
    </div>
  );
};

export default HeroesPage;
