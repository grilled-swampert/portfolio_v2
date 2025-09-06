import React from "react"
import "../../styles/DownButton.css"

// eslint-disable-next-line react/prop-types
const DownButton = ({ text = "HELLISH STEAK" }) => {
  const characters = text.split("")
  const anglePerChar = 360 / characters.length

  return (
    <button className="down__button">
      <p className="down__button__text">
        {characters.map((char, idx) => (
          <span
            key={idx}
            style={{
              "--index": idx,
              transform: `rotate(${anglePerChar * idx}deg)`,
            }}
          >
            {char}
          </span>
        ))}
      </p>

      <div className="down__button__circle">
        <svg
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="down__button__icon"
          width="14"
        >
          <path
            transform="rotate(135 7 7)"
            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
            fill="currentColor"
          ></path>
        </svg>

        <svg
          viewBox="0 0 14 15"
          fill="none"
          width="14"
          xmlns="http://www.w3.org/2000/svg"
          className="down__button__icon down__button__icon--copy"
        >
          <path
            transform="rotate(135 7 7)"
            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </button>
  )
}

export default DownButton;
