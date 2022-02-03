import Head from 'next/head'
import React, { useState, useRef, useEffect } from 'react'
import { globalWordSearch } from '../lib/wordSearch';

const Home = () => {
  const [letters, setLetters] = useState({
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
  });
  const [wordList, setWordList] = useState<string[]>([]);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstRef.current?.focus();
  }, []);


  const handleWordSearch = () => {
    const matches = globalWordSearch(letters);
    setWordList(matches);
  }

   return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Wordle Words That Start With...</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center mt-20 px-20 text-center">
        <h1 className="text-6xl font-bold mb-8">
            Wordle Helps
        </h1>
        {wordList.length <= 0 && (
          <>
            <div className='grid grid-cols-5 gap-2 w-[350px] h-[62px]'>
            <input
              className={`w-full ${letters[0] ? 'bg-[#6aaa64] text-white border-none' : 'bg-white'} border-slate-300 border-2 text-center font-extrabold text-3xl`}
              value={letters[0]}
              ref={firstRef}
              type="text"
              maxLength={1}
              onChange={(e) => setLetters({
                ...letters,
                0: e.target.value.toUpperCase(),
              })}
              onKeyPress={(e) => {
                if (!/[A-Za-z]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
            <input
              className={`w-full ${letters[1] ? 'bg-[#6aaa64] text-white border-none' : 'bg-white'} border-slate-300 border-2 text-center font-extrabold text-3xl`}
              value={letters[1]}
              type="text"
              maxLength={1}
              onChange={(e) => setLetters({
                ...letters,
                1: e.target.value.toUpperCase(),
              })}
              onKeyPress={(e) => {
                if (!/[A-Za-z]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
            <input
              className={`w-full ${letters[2] ? 'bg-[#6aaa64] text-white border-none' : 'bg-white'} border-slate-300 border-2 text-center font-extrabold text-3xl`}
              value={letters[2]}
              type="text"
              maxLength={1}
              onChange={(e) => setLetters({
                ...letters,
                2: e.target.value.toUpperCase(),
              })}
              onKeyPress={(e) => {
                if (!/[A-Za-z]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
            <input
              className={`w-full ${letters[3] ? 'bg-[#6aaa64] text-white border-none' : 'bg-white'} border-slate-300 border-2 text-center font-extrabold text-3xl`}
              value={letters[3]}
              type="text"
              maxLength={1}
              onChange={(e) => setLetters({
                ...letters,
                3: e.target.value.toUpperCase(),
              })}
              onKeyPress={(e) => {
                if (!/[A-Za-z]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
            <input
              className={`w-full ${letters[4] ? 'bg-[#6aaa64] text-white border-none' : 'bg-white'} border-slate-300 border-2 text-center font-extrabold text-3xl`}
              value={letters[4]}
              type="text"
              maxLength={1}
              onChange={(e) => setLetters({
                ...letters,
                4: e.target.value.toUpperCase(),
              })}
              onKeyPress={(e) => {
                if (!/[A-Za-z]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </div>
        </>
        )}
        {wordList.length <= 0 ? (
            <button
            className='w-[350px] h-12 px-6 mt-8 text-indigo-100 transition-colors duration-150 bg-blue-600 rounded-lg'
            onClick={() => handleWordSearch()}
            disabled={Object.keys(letters).filter(key => letters[parseInt(key)] === '').length === 5}
          >
            Find Words
          </button>
        ) : (
          <button
          className='w-[350px] h-12 px-6 mt-8 text-indigo-100 transition-colors duration-150 bg-blue-600 rounded-lg'
          onClick={() => {
            setLetters({
              0: '',
              1: '',
              2: '',
              3: '',
              4: '',
            })
            setWordList([])
          }}
        >
          Enter New Letters
        </button>
        )}
        {wordList.length > 0 && wordList.map(word => (
          <div key={word} className='grid grid-cols-5 gap-2 w-[350px] h-[62px] mt-8'>
            {word.split('').map((letter, i) => (
              <div key={`${letter}-${word}-${i}`} className={`w-full ${letters[i] ? 'bg-[#6aaa64] text-white border-none' : 'bg-white'} border-slate-300 border-2 flex items-center justify-center font-extrabold text-3xl`}>
                {letter.toUpperCase()}
              </div>
            ))}
          </div>
        ))}
      </main>
    </div>
  )
}

export default Home