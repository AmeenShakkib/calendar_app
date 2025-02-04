import React,{useState} from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './birthdayList.css';

const BirthdayList= ()=>{
    const [peoples,setPeoples]=useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/birthdays/get_birthdays');
                setPeoples(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            <h1>Birthday List:</h1>
            <div className='birthdayList'>
                {peoples.map((people) => {
                    return (
                        <div className='entry' key={people._id}>
                            <h3>Name: {people.name}</h3>
                            <h3>Date of Birth: {people.dob.substring(0, 10)}</h3>
                            <button>Delete</button>
                            <button>Edit</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default BirthdayList;

