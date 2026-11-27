import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Eye } from 'lucide-react';
import DataTable, { Column } from '../../../components/admin/DataTable';
import StatTabs from '../../../components/admin/StatTabs';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';
import { useToast } from '../../../components/ui/Toast';
import { getRefundCustomerData } from '../../../states/slice/RefundCustomerData/RefundCustomerSlice';
import { useAppDispatch, useAppSelector } from '../../../states/store';

interface Booking {
  bookingId: number;
  bookingDate?: string;
  transactionId?: string;
  customerFirstName?: string;
  customerLastName?: string;
  customerMobileNum?: string | number;
  customerSource?: string;
  customerDestination?: string;
  customerBookSeat?: string | number;
  price?: number;
  vendorAvailableSeat?: string | number;
  vendorFirstName?: string;
  vendorLastName?: string;
  vendorCurrentLocation?: string;
  vendorMobileNum?: string | number;
  vendorVehicleName?: string;
}

const name = (b: Booking) => `${b.customerFirstName || ''} ${b.customerLastName || ''}`.trim();
const day = (b: Booking) => (b.bookingDate || '').split('T')[0];
const place = (s?: string) => (s || '').split(',')[0];
const ride = (b: Booking) => `${place(b.customerSource)} To ${place(b.customerDestination)}`;
const searchText = (b: Booking) => `${name(b)} ${b.customerMobileNum || ''} ${ride(b)} ${b.bookingId}`;

const Details = ({ rows }: { rows: [string, React.ReactNode][] }) => (
  <dl className="space-y-3 rounded-2xl bg-ink-50 p-4 text-[15px]">
    {rows.map(([k, v]) => (
      <div key={k} className="flex justify-between gap-4">
        <dt className="shrink-0 text-ink-500">{k}</dt>
        <dd className="min-w-0 break-words text-right font-medium text-ink-900">{v}</dd>
      </div>
    ))}
  </dl>
);

const CustomerTable = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { RefundCustomerData, RefundStatus } = useAppSelector((s) => s.RefundCustomerReducer);
  const [showRefunded, setShowRefunded] = useState(false);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [amount, setAmount] = useState('');

  const load = useCallback(() => {
    dispatch(getRefundCustomerData(showRefunded ? 'A' : 'I'));
  }, [dispatch, showRefunded]);

  useEffect(() => load(), [load]);

  const rows = (RefundCustomerData && Array.isArray(RefundCustomerData.data) ? RefundCustomerData.data : []) as Booking[];
  const loaded = RefundStatus === 'idel' ? rows.length : '–';

  const columns: Column<Booking>[] = [
    { key: 'sr', header: 'SrNo', render: (_b, i) => <span className="tabular-nums text-ink-500">{i + 1}</span> },
    { key: 'name', header: 'Name', sortValue: name, render: (b) => <span className="font-semibold text-ink-900">{name(b)}</span> },
    { key: 'date', header: 'Date', sortValue: day, render: (b) => <span className="whitespace-nowrap tabular-nums">{day(b)}</span> },
    { key: 'mobile', header: 'Mobile', render: (b) => <span className="tabular-nums">{b.customerMobileNum}</span> },
    { key: 'ride', header: 'Ride Details', render: ride },
    { key: 'price', header: 'Price', align: 'right', sortValue: (b) => Number(b.price) || 0, render: (b) => <span className="whitespace-nowrap">{b.price} Rs.</span> },
    {
      key: 'view',
      header: 'View',
      render: (b) => (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setAmount('');
            setSelected(b);
          }}
        >
          <Eye size={15} /> View
        </Button>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-[1280px] space-y-6">
      <div>
        <Link to="/AdminPanel" className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 transition hover:text-ink-900"><ArrowLeft size={16} /> Dashboard</Link>
        <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Customer List</h1>
      </div>
      <StatTabs
        label="Refund lists"
        active={showRefunded ? 'refunded' : 'pending'}
        onChange={(id) => setShowRefunded(id === 'refunded')}
        tabs={[
          { id: 'pending', label: 'Pending Refund', value: showRefunded ? '–' : loaded },
          { id: 'refunded', label: 'Refund', value: showRefunded ? loaded : '–' },
        ]}
      />
      <DataTable
        listKey={showRefunded ? 'refunded' : 'pending'}
        columns={columns}
        rows={rows}
        rowKey={(b) => b.bookingId}
        searchText={searchText}
        searchLabel="Search name, mobile, ride or ID"
        status={RefundStatus}
        onRefresh={load}
        emptyText={showRefunded ? 'No completed refunds.' : 'No pending refunds.'}
      />

      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title={selected ? `Booking ${selected.bookingId}` : 'Booking'} wide>
        {selected && (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <Details
                rows={[
                  ['Date', day(selected)],
                  ['Time', (selected.bookingDate || '').split('T')[1]],
                  ['Ride', `${selected.customerSource || ''} To ${selected.customerDestination || ''}`],
                  ['Available seats', selected.vendorAvailableSeat],
                  ['Vendor name', `${selected.vendorFirstName || ''} ${selected.vendorLastName || ''}`],
                  ['Vendor location', selected.vendorCurrentLocation],
                  ['Vendor phone no', selected.vendorMobileNum],
                  ['Vehicle number', selected.vendorVehicleName],
                ]}
              />
              <Details
                rows={[
                  ['Booking Id', selected.bookingId],
                  ['Transaction Id', selected.transactionId],
                  ['Coupon discount', '0 Rs.'],
                  ['Ride amount', `${selected.price} Rs.`],
                  ['Booked seats', selected.customerBookSeat],
                  ['Suggestion', `${selected.price} - 0 = ${selected.price} Rs.`],
                ]}
              />
            </div>
            {showRefunded ? (
              <p className="mt-6 flex items-center gap-2 font-semibold text-emerald-700"><CheckCircle2 size={19} /> Refund Completed</p>
            ) : (
              <form
                className="mt-6 flex flex-col gap-3 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  // The original button had no action. There is no refund endpoint in this project to call.
                  toast('Refunds are not connected to the API yet. Nothing was sent.', 'info');
                }}
              >
                <input className="field" inputMode="decimal" aria-label="Refund amount" placeholder="Enter refund amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <Button type="submit" size="lg">Submit</Button>
              </form>
            )}
          </>
        )}
      </Modal>
    </div>
  );
};

export default CustomerTable;
