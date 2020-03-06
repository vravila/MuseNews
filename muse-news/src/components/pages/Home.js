import React from "react";
import { InfoConsumer } from "../context";
import Info from "./../Info";
import HomeCarousel from "./../HomeCarousel";

function Home() {
  return (
    <div className="outsideContainer">
      <div>
        <HomeCarousel></HomeCarousel>
      </div>
      <div className="container">
        <div className="row mt-5">
          <InfoConsumer>
            {value => {
              return value.info.map(item => {
                return <Info key={item.id} item={item} />;
              });
            }}
          </InfoConsumer>
        </div>
      </div>
    </div>
  );
}

export default Home;
