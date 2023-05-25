if (typeof window === 'undefined') {
  const server = import('./server')
  server.then((s) => s.Server.listen())
} else {
  const worker = import('./browser')
  worker.then((w) => w.Worker.start())
}

export {}
