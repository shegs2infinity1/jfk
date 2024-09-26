import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
    const [biodataList, setBiodataList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8000/api/users/biodata/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBiodataList(response.data);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Client Biodata List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {biodataList.map((biodata) => (
                        <tr key={biodata.id}>
                            <td>{biodata.id}</td>
                            <td>{biodata.name}</td>
                            <td>{biodata.age}</td>
                            <td>{biodata.gender}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;
