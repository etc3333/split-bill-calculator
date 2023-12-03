import '../styles/BillSplit.css';

import { useState } from 'react';

const BillSplit = () => {

  const [inputs, setInputs] = useState({
    splitNumber: '',
    tip: '',
    salesTax: '',
  });
  const [individualDetail, setIndividualDetail] = useState(null);
  const [totalPeoplePayed, setTotalPeoplePayed] = useState(null);
  const [totalBill, setTotalBill] = useState(null);
  const [totalSalesTax, setTotalSalesTax] = useState(null);
  const [totalTip, setTotalTip] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = () => {
    let eachPersonPayedArray = [];
    let eachPersonPayedSum = 0;
    let totalBillSum = 0;
    let salesTaxDecimal = parseFloat(inputs.salesTax)/100;

    if (inputs.splitNumber === '' || inputs.tip === '' || inputs.salesTax === '') {
      alert('Please enter all values');
      return;
    }
    for (let i = 0; i < inputs.splitNumber; i++) {
      if (inputs[`${i+1}`] === '') {
        alert('Please enter all values');
        return;
      }
      let inputNumber = parseFloat(inputs[`${i+1}`]);

      eachPersonPayedSum += inputNumber;
      totalBillSum += inputNumber*(salesTaxDecimal+1);
      eachPersonPayedArray.push({
        purchaseAmount: inputNumber,
        salesTaxIndiv: inputNumber*salesTaxDecimal,
        sharedTip: parseFloat(inputs.tip)/parseFloat(inputs.splitNumber),
        totalPayment: inputNumber + inputNumber*salesTaxDecimal + parseFloat(inputs.tip)/parseFloat(inputs.splitNumber)
      });
    }       
    setTotalTip(inputs.tip);
    setTotalPeoplePayed(eachPersonPayedSum);
    setTotalBill(totalBillSum+ parseFloat(inputs.tip));
    setTotalSalesTax(eachPersonPayedSum*salesTaxDecimal);
    setIndividualDetail(eachPersonPayedArray);
    setShowResult(true);
  }

  let splitBoxes = [];
  for (let i = 0; i < inputs.splitNumber; i++) {
    splitBoxes.push(
      <div key={i}>
        <label>
          {i+1}
          <input type='number' name={`${i+1}`} value={inputs[`${i+1}`] || ''} placeholder='$' onChange={handleChange} />
        </label>
      </div>
    )
  }

  if (showResult === false) {
    return (
      <div id='billSplit-container'>
        <div id='innerBox'>
          <label>
            # of split
            <input type='text' name='splitNumber' value={inputs.splitNumber || ''} placeholder='integer' onChange={handleChange} />
          </label>
          <label>
            Tip
            <input type='text' name='tip' value={inputs.tip || ''} placeholder='$' onChange={handleChange} />
          </label>
          <label>
            Sales Tax (percentage)
            <input type='text' name='salesTax' value={inputs.salesTax || ''} placeholder='%' onChange={handleChange} />
          </label>
          {splitBoxes}
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    )
  }
  else {
    return (
      <div id='billSplit-container'>
        <div id='innerBox'>
          <div>Total People Payed: ${totalPeoplePayed}</div>
          <div>Total Bill (includes tip): ${totalBill}</div>
          <div>Total Sales Tax: ${totalSalesTax}</div>
          <div>Tip: ${totalTip}</div>
          <button onClick={() => setShowResult(false)}>Submit</button>

          {
            individualDetail.map((object,index) => {
              return (
                <div key={index}>
                  {index+1}
                  <div>
                    Purchase Amount: ${object.purchaseAmount}
                  </div>
                  <div>
                    Sales Tax Individual: ${object.salesTaxIndiv}
                  </div>
                  <div>
                    Shared Tip: ${object.sharedTip}
                  </div>
                  <div>
                    This person total part of entire bill: ${object.totalPayment}
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
};

export default BillSplit;