import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='
        bg-light dark:bg-dark
        text-txtlight dark:text-txtdark
        overflow-x-hidden h-screen
        overflow-y-hidden
        '>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
