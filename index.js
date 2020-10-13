import { jsPDF } from 'jspdf'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

async function handleRequest(event) {
  const doc = new jsPDF({
    orientation: 'p',
    format: 'a4',
  })

  const pageWidth = doc.internal.pageSize.width
  const ppi = 3

  const now = new Date()
  const dateToday =
    now.getMonth() + 1 + '/' + now.getDate() + '/' + now.getFullYear()

  const t = {}
  const searchParams = new URL(event.request.url).searchParams
  const textParams = [
    'company',
    'customer',
    'number',
    'date',
    'description',
    'amount',
    'total',
  ]
  textParams.forEach(param => (t[param] = searchParams.get(param) || ''))

  const docText = (x, y, text) => {
    if (x > 0) return doc.text(x, y, text)
    return doc.text(pageWidth + x, y, text, null, null, 'right')
  }

  const getLines = (text, start, end) =>
    text
      .replace(/\\n/g, '\n')
      .split('\n')
      .slice(start, end)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  docText(20, 24, getLines(t.company || 'Company', 0, 1))
  docText(-20, 24, t.number ? 'Invoice #' + t.number : 'INVOICE')

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setLineHeightFactor(1.3)
  docText(20, 30, getLines(t.company, 1))
  docText(-20, 30, t.date || dateToday)

  docText(20, 60, getLines(t.customer || 'Customer', 0))

  doc.setFont('helvetica', 'bold')
  docText(20, 98, 'Description')
  doc.text(pageWidth - 20, 98, 'Amount', null, null, 'right')

  doc.setLineWidth(0.333)
  doc.line(20, 102, pageWidth - 20, 102)

  doc.setFont('helvetica', 'normal')
  docText(20, 108, t.description || 'Products and services')
  docText(-20, 108, t.amount || '$1')

  const formatTotal = amount => {
    let str = (amount + '').replace(/[^0-9\.\,]/g, '')
    let num = parseFloat(str, 10)
    if (Math.floor(num) === num) return num + ''
    return num.toFixed(2)
  }

  const totalAmount = t.total || '$' + formatTotal(t.amount || '$1')
  doc.setFont('helvetica', 'bold')
  docText(-20, 128, 'Total    ' + totalAmount)

  const output = doc.output('arraybuffer')

  const headers = new Headers()
  headers.set('Content-Type', ' application/pdf')

  return new Response(output, { headers })
}
