import { Request, Response } from 'express';

export function getScalarHtml(document: any): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <title>DNSly Backend API Reference</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236366f1'><path d='M12 2L3 6v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4z'/></svg>" />
    <style>
      body {
        margin: 0;
        background-color: #0b0c15;
      }
    </style>
  </head>
  <body>
    <script
      id="api-reference"
      type="application/json"
      data-configuration='{"theme":"purple","darkMode":true,"layout":"modern"}'>
${JSON.stringify(document)}
    </script>
    <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
  </body>
</html>`;
}

export function setupScalarDocs(serverOrApp: any, document: any) {
  const html = getScalarHtml(document);

  const serveDocs = (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  };

  const serveJson = (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.json(document);
  };

  // Support all common doc paths
  serverOrApp.use('/reference', serveDocs);
  serverOrApp.use('/docs', serveDocs);
  serverOrApp.use('/api/docs', serveDocs);
  serverOrApp.use('/api/reference', serveDocs);

  // Raw OpenAPI JSON endpoints
  serverOrApp.use('/openapi.json', serveJson);
  serverOrApp.use('/docs-json', serveJson);
  serverOrApp.use('/api/docs-json', serveJson);
}
