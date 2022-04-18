import React, { useState } from 'react';

const Table = ({ data }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Customer</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(data).map(item => {
                    const dic = data[item];
                    const [name] = Object.keys(dic);
                return (
                 <tr key={item}>
                    <td>{name}</td>
                    <td>{dic[name]}</td>
                 </tr>
                )
                 
                }
                )}
                
            </tbody>
        </table>
    )
}

export default Table;