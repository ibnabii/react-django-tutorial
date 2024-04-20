import React, {useState, useEffect} from 'react';
import {useParams, Link, useNavigate} from "react-router-dom";
import {Grid, Button, Typography} from "@material-ui/core";


export default function Room({leaveRoomCallback}) {
    const {roomCode} = useParams();
    const navigate = useNavigate();
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);

    useEffect(() => {
        fetch("/api/get-room/?code=" + roomCode)
            .then(response => {
                if (!response.ok) {
                    leaveRoomCallback();
                    navigate("/");
                }
                return response.json();
            })
            .then(data => {
                setVotesToSkip(data.votes_to_skip);
                setGuestCanPause(data.guest_can_pause);
                setIsHost(data.is_host);
            })
            .catch(error => {
                console.error('Error fetching room details:', error);
            });
    }, [roomCode]);

    const leaveButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
        }
        fetch("/api/leave-room/", requestOptions).then((_response) => {
            leaveRoomCallback();
            navigate("/");
        });
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Code: {roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Votes: {votesToSkip}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Guest Can Pause: {guestCanPause.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Host: {isHost.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>
                    Leave Room
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
            </Grid>
            <Grid item xs={12} align="center">
            </Grid>
        </Grid>
        // <div>
        //     <h3>{roomCode}</h3>
        //     <p>Votes: {votesToSkip}</p>
        //     <p>Guest Can Pause: {guestCanPause.toString()}</p>
        //     <p>Host: {isHost.toString()}</p>
        // </div>
    )
}