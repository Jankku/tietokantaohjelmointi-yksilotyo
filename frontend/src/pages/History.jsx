import React from 'react';
import { useQuery } from 'react-query';
import { getEditHistory } from '../remote';

const History = () => {
    const { isLoading, isError, data, error } = useQuery(['getEditHistory'], getEditHistory);

    return (<main className="content-history">
        {isLoading ? (<p className="text-bold">Loading...</p>) : null}
        {isError ? <p className="text-bold">Error: {error.message}</p> : null}
        <table>
            <thead>
            <tr>
                <th>Title ID</th>
                <th>Old title</th>
                <th>New title</th>
                <th>Update time</th>
            </tr>
            </thead>
            <tbody>
            {data ? data.map((historyItem, index) => (<tr key={index}>
                <td>{historyItem.title_id}</td>
                <td>{historyItem.old_title}</td>
                <td>{historyItem.new_title}</td>
                <td>{historyItem.update_time}</td>
            </tr>)) : <></>}
            </tbody>
        </table>
    </main>);
};

export default History;
