const mongoose = require('mongoose');
const LoanSchema = new mongoose.Schema({
  user:         { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  businessName: String,
  amount:       Number,
  emi:          Number,
  purpose:      String,
  creditScore:  Number,
  repaid:       { type: Number, default: 0 },
  status:       { type: String, default: 'pending' },
  schedule: [{
    num:      Number,
    dueDate:  Date,
    emi:      Number,
    principal:Number,
    interest: Number,
    balance:  Number,
    status:   { type: String, default: 'upcoming' },
    paidAt:   Date
  }]
}, { timestamps: true });
module.exports = mongoose.model('Loan', LoanSchema);