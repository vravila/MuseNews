import React, {Component} from 'react';
import {placeInfo, reviews, detailInfo, news} from './../data';

const InfoContext = React.createContext();

class InfoProvider extends Component {

    state = {
        info: placeInfo,
        reviews: reviews,
        detailInfo: detailInfo,
        news: news,
    }

    render() {
        return(
            <InfoContext.Provider value={{
                info: this.state.info,
                reviews: this.state.reviews,
                detailInfo: this.state.detailInfo,
                headerTitle: this.state.news,
                headerSubTitle: this.state.headerSubTitle,
                headerText: this.state.headerText,
                news: this.state.news,
                name: this.state.name

            }}>
                {this.props.children}
            </InfoContext.Provider>
        );
    }
}

const InfoConsumer = InfoContext.Consumer;

export { InfoProvider , InfoConsumer }; 