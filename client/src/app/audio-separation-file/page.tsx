import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Head>
        <title>The Ultimate Audio Revolution</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center mb-8">
          <div className="text-xl font-bold">Tonerevolution</div>
          <div className="space-x-4">
            <a href="#" className="hover:text-gray-300">ABOUT</a>
            <a href="#" className="hover:text-gray-300">SHOP</a>
            <a href="#" className="hover:text-gray-300">PRODUCT</a>
          </div>
        </nav>

        <div className="text-5xl font-bold mb-8">22 8745 322</div>

        <h1 className="text-7xl font-bold mb-8">
          THE ULTIMATE<br />
          AUDIO<br />
          REVOLUTION
        </h1>

        <div className="max-w-2xl mb-8">
          <p className="mb-4">
            Our advanced music tech product is designed to transform your
            audio experience like never before.
          </p>
          <p>
            Whether you&apos;re a musician, producer, or music lover,
            our innovative technology will elevate your sound to new heights.
          </p>
        </div>

        <button className="bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition-colors">
          GET STARTED NOW
        </button>
      </main>
    </div>
  )
}
