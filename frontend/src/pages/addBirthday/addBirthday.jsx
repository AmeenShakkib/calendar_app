import React, { useState,useEffect } from 'react';
import './addBirthday.css';
import axios from 'axios';
import Navbar from '../../components/navbar/navbar.jsx';

const AddBirthday = () => {
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [peoples,setPeoples]=useState([]);

    const handleSearch = (e) => {
        filteredPeoples(e.target.value);
    };

    const filteredPeoples = (searchTerm) => {
        if(searchTerm !== '') {
        const filtered = peoples.filter(people =>
            people.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setPeoples(filtered);
        }
        else{    
            const fetchData = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/api/birthdays/get_birthdays');
                    setPeoples(response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
    };

    const handleEdit = (id) => {
        const editBirthday = async (id, new_dob) => {
            try {
                const response = await axios.put(`http://localhost:5000/api/birthdays/update/${id}`, {
                    dob: new_dob,
                });
                if (response.status === 200) {
                    alert('Birthday updated successfully.');
                    const response = await axios.get('http://localhost:5000/api/birthdays/get_birthdays');
                    setPeoples(response.data);
                } else {
                    alert('Failed to update birthday.');
                }
            } catch (error) {
                console.error('Error updating birthday:', error);
                alert('Something went wrong!');
            }
        };
        const new_dob = window.prompt('Enter the new dob in yyyy-mm-dd format:', '');
        if (new_dob) {
            editBirthday(id, new_dob);
        }
    };

    const deletebirthday = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/birthdays/delete/${id}`);
            if (response.status === 200) {
                setPeoples(peoples.filter(people => people._id !== id));
                alert('Birthday deleted successfully.');
            } else {
                alert('Failed to delete birthday.');
            }
        } catch (error) {
            console.error('Error deleting birthday:', error);
            alert('Something went wrong!');
        }
        }

    const handleAddBirthday = async () => {
        if (!name || !dob) {
            alert('Please fill in all fields.');
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/api/birthdays/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, dob }),
            });
            const data = await response.json();
            if (response.ok) {
                alert("Birthday added successfully.");
                setName('');
                setDob('');
            } else {
                alert('Failed to add birthday.');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong!');
        }
    };

    const find_closest_birthday = () => {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentDate = today.getDate();
        const currentYear = today.getFullYear();
        let closestDate = new Date(currentYear, 11, 31);
        let closestPerson = null;
        peoples.forEach((person) => {
            const dob = new Date(person.dob);
            const dobMonth = dob.getMonth();
            const dobDate = dob.getDate();
            if (dobMonth > currentMonth || (dobMonth === currentMonth && dobDate >= currentDate)) {
                if (dob < closestDate) {
                    closestDate = dob;
                    closestPerson = person;
                }
            }
        });
        if (closestPerson) {
            alert(`The closest birthday is ${closestPerson.name}'s on ${closestPerson.dob.substring(0, 10)}.`);
        } else {
            alert('No upcoming birthday this year.');
        }
    };


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
            <Navbar />
            <div className='content'>
                <div className='addBirthday'>
                    <h1>Add a Birthday :</h1>
                    <input
                        type='text'
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type='date'
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                    />
                    <button onClick={async () => {
                        await handleAddBirthday();
                        const response = await axios.get('http://localhost:5000/api/birthdays/get_birthdays');
                        setPeoples(response.data);
                    }}>Add</button>
                </div>
            </div>
            <div>
                <div style={{ display: 'flex', flexFlow: 'row wrap',alignItems:'center',justifyContent:'space-between' }}> 
                <h1>Birthday List : </h1>
                <input type='text' placeholder='Search' style={{ height: '40px' }} onChange={(e)=>{handleSearch(e);}}/>
               </div>
            <div className='birthdayList'>
                {peoples.map((people) => {
                    return (
                        <div className='entry' key={people._id}>
                            <h3>Name: {people.name}</h3>
                            <h3>Date of Birth: {people.dob.substring(0, 10)}</h3>
                            <button onClick={() => deletebirthday(people._id)}>Delete</button>
                            <button onClick={() => handleEdit(people._id)}>Edit</button>
                        </div>
                    );
                })}
            </div>
            </div>
            <br>
            </br>
            <div className="closest_birthday">
                <button onClick={find_closest_birthday}>Find the closest Birthday</button>
            </div>
        </div>
    );
};

export default AddBirthday;
