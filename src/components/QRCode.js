import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const QRCode = (props) => {
    console.log(props);
    return(
        <QRCodeBody>
            <QRImg src={`${props.dataURL}`}/>
            <QRSecret>{props.secret}</QRSecret>
        </QRCodeBody>
    )
};

QRCode.propTypes = {
    dataURL: PropTypes.string,
    secret: PropTypes.string
};

const mapStateToProps = (state) => {
    return{
        dataURL: state.authData.qrCodeImgSrc,
        secret: state.authData.secret
    }
};

const mapStateToDispatch = {

};

export default connect(mapStateToProps, mapStateToDispatch)(QRCode);

const QRCodeBody = styled.div`
  margin: 0 auto;
`;

const QRImg = styled.img`
  width: 200px;
  height: 200px;
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