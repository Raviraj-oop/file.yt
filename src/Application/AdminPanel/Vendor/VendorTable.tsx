import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Copy, ExternalLink, Eye } from 'lucide-react';
import DataTable, { Column } from '../../../components/admin/DataTable';
import StatTabs from '../../../components/admin/StatTabs';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';
import { useToast } from '../../../components/ui/Toast';
import useVendors, { Vendor, vendorName } from '../../../hooks/useVendors';
import { useAdminActivity } from '../../../states/adminActivity';
import { ManageValidationStatus } from '../../../states/slice/VendorValidationStatus/ManageValidation';
import { useAppDispatch, useAppSelector } from '../../../states/store';

const searchText = (v: Vendor) => `${vendorName(v)} ${v.mobileNum || ''} ${v.vendorId}`;

const VendorTable = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { log } = useAdminActivity();
  const [params, setParams] = useSearchParams();
  const showVerified = params.get('list') === 'verified';

  const { verified, pending, verifiedStatus, pendingStatus, refresh } = useVendors();
  const { updateStatus } = useAppSelector((s) => s.ManageValidationReducer);

  /** The row whose checkbox was changed but not saved yet. */
  const [change, setChange] = useState<{ vendorId: number; checked: boolean } | null>(null);
  const [confirming, setConfirming] = useState<Vendor | null>(null);
  const [card, setCard] = useState<Vendor | null>(null);
  const [cardFailed, setCardFailed] = useState(false);

  useEffect(() => {
    setChange(null);
    refresh();
  }, [showVerified, refresh]);

  const copyId = async (id: number) => {
    try {
      await navigator.clipboard.writeText(String(id));
      toast('Vendor ID copied');
    } catch {
      toast('The ID could not be copied', 'error');
    }
  };

  const save = async () => {
    if (!change || !confirming) return;
    const name = vendorName(confirming);
    try {
      await dispatch(ManageValidationStatus({ vendorVerified: change.checked, vendorId: change.vendorId })).unwrap();
      const text = `${name} marked as ${change.checked ? 'verified' : 'unverified'}`;
      log(change.checked ? 'verified' : 'unverified', text);
      toast(text);
      setChange(null);
      refresh();
    } catch {
      log('error', `${name} could not be updated`);
      toast('The change was not saved. Please try again.', 'error');
    } finally {
      setConfirming(null);
    }
  };

  const columns: Column<Vendor>[] = useMemo(
    () => [
      { key: 'sr', header: 'SrNo', render: (_v, i) => <span className="tabular-nums text-ink-500">{i + 1}</span> },
      { key: 'name', header: 'Name', sortValue: vendorName, render: (v) => <span className="font-semibold text-ink-900">{vendorName(v)}</span> },
      {
        key: 'aadhar',
        header: 'Aadhar',
        sortValue: (v) => (v.aadharCardUrl ? 1 : 0),
        render: (v) =>
          v.aadharCardUrl ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setCardFailed(false);
                setCard(v);
              }}
            >
              <Eye size={15} /> View
            </Button>
          ) : (
            <span className="text-sm text-ink-500">Not uploaded</span>
          ),
      },
      { key: 'mobile', header: 'Mobile', render: (v) => <span className="tabular-nums">{v.mobileNum}</span> },
      {
        key: 'id',
        header: 'Id',
        sortValue: (v) => v.vendorId,
        render: (v) => (
          <button type="button" onClick={() => copyId(v.vendorId)} aria-label={`Copy vendor ID ${v.vendorId}`} className="group inline-flex items-center gap-1.5 rounded tabular-nums transition hover:text-brand-700">
            {v.vendorId} <Copy size={14} className="text-ink-400 group-hover:text-brand-600" />
          </button>
        ),
      },
      {
        key: 'verify',
        header: 'Verify',
        render: (v) => (
          <input
            type="checkbox"
            aria-label={`Verified: ${vendorName(v)}`}
            className="block h-5 w-5 cursor-pointer rounded accent-brand-600 max-md:ml-auto"
            checked={change && change.vendorId === v.vendorId ? change.checked : Boolean(v.vendorVerified)}
            onChange={(e) => setChange({ vendorId: v.vendorId, checked: e.target.checked })}
          />
        ),
      },
      {
        key: 'done',
        header: 'Done',
        render: (v) => (
          <Button
            size="sm"
            className="disabled:!bg-ink-100 disabled:!bg-none disabled:!text-ink-500 disabled:!opacity-100 disabled:!shadow-none"
            disabled={updateStatus || !change || change.vendorId !== v.vendorId || change.checked === Boolean(v.vendorVerified)}
            onClick={() => setConfirming(v)}
          >
            Done
          </Button>
        ),
      },
    ],
    // copyId only uses stable values
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [change, updateStatus]
  );

  const count = (status: string | null, n: number) => (status === 'idel' ? n : '–');

  return (
    <div className="mx-auto max-w-[1280px] space-y-6">
      <div>
        <Link to="/AdminPanel" className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 transition hover:text-ink-900"><ArrowLeft size={16} /> Dashboard</Link>
        <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Vendor List</h1>
      </div>
      <StatTabs
        label="Vendor lists"
        active={showVerified ? 'verified' : 'pending'}
        onChange={(id) => setParams({ list: id }, { replace: true })}
        tabs={[
          { id: 'pending', label: 'Unverified', value: count(pendingStatus, pending.length) },
          { id: 'verified', label: 'Verified', value: count(verifiedStatus, verified.length) },
        ]}
      />
      <DataTable
        listKey={showVerified ? 'verified' : 'pending'}
        columns={columns}
        rows={showVerified ? verified : pending}
        rowKey={(v) => v.vendorId}
        searchText={searchText}
        searchLabel="Search name, mobile or ID"
        status={showVerified ? verifiedStatus : pendingStatus}
        onRefresh={refresh}
        emptyText={showVerified ? 'No verified vendors yet.' : 'Every vendor has been reviewed.'}
      />

      <Modal open={Boolean(card)} onClose={() => setCard(null)} title={card ? `Aadhar card: ${vendorName(card)}` : 'Aadhar card'} wide>
        {card && (
          <>
            <div className="grid min-h-[200px] place-items-center rounded-2xl bg-ink-100 p-3">
              {cardFailed ? (
                <p className="text-ink-600">The image could not be loaded.</p>
              ) : (
                <img src={card.aadharCardUrl} alt={`Aadhar card of ${vendorName(card)}`} onError={() => setCardFailed(true)} className="max-h-[55vh] rounded-xl object-contain" />
              )}
            </div>
            <Button href={card.aadharCardUrl} external variant="secondary" className="mt-5"><ExternalLink size={16} /> Open in new tab</Button>
          </>
        )}
      </Modal>

      <Modal open={Boolean(confirming)} onClose={() => setConfirming(null)} title={change && change.checked ? 'Verify this vendor?' : 'Remove verification?'}>
        {confirming && (
          <>
            <p className="text-ink-600">
              <strong className="text-ink-900">{vendorName(confirming)}</strong> (ID {confirming.vendorId}) will be marked as {change && change.checked ? 'verified' : 'unverified'}.
            </p>
            <div className="mt-7 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setConfirming(null)}>Cancel</Button>
              <Button onClick={save} disabled={updateStatus}>{updateStatus ? 'Saving…' : 'Confirm'}</Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default VendorTable;
