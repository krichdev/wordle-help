import { useState, FC } from 'react'

interface Props {
  letter?: string,
};

const Letter: FC<Props> = ({ letter = '' }) => {
  return (
    <input
      className="w-full bg-white border-slate-300 border-2 text-center font-extrabold text-3xl"
      type="text"
      maxLength={1}
      onKeyPress={(e) => {
        if(!/[A-Za-z]/.test(e.key)) {
          e.preventDefault();
        }
      }}
    />
  )
}

export default Letter