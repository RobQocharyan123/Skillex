import React, { useState, useEffect } from "react";
import "./BetCalculator.css";

const BetCalculator = () => {
  const [eventOdds, setEventOdds] = useState([]);
  const [systemType, setSystemType] = useState("2/3");
  const [totalStake, setTotalStake] = useState(100.0);
  const [eventStatuses, setEventStatuses] = useState([]);
  const [combinationsData, setCombinationsData] = useState([]);
  const [totalWinnings, setTotalWinnings] = useState(0);
  const [combinationsCount, setCombinationsCount] = useState(0);
  const [per, setPer] = useState(0);

  const calculateCombinationsCount = (n, k) => {
    if (k > n) return 0;
    let result = 1;
    for (let i = 0; i < k; i++) {
      result *= (n - i) / (i + 1);
    }
    return Math.round(result);
  };

  useEffect(() => {
    const [, total] = systemType.split("/").map(Number);
    setEventOdds(Array(total).fill(2.0));
    setEventStatuses(Array(total).fill("Correct"));
    setCombinationsCount(
      calculateCombinationsCount(total, parseInt(systemType.split("/")[0]))
    );
  }, [systemType]);

  const handleOddsChange = (index, value) => {
    const newOdds = [...eventOdds];
    newOdds[index] = parseFloat(value);
    setEventOdds(newOdds);
  };

  const handleStatusChange = (index, status) => {
    const newStatuses = [...eventStatuses];
    newStatuses[index] = status;
    setEventStatuses(newStatuses);
  };

  const handleSystemTypeChange = (type) => {
    setSystemType(type);
  };

  const getStatusColorClass = (status) => {
    // debugger
    switch (status) {
      case "Incorrect":
        return "status-incorrect";
      case "Void":
        return "status-void";
      case "Correct":
      default:
        return "status-correct";
    }
  };

  const generateCombinations = (arr, k) => {
    const result = [];
    const recurse = (start, combo) => {
      if (combo.length === k) {
        result.push(combo);
        return;
      }
      for (let i = start; i < arr.length; i++) {
        recurse(i + 1, [...combo, arr[i]]);
      }
    };
    recurse(0, []);
    return result;
  };

  const calculateWinnings = () => {
    const [from, totalEvents] = systemType.split("/").map(Number);
    const combinations = generateCombinations(
      [...Array(totalEvents).keys()],
      from
    );
    const stakePerCombo = totalStake / combinations.length;
    let winningsData = [];
    let totalWinningsAmount = 0;

    combinations.forEach((combination, index) => {
      let productOdds = 1;
      let isWinningCombo = true;
      const comboDetails = combination.map((eventIndex) => ({
        odd: eventOdds[eventIndex],
        status: eventStatuses[eventIndex],
      }));

      combination.forEach((eventIndex) => {
        const status = eventStatuses[eventIndex];
        if (status === "Incorrect") {
          isWinningCombo = false;
        } else if (status === "Void") {
          productOdds *= 1;
        } else if (status === "Correct") {
          productOdds *= eventOdds[eventIndex];
        }
      });

      const comboWinnings = isWinningCombo ? productOdds * stakePerCombo : 0;
      totalWinningsAmount += comboWinnings;

      winningsData.push({
        id: index + 1,
        combination: comboDetails,
        winnings: comboWinnings.toFixed(2),
        stakePerCombo: stakePerCombo.toFixed(2),
      });
    });

    setCombinationsData(winningsData);
    setTotalWinnings(totalWinningsAmount.toFixed(2));
    setPer(stakePerCombo.toFixed(2)); // Set 'per' value only after calculating winnings
  };

  return (
    <div className="bet">
      <h1>System Bet Calculator</h1>
      <div className="parentSelect">
        <div className="select">
          <div className="selectAndH">
            <h2>System</h2>
            <select
              value={systemType}
              onChange={(e) => handleSystemTypeChange(e.target.value)}
              className={"custom-select"}
            >
              {[
                "2/3",
                "2/4",
                "3/4",
                "2/5",
                "3/5",
                "4/5",
                "2/6",
                "3/6",
                "4/6",
                "5/6",
                "2/7",
                "3/7",
                "4/7",
                "5/7",
                "6/7",
                "2/8",
                "3/8",
                "4/8",
                "5/8",
                "6/8",
                "7/8",
                "2/9",
                "3/9",
                "4/9",
                "5/9",
                "6/9",
                "7/9",
                "8/9",
                "2/10",
                "3/10",
                "4/10",
                "5/10",
                "6/10",
                "7/10",
                "8/10",
                "9/10",
                "2/11",
                "3/11",
                "4/11",
                "5/11",
                "6/11",
                "7/11",
                "8/11",
                "9/11",
                "10/11",
                "2/12",
                "3/12",
                "4/12",
                "5/12",
                "6/12",
                "7/12",
                "8/12",
                "9/12",
                "10/12",
                "11/12",
                "2/13",
                "3/13",
                "4/13",
                "5/13",
                "6/13",
                "7/13",
                "8/13",
                "9/13",
                "10/13",
                "11/13",
                "12/13",
                "2/14",
                "3/14",
                "4/14",
                "5/14",
                "6/14",
                "7/14",
                "8/14",
                "9/14",
                "10/14",
                "11/14",
                "12/14",
                "13/14",
                "2/15",
                "3/15",
                "4/15",
                "5/15",
                "6/15",
                "7/15",
                "8/15",
                "9/15",
                "10/15",
                "11/15",
                "12/15",
                "13/15",
                "14/15",
                "2/16",
                "3/16",
                "4/16",
                "5/16",
                "6/16",
                "7/16",
                "8/16",
                "9/16",
                "10/16",
                "11/16",
                "12/16",
                "13/16",
                "14/16",
                "15/16",
              ].map((option) => (
                <option key={option} value={option}>
                  {option.replace("/", " from ")}
                </option>
              ))}
            </select>
          </div>
          <p className="total">
            A system {systemType.replace("/", " from ")} + undefined contains{" "}
            {combinationsCount} combinationsTotal{" "}
          </p>
        </div>
        <div className="ods">
          <div className="enterTotal">
            <h2>Total Stake</h2>
            <input
              type="number"
              value={totalStake}
              onChange={(e) => setTotalStake(e.target.value)}
            />
            <p>EUR</p>
          </div>
          <div className="var">
            {eventOdds.map((odds, index) => (
              <div key={index} className={"odsVariant"}>
                <span>Odds {index + 1}</span>
                <input
                  type="number"
                  step="0.01"
                  value={odds}
                  onChange={(e) => handleOddsChange(index, e.target.value)}
                />
                <label>
                  <select
                    value={eventStatuses[index]}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    className={"custom-select"}
                  >
                    <option value="Correct">Correct</option>
                    <option value="Incorrect">Incorrect</option>
                    <option value="Void">Void</option>
                  </select>
                </label>
              </div>
            ))}
          </div>

          <button onClick={calculateWinnings} className={"calculate"}>
            Calculate
          </button>
        </div>
      </div>

      <div className="parentTotal"></div>

      <div className="result">
        <h1>System Bet Calculator</h1>
        <div className="tableResult">
          {combinationsData.length > 0 && (
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th className="th"></th>
                    <th>Combination</th>
                    <th>Odds</th>
                    {/* <th>Stake per Combination</th> */}
                    <th>Winnings</th>
                  </tr>
                </thead>
                <tbody>
                  {combinationsData.map((combo, index) => (
                    <tr key={index}>
                      <td className="id">{combo.id}</td>
                      <td className="td">
                        {combo.combination.map((c, i) => (
                          <span
                            key={i}
                            className={getStatusColorClass(c.status)}
                          >
                            {c.odd}
                          </span>
                        ))}
                      </td>
                      <td>{combo.stakePerCombo}</td>
                      <td>{combo.winnings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="winning">Winnings: {totalWinnings}</p>
        <p className="per">Stack: {totalStake}</p>
        <p className="per">Stake per combination: {per}</p>
            </div>
          )}
          
        </div>

        
      </div>
    </div>
  );
};

export default BetCalculator;
