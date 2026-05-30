# Crypto QR codes

These are **placeholder** QR images. When you set real wallet addresses (via the
`NEXT_PUBLIC_CRYPTO_*_ADDRESS` env vars), generate a matching QR code for each
address and replace the corresponding file here:

- `btc.svg` — Bitcoin address QR
- `eth.svg` — Ethereum address QR
- `usdt.svg` — Tether (USDT) address QR — make sure it matches the network
  set in `NEXT_PUBLIC_CRYPTO_USDT_NETWORK` (e.g. TRC20 vs ERC20)

You can generate a QR from any reputable offline/again-verified tool. **Always
verify the encoded address matches your real wallet** — crypto transfers are
irreversible. Keep the same filenames so no code changes are needed.
