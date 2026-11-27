import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../states/store';
import { getVerifiedVendorData } from '../states/slice/VerifiedVendorData/VerifiedVendorSlice';
import { getUnverifiedVendorData } from '../states/slice/UnverifiedVendorData/UnverifiedVendorSlice';
import { useAdminActivity } from '../states/adminActivity';

export interface Vendor {
  vendorId: number;
  firstName?: string;
  lastName?: string;
  mobileNum?: string | number;
  vendorVerified?: boolean;
  aadharCardUrl?: string;
}

export const vendorName = (v: Vendor) => [v.firstName, v.lastName].filter(Boolean).join(' ') || `Vendor ${v.vendorId}`;

const toList = (payload: { data: unknown } | undefined): Vendor[] => (payload && Array.isArray(payload.data) ? (payload.data as Vendor[]) : []);

/** Vendor lists from the existing Redux slices and API endpoints. */
const useVendors = () => {
  const dispatch = useAppDispatch();
  const { log } = useAdminActivity();
  const { verifiedVendorData, verifiedStatus } = useAppSelector((s) => s.verifiedVendorsReducer);
  const { UnverifiedVendorData, UnverifiedStatus } = useAppSelector((s) => s.unverifiedVendorReducer);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  const refresh = useCallback(async () => {
    try {
      const [verified, pending] = await Promise.all([
        dispatch(getVerifiedVendorData(true)).unwrap(),
        dispatch(getUnverifiedVendorData(false)).unwrap(),
      ]);
      setLastSync(new Date());
      log('sync', `Vendor data loaded: ${toList(verified).length} verified, ${toList(pending).length} pending`);
    } catch {
      log('error', 'Vendor data could not be loaded');
    }
  }, [dispatch, log]);

  return {
    verified: toList(verifiedVendorData),
    pending: toList(UnverifiedVendorData),
    verifiedStatus,
    pendingStatus: UnverifiedStatus,
    loading: verifiedStatus === 'loading' || UnverifiedStatus === 'loading',
    failed: verifiedStatus === 'error' || UnverifiedStatus === 'error',
    lastSync,
    refresh,
  };
};

export default useVendors;
