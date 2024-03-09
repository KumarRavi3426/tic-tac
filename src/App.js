import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from 'react-router-dom';
import "./App.css";

function App() {
  let [count, setCount] = useState(0);
  let [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  let [hover, setHover] = useState("X");
  let [winCombo, setWinCombo] = useState([]);
  let [lock, setLock] = useState(false);
  let spanline = document.getElementById("spanline");
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const notify = (data) => toast(`${data} won`);
  // const navigate = useNavigate();

  // checkWon
  const checkWon = () => {
    if (data[0] === data[1] && data[1] == data[2] && data[2] != "") {
      setWinCombo([0, 1, 2]);
      won(data[2]);
    } else if (data[3] === data[4] && data[4] == data[5] && data[5] != "") {
      setWinCombo([3, 4, 5]);
      won(data[5]);
    } else if (data[6] === data[7] && data[7] == data[8] && data[8] != "") {
      setWinCombo([6, 7, 8]);
      won(data[8]);
    } else if (data[0] === data[3] && data[3] == data[6] && data[6] != "") {
      setWinCombo([0, 3, 6]);

      won(data[6]);
    } else if (data[1] === data[4] && data[4] == data[7] && data[7] != "") {
      setWinCombo([1, 4, 7]);

      won(data[7]);
    } else if (data[2] === data[5] && data[5] == data[8] && data[8] != "") {
      setWinCombo([2, 5, 8]);

      won(data[8]);
    } else if (data[0] === data[4] && data[4] == data[8] && data[8] != "") {
      setWinCombo([0, 4, 8]);

      won(data[8]);
    } else if (data[2] === data[4] && data[4] == data[6] && data[6] != "") {
      setWinCombo([2, 4, 6]);

      won(data[6]);
    }
  };
  //toggle
  const toggle = (e, num) => {
    if (lock) {
      return 0;
    }
    if (data[num] !== "") {
      return 0;
    }

    if (count % 2 == 0) {
      data[num] = "X";
      setHover("O");
      setCount(++count);
    } else {
      data[num] = "O";
      setHover("X");
      setCount(++count);
    }
    checkWon();
  };

  //won
  const won = (data) => {
    notify(data);
    setLock(true);
    setHover("");
    spanline.innerHTML = `${data} won`;
  };

  //reset
  function reset() {
    setData(["", "", "", "", "", "", "", "", ""]);
    setHover("X")
    setLock(false)
    setWinCombo([])
    spanline.innerHTML = `Tic tac toe in <span>React</span>`;
    // navigate("/")
  }

  return (
    <div className="App">
      <ToastContainer />
      <div className="title">
        <h1 id="spanline">
          Tic tac toe in <span>React</span>
        </h1>
      </div>
      <div className="board">
        {arr.map((value) => {
          return (
            <div
              key={value}
              className={`box ${winCombo.find((val) => val === value) !== undefined ? "wc" : ""
                } `}
              onClick={(e) => {
                toggle(e, value);
              }}
            >
              <p className={`${data[value] === "" ? "hov" : ""}`}>
                {data[value] === "" ? hover : data[value]}
              </p>
            </div>
          );
        })}
      </div>
      <div className="reset">
        <p onClick={reset}>Reset</p>
      </div>
    </div>
  );
}

export default App;
