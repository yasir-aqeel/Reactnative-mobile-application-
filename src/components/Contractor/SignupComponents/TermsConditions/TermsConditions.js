import { Text, View, ScrollView } from 'react-native';
import { PopinsFont } from '../../../../helpers/Fonts';
import styles from './style';

const TermsConditions = () => {
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
            Make sure to read all the terms and conditions carefully before
            accepting them.
          </Text>
        </View>
      </View>
      <View style={styles.card}>
        <ScrollView showsVerticalScrollIndicator>
          <Text style={styles.title}>Fixrli Inc. - Master Terms of Use</Text>

          <Text style={styles.subHeader}>Last Updated: May 2026</Text>

          <Text style={styles.text}>
            Welcome to Fixrli! These Terms of Use (“Terms”) govern your access
            to and use of the Fixrli Inc. (“Fixrli,” “we,” “us,” or “our”)
            website (fixrli.com), mobile applications, and related services,
            including our AI-assisted scoping and financial tools (collectively,
            the “Services”).
          </Text>
          <Text style={styles.heading}>
            1. Description of Services & AI Roadmap
          </Text>

          <Text style={styles.text}>
            Fixrli provides a SaaS-Enabled Marketplace that connects Property
            Owners/Managers ("Clients") with Service Professionals
            ("Contractors").
          </Text>

          <Text style={styles.bullet}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              ● AI-Assisted Tools:{' '}
            </Text>
            Fixrli utilizes Multimodal AI (Gemini) to assist in job scoping,
            visual identification of fixtures, and automated support.{' '}
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              Disclaimer:{' '}
            </Text>
            All AI-generated data, dimensions, and specifications are estimates.
            Users are solely responsible for verifying the accuracy of
            AI-generated content before awarding a bid or commencing work.
          </Text>

          <Text style={styles.bullet}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              ● Property Management Sync:{' '}
            </Text>
            Fixrli integrates with third-party software (e.g., AppFolio,
            Buildium). Fixrli is not responsible for data errors originating
            within third-party platforms.
          </Text>

          <Text style={styles.heading}>2. Subscription Tiers & Billing</Text>

          <Text style={styles.bullet}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              ● Tiers:{' '}
            </Text>
            Access to certain features is based on subscription tiers (Starter,
            Pro, Business).
          </Text>

          <Text style={styles.bullet}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              ● Recurring Billing:{' '}
            </Text>
            By subscribing, you authorize Fixrli to charge your payment method
            on a recurring monthly or annual basis.
          </Text>

          <Text style={styles.bullet}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              ● Cancellations:{' '}
            </Text>
            You may cancel at any time via your Account Settings. Access to
            premium features will continue until the end of the current billing
            cycle. No pro-rated refunds are provided for partial months.
          </Text>

          <Text style={styles.heading}>
            3. Escrow, Wallets & Milestone Draw Schedules
          </Text>

          <Text style={styles.bullet}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              ● Wallet Nature:{' '}
            </Text>
            The "Fixrli Wallet" is a closed-loop internal credit system. Credits
            are non-transferable and have no cash value outside the platform.
            Wallet funds cannot be withdrawn to a bank account.
          </Text>

          <Text style={styles.bullet}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              ● Hybrid Fees:{' '}
            </Text>
            For payments split between the Wallet and a Credit Card, the Fixrli
            Facilitation Fee (3.5% + $1.00) and applicable Sales Tax apply only
            to the portion charged to the credit card.
          </Text>

          <Text style={styles.bullet}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              ● Milestone Escrow:{' '}
            </Text>
            For high-value jobs, Clients may fund jobs in scheduled milestones
            (Draws). Contractors are only guaranteed funds for the actively
            funded milestone. Fixrli is not liable for unpaid subsequent
            milestones if the Client abandons the project or fails to fund the
            next scheduled draw.
          </Text>

          <Text style={styles.heading}>
            4. Contractor Commission & The Ladder
          </Text>

          <Text style={styles.text}>
            Fixrli deducts a graduated commission from contractor payouts based
            on the following scale:
          </Text>

          <Text style={styles.bullet}>
            $0–$499: 5.0% | $500–$999: 4.5% | $1,000–$2,499: 4.0% |
            $2,500–$4,999: 3.5% | $5,000–$9,999: 3.0% | $10,000–$24,999: 2.5% |
            $25,000–$49,999: 2.0% | $50,000–$99,999: 1.5% | $100,000+: 1.0%.
          </Text>

          <Text style={styles.text}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              A. Change Order Calculations:{' '}
            </Text>
            Commissions on scope modifications are calculated dynamically to
            protect margins. Change Order increases are mathematically treated
            as isolated transactions starting from the bottom of the ladder
            (5.0%). Change Order decreases refund commission using a Last-In,
            First-Out (LIFO) method, drawing from the highest marginal rate
            reached by the job.
          </Text>

          <Text style={styles.text}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              B. Fixrli Direct (Guest Checkout):{' '}
            </Text>
            Jobs originated directly by the Contractor using a "Fixrli Direct"
            guest checkout link receive a 50% discount on the standard Ladder
            Commission, subject to a minimum platform charge of $5.00 per job.
          </Text>

          <Text style={styles.heading}>
            5. Administrative Mediation & Overrides
          </Text>

          <Text style={styles.text}>
            Fixrli provides an Administrative Mediation service.
          </Text>

          <Text style={styles.bullet}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              ● Administrative Authority:{' '}
            </Text>
            By using the platform, both Clients and Contractors grant Fixrli the
            right to intervene in disputed jobs.
          </Text>

          <Text style={styles.bullet}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              ● Binding Resolution:{' '}
            </Text>
            Fixrli Admins may, at their sole discretion, execute a "Force
            Complete" (payout) or "Force Terminate" (split refund/payout) based
            on evidence provided in the platform chat and media logs. You agree
            to be bound by these administrative decisions as a condition of
            using the Escrow Service.
          </Text>

          <Text style={styles.heading}>
            6. Mobile Application & GPS Validation
          </Text>

          <Text style={styles.bullet}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              ● Native Apps:{' '}
            </Text>
            Use of our iOS and Android apps is subject to standard App
            Store/Play Store terms.
          </Text>

          <Text style={styles.bullet}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              ● GPS Tracking:{' '}
            </Text>
            To ensure job site integrity, Fixrli captures GPS coordinates at the
            "Start" and "Complete" of jobs. Failure to allow location services
            may result in the inability to process payments or verify work for
            payout.
          </Text>

          <Text style={styles.heading}>7. Sales Tax & Compliance</Text>

          <Text style={styles.text}>
            Fixrli collects and remits sales tax only on its platform
            facilitation fees and subscription fees in required jurisdictions
            (including Wisconsin). Contractors remain solely responsible for any
            sales or use tax related to the physical labor and materials
            provided to the Client.
          </Text>

          <Text style={styles.heading}>8. Governing Law & Arbitration</Text>

          <Text style={styles.text}>
            These Terms shall be governed by the laws of the State of Delaware.
            Any dispute, claim, or controversy arising out of or relating to
            these Terms or your relationship with Fixrli shall be determined by
            binding arbitration in Milwaukee, WI.
          </Text>

          <Text style={styles.heading}>9. Contact Information</Text>

          <Text style={styles.text}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              Legal Entity:{' '}
            </Text>
            Fixrli Inc.
          </Text>

          <Text style={styles.text}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              Address:{' '}
            </Text>
            1020 E Land Pl, Milwaukee, WI 53202
          </Text>

          <Text style={styles.text}>
            <Text
              style={{
                fontFamily: PopinsFont.bold,
                fontSize: 12,
                color: '#2A2A2A',
              }}
            >
              Email:{' '}
            </Text>
            legal@fixrli.com
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default TermsConditions;
