# Generate an Invoice PDF using Cloudflare Workers

The open-source PDF generation service powering [Lazy Invoice](https://lazy.invoice.workers.dev) ([code](https://github.com/adamschwartz/lazy.invoice.workers.dev/)), an open-source website for quickly generating PDF invoices on the fly. Powered by Cloudflare Workers.

[Example PDF →](https://generate.invoice.workers.dev/?company=Ginza+Natsuno%0D%0A4F+Marunouchi+1-5-1%0D%0AChiyoda-ku%2C+Tokyo%2C+Japan&customer=Sukiyabashi+Jiro%0D%0A2-15%2C+Ginza+4-chome%0D%0ACity+Chuo%2C+Tokyo%2C+Japan&description=4+pairs+of+rounded+red+sandalwood+chopsticks&amount=4+×+¥8%2C000+per+pair&total=¥32%2C000&number=373267)


## API

Requests are made as `GET` against `http://generate.invoice.workers.dev`. To customize the PDF, set at least the query params `company`, `customer`, `description`, `amount`, and `total`, for example:

<pre><code>https://generate.invoice.workers.dev/
  ?<strong>company</strong>=Ginza Natsuno \n4F Marunouchi 1-5-1 \nChiyoda-ku, Tokyo, Japan
  &<strong>customer</strong>=Sukiyabashi Jiro \n2-15, Ginza 4-chome \nCity Chuo, Tokyo, Japan
  &<strong>description</strong>=4 pairs of rounded red sandalwood chopsticks
  &<strong>amount</strong>=4 × ¥8,000 per pair
  &<strong>total</strong>=¥32,000</code></pre>

[View this example PDF](https://generate.invoice.workers.dev/?company=Ginza+Natsuno%0D%0A4F+Marunouchi+1-5-1%0D%0AChiyoda-ku%2C+Tokyo%2C+Japan&customer=Sukiyabashi+Jiro%0D%0A2-15%2C+Ginza+4-chome%0D%0ACity+Chuo%2C+Tokyo%2C+Japan&description=4+pairs+of+rounded+red+sandalwood+chopsticks&amount=4+×+¥8%2C000+per+pair&total=¥32%2C000&number=373267)
