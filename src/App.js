import React, { useState, useEffect } from 'react';
import TableByMonth from './components/tablebymonth';
import TableByCustomer from './components/tablebycustomer';
import './App.css';

function App() {
  const [data, setData] = useState('');
  const [dataError, setDataError] = useState('');
  console.log(data, 'data')
  
  const transformData = (data) => {
    console.log(data, 'calculate')
    const pointsPerTransaction = data.map(item => {
      let points = 0;
      let amount = item.amt;
      if (amount > 100) {
        points = (amount - 100) * 2;
      }
      if (amount > 50) {
        points += 50;
      }
      const month = new Date(item.createdAt).getMonth() + 1;
      return {...item, points, month}
    });
    console.log(pointsPerTransaction,'poinstst')
    let customerByMonth = {};
    let totalCustomer = {};
    pointsPerTransaction.forEach(item => {
    let {useId, name, points, month} = item;
    if(!totalCustomer[useId]) {
      totalCustomer[useId] = {[name]: 0};
    }
    totalCustomer[useId][name] += points;
    if (!customerByMonth[useId]) {
      customerByMonth[useId] = [];
    }
    if (!customerByMonth[useId][month]) {
      customerByMonth[useId][month] = {
        useId,
        name,
        points,
        month
      }
    } else {
      customerByMonth[useId][month].points += points;
    }
  })
  console.log(customerByMonth);
  return {customerByMonth, totalCustomer};
  }
  
  useEffect(() => {
    fetch("http://localhost:8000/read")
    .then(res => res.json())
    .then(res => transformData(res.data))
    .then(res => setData(res))
    .catch(err => setDataError(err))
  }, [])

  const {customerByMonth, totalCustomer} = data;
  if (dataError) return (<div>{dataError}</div>)
  if (!data) return null;
  return (
    <div className="App">
     <TableByMonth data={customerByMonth}/>
     <TableByCustomer data={totalCustomer}/>
    </div>
  );
}

export default App;
