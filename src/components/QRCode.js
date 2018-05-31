import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const QRCode = props => {
  console.log(props);
  return (
    <QRCodeBody>
      <QRAdditionaltext>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem culpa
        cupiditate deserunt dignissimos eaque excepturi facilis modi nisi odio
        praesentium, quae qui quia saepe totam, vel voluptate voluptatibus?
        Reiciendis, repudiandae.
      </QRAdditionaltext>
      <QRImg src={`${props.QRCodeImgSrc}`} />
      <QRAdditionaltext>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      </QRAdditionaltext>
      <QRSecret>{props.secret}</QRSecret>
    </QRCodeBody>
  );
};

QRCode.propTypes = {
  QRCodeImgSrc: PropTypes.string,
  secret: PropTypes.string
};

const mapStateToProps = state => {
  return {
    QRCodeImgSrc: state.authData.QRCodeImgSrc,
    secret: state.authData.secret
  };
};

const mapStateToDispatch = {};

export default connect(mapStateToProps, mapStateToDispatch)(QRCode);

const QRCodeBody = styled.div`
  margin: 0 auto;
  font-family: Helvetica, sans-serif;
  font-size: 11px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.56;
  color: #66688f;
  text-align: center;
`;

const QRImg = styled.img`
  width: 200px;
  height: 200px;
  margin: 10px auto;
`;

const QRSecret = styled.p`
  font-family: Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: 0.6px;
  color: #66688f;
  text-transform: uppercase;
  display: block;
`;

const QRAdditionaltext = styled(QRSecret)`
  font-size: 11px;
`;

