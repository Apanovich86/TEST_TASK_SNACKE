import React, {useEffect, useState} from 'react';
import {getPlayers} from "./services/playerService";
import Player from "./player";

export default function Players() {
    let [players, setPlayers] = useState([]);
    useEffect(() => {
        getPlayers().then(value => setPlayers([...value]));
    }, []);
    return (
        <div>{
            players.map(value => <Player item={value} key={value.id}/>)
        }
        </div>
    );
}