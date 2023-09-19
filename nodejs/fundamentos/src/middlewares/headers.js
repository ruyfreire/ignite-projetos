export async function GlobalHeaders(req, res) {
  if (!req.url.includes('upload')) {
    const buffers = []
  
    for await (const chunk of req) {
      buffers.push(chunk)
    }
  
    try {
      req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch (error) {
      req.body = null
    }
  }


  res.setHeader('Content-Type', 'application/json')
}
