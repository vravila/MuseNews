import React, { Component } from 'react'
import {InfoConsumer} from './context';
import {Link} from 'react-router-dom';

class Info extends Component {
    render() {

    const {
        id,
        headerTitle,
        headerSubTitle,
        headerText,
        img
    } = this.props.item;

        return (
            <InfoConsumer>
                {value => (

                    <div className="col-10 col-lg-3 mx-auto mb-5">
                    <div className="card" style={{ width: '16rem'}}>
                    <img src={img} alt={headerTitle} className="card-img-top"/>

                    <div className="card-body">
                    <h3 className="card-title text-uppecase">{headerTitle}</h3>
                    <h5 className="card-title">{headerSubTitle}</h5>
                    <p className="card-text">{headerText}</p>
                    <Link
                        to={`/${headerTitle}`}
                        className="btn btn-outline-primary text-uppercase"
                    >
                    More Info
                    </Link>
                    </div>

                    </div>
                    </div>


            )}
            </InfoConsumer>
        )
    }
}

export default Info;
