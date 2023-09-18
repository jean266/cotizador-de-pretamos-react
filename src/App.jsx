
import { useState, useEffect } from "react";
import Header from "./components/Header"
import Buttons from "./components/Buttons";
import { formatMoney, calculateTotalPay } from "./helpers";

function App() {
  const [ amount, setAmount ] = useState(10000000);
  const [ months, setMonths] = useState(6);
  const [total, setTotal] = useState(0);
  const [pay, setPay] = useState(0);

  useEffect(() => {
    // Calcular el total a pagar
    setTotal(calculateTotalPay(amount, months));
  }, [amount, months, total]);
  
  useEffect(() => {
    // Calcular el pago mensual
    setPay(total / months);
  }, [total, months]);

  const MIN = 1000000;
  const MAX = 20000000;
  const STEP = 100000;

  function handleChage (e) {
    setAmount(+e.target.value);
  }

  function handleClickDecrement () {
    const value = amount - STEP;
    if(value < MIN) {
      alert("Cantidad no valida");
      return;
    }
    setAmount(value);
  }

  function handleClickIncrement () {
    const value = amount + STEP;
    if(value > MAX) {
      alert("Cantidad no valida");
      return;
    }
    setAmount(value);
  }

  return (
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
      < Header />

      <div className="flex justify-between my-6">
        <Buttons 
          operator="-"
          handleClick={handleClickDecrement}
          />
        <Buttons 
          operator="+"
          handleClick={handleClickIncrement}
        />
      </div>

      <input 
        type="range" 
        className="w-full h6 bg-gray-200 accent-lime-500 hover:accent-lime-600"
        onChange={handleChage}
        min={MIN}
        max={MAX}
        step={STEP}
        value={amount}
      />

      <p className="text-center my-10 text-5xl font-extrabold text-indigo-600">
        {formatMoney(amount)}
      </p>

      <h2 className="text-2xl font-extrabold text-gray-500 text-center">
        Elige un <span className="text-indigo-600">Plazo </span>a pagar
      </h2>

      <select 
        className="mt-5 w-full p-2 bg-white border border-gray-300 text-center rounded text-xl font-bold text-gray-500" 
        value={months}
        onChange={ e => setMonths(+e.target.value)}
      >
        <option value="6">6 Meses</option>
        <option value="12">12 Meses</option>
        <option value="24">24 Meses</option>
      </select>

      <div className="my-5 space-y-3 bg-gray-50 p-5">
        <h2 className="text-2xl font-extrabold text-gray-500 text-center">
          Resumen <span className="text-indigo-600">de pagos</span>
        </h2>

        <p className="text-xl text-gray text-gray-500 text-center font-bold">{months} Meses</p>
        <p className="text-xl text-gray text-gray-500 text-center font-bold">{formatMoney(total)} Total a pagar</p>
        <p className="text-xl text-gray text-gray-500 text-center font-bold">{formatMoney(pay)} Mensuales</p>
      </div>
    </div>
  )
}

export default App
