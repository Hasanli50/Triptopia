const BASE_URL = "http://localhost:6060"; 

enum Endpoints {
  HOST = "host",
  VERIFY_ACCOUNT_HOST = "verify-account-host",
  VERIFY_ACCOUNT = "verify-account",
  USER_LOGIN = "user-login",
  FREEZE_ACCOUNT = "freeze-account",
  UNFREEZE_ACCOUNT = "unfreeze-account",
  BANNED_ACCOUNT = "banned-account",
  UNBANNED_ACCOUNT = "unbanned-account",
  DELETE_ACCOUNT = "delete-account",
  FORGOT_PASSWORD = "forgot-password",
  RESET_PASSWORD = "reset-password",
  USER_INFO = "user-info",
  UPDATE_PASSWORD = "update-password",
  SAVE_FCM_TOKEN = "save-fcm-token",
}

export { BASE_URL, Endpoints };
