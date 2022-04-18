import React, { useState } from 'react';

const Table = ({ data }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Customer</th>
                    <th>Month</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(data).map(item => {
                const dataByMonth = data[item];
                return dataByMonth.map(item => {
                    const { name, month, points} = item;
                    return (
                        <tr key={item}>
                           <td>{name}</td>
                           <td>{month}</td>
                           <td>{points}</td>
                        </tr>
                       )})
                })
                }
                
            </tbody>
        </table>
    )
}

export default Table;