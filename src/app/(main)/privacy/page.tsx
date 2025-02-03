import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';

export default function page() {
  return (
    <Section padding='lg'>
      <Container size='lg'>
        <div className='max-w-4xl mx-auto space-y-8'>
          <div className='space-y-4'>
            <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-50'>
              Privacy Policy
            </h1>
            <p className='text-gray-600 dark:text-gray-300'>
              Last updated: 2024-01-01
            </p>
          </div>

          <div className='prose dark:prose-invert max-w-none'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50'>
              1. Information We Collect
            </h2>
            <p>
              We collect information you provide directly to us when you create
              an account, including:
            </p>
            <ul>
              <li>Name and username</li>
              <li>Email address</li>
              <li>Profile information</li>
              <li>Content you upload to our platform</li>
            </ul>

            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50'>
              2. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>

              <li>Process your transactions</li>
              <li>Send you technical notices and support messages</li>
              <li>Communicate with you about products, services, and events</li>
              <li>Protect against fraudulent or illegal activity</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
              We do not sell your personal information. We may share your
              information with:
            </p>
            <ul>
              <li>Service providers who assist in our operations</li>
              <li>Professional advisors</li>
              <li>Law enforcement when required by law</li>
            </ul>

            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50'>
              4. Data Security
            </h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information. However, no security system is
              impenetrable, and we cannot guarantee the security of our systems.
            </p>

            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50'>
              5. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
              <li>Export your data in a portable format</li>
            </ul>

            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50'>
              6. Cookies and Tracking
            </h2>
            <p>
              We use cookies and similar tracking technologies to collect
              information about your browsing activities. You can control
              cookies through your browser settings.
            </p>

            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50'>
              7. Children&apos;s Privacy
            </h2>
            <p>
              Our services are not directed to children under 13. We do not
              knowingly collect information from children under 13. If you
              believe we have collected information from a child under 13,
              please contact us.
            </p>

            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50'>
              8. Changes to Privacy Policy
            </h2>
            <p>
              We may update this privacy policy from time to time. We will
              notify you of any changes by posting the new policy on this page
              and updating the &quot;Last updated&quot; date.
            </p>

            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50'>
              9. Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy, please contact us
              at{' '}
              <a
                href='mailto:domidex01@gmail.com'
                className='text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300'
              >
                domidex01@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
