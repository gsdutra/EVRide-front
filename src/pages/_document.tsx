import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='
        bg-light dark:bg-dark
        text-txtlight dark:text-txtdark
        '>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
