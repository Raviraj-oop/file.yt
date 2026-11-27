import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../../../components/ui/PageHero';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const terms: { title: string; body: React.ReactNode }[] = [
  { title: 'Booking', body: 'You must provide accurate information while booking a car through our app.' },
  { title: 'Payment', body: "Payment for the car booking must be made in advance through the app's designated payment methods." },
  { title: 'Cancellation', body: 'Cancellation policies apply. Check the app for details on cancellation fees and deadlines.' },
  { title: 'Responsibility', body: 'Users are responsible for the proper use of the booked car and must adhere to local traffic laws.' },
  { title: 'Damages', body: 'Users are liable for any damages caused to the car during the booking period.' },
  {
    title: 'Privacy',
    body: (
      <>
        We respect your privacy. Read our <Link to="/PrivacyPolicy" className="font-medium text-brand-700 underline underline-offset-4">Privacy Policy</Link> for more details.
      </>
    ),
  },
  { title: 'Security', body: 'Protect your account credentials. Any unauthorized use is your responsibility.' },
];

const TermsAndCondition = () => {
  useDocumentTitle('Terms and Conditions');
  return (
    <>
      <PageHero
        title="Terms And Condition"
        intro={'This App "TravoBuddy" is owned and managed by Vipracube Tech Solutions private limited. By using our car booking services, you agree to the following terms and conditions.'}
      />
      <article className="page py-7 sm:py-9">
        <div className="max-w-3xl">
          <ol className="divide-y divide-ink-200 border-y border-ink-200">
            {terms.map((t, i) => (
              <li key={t.title} className="grid gap-1 py-4 sm:grid-cols-[minmax(8rem,10rem)_1fr] sm:gap-4">
                <h2 className="text-lg font-bold">{i + 1}. {t.title}</h2>
                <p className="leading-relaxed text-ink-600">{t.body}</p>
              </li>
            ))}
          </ol>
          <div className="card mt-5 p-4">
            <h2 className="text-lg font-bold">Cancellation / Refund Policies</h2>
            <p className="mt-2 leading-relaxed text-ink-600">
              We do not offer any refunds on orders that are processed or any cancellation facilites on orders.
            </p>
          </div>
          <p className="mt-5 text-ink-600">
            These terms and conditions are subject to change without notice. It is your responsibility to review them regularly.
          </p>
          <p className="mt-2 text-sm text-ink-500">Last updated: January 23, 2024</p>
        </div>
      </article>
    </>
  );
};

export default TermsAndCondition;
