# Crypto QR codes

QR codes are **generated automatically** from the wallet addresses you set in
`NEXT_PUBLIC_CRYPTO_*_ADDRESS` (see `lib/qr.ts`, rendered by the crypto cards on
`/give`). The QR is derived from the address at build time, so it can never drift
out of sync with the address shown next to it.

There is nothing to maintain in this folder, and no image files to create. To
change a QR, change the address env var and redeploy.

**Always double-check the address** you configure: blockchain transfers are
irreversible. For larger programs, consider a charity crypto processor (e.g. The
Giving Block, Engiven, or Coinbase Commerce) that auto-converts to fiat and
issues receipts; see `docs/governance/payments-setup.md`.
