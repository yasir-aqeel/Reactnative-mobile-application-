export function calculateCommission(
  amountCents,
  miminumCharge,
  estimatedMaterial,
) {
  const tiers = [
    { limit: 49999, rate: 0.05 }, // $0 - $499.99
    { limit: 99999, rate: 0.045 }, // $500 - $999.99
    { limit: 249999, rate: 0.04 }, // $1,000 - $2,499.99
    { limit: 499999, rate: 0.035 }, // $2,500 - $4,999.99
    { limit: 999999, rate: 0.03 }, // $5,000 - $9,999.99
    { limit: 4999999, rate: 0.025 }, // $10,000 - $49,999.99
    { limit: Infinity, rate: 0.01 }, // Above $200,000
  ];

  const amount = amountCents > miminumCharge ? amountCents : miminumCharge;

  const totalAmount = estimatedMaterial ? amount + estimatedMaterial : amount;

  let remaining = totalAmount;
  let prevLimit = 0;
  let commissionCents = 0;

  for (const tier of tiers) {
    if (remaining <= 0) break;

    const tierAmount = Math.min(remaining, tier.limit - prevLimit);
    commissionCents += Math.round(tierAmount * tier.rate);
    remaining -= tierAmount;
    prevLimit = tier.limit;
  }

  const netCents = totalAmount - commissionCents;

  return {
    commissionCents,
    netCents,
  };
}
