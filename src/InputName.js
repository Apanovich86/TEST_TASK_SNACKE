import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class InputName extends Component {
    state = {
        player: '',
    };

    handleChange = (event) => {
        const input = event.target;
        const value = input.type === 'checkbox' ? input.checked : input.value;

        this.setState({[input.name]: value});
    };

    handleFormSubmit = () => {
        const {player} = this.state;
        localStorage.setItem('player', player);

    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="name-player">
                        <label>
                            <input placeholder="Enter name" name="player" value={this.state.player}
                                   onChange={this.handleChange}/>
                        </label>
                        <div>
                            <button type="submit">Save name</button>
                        </div>

                        <Link to="/game">
                            <button>Play game</button>
                        </Link>
                    </div>
                </form>
            </div>

        );
    }
}