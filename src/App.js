import "./styles.css";
import { useEffect, useState } from "react";
import { tenureData } from "./utils/constants";

export default function App() {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  const updateEMI = (e) => {
    if (!cost) return;

    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));

    //Calculate the EMI and Update it

    const emi = calculateEMI(dp);
    setEmi(emi);
  };

  const updateDownpayment = (e) => {
    if (!cost) return;

    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));

    //Calculate the DP and Update it

    const dp = calculateDP(emi);
    setDownPayment(dp);
  };

  const calculateEMI = () => {
    if (!cost) return;

    const loanAmt = cost - downPayment;
    const rateOfInterest = interest / 100;
    const numOfYears = tenure / 12;

    const EMI =
      (loanAmt * rateOfInterest * (1 + rateOfInterest) ** numOfYears) /
      ((1 + rateOfInterest) ** numOfYears - 1);

    return Number(EMI / 12).toFixed(0);
  };

  const calculateDP = (emi) => {
    if (!cost) return;

    const downPaymentPercent = 100 - (emi / calculateEMI(0)) * 100;
    return Number((downPaymentPercent / 100) * cost).toFixed(0);
  };

  useEffect(() => {
    if (!(cost > 0)) {
      setDownPayment(0);
      setEmi(0);
    }

    const emi = calculateEMI(downPayment);
    setEmi(emi);
  }, [tenure]);

  return (
    <div className="App">
      <span className="title" style={{ fontSize: 30, marginTop: 10 }}>
        EMI Calculator
      </span>

      <span className="title">Total cost of Asset</span>

      <input
        type="number"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        placeholder="Total cost of Assets"
      />

      <span className="title">Interest Rate in % </span>

      <input
        type="number"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
        placeholder="Interest Rate in %"
      />

      <span className="title">Processing Fee in % </span>

      <input
        type="number"
        value={fee}
        onChange={(e) => setFee(e.target.value)}
        placeholder="Processing Fee in %"
      />

      <span className="title">Down Payment</span>
      <span className="title" style={{ textDecoration: "underline" }}>
        {" "}
        Total Down Payment -{" "}
        {(Number(downPayment) + (cost - downPayment) * (fee / 100)).toFixed(0)}
      </span>
      <div>
        <input
          type="range"
          min={0}
          max={cost}
          className="slider"
          value={downPayment}
          onChange={updateEMI}
        />
        <div className="lables">
          <lable>0%</lable>
          <b>{downPayment}</b>
          <lable>100%</lable>
        </div>
      </div>

      <span className="title">Loan per month</span>
      <span className="title" style={{ textDecoration: "underline" }}>
        {" "}
        Total Loan Amount - {(emi * tenure).toFixed(0)}
      </span>
      <div>
        <input
          type="range"
          min={calculateEMI(cost)}
          max={calculateEMI(0)}
          className="slider"
          value={emi}
          onChange={updateDownpayment}
        />
        <div className="lables">
          <lable>{calculateEMI(cost)}</lable>
          <b>{downPayment}</b>
          <lable>{calculateEMI(0)}</lable>
        </div>
      </div>

      <span className="title">Tenure</span>
      <div className="tenurecontainer">
        {tenureData.map((t) => {
          return (
            <button
              className={`tenure ${t === tenure ? "selected" : ""}`}
              onClick={() => setTenure(t)}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}
