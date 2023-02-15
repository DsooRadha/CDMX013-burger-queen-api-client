import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';
import { pink } from '@mui/material/colors';

 export const MessageError = ({ message }) => {
    return (
        <div className='error'>
            <p><ReportProblemRoundedIcon sx={{ color: pink[500] }}
                className='iconoError' />
                <b>Error: </b>{message}</p>
        </div>
    )
};