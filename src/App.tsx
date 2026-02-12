import { useMemo, useState } from "react";
import "./App.css";

const phrases = [
  "No",
  "Ayaw(Are you sure?)",
  "Nope(Say yes please)",
  "AYAW(Click mo na yang yes dali)",
  "NO!(Pookie plz)",
];

/* 🔥 ADD YOUR NO REACTION GIFS HERE */
const noGifs = [
  "https://media.tenor.com/ssA9ZQag3Z0AAAAM/dwayne-johnson.gif",
  "https://media.tenor.com/qdkmR_oG70sAAAAM/puss-in-boots-puss-in-boots-eyes.gif",
  "https://media.tenor.com/lDMve-IMXY8AAAAM/spongebob-squarepants-begging.gif",
  "https://media.tenor.com/0ghDI8ipB84AAAAM/chewing-tom.gif",
  "https://media.tenor.com/quKCeO2K3fIAAAAM/homer-simpson-prier.gif",
];

const serenadeGif =
  "https://media1.tenor.com/m/2etF8KxUl0wAAAAd/tom-serenading.gif";
const yesGif =
  "https://media0.giphy.com/media/v1.Y2lkPTZjMDliOTUyM3Fya3JuZDU0aTlpYTR0aWwzam8zd2R1Z2R6NzZhMjVwNmh5dDkwYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/f5vXCvhSJsZxu/200.gif";

function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [showDateDetails, setShowDateDetails] = useState(false);

  const yesButtonSize = noCount * 20 + 16;

  function handleNoClick() {
    setNoCount((c) => c + 1);
  }

  function getNoButtontText() {
    return phrases[Math.min(noCount, phrases.length - 1)];
  }

  const noBtnStyle = useMemo(() => {
    const max = Math.min(noCount * 6, 28);
    const x = ((noCount * 37) % (max * 2 + 1)) - max;
    const y = ((noCount * 53) % (max * 2 + 1)) - max;
    return {
      transform: `translate(${x}px, ${y}px) rotate(${
        noCount % 2 === 0 ? -1 : 1
      }deg)`,
    } as React.CSSProperties;
  }, [noCount]);

  // ✅ Only show reaction GIFs after the first NO click
  const currentNoGif = noGifs[(noCount - 1 + noGifs.length) % noGifs.length];

  function handleYesClick() {
    setYesPressed(true);
    setShowDateDetails(false); // reset details panel when switching to YES
  }

  return (
    <div className="page">
      <div className="bg-hearts" aria-hidden="true" />

      <div className="card">
        <div className="header">
          <div className="badge">
            {yesPressed ? "💘 Accepted" : "💌 Valentine Request"}
          </div>
          <div className="title">{yesPressed ? "YESSSS!!!" : "Hi pookie…"}</div>
          <div className="subtitle">
            {yesPressed ? "I love you babycakes" : "Will you be my Valentine?"}
          </div>
        </div>

        <div className="media">
          {yesPressed ? (
            <img className="gif" alt="happy gif" src={yesGif} />
          ) : noCount === 0 ? (
            <img className="gif" alt="tom serenading" src={serenadeGif} />
          ) : (
            <img className="gif" alt="reaction gif" src={currentNoGif} />
          )}
        </div>

        <div className="content">
          {yesPressed ? (
            <>
              <div className="message">YES!! 🥰</div>

              <div className="actions">
                <button
                  className="details-button"
                  onClick={() => setShowDateDetails((v) => !v)}
                >
                  {showDateDetails ? "Hide date details" : "Show date details"}
                </button>
              </div>

              {showDateDetails && (
                <div className="date-card">
                  <div className="date-title">💗 Date Details</div>
                  <div className="date-row">
                    <span className="label">📅 Date:</span>
                    <span className="value">Feb 15, 2026</span>
                  </div>
                  <div className="date-row">
                    <span className="label">⏰ Time:</span>
                    <span className="value">10:00 AM</span>
                  </div>
                  <div className="date-row">
                    <span className="label">📍 Place:</span>
                    <span className="value">Manila Ocean Park</span>
                  </div>
                  <div className="date-row">
                    <span className="label">🍽️ Plan:</span>
                    <span className="value">
                      Ocean Park Date + Dinner @ Harbor View Resto
                    </span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="actions">
              <button
                className="yes-button"
                style={{
                  fontSize: yesButtonSize,
                  padding: `${Math.max(10, yesButtonSize / 4)}px ${Math.max(
                    18,
                    yesButtonSize / 2
                  )}px`,
                }}
                onClick={handleYesClick}
              >
                Yes 💖
              </button>

              <button
                onClick={handleNoClick}
                className="no-button"
                style={noBtnStyle}
              >
                {getNoButtontText()}
              </button>
            </div>
          )}
        </div>

        <div className="footer">
          <span className="tiny">
            {yesPressed
              ? "Now confirm the plan 😏"
              : "Tip: press “No” and watch the mood change 😈"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
