import { Text, View, ScrollView } from 'react-native';
import { PopinsFont } from '../../../../helpers/Fonts';
import styles from './style';

const PrivacyPolicy = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <View
          style={{
            width: '98%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={styles.headingMain}>
            Make sure to read all the Privacy Policies carefully before
            accepting them.
          </Text>
        </View>
      </View>
      <View style={styles.card}>
        <ScrollView showsVerticalScrollIndicator>
          <Text style={styles.title}>Fixrli Inc. - Privacy Policy</Text>

          <Text style={styles.subHeader}>Last Updated: May 2026</Text>

          <Text style={styles.text}>
            Fixrli Inc. (“Fixrli,” “we,” “us,” or “our”) is committed to
            protecting your privacy. This Privacy Policy explains how we
            collect, use, process, and share your information when you use our
            website (fixrli.com), mobile applications, and AI-powered services
            (collectively, the “Services”).
          </Text>

          <Text style={styles.text}>
            By using our Services, you agree to the practices described in this
            policy.
          </Text>

          <Text style={styles.heading}>1. Information We Collect</Text>

          <Text style={styles.text}>
            To provide a secure and efficient marketplace, we collect the
            following types of information:
          </Text>

          <Text style={styles.heading}>
            A. Information You Provide Directly
          </Text>

          <Text style={styles.bullet}>
            <Text style={{ fontFamily: PopinsFont.bold }}>
              ● Account & Profile Information:{' '}
            </Text>
            Name, email, phone number, mailing address, business credentials,
            and profile photos.
          </Text>
          <Text style={styles.bullet}>
            <Text style={{ fontFamily: PopinsFont.bold }}>
              ● Guest Users (Fixrli Direct):{' '}
            </Text>
            If a contractor sends you a secure proposal via Fixrli Direct, we
            collect your phone number and email to facilitate One-Time Password
            (OTP) authentication and digital contract signing, even if you do
            not create a permanent account.
          </Text>

          <Text style={styles.bullet}>
            <Text style={{ fontFamily: PopinsFont.bold }}>
              ● Job & Bidding Data:{' '}
            </Text>
            Project descriptions, budget estimates, bid amounts, and chat
            history between users.
          </Text>

          <Text style={styles.bullet}>
            <Text style={{ fontFamily: PopinsFont.bold }}>
              ● Financial Information:{' '}
            </Text>
            We use <Text style={{ fontFamily: PopinsFont.bold }}>Stripe</Text>{' '}
            to process payments. While we store your "Fixrli Wallet" balance and
            subscription status, your full credit card details are handled
            securely by Stripe and are not stored on our servers.
          </Text>

          <Text style={styles.heading}>B. Automated & Technical Data</Text>

          <Text style={styles.bullet}>
            <Text style={{ fontFamily: PopinsFont.bold }}>
              ● Precise Location Data (GPS):{' '}
            </Text>
            Our mobile applications capture your precise GPS coordinates at the
            moment a job is "Started" and "Completed." This is used to verify
            presence at the job site for payment security and fraud prevention.
          </Text>

          <Text style={styles.bullet}>
            <Text style={{ fontFamily: PopinsFont.bold }}>
              ● Visual & Image Data:{' '}
            </Text>
            We collect "Before" and "After" photos, as well as photos of
            appliances or fixtures.
          </Text>

          <Text style={styles.bullet}>
            <Text style={{ fontFamily: PopinsFont.bold }}>
              ● Integration Data:{' '}
            </Text>
            If you connect a Property Management Software (e.g., AppFolio,
            Buildium), we collect General Ledger (GL) IDs, work order details,
            and tenant contact information as synced from those platforms.
          </Text>

          <Text style={styles.heading}>
            C. AI & Processing Data (Gemini/Vertex AI)
          </Text>

          <Text style={styles.bullet}>
            <Text style={{ fontFamily: PopinsFont.bold }}>
              ● Multimodal Data:{' '}
            </Text>
            We process text from chats and data extracted from images (e.g.,
            serial numbers, make/model) using{' '}
            <Text style={{ fontFamily: PopinsFont.bold }}>
              Google Gemini AI.
            </Text>
          </Text>

          <Text style={styles.bullet}>
            <Text style={{ fontFamily: PopinsFont.bold }}>
              ● Inference Data:{' '}
            </Text>
            We may generate analytical data about contractor performance and
            market pricing based on historical platform activity.
          </Text>

          <Text style={styles.heading}>2. How We Use Your Information</Text>

          <Text style={styles.text}>
            We use the collected data for the following purposes:
          </Text>

          <Text style={styles.bullet}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              ● Service Facilitation:{' '}
            </Text>
            To connect Property Managers with Contractors and process financial
            transfers.
          </Text>

          <Text style={styles.bullet}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              ● AI-Driven Scoping:{' '}
            </Text>
            Using Gemini to extract technical specifications from photos to
            automate job postings and minimize information gaps.
          </Text>

          <Text style={styles.bullet}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              ● Verification & Safety:{' '}
            </Text>
            Using GPS data to confirm a contractor’s arrival at a job site
            before releasing funds from escrow.
          </Text>

          <Text style={styles.bullet}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              ● Administrative Mediation:{' '}
            </Text>
            Reviewing chat logs and photo evidence to resolve disputes via our
            Phase 2.0 Admin tools.
          </Text>

          <Text style={styles.bullet}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              ● Subscription Management:{' '}
            </Text>
            To manage and bill your recurring Pro or Business tier access.
          </Text>

          <Text style={styles.heading}>3. How We Share Your Information</Text>

          <Text style={styles.text}>
            We do not sell your personal data. We share information only in the
            following contexts:
          </Text>

          <Text style={styles.bullet}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              ● Between Users:{' '}
            </Text>
            Sharing your name, business profile, and job details with potential
            counterparties on the platform.
          </Text>

          <Text style={styles.bullet}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              ● Service Providers:{' '}
            </Text>
            Sharing data with Google Cloud (hosting and AI), Stripe (payments),
            and your integrated Property Management Software.
          </Text>

          <Text style={styles.bullet}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              ● Legal Compliance:{' '}
            </Text>
            To comply with tax laws (e.g., 1099-K reporting) or if required by
            law enforcement.
          </Text>

          <Text style={styles.heading}>4. Data Retention & Deletion</Text>

          <Text style={styles.bullet}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              ● Job Records:{' '}
            </Text>
            We retain job-related data (photos, chats, and GPS logs) for a
            minimum of 7 years to support warranties, tax audits, and dispute
            resolution.
          </Text>

          <Text style={styles.bullet}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              ● Account Deletion:{' '}
            </Text>
            You may request account deletion at any time via Settings. Note that
            certain transactional data may be retained for legal and financial
            record-keeping purposes as required by Delaware and Wisconsin law.
          </Text>

          <Text style={styles.heading}>5. Your Choices & Privacy Rights</Text>

          <Text style={styles.bullet}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              ● Location Services:{' '}
            </Text>
            You may disable GPS tracking via your device settings; however, this
            will prevent you from "Starting" or "Completing" jobs that require
            location-based verification for payment.
          </Text>

          <Text style={styles.bullet}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              ● AI Data Processing:{' '}
            </Text>
            Use of our "Smart Scoping" tools constitutes consent to have images
            processed by our AI engines.
          </Text>

          <Text style={styles.heading}>6. Security</Text>

          <Text style={styles.text}>
            Fixrli utilizes industry-standard encryption (SSL/TLS) for data in
            transit and secure storage on Google Cloud SQL. We implement
            administrative state-control overrides to protect funds held in
            escrow.
          </Text>

          <Text style={styles.heading}>7. International Transfers</Text>

          <Text style={styles.text}>
            Fixrli Inc. is based in the United States. If you access our
            Services from outside the U.S., your information will be transferred
            to and processed on our servers located in the United States.
          </Text>

          <Text style={styles.heading}>8. Contact Us</Text>

          <Text style={styles.text}>
            For privacy inquiries or to exercise your data rights:
          </Text>

          <Text style={styles.text}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              Fixrli Inc.
            </Text>{' '}
            Attn: Privacy Department
          </Text>

          <Text style={styles.text}>1020 E Land Pl, Milwaukee, WI 53202</Text>

          <Text style={styles.text}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              Email:
            </Text>{' '}
            privacy@fixrli.com
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default PrivacyPolicy;
