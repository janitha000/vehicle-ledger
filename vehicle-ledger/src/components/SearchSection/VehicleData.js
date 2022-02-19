import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { VechicleContext } from '../../context/VehicleContext';
import { API_URL } from '../../utils/constants';

const VechicleData = ({ isOpen, reRender }) => {
    const { state: { selectedVehicle }, dispatch } = React.useContext(VechicleContext);

    const onDelete = async () => {
        await fetch(`${API_URL}/vehicles/${selectedVehicle.id}`, { method: 'DELETE' });
        reRender();
    }

    if (!isOpen || selectedVehicle == null) return (<></>)
    return (
        <Card sx={{ maxWidth: 400, minWidth: 350 }}>
            <CardMedia
                component="img"
                height="140"
                image="https://www.toyota.lk/wp-content/uploads/2017/03/hhhh_114.jpg"
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {selectedVehicle.number}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    User name: {selectedVehicle.name}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Phone: {selectedVehicle.phone}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Model : {selectedVehicle.model}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => onDelete()}>Delete</Button>
            </CardActions>
        </Card>

    );
}

export default VechicleData;