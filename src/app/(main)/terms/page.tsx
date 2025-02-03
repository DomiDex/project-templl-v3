import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';

export default function page() {
  return (
    <Section padding='lg'>
      <Container size='lg'>
        <div className='max-w-4xl mx-auto space-y-8'>
          <div className='space-y-4'>
            <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-50'>
              Terms of Service
            </h1>
            <p className='text-gray-600 dark:text-gray-300'>
              Last updated: 2024-01-01
            </p>
          </div>

          <div className='prose dark:prose-invert max-w-none'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50'>
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using this website, you accept and agree to be
              bound by the terms and conditions of this agreement. If you do not
              agree to abide by these terms, please do not use this service.
            </p>

            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50'>
              2. User Accounts
            </h2>
            <p>
              When you create an account with us, you guarantee that the
              information you provide is accurate, complete, and current at all
              times. You are responsible for maintaining the confidentiality of
              your account and password.
            </p>

            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50'>
              3. Intellectual Property
            </h2>
            <p>
              The templates, designs, and content provided through our service
              are protected by copyright and other intellectual property laws.
              Users may not copy, modify, or distribute our content without
              explicit permission.
            </p>

            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50'>
              4. User Content
            </h2>
            <p>
              By posting content on our platform, you grant us a non-exclusive,
              worldwide, royalty-free license to use, modify, publicly display,
              and distribute your content in connection with our services.
            </p>

            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50'>
              5. Prohibited Activities
            </h2>
            <ul>
              <li>Using the service for any illegal purposes</li>
              <li>Violating any intellectual property rights</li>
              <li>
                Attempting to interfere with or disrupt the integrity of our
                systems
              </li>
              <li>Impersonating other users or providing false information</li>
            </ul>

            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50'>
              6. Termination
            </h2>
            <p>
              We reserve the right to terminate or suspend access to our service
              immediately, without prior notice, for any breach of these Terms
              of Service.
            </p>

            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50'>
              7. Limitation of Liability
            </h2>
            <p>
              Our service is provided &quot;as is&quot; without any warranty. We
              shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages.
            </p>

            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50'>
              8. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these terms at any time. We will
              notify users of any changes by updating the &quot;Last
              updated&quot; date at the top of this page.
            </p>

            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50'>
              9. Contact Information
            </h2>
            <p>
              If you have any questions about these Terms, please contact us at{' '}
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
