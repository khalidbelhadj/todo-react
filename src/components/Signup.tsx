import { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import firebase from 'firebase/compat/app';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const { signup } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      return setErrorMessage('Passwords do not match');
    }
    if (emailRef.current && passwordRef.current) {
      try {
        await signup(emailRef.current.value, passwordRef.current.value);
        navigate('/');
      } catch (error) {
        const e = error as firebase.FirebaseError;
        setErrorMessage(`${e.message}`.replace('Firebase: ', ''));
      }
    }
  };

  return (
    <>
      <div className="border p-5 w-fit rounded-md mx-auto mt-5 width">
        <h2 className="text-xl text-center font-semibold mb-3">Sign Up</h2>

        {errorMessage !== '' && (
          <div className="bg-red-200 rounded mx-auto p-1 text-center my-3 truncate hover:overflow-visible hover:whitespace-break-spaces">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex-col flex gap-2">
          <label htmlFor="email">Email:</label>
          <input
            className="outline-none outline-gray-200 rounded-sm"
            type="email"
            id="email"
            name="email"
            ref={emailRef}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            className="outline-none outline-gray-200 rounded-sm"
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
            required
          />

          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            className="outline-none outline-gray-200 rounded-sm"
            type="password"
            id="confirm-password"
            name="confirm-password"
            ref={confirmPasswordRef}
            required
          />
          <input
            className="rounded-md bg-blue-500 text-gray-50 mx-10 mt-5 p-1 hover:cursor-pointer hover:bg-blue-400"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
      <div className="text-center text-xs mt-1">
        Already have an account?{' '}
        <Link className="text-blue-500" to="/login">
          Log In
        </Link>
        .
      </div>
    </>
  );
}

/* Proper error handling template

const AUTH_ERROR_CODES_MAP = {
  ADMIN_ONLY_OPERATION: 'auth/admin-restricted-operation',
  ARGUMENT_ERROR: 'auth/argument-error',
  APP_NOT_AUTHORIZED: 'auth/app-not-authorized',
  APP_NOT_INSTALLED: 'auth/app-not-installed',
  CAPTCHA_CHECK_FAILED: 'auth/captcha-check-failed',
  CODE_EXPIRED: 'auth/code-expired',
  CORDOVA_NOT_READY: 'auth/cordova-not-ready',
  CORS_UNSUPPORTED: 'auth/cors-unsupported',
  CREDENTIAL_ALREADY_IN_USE: 'auth/credential-already-in-use',
  CREDENTIAL_MISMATCH: 'auth/custom-token-mismatch',
  CREDENTIAL_TOO_OLD_LOGIN_AGAIN: 'auth/requires-recent-login',
  DEPENDENT_SDK_INIT_BEFORE_AUTH: 'auth/dependent-sdk-initialized-before-auth',
  DYNAMIC_LINK_NOT_ACTIVATED: 'auth/dynamic-link-not-activated',
  EMAIL_CHANGE_NEEDS_VERIFICATION: 'auth/email-change-needs-verification',
  EMAIL_EXISTS: 'auth/email-already-in-use',
  EMULATOR_CONFIG_FAILED: 'auth/emulator-config-failed',
  EXPIRED_OOB_CODE: 'auth/expired-action-code',
  EXPIRED_POPUP_REQUEST: 'auth/cancelled-popup-request',
  INTERNAL_ERROR: 'auth/internal-error',
  INVALID_API_KEY: 'auth/invalid-api-key',
  INVALID_APP_CREDENTIAL: 'auth/invalid-app-credential',
  INVALID_APP_ID: 'auth/invalid-app-id',
  INVALID_AUTH: 'auth/invalid-user-token',
  INVALID_AUTH_EVENT: 'auth/invalid-auth-event',
  INVALID_CERT_HASH: 'auth/invalid-cert-hash',
  INVALID_CODE: 'auth/invalid-verification-code',
  INVALID_CONTINUE_URI: 'auth/invalid-continue-uri',
  INVALID_CORDOVA_CONFIGURATION: 'auth/invalid-cordova-configuration',
  INVALID_CUSTOM_TOKEN: 'auth/invalid-custom-token',
  INVALID_DYNAMIC_LINK_DOMAIN: 'auth/invalid-dynamic-link-domain',
  INVALID_EMAIL: 'auth/invalid-email',
  INVALID_EMULATOR_SCHEME: 'auth/invalid-emulator-scheme',
  INVALID_IDP_RESPONSE: 'auth/invalid-credential',
  INVALID_MESSAGE_PAYLOAD: 'auth/invalid-message-payload',
  INVALID_MFA_SESSION: 'auth/invalid-multi-factor-session',
  INVALID_OAUTH_CLIENT_ID: 'auth/invalid-oauth-client-id',
  INVALID_OAUTH_PROVIDER: 'auth/invalid-oauth-provider',
  INVALID_OOB_CODE: 'auth/invalid-action-code',
  INVALID_ORIGIN: 'auth/unauthorized-domain',
  INVALID_PASSWORD: 'auth/wrong-password',
  INVALID_PERSISTENCE: 'auth/invalid-persistence-type',
  INVALID_PHONE_NUMBER: 'auth/invalid-phone-number',
  INVALID_PROVIDER_ID: 'auth/invalid-provider-id',
  INVALID_RECIPIENT_EMAIL: 'auth/invalid-recipient-email',
  INVALID_SENDER: 'auth/invalid-sender',
  INVALID_SESSION_INFO: 'auth/invalid-verification-id',
  INVALID_TENANT_ID: 'auth/invalid-tenant-id',
  MFA_INFO_NOT_FOUND: 'auth/multi-factor-info-not-found',
  MFA_REQUIRED: 'auth/multi-factor-auth-required',
  MISSING_ANDROID_PACKAGE_NAME: 'auth/missing-android-pkg-name',
  MISSING_APP_CREDENTIAL: 'auth/missing-app-credential',
  MISSING_AUTH_DOMAIN: 'auth/auth-domain-config-required',
  MISSING_CODE: 'auth/missing-verification-code',
  MISSING_CONTINUE_URI: 'auth/missing-continue-uri',
  MISSING_IFRAME_START: 'auth/missing-iframe-start',
  MISSING_IOS_BUNDLE_ID: 'auth/missing-ios-bundle-id',
  MISSING_OR_INVALID_NONCE: 'auth/missing-or-invalid-nonce',
  MISSING_MFA_INFO: 'auth/missing-multi-factor-info',
  MISSING_MFA_SESSION: 'auth/missing-multi-factor-session',
  MISSING_PHONE_NUMBER: 'auth/missing-phone-number',
  MISSING_SESSION_INFO: 'auth/missing-verification-id',
  MODULE_DESTROYED: 'auth/app-deleted',
  NEED_CONFIRMATION: 'auth/account-exists-with-different-credential',
  NETWORK_REQUEST_FAILED: 'auth/network-request-failed',
  NULL_USER: 'auth/null-user',
  NO_AUTH_EVENT: 'auth/no-auth-event',
  NO_SUCH_PROVIDER: 'auth/no-such-provider',
  OPERATION_NOT_ALLOWED: 'auth/operation-not-allowed',
  OPERATION_NOT_SUPPORTED: 'auth/operation-not-supported-in-this-environment',
  POPUP_BLOCKED: 'auth/popup-blocked',
  POPUP_CLOSED_BY_USER: 'auth/popup-closed-by-user',
  PROVIDER_ALREADY_LINKED: 'auth/provider-already-linked',
  QUOTA_EXCEEDED: 'auth/quota-exceeded',
  REDIRECT_CANCELLED_BY_USER: 'auth/redirect-cancelled-by-user',
  REDIRECT_OPERATION_PENDING: 'auth/redirect-operation-pending',
  REJECTED_CREDENTIAL: 'auth/rejected-credential',
  SECOND_FACTOR_ALREADY_ENROLLED: 'auth/second-factor-already-in-use',
  SECOND_FACTOR_LIMIT_EXCEEDED: 'auth/maximum-second-factor-count-exceeded',
  TENANT_ID_MISMATCH: 'auth/tenant-id-mismatch',
  TIMEOUT: 'auth/timeout',
  TOKEN_EXPIRED: 'auth/user-token-expired',
  TOO_MANY_ATTEMPTS_TRY_LATER: 'auth/too-many-requests',
  UNAUTHORIZED_DOMAIN: 'auth/unauthorized-continue-uri',
  UNSUPPORTED_FIRST_FACTOR: 'auth/unsupported-first-factor',
  UNSUPPORTED_PERSISTENCE: 'auth/unsupported-persistence-type',
  UNSUPPORTED_TENANT_OPERATION: 'auth/unsupported-tenant-operation',
  UNVERIFIED_EMAIL: 'auth/unverified-email',
  USER_CANCELLED: 'auth/user-cancelled',
  USER_DELETED: 'auth/user-not-found',
  USER_DISABLED: 'auth/user-disabled',
  USER_MISMATCH: 'auth/user-mismatch',
  USER_SIGNED_OUT: 'auth/user-signed-out',
  WEAK_PASSWORD: 'auth/weak-password',
  WEB_STORAGE_UNSUPPORTED: 'auth/web-storage-unsupported',
  ALREADY_INITIALIZED: 'auth/already-initialized',
  RECAPTCHA_NOT_ENABLED: 'auth/recaptcha-not-enabled',
  MISSING_RECAPTCHA_TOKEN: 'auth/missing-recaptcha-token',
  INVALID_RECAPTCHA_TOKEN: 'auth/invalid-recaptcha-token',
  INVALID_RECAPTCHA_ACTION: 'auth/invalid-recaptcha-action',
  MISSING_CLIENT_TYPE: 'auth/missing-client-type',
  MISSING_RECAPTCHA_VERSION: 'auth/missing-recaptcha-version',
  INVALID_RECAPTCHA_VERSION: 'auth/invalid-recaptcha-version',
  INVALID_REQ_TYPE: 'auth/invalid-req-type',
} as const;




// Inside of the `catch` block of a `try`/`catch` statement, the `error` variable
        // TODO: How else can I ensure error is of type firebase.auth.Error?

        const e = error as firebase.auth.Error;
        switch (e.code) {
          case AUTH_ERROR_CODES_MAP.ADMIN_ONLY_OPERATION:
            break;
          case AUTH_ERROR_CODES_MAP.ARGUMENT_ERROR:
            break;
          case AUTH_ERROR_CODES_MAP.APP_NOT_AUTHORIZED:
            break;
          case AUTH_ERROR_CODES_MAP.APP_NOT_INSTALLED:
            break;
          case AUTH_ERROR_CODES_MAP.CAPTCHA_CHECK_FAILED:
            break;
          case AUTH_ERROR_CODES_MAP.CODE_EXPIRED:
            break;
          case AUTH_ERROR_CODES_MAP.CORDOVA_NOT_READY:
            break;
          case AUTH_ERROR_CODES_MAP.CORS_UNSUPPORTED:
            break;
          case AUTH_ERROR_CODES_MAP.CREDENTIAL_ALREADY_IN_USE:
            break;
          case AUTH_ERROR_CODES_MAP.CREDENTIAL_MISMATCH:
            break;
          case AUTH_ERROR_CODES_MAP.CREDENTIAL_TOO_OLD_LOGIN_AGAIN:
            break;
          case AUTH_ERROR_CODES_MAP.DEPENDENT_SDK_INIT_BEFORE_AUTH:
            break;
          case AUTH_ERROR_CODES_MAP.DYNAMIC_LINK_NOT_ACTIVATED:
            break;
          case AUTH_ERROR_CODES_MAP.EMAIL_CHANGE_NEEDS_VERIFICATION:
            break;
          case AUTH_ERROR_CODES_MAP.EMAIL_EXISTS:
            break;
          case AUTH_ERROR_CODES_MAP.EMULATOR_CONFIG_FAILED:
            break;
          case AUTH_ERROR_CODES_MAP.EXPIRED_OOB_CODE:
            break;
          case AUTH_ERROR_CODES_MAP.EXPIRED_POPUP_REQUEST:
            break;
          case AUTH_ERROR_CODES_MAP.INTERNAL_ERROR:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_API_KEY:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_APP_CREDENTIAL:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_APP_ID:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_AUTH:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_AUTH_EVENT:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_CERT_HASH:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_CODE:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_CONTINUE_URI:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_CORDOVA_CONFIGURATION:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_CUSTOM_TOKEN:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_DYNAMIC_LINK_DOMAIN:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_EMAIL:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_EMULATOR_SCHEME:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_IDP_RESPONSE:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_MESSAGE_PAYLOAD:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_MFA_SESSION:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_OAUTH_CLIENT_ID:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_OAUTH_PROVIDER:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_OOB_CODE:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_ORIGIN:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_PASSWORD:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_PERSISTENCE:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_PHONE_NUMBER:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_PROVIDER_ID:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_RECIPIENT_EMAIL:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_SENDER:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_SESSION_INFO:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_TENANT_ID:
            break;
          case AUTH_ERROR_CODES_MAP.MFA_INFO_NOT_FOUND:
            break;
          case AUTH_ERROR_CODES_MAP.MFA_REQUIRED:
            break;
          case AUTH_ERROR_CODES_MAP.MISSING_ANDROID_PACKAGE_NAME:
            break;
          case AUTH_ERROR_CODES_MAP.MISSING_APP_CREDENTIAL:
            break;
          case AUTH_ERROR_CODES_MAP.MISSING_AUTH_DOMAIN:
            break;
          case AUTH_ERROR_CODES_MAP.MISSING_CODE:
            break;
          case AUTH_ERROR_CODES_MAP.MISSING_CONTINUE_URI:
            break;
          case AUTH_ERROR_CODES_MAP.MISSING_IFRAME_START:
            break;
          case AUTH_ERROR_CODES_MAP.MISSING_IOS_BUNDLE_ID:
            break;
          case AUTH_ERROR_CODES_MAP.MISSING_OR_INVALID_NONCE:
            break;
          case AUTH_ERROR_CODES_MAP.MISSING_MFA_INFO:
            break;
          case AUTH_ERROR_CODES_MAP.MISSING_MFA_SESSION:
            break;
          case AUTH_ERROR_CODES_MAP.MISSING_PHONE_NUMBER:
            break;
          case AUTH_ERROR_CODES_MAP.MISSING_SESSION_INFO:
            break;
          case AUTH_ERROR_CODES_MAP.MODULE_DESTROYED:
            break;
          case AUTH_ERROR_CODES_MAP.NEED_CONFIRMATION:
            break;
          case AUTH_ERROR_CODES_MAP.NETWORK_REQUEST_FAILED:
            break;
          case AUTH_ERROR_CODES_MAP.NULL_USER:
            break;
          case AUTH_ERROR_CODES_MAP.NO_AUTH_EVENT:
            break;
          case AUTH_ERROR_CODES_MAP.NO_SUCH_PROVIDER:
            break;
          case AUTH_ERROR_CODES_MAP.OPERATION_NOT_ALLOWED:
            break;
          case AUTH_ERROR_CODES_MAP.OPERATION_NOT_SUPPORTED:
            break;
          case AUTH_ERROR_CODES_MAP.POPUP_BLOCKED:
            break;
          case AUTH_ERROR_CODES_MAP.POPUP_CLOSED_BY_USER:
            break;
          case AUTH_ERROR_CODES_MAP.PROVIDER_ALREADY_LINKED:
            break;
          case AUTH_ERROR_CODES_MAP.QUOTA_EXCEEDED:
            break;
          case AUTH_ERROR_CODES_MAP.REDIRECT_CANCELLED_BY_USER:
            break;
          case AUTH_ERROR_CODES_MAP.REDIRECT_OPERATION_PENDING:
            break;
          case AUTH_ERROR_CODES_MAP.REJECTED_CREDENTIAL:
            break;
          case AUTH_ERROR_CODES_MAP.SECOND_FACTOR_ALREADY_ENROLLED:
            break;
          case AUTH_ERROR_CODES_MAP.SECOND_FACTOR_LIMIT_EXCEEDED:
            break;
          case AUTH_ERROR_CODES_MAP.TENANT_ID_MISMATCH:
            break;
          case AUTH_ERROR_CODES_MAP.TIMEOUT:
            break;
          case AUTH_ERROR_CODES_MAP.TOKEN_EXPIRED:
            break;
          case AUTH_ERROR_CODES_MAP.TOO_MANY_ATTEMPTS_TRY_LATER:
            break;
          case AUTH_ERROR_CODES_MAP.UNAUTHORIZED_DOMAIN:
            break;
          case AUTH_ERROR_CODES_MAP.UNSUPPORTED_FIRST_FACTOR:
            break;
          case AUTH_ERROR_CODES_MAP.UNSUPPORTED_PERSISTENCE:
            break;
          case AUTH_ERROR_CODES_MAP.UNSUPPORTED_TENANT_OPERATION:
            break;
          case AUTH_ERROR_CODES_MAP.UNVERIFIED_EMAIL:
            break;
          case AUTH_ERROR_CODES_MAP.USER_CANCELLED:
            break;
          case AUTH_ERROR_CODES_MAP.USER_DELETED:
            break;
          case AUTH_ERROR_CODES_MAP.USER_DISABLED:
            break;
          case AUTH_ERROR_CODES_MAP.USER_MISMATCH:
            break;
          case AUTH_ERROR_CODES_MAP.USER_SIGNED_OUT:
            break;
          case AUTH_ERROR_CODES_MAP.WEAK_PASSWORD:
            break;
          case AUTH_ERROR_CODES_MAP.WEB_STORAGE_UNSUPPORTED:
            break;
          case AUTH_ERROR_CODES_MAP.ALREADY_INITIALIZED:
            break;
          case AUTH_ERROR_CODES_MAP.RECAPTCHA_NOT_ENABLED:
            break;
          case AUTH_ERROR_CODES_MAP.MISSING_RECAPTCHA_TOKEN:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_RECAPTCHA_TOKEN:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_RECAPTCHA_ACTION:
            break;
          case AUTH_ERROR_CODES_MAP.MISSING_CLIENT_TYPE:
            break;
          case AUTH_ERROR_CODES_MAP.MISSING_RECAPTCHA_VERSION:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_RECAPTCHA_VERSION:
            break;
          case AUTH_ERROR_CODES_MAP.INVALID_REQ_TYPE:
            break;
          default:
            console.error(e.code, e.message);
            break;
        }
*/
