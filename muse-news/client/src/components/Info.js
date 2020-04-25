import React, { Component } from "react";
import { InfoConsumer } from "./context";
import { Link } from "react-router-dom";

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
            <div className="card" style={{ width: "20rem", height: "30rem" }}>
              <img
                src={img}
                alt={headerTitle}
                className="card-img-top center-block"
                style={{ width: "19rem", height: "15rem" }}
              />
              
            
              <div className="card-body">
                <h3 className="card-title text-uppecase">{headerTitle}</h3>
                <h5 className="card-title">{headerSubTitle}</h5>
                <p className="card-text">{headerText}</p>
                
                {(() => {
                      switch (headerTitle) {
                        case "About":   
                            return <Link
                            to={`About/1`}
                            className="btn btn-outline-primary text-uppercase"
                          >
                            More Info
                          </Link>
                        case "Songs":   
                          return <Link
                            to={`/Songs/splash/none/rank/none/none/none/none/none/none/none/1`}
                            className="btn btn-outline-primary text-uppercase"
                          >
                            More Info
                          </Link>
                        case "News":    
                          return <Link
                          to={`/News`}
                          className="btn btn-outline-primary text-uppercase"
                        >
                          More Info
                        </Link>
                        case "Artists": 
                        return <Link
                        to={`/Artists/splash/none/rank/false/none/none/none/none/1`}
                        className="btn btn-outline-primary text-uppercase"
                       >
                        More Info
                      </Link>
                        default:        
                        return <Link
                        to={`/test`}
                        className="btn btn-outline-primary text-uppercase"
                      >
                        More Info
                      </Link>
                      }
                    })()}
                {/* <Link
                  to={`/${path}`}
                  className="btn btn-outline-primary text-uppercase"
                >
                  More Info
                </Link>
                 */}
              </div>
            </div>
          </div>
        )}
      </InfoConsumer>
      
    );

    

    function getPath({ headerTitle }) {
      
      switch (headerTitle) {
        case "About":   return "About/1";
        case "Songs":   return"Songs/splash/none/rank/none/none/none/none/none/none/none/1";
        case "News":    return "News";
        case "Artists": return "Artists/splash/none/rank/false/none/none/none/none/1";
        default:        return "test";
      }

    }
  }
}

export default Info;
