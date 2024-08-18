import { vi } from 'vitest';
import { renderHook, act } from "@testing-library/react-hooks";

import { useRegistrationsHook } from ".";

import * as Services from "~/services";

import { ERegistrationsStatus } from '~/types/registrations.types';

import { QueryProvider, queryClient } from '~/test-utils';

vi.doMock(import('@tanstack/react-query'), async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    useQuery: vi.fn(),
    useMutation: vi.fn(),
  }
});

vi.mock('~/services');

const useQueryClient = vi.fn();
const useMutation = vi.fn();

const mockedFns = {
  save: vi.fn(),
  deleteUser: vi.fn(),
  reviewUser: vi.fn(),
}

describe('useRegistrationsHook', () => {
  beforeEach(() => {
    useQueryClient.mockImplementation(() => queryClient);
  });

  it('should call the correct services on mutation', async () => {
    const spyOnServicesSave = vi.spyOn(Services, 'saveRegistration').mockResolvedValue({ success: true });
    const spyOnServicesDelete = vi.spyOn(Services, 'deleteRegistration').mockResolvedValue({ success: true });
    const spyOnServicesReview = vi.spyOn(Services, 'reviewRegistration').mockResolvedValue({ success: true });

    const spyOnInvalidate = vi.spyOn(queryClient, 'invalidateQueries');

    useMutation.mockImplementationOnce((options) => {
      options.onSuccess();
      return { mutate: mockedFns.save };
    });

    useMutation.mockImplementationOnce((options) => {
      options.onSuccess();
      return { mutate: mockedFns.deleteUser };
    });

    useMutation.mockImplementationOnce((options) => {
      options.onSuccess();
      return { mutate: mockedFns.reviewUser };
    });

    const { result } = renderHook(() => useRegistrationsHook(), { wrapper: QueryProvider });

    await act(async () => {
      await Promise.all([
        result.current.save.mutate({ id: "1", employeeName: 'John Doe' }),
        result.current.deleteUser.mutate("2"),
        result.current.reviewUser.mutate({ id: "1", status: ERegistrationsStatus.APPROVED }),
      ])
    });

    expect(spyOnServicesSave).toHaveBeenCalled();
    expect(spyOnServicesDelete).toHaveBeenCalled();
    expect(spyOnServicesReview).toHaveBeenCalled();

    expect(spyOnInvalidate).toHaveBeenCalledTimes(3);
  });
});
