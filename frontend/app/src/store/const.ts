export enum Status {
  NONE,
  LOADING,
  REFRESHING,
  PARTIALLY_LOADED,
  LOADED
}

export enum Section {
  NONE = 'none',
  ASSET_MOVEMENT = 'asset_movement',
  TRADES = 'trades',
  TX = 'tx',
  DEFI_COMPOUND_BALANCES = 'defi_compound_balances',
  DEFI_COMPOUND_HISTORY = 'defi_compound_history',
  DEFI_OVERVIEW = 'defi_overview',
  DEFI_AAVE_BALANCES = 'defi_aave_balances',
  DEFI_AAVE_HISTORY = 'defi_aave_history',
  DEFI_BORROWING_HISTORY = 'defi_borrowing_history',
  DEFI_LENDING = 'defi_lending',
  DEFI_LENDING_HISTORY = 'defi_lending_history',
  DEFI_BORROWING = 'defi_borrowing',
  DEFI_BALANCES = 'defi_balances',
  DEFI_DRS_BALANCES = 'defi_dsr_balances',
  DEFI_DSR_HISTORY = 'defi_dsr_history',
  DEFI_MAKERDAO_VAULT_DETAILS = 'defi_makerdao_vault_details',
  DEFI_MAKERDAO_VAULTS = 'defi_makerdao_vaults'
}
