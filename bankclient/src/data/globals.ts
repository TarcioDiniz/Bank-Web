import Account from "./Account";

const LOCAL_STORAGE_KEY = "authenticatedAccount";
let authenticatedAccount: Account | null = null;

export function setAuthenticatedAccount(account: Account | null): void {
    authenticatedAccount = account;

    // Store the account information in localStorage
    if (account) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(account));
    } else {
        // If the account is null, remove the item from localStorage
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
}

export function getAuthenticatedAccount(): Account | null {
    // Retrieve the account information from localStorage
    const storedAccount = localStorage.getItem(LOCAL_STORAGE_KEY);

    // Parse the stored JSON string
    return storedAccount ? JSON.parse(storedAccount) : null;
}

export function clearAuthenticatedAccount(): void {
    // Clear the account information from localStorage
    localStorage.removeItem(LOCAL_STORAGE_KEY);

    // Also set the authenticatedAccount variable to null
    authenticatedAccount = null;
}
