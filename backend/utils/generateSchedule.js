function generateSchedule(principal, annualRate, tenureMonths, startDate) {
  const r = annualRate / 100 / 12;
  const emi = r > 0
    ? principal * r * Math.pow(1+r, tenureMonths) / (Math.pow(1+r, tenureMonths) - 1)
    : principal / tenureMonths;

  let balance = principal;
  return Array.from({ length: tenureMonths }, (_, i) => {
    const interest  = balance * r;
    const princ     = emi - interest;
    balance        -= princ;
    const dueDate   = new Date(startDate);
    dueDate.setMonth(dueDate.getMonth() + i + 1);
    return { num: i+1, dueDate, emi: +emi.toFixed(2),
      principal: +princ.toFixed(2), interest: +interest.toFixed(2),
      balance: +Math.max(0, balance).toFixed(2), status: 'upcoming' };
  });
}

module.exports = { generateSchedule };