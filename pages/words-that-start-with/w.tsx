import Head from 'next/head'
import Link from 'next/link';

interface Props {
  data: {
    words: string[],
    message: string,
  }
}

const StartsWithW = ({ data }: Props) => {
   return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Wordle Words That Start with W</title>
        <link rel="icon" href="/wordlefav.ico" />
        <meta property='og:image' content='/wordleimg.png' key='ogimage' />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center mt-20 px-20 text-center">
        <h1 className="text-6xl font-bold mb-8">
          {data.words.length} Wordle Words That Start With W
        </h1>
        <Link href="/">
          <p className='w-[350px] h-12 px-6 mt-8 text-indigo-100 flex items-center justify-center cursor-pointer transition-colors duration-150 bg-blue-600 rounded-lg'>Enter Letters</p>
        </Link>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:gird-cols-3 gap-4'>
          {data.words.map(word => (
            <div key={word} className='grid grid-cols-5 gap-2 w-[350px] h-[62px] mt-8'>
              {word.split('').map((letter, i) => (
                <div key={`${letter}-${word}-${i}`} className={`w-full ${i <= 0 ? 'bg-[#6aaa64] text-white border-none' : 'bg-white'} border-slate-300 border-2 flex items-center justify-center font-extrabold text-3xl`}>
                  {letter.toUpperCase()}
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default StartsWithW

export async function getStaticProps() {
  const path = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://wordlehelps.com';
  const res = await fetch(`${path}/api/words?starts=w`);
  const data = await res.json();

  return {
    props: {
      data
    }
  }
}