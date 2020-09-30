import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getGameList } from '../actions/gameListActions';

import GamePreviewCard from './GameComponents/GamePreviewCard';


class Title extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.dispatch(getGameList())
    }

    render(){
        const games = this.props.gamesList
        console.log(this.props.gamesList)
        //console.log(games)
        return(
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                            {
                                Object.values(games).map((game) => {
                                    return <GamePreviewCard game={game} key={game.id}/>
                                })
                            }
                    </div>
                </div>
            </div>

        )
    }
}



function mapStateToProps(state){
    return{
        gamesList: state.gameListReducer.games
    }
}


export default connect(mapStateToProps)(Title)