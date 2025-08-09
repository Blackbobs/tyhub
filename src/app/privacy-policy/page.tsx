import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | TyFits",
  description: "Learn how TyFits collects, uses, and protects your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-[#663399]">Privacy Policy</h1>
      <p className="text-gray-600 mb-6">Last Updated: {new Date().toLocaleDateString()}</p>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            Welcome to TyHub ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase from us.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Personal Data:</strong> Name, email, shipping address, phone number, payment details.</li>
            <li><strong>Order Details:</strong> Products purchased, sizes, preferences.</li>
            <li><strong>Technical Data:</strong> IP address, browser type, device information.</li>
            <li><strong>Cookies:</strong> To improve user experience (you can disable cookies in your browser settings).</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process orders and deliver products.</li>
            <li>Communicate about orders, promotions, or updates.</li>
            <li>Improve our website and services.</li>
            <li>Prevent fraud and comply with legal obligations.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Sharing Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Third-Party Vendors:</strong> Payment processors (Stripe, PayPal), shipping carriers (FedEx, DHL).</li>
            <li><strong>Legal Compliance:</strong> If required by law or to protect our rights.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
          <p>
            We use SSL encryption for transactions and store data securely. However, no online method is 100% secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access, correct, or delete your personal data.</li>
            <li>Opt out of marketing emails (unsubscribe link in all emails).</li>
            <li>Request data portability.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Changes to This Policy</h2>
          <p>
            We may update this policy. Changes will be posted on this page with a revised "Last Updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            Email: <Link href="mailto:privacy@tyhub.com" className="text-[#663399] hover:underline">privacy@tyhub.com</Link><br />
            Address: [Your Business Address]
          </p>
        </section>
      </div>
    </div>
  );
}