import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body style={{backgroundImage: 'url(http://www.dpgraph.com/truncbyh.gif)'}}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <Main />
        <NextScript />
        </div>
      </body>
    </Html>
  )
}