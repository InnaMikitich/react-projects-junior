import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('BYN');
  const [toCurrency, setToCurrency] = React.useState('USD');
  //const [rates, setRates] = React.useState({});
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(1);

  const ratesRef = React.useRef({});
  React.useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
    .then(res => res.json())
    .then((json) => {
      //setRates(json.rates);
      ratesRef.current = json.rates;
      onChangeToPrice(1);
      
    }).catch(err => {
      console.warn(err);
      alert('Не удалось получить данные');
    });
  }, []);

  const onChangeFromPrice = (value) => {
    if (ratesRef.current[fromCurrency] && ratesRef.current[toCurrency]) {
      const price = value / ratesRef.current[fromCurrency];
      const result = price * ratesRef.current[toCurrency];
      setFromPrice(value);
      setToPrice(result.toFixed(3));
    }
  };
  const onChangeToPrice = (value) => {
    if (ratesRef.current[fromCurrency] && ratesRef.current[toCurrency]) {
      const price = value / ratesRef.current[toCurrency];
      const result = price * ratesRef.current[fromCurrency];
      setToPrice(value);
      setFromPrice(result.toFixed(3));
    }
  };

 React.useEffect(() => {
  onChangeFromPrice(fromPrice);
 }, [fromCurrency]);

 React.useEffect(() => {
  onChangeToPrice(toPrice);
 }, [toCurrency]);

  return (
    <div className="App">
     
      <Block 
        value={fromPrice}
        currency={fromCurrency} 
        onChangeCurrency={setFromCurrency} 
        onChangeValue={onChangeFromPrice}
        
        />
      <Block 
        value={toPrice} 
        currency={toCurrency} 
        onChangeCurrency={setToCurrency} 
        onChangeValue={onChangeToPrice}
        />
    </div>
  );
}

export default App;