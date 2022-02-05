import Head from 'next/head'
import React, { useState, useRef, useEffect, RefObject } from 'react'

const Home = () => {
  const [letters, setLetters] = useState<Record<string, string>>({
    "0": '',
    "1": '',
    "2": '',
    "3": '',
    "4": '',
  });
  const [wordList, setWordList] = useState<string[]>([]);
  const firstRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    firstRef.current?.focus();
  }, []);


  const handleWordSearch = async () => {
    const response = await fetch('/api/words', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(letters),
    });

    const {words, message} = await response.json();
    setWordList(words);
    setMessage(message);
  }

  const handleChange = (letter: string, key: string) => {
    setLetters({
      ...letters,
      [key]: letter,
    });
  }

  const findButtonDisabled =
    Object.keys(letters).filter(key => letters[key] === '').length === 5 ||
    Object.keys(letters).filter(key => letters[key] !== '').length === 5


   return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Help Solve Your Worlde Word</title>
        <link rel="icon" href="/wordlefav.ico" />
        <meta property='og:image' content='/wordleimg.png' key='ogimage' />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center mt-20 px-20 text-center">
        <h1 className="text-6xl font-bold mb-8">
            Wordle Helps
        </h1>
          <div className="w-[350px]">
            {!message ? (
              <p>Enter in letters in known positions to get some help solving wordle!</p>
            ) : (
              <p>{message}</p>
            )}
            {!message && (
              <div className='grid grid-cols-5 gap-2 w-full h-[62px] mt-8'>
                <input
                  className={`w-full ${letters["0"] ? 'bg-[#6aaa64] text-white border-none' : 'bg-white'} border-slate-300 border-2 text-center font-extrabold text-3xl`}
                  value={letters["0"]}
                  ref={firstRef}
                  type="text"
                  maxLength={1}
                  onChange={(e) => handleChange(e.target.value.toUpperCase(), "0")}
                  onKeyPress={(e) => {
                    if (!/[A-Za-z]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                <input
                  className={`w-full ${letters["1"] ? 'bg-[#6aaa64] text-white border-none' : 'bg-white'} border-slate-300 border-2 text-center font-extrabold text-3xl`}
                  value={letters["1"]}
                  type="text"
                  maxLength={1}
                  onChange={(e) => handleChange(e.target.value.toUpperCase(), "1")}
                  onKeyPress={(e) => {
                    if (!/[A-Za-z]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                <input
                  className={`w-full ${letters["2"] ? 'bg-[#6aaa64] text-white border-none' : 'bg-white'} border-slate-300 border-2 text-center font-extrabold text-3xl`}
                  value={letters["2"]}
                  type="text"
                  maxLength={1}
                  onChange={(e) => handleChange(e.target.value.toUpperCase(), "2")}
                  onKeyPress={(e) => {
                    if (!/[A-Za-z]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                <input
                  className={`w-full ${letters["3"] ? 'bg-[#6aaa64] text-white border-none' : 'bg-white'} border-slate-300 border-2 text-center font-extrabold text-3xl`}
                  value={letters["3"]}
                  type="text"
                  maxLength={1}
                  onChange={(e) => handleChange(e.target.value.toUpperCase(), "3")}
                  onKeyPress={(e) => {
                    if (!/[A-Za-z]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                <input
                  className={`w-full ${letters["4"] ? 'bg-[#6aaa64] text-white border-none' : 'bg-white'} border-slate-300 border-2 text-center font-extrabold text-3xl`}
                  value={letters["4"]}
                  type="text"
                  maxLength={1}
                  onChange={(e) => handleChange(e.target.value.toUpperCase(), "4")}
                  onKeyPress={(e) => {
                    if (!/[A-Za-z]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
            )}
        </div>
        {!message ? (
            <button
              className='w-[350px] h-12 px-6 mt-8 text-indigo-100 transition-colors duration-150 bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed rounded-lg'
              onClick={() => handleWordSearch()}
              disabled={findButtonDisabled}
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
            setMessage('')
          }}
        >
          Enter New Letters
        </button>
        )}
        {message && wordList.map(word => (
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