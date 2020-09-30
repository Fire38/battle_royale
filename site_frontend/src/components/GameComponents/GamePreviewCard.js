import React from 'react';


const GamePreviewCard = (props) => {
    return(
        <div className="card mt-3" id="preview-game-card">
            <div className="card-header" id="preview-game-header">
                { props.game.name }
            </div>
            <div className="card-body" id="preview-game-body">
                <h5 className="card-title">{ props.game.date }</h5>
                Автор <p className="card-text">{ props.game.author[0].username }</p>
                <a href="#" className="btn btn-primary">Войти в игру</a>
            </div>
        </div>
    )
}


export default GamePreviewCard;