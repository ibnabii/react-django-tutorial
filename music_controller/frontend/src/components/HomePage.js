import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from "react-router-dom";
import {Grid, Button, ButtonGroup, Typography} from "@material-ui/core";

import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";

export default function HomePage() {
    const [roomCode, setRoomCode] = useState(null);

    useEffect(() => {
        fetch("/api/user-in-room/")
            .then((response) => response.json())
            .then((data) => {
                setRoomCode(data.code);
            })
            .catch((error) => {
                console.error('Error fetching user room code:', error);
            });
    }, []);

    const clearRoomCode = () => setRoomCode(null);

    const checkRoomCode = () => {
        fetch("/api/user-in-room/")
            .then((response) => response.json())
            .then((data) => {
                setRoomCode(data.code);
            })
            .catch((error) => {
                console.error('Error fetching user room code:', error);
            });
    }

    const renderHomePage = () => {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" component="h3">
                        House Party
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" to="/join" component={Link}>
                            Join a Room
                        </Button>
                        <Button color="secondary" to="/create" component={Link}>
                            Create a Room
                        </Button>
                    </ButtonGroup>
                </Grid>
                <Grid item xs={12} align="center">
                </Grid>
            </Grid>
        );
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={roomCode ? <Navigate to={`/room/${roomCode}`}/> : renderHomePage()}
                />
                <Route path="/join/:roomId?" element={<RoomJoinPage/>}/>
                <Route path="/create" element={<CreateRoomPage checkRoomCallback={checkRoomCode}/>}/>
                <Route
                    path="/room/:roomCode"
                    element={roomCode ? <Room leaveRoomCallback={clearRoomCode}/> : <Navigate to="/"/>}/>
            </Routes>
        </Router>
    );
}
