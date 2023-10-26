import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EndPoints } from '../../../axios/api-config';
import { postAxios } from '../../../axios/generic-api-calls';
import { keys } from '../../keyNames';
import type { AntiHeroModel } from '../antiHero';

export default function useAddAntiHero() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: antiHero => {
      return postAxios<AntiHeroModel>(EndPoints.antiHeroes, antiHero);
    },
    mutationKey: [keys.antiHeroes],
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, variables, context) => {
      if (context?.backup) queryClient.setQueryData<AntiHeroModel[]>([keys.antiHeroes], context.backup.data);
    },

    onMutate: async (antiHero: AntiHeroModel) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries();

      // Snapshot the previous value
      const backup = queryClient.getQueryData<{ data: AntiHeroModel[] }>([keys.antiHeroes]);

      // Optimistically update by adding the antiHero
      if (backup)
        queryClient.setQueryData<{ data: AntiHeroModel[] }>([keys.antiHeroes], {
          data: [...backup.data, antiHero],
        });

      return { backup };
    },
    // Always refetch after error or success:
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: [keys.antiHeroes] });
    },
  });
}
