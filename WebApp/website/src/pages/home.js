import logo from '../logo.png';
import './styles/home.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const API_URL = 'https://cors-anywhere.herokuapp.com/https://sightsaver-api.azurewebsites.net/api';

export const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }

}

const logout = async () => {
    axios.defaults.headers.common['Authorization'] = '';
}

const onExport = async () => {
    console.log(config);
    try { 
        const result = await axios.get(`${API_URL}/sensor/exportToExcel`, config);
        axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;
        return result;
    } catch (error) {
        console.log(error);
    }
}

function Home() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/'); // Redirect to login page after logout
    }

    const exportData = async () => {
        const result = await onExport();
        if (result) {
            alert("Export Success");
        } else {
            alert('Export failed');
        }
    }

    return (
        <div className="Home">
        <div className="Home-header">
            <img src={logo} className="Home-logo" alt="logo" />
            <div className="Home-title">
                <button className='Login-button' onClick={exportData}>
                    <p className='button-text'>
                        Export Data
                    </p>
                </button>
                <button className='Login-button' onClick={handleLogout}>
                    <p className='button-text'>
                        Sign Out
                    </p>
                </button>
            </div>
        </div>
        </div>
    );
}

export default Home;