import QuickActionModal from '../Contractor/JobsActionModals/QuickActionModal';
import RequestChangeOrderModal from '../Contractor/JobsActionModals/RequestChangeOrderModal';
import ReviewRatingModal from '../Contractor/JobsActionModals/ReviewRatingModal';
import JobTerminationModal from '../Contractor/JobsActionModals/JobTerminationModal';
import RequestDownPayment from '../Contractor/JobsActionModals/RequestDownPayment';
import PauseJobModal from '../Contractor/JobsActionModals/PauseJobModal';
import RejectChangesModal from '../Contractor/JobsActionModals/RejectChangesModal';
import AssignJobModal from '../Contractor/JobsActionModals/AssignJobModal';
import WithdrawDownpaymntRequestModal from '../Contractor/JobsActionModals/WithdrawDownpaymntRequestModal';
import PhotosBeforeJobStartModal from './JobsActionModals/PhotosBeforeJobStartModal';
import PhotosBeforeJobCompleteModal from './JobsActionModals/PhotosBeforeJobCompleteModal';
import MemberStatusModal from './MemberStatusModal';
import MemberQucikActionModal from './MemberQucikActionModal';
import MemberRemoveFromTeamModal from './MemberRemoveFromTeamModal';
import AssignJobFromTeamModal from './AssignJobFromTeamModal';
import AddNewMemberInTeamModal from './AddNewMemberInTeamModal';
import WithdrawBidModal from './WithdrawBidModal';
import BidDetailsModal from './BidDetailsModal';
import AddNewBankAccountModal from '../Contractor/AddNewBankAccountModal/AddNewBankAccountModal';
import DeleteChatModal from '../Contractor/DeleteChatModal/DeleteChatModal';
import ChatInfoModal from '../Contractor/ChatInfoModal/ChatInfoModal';
import StripeSetupModal from './StripeSetupModal';
import IdentityVerificationModal from './IdentityVerificationModal/IdentityVerificationModal';
import CongratulationsOnBudgetIncreaseModal from './JobsActionModals/CongratulationsOnBudgetIncreaseModal';
import ReceiptModal from './ReceiptModal';
import AddNewRoleModal from './AddNewRoleModal/AddNewRoleModal';
import DeleteRoleModal from './DeleteRoleModal/DeleteRoleModal';
const ModalRenderer = ({
  activeModal,
  closeModal,
  openModal,
  state,
  setState,
}) => {
  return (
    <>
      <QuickActionModal
        visible={activeModal === 'quick_action'}
        onClose={closeModal}
        openModal={openModal}
        state={state}
        setState={setState}
      />
      <RequestChangeOrderModal
        visible={activeModal === 'change_order'}
        onClose={closeModal}
        openModal={openModal}
        state={state}
        setState={setState}
      />
      <ReviewRatingModal
        visible={activeModal === 'review_rating'}
        onClose={closeModal}
        openModal={openModal}
        state={state}
        setState={setState}
      />

      <JobTerminationModal
        visible={activeModal === 'terminate_job'}
        onClose={closeModal}
        openModal={openModal}
        state={state}
        setState={setState}
      />

      <RequestDownPayment
        visible={activeModal === 'request_down_payment'}
        onClose={closeModal}
        openModal={openModal}
        state={state}
        setState={setState}
      />

      <PauseJobModal
        visible={activeModal === 'pause_job'}
        onClose={closeModal}
        openModal={openModal}
        state={state}
        setState={setState}
      />

      <RejectChangesModal
        visible={activeModal === 'reject_changes'}
        onClose={closeModal}
        openModal={openModal}
        state={state}
        setState={setState}
      />

      <AssignJobModal
        visible={activeModal === 'assign_job'}
        onClose={closeModal}
        openModal={openModal}
        state={state}
        setState={setState}
      />

      <WithdrawDownpaymntRequestModal
        visible={activeModal === 'withdraw_down_payment_request'}
        onClose={closeModal}
        openModal={openModal}
        state={state}
        setState={setState}
      />
      <MemberStatusModal
        visible={activeModal === 'member_status_modal'}
        onClose={closeModal}
        openModal={openModal}
        state={state}
        setState={setState}
      />

      <MemberQucikActionModal
        visible={activeModal === 'member_qucik_action_modal'}
        onClose={closeModal}
        openModal={openModal}
        state={state}
        setState={setState}
      />
      <MemberRemoveFromTeamModal
        visible={activeModal === 'member_remove_from_team_modal'}
        onClose={closeModal}
        openModal={openModal}
        state={state}
        setState={setState}
      />
      <AssignJobFromTeamModal
        visible={activeModal === 'assign_job_from_team_modal'}
        onClose={closeModal}
        openModal={openModal}
        state={state}
        setState={setState}
      />
      <AddNewMemberInTeamModal
        visible={activeModal === 'add_new_member_in_team_modal'}
        onClose={closeModal}
        openModal={openModal}
        state={state}
        setState={setState}
      />
      <BidDetailsModal
        visible={activeModal === 'bid_details_modal'}
        onClose={closeModal}
        openModal={openModal}
        state={state}
        setState={setState}
      />
      <WithdrawBidModal
        visible={activeModal === 'withdraw_bid_modal'}
        onClose={closeModal}
        openModal={openModal}
        state={state}
        setState={setState}
      />
      <AddNewBankAccountModal
        visible={activeModal === 'add_new_bank_account_modal'}
        onClose={closeModal}
        openModal={openModal}
        state={state}
        setState={setState}
      />
      <PhotosBeforeJobStartModal
        visible={activeModal === 'photos_before_job_start_modal'}
        onClose={closeModal}
        openModal={openModal}
        state={state}
        setState={setState}
      />
      <PhotosBeforeJobCompleteModal
        visible={activeModal === 'photos_before_job_complete_modal'}
        onClose={closeModal}
        openModal={openModal}
        state={state}
        setState={setState}
      />
      <DeleteChatModal
        visible={activeModal === 'delete_chat_modal'}
        onClose={closeModal}
        openModal={openModal}
        state={state}
        setState={setState}
      />
      <ChatInfoModal
        visible={activeModal === 'chat_info_modal'}
        onClose={closeModal}
        openModal={openModal}
        state={state}
        setState={setState}
      />
      <StripeSetupModal
        visible={activeModal === 'stripe_setup_modal'}
        onClose={closeModal}
        openModal={openModal}
        state={state}
        setState={setState}
      />
      <IdentityVerificationModal
        visible={activeModal === 'identity_verification_modal'}
        onClose={closeModal}
        openModal={openModal}
        state={state}
        setState={setState}
      />
      <CongratulationsOnBudgetIncreaseModal
        visible={activeModal === 'congratulations_on_budget_increase_modal'}
        onClose={closeModal}
        openModal={openModal}
        state={state}
        setState={setState}
      />
      <ReceiptModal
        visible={activeModal === 'receipt_modal'}
        onClose={closeModal}
        openModal={openModal}
        state={state}
        setState={setState}
      />
      <AddNewRoleModal
        visible={activeModal === 'add_new_role_modal'}
        onClose={closeModal}
        openModal={openModal}
        state={state}
        setState={setState}
      />
      <DeleteRoleModal
        visible={activeModal === 'delet_role_modal'}
        onClose={closeModal}
        openModal={openModal}
        state={state}
        setState={setState}
      />
    </>
  );
};

export default ModalRenderer;
