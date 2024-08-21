import { vi } from 'vitest';
import { renderHook, act } from "@testing-library/react-hooks";
import { faker } from '@faker-js/faker';

import { useRegistrationsHook, useFetchAllRegistrationsHook, useFetchRegistrationsByCpfHook } from ".";

import * as Services from "~/services";
import { queryKey } from "~/constants";
import { ERegistrationsStatus } from '~/types/registrations.types';
import { QueryProvider as wrapper, queryClient } from '~/test-utils';

const useQueryClient = vi.fn();
const useMutation = vi.fn();
const useQuery = vi.fn();

vi.doMock(import('@tanstack/react-query'), async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    useQuery,
    useMutation,
    useQueryClient
  }
});

vi.mock('~/services');

const fakerCpf = faker.string.numeric(11);

const mockedData = [{
  cpf: fakerCpf,
  id: faker.string.numeric(),
  email: faker.internet.email(),
  employeeName: faker.person.fullName(),
  admissionDate: faker.date.past().toISOString(),
  status: ERegistrationsStatus.APPROVED
}, {
  cpf: faker.string.numeric(11),
  id: faker.string.numeric(),
  email: faker.internet.email(),
  employeeName: faker.person.fullName(),
  admissionDate: faker.date.past().toISOString(),
  status: ERegistrationsStatus.REPROVED
}];

const mockedFns = {
  saveUser: vi.fn(),
  deleteUser: vi.fn(),
  reviewUser: vi.fn(),
}

describe('useFetchAllRegistrationsHook', async () => {
  it('should fetch all registrations data successfully', async () => {
    const spyOnServices = vi.spyOn(Services, 'fetchAllRegistrations').mockResolvedValue(mockedData);
    const { result, waitFor } = renderHook(() => useFetchAllRegistrationsHook(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockedData);
    expect(spyOnServices).toHaveBeenCalledTimes(1);

    await act(async () => {
      await result.current.refetch();
    });
  });
});

describe('useFetchRegistrationsByCpfHook', async () => {
  it('should fetch registrations in cached data when CPF is provided', async () => {
    const spyOnGetQueryData = vi.spyOn(queryClient, 'getQueryData').mockReturnValueOnce(mockedData);

    const { result, waitFor } = renderHook(() => useFetchRegistrationsByCpfHook(fakerCpf), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 3000 });

    expect(result.current.data).toEqual([mockedData[0]]);
    expect(spyOnGetQueryData).toHaveBeenCalledTimes(1);
    expect(spyOnGetQueryData).toHaveBeenCalledWith([queryKey]);
  });

  it('should fetch registration data successfully', async () => {
    const spyOnServices = vi.spyOn(Services, 'fetchRegistrationByCPF').mockResolvedValueOnce([mockedData[0]]);
    const spyOnGetQueryData = vi.spyOn(queryClient, 'getQueryData').mockReturnValueOnce(undefined);
    const spyOnSetQueryClient = vi.spyOn(queryClient, 'setQueryData');
    const anotherFakerCpf = faker.string.numeric(11);

    const { result, waitFor } = renderHook(() => useFetchRegistrationsByCpfHook(anotherFakerCpf), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual([mockedData[0]]);

    expect(spyOnServices).toHaveBeenCalledTimes(1);
    expect(spyOnServices).toHaveBeenCalledWith(anotherFakerCpf);

    expect(spyOnGetQueryData).toHaveBeenCalledTimes(1);
    expect(spyOnGetQueryData).toHaveBeenCalledWith([queryKey]);

    expect(spyOnSetQueryClient).toHaveBeenCalledTimes(1);
    expect(spyOnSetQueryClient).toHaveBeenCalledWith([queryKey], expect.any(Function));
  });
});

describe('useRegistrationsHook', async () => {
  beforeEach(() => {
    useQueryClient.mockImplementation(() => queryClient);
  });

  it('should call the correct services on mutation', async () => {
    const spyOnServicesSave = vi.spyOn(Services, 'saveRegistration').mockResolvedValueOnce({ success: true });
    const spyOnServicesDelete = vi.spyOn(Services, 'deleteRegistration').mockResolvedValueOnce({ success: true });
    const spyOnServicesReview = vi.spyOn(Services, 'reviewRegistration').mockResolvedValueOnce({ success: true });
    const spyOnInvalidate = vi.spyOn(queryClient, 'invalidateQueries');

    const fakerId = faker.string.numeric();

    useMutation.mockImplementationOnce((options) => {
      options.onSuccess();
      return { mutate: mockedFns.saveUser };
    });

    useMutation.mockImplementationOnce((options) => {
      options.onSuccess();
      return { mutate: mockedFns.deleteUser };
    });

    useMutation.mockImplementationOnce((options) => {
      options.onSuccess();
      return { mutate: mockedFns.reviewUser };
    });

    const { result } = renderHook(() => useRegistrationsHook(), { wrapper });

    await act(async () => {
      await Promise.all([
        result.current.saveUser.mutate({
          id: fakerId,
          employeeName: faker.person.fullName(),
        }),
        result.current.reviewUser.mutate({ id: fakerId, status: ERegistrationsStatus.APPROVED }),
        result.current.deleteUser.mutate(fakerId),
      ])
    });

    expect(spyOnServicesSave).toHaveBeenCalled();
    expect(spyOnServicesReview).toHaveBeenCalled();
    expect(spyOnServicesDelete).toHaveBeenCalled();

    expect(spyOnInvalidate).toHaveBeenCalledTimes(3);
  });
});
