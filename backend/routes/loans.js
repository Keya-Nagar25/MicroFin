const router = require('express').Router()
const Loan = require('../models/Loan')
const auth = require('../middleware/auth')
const { calculateCreditScore } = require('../services/creditScore')
const { generateSchedule } = require('../utils/generateSchedule')

// POST /api/loans/apply
router.post('/apply', auth, async (req, res) => {
  try {
    const {
      businessName, loanAmount, monthlyRevenue, purpose, phone,
      bizAgeMonths = 12, monthlyTxns = 50,
      defaults = 0, digitalUsage = 2, gstFiling = 1, repaymentHistory = 2,
      annualRate = 18, tenureMonths = 12
    } = req.body

    const { score, status, breakdown } = calculateCreditScore({
      monthlyRevenue, loanAmount, bizAgeMonths,
      monthlyTxns, defaults, digitalUsage, gstFiling, repaymentHistory
    })

    const schedule = generateSchedule(loanAmount, annualRate, tenureMonths, new Date())
    const emi = schedule[0]?.emi || 0

    const loan = await Loan.create({
      user: req.user.id,
      businessName,
      amount: loanAmount,
      emi,
      purpose,
      creditScore: score,
      status,
      schedule
    })

    res.status(201).json({ loan, creditScore: score, breakdown })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/loans/my
router.get('/my', auth, async (req, res) => {
  try {
    const loans = await Loan.find({ user: req.user.id }).sort({ createdAt: -1 })
    res.json(loans)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/loans/stats
router.get('/stats', auth, async (req, res) => {
  try {
    const loans = await Loan.find({ user: req.user.id })
    res.json({
      active:  loans.filter(l => l.status === 'approved').length,
      repaid:  loans.filter(l => l.status === 'repaid').length,
      pending: loans.filter(l => l.status === 'review').length,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/loans/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const loan = await Loan.findOne({ _id: req.params.id, user: req.user.id })
    if (!loan) return res.status(404).json({ error: 'Loan not found' })
    res.json(loan)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/loans/:id/schedule
router.get('/:id/schedule', auth, async (req, res) => {
  try {
    const loan = await Loan.findOne({ _id: req.params.id, user: req.user.id })
    if (!loan) return res.status(404).json({ error: 'Loan not found' })
    res.json(loan.schedule)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PATCH /api/loans/:id/repay/:emiIndex
router.patch('/:id/repay/:emiIndex', auth, async (req, res) => {
  try {
    const loan = await Loan.findOne({ _id: req.params.id, user: req.user.id })
    if (!loan) return res.status(404).json({ error: 'Loan not found' })

    const idx = parseInt(req.params.emiIndex)
    if (idx < 0 || idx >= loan.schedule.length)
      return res.status(400).json({ error: 'Invalid EMI index' })

    loan.schedule[idx].status = 'paid'
    loan.schedule[idx].paidAt = new Date()
    loan.repaid = loan.schedule.filter(e => e.status === 'paid').length * loan.emi
    if (loan.repaid >= loan.amount) loan.status = 'repaid'

    await loan.save()
    res.json(loan)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
