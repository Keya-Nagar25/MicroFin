function calculateCreditScore({ monthlyRevenue, loanAmount, bizAgeMonths,
  monthlyTxns, defaults, digitalUsage, gstFiling, repaymentHistory }) {
  
  const r = (loanAmount / 24) / Math.max(monthlyRevenue, 1);
  const dti       = Math.round(Math.max(0, Math.min(30, (1 - r) * 30)));
  const txScore   = Math.round(Math.min(20, (monthlyTxns / 200) * 20));
  const bizScore  = Math.round(Math.min(15, (bizAgeMonths / 60) * 15));
  const digScore  = Math.round((digitalUsage / 3) * 15);  
  const repScore  = Math.round((repaymentHistory / 3) * 10);
  const gstScore  = Math.round((gstFiling / 2) * 10);
  const penalty   = defaults === 1 ? 10 : defaults >= 2 ? 25 : 0;

  const total = Math.max(0, Math.min(100,
    dti + txScore + bizScore + digScore + repScore + gstScore - penalty));

  return {
    score: total,
    status: total >= 70 ? 'approved' : total >= 50 ? 'review' : 'rejected',
    breakdown: { dti, txScore, bizScore, digScore, repScore, gstScore, penalty }
  };
}

module.exports = { calculateCreditScore };
