import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions | TyFits",
  description: "Read the terms and conditions for using TyFits website and services.",
};

export default function TermsConditions() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-[#663399]">Terms & Conditions</h1>
      <p className="text-gray-600 mb-6">Last Updated: {new Date().toLocaleDateString()}</p>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>
            By using TyHub (&quot;Site&quot;), you agree to these Terms. If you disagree, do not use the Site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Product Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Product images may vary slightly due to lighting/monitor settings.</li>
            <li>We reserve the right to limit quantities or cancel orders due to errors.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Orders & Payments</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All prices are in USD and inclusive of taxes (where applicable).</li>
            <li>Payment methods: Credit/debit cards, PayPal.</li>
            <li>Orders are processed within 1–3 business days.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Shipping & Returns</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Shipping:</strong> Delivery times vary by location. Tracking info will be provided.</li>
            <li><strong>Returns:</strong> Unused items in original packaging may be returned within 30 days. Buyer covers return shipping unless the item is defective.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. User Accounts</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You are responsible for maintaining account confidentiality.</li>
            <li>We may suspend accounts for suspicious activity.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
          <p>
            All content (logos, text, images) is owned by TyFits and protected by copyright laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
          <p>
            TyFits is not liable for:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Indirect damages (e.g., lost profits).</li>
            <li>Product misuse or third-party actions.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
          <p>
            These Terms are governed by the laws of [Your Country/State].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            Email: <Link href="mailto:legal@tyfits.com" className="text-[#663399] hover:underline">legal@tyhub.com</Link><br />
            Address: [Your Business Address]
          </p>
        </section>
      </div>
    </div>
  );
}