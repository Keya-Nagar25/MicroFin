import api from './api'

export const getScore  = (data)    => api.post('/credit/score', data)
export const applyLoan = (data)    => api.post('/loans/apply', data)
export const getMyLoans = ()       => api.get('/loans/my')
export const getLoanStats = ()     => api.get('/loans/stats')
export const getLoanById  = (id)   => api.get(`/loans/${id}`)
export const getSchedule  = (id)   => api.get(`/loans/${id}/schedule`)
export const markEmiPaid  = (id, idx) => api.patch(`/loans/${id}/repay/${idx}`)
