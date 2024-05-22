import logo from '../logo.png';
import './styles/home.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from './login';

export const API_URL = 'https://sightsaver-api.azurewebsites.net/api';

const setupAxiosInterceptors = async () => {
    const TOKEN_KEY = await getToken();
    console.log(`Token set: ${TOKEN_KEY}`);
    const config = {
        headers: {
            Authorization: `Bearer ${TOKEN_KEY}`
        },
        responseType: 'blob' // Set the response type to blob
    }
    return config;
}

const onExport = async () => {
    try {
        const config = await setupAxiosInterceptors();
        const result = await axios.get(`${API_URL}/sensor/exportToExcel`, config);

        // Create a blob from the response data
        const url = window.URL.createObjectURL(new Blob([result.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));

        // Create a link element and trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'exported_data.xlsx'); // Set the file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up the link element

        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const logout = async () => {
    // delete axios.defaults.headers.common['Authorization'];
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
            console.log(result.data);
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
