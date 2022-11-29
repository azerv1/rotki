import { ActionResult } from '@rotki/common/lib/data';
import { axiosSnakeCaseTransformer } from '@/services/axios-tranformers';
import { basicAxiosTransformer } from '@/services/consts';
import { api } from '@/services/rotkehlchen-api';
import { PendingTask } from '@/services/types-api';
import {
  handleResponse,
  paramsSerializer,
  validStatus,
  validWithParamsSessionAndExternalService
} from '@/services/utils';
import {
  NonFungibleBalance,
  NonFungibleBalancesCollectionResponse,
  NonFungibleBalancesRequestPayload
} from '@/types/nfbalances';

export const useNftBalanceApi = () => {
  const internalNfBalances = <T>(
    payload: NonFungibleBalancesRequestPayload,
    asyncQuery: boolean
  ): Promise<T> => {
    return api.instance
      .get<ActionResult<T>>('/nfts/balances', {
        params: axiosSnakeCaseTransformer({
          asyncQuery,
          ...payload
        }),
        paramsSerializer,
        validateStatus: validWithParamsSessionAndExternalService,
        transformResponse: basicAxiosTransformer
      })
      .then(handleResponse);
  };

  const fetchNfBalancesTask = async (
    payload: NonFungibleBalancesRequestPayload
  ): Promise<PendingTask> => {
    return internalNfBalances<PendingTask>(payload, true);
  };

  const fetchNfBalances = async (
    payload: NonFungibleBalancesRequestPayload
  ): Promise<NonFungibleBalancesCollectionResponse> => {
    const response =
      await internalNfBalances<NonFungibleBalancesCollectionResponse>(
        payload,
        false
      );

    return NonFungibleBalancesCollectionResponse.parse(response);
  };

  const getNftBalanceById = async (
    identifier: string
  ): Promise<NonFungibleBalance> => {
    const response = await api.instance.post<ActionResult<NonFungibleBalance>>(
      '/nfts',
      {
        nftId: identifier
      },
      {
        validateStatus: validStatus,
        transformResponse: basicAxiosTransformer
      }
    );

    return NonFungibleBalance.parse(response);
  };

  return {
    fetchNfBalancesTask,
    fetchNfBalances,
    getNftBalanceById
  };
};