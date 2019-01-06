import React from "react";
import { Alert } from "reactstrap";

const Header = props => {
  const {basecurrency, currency, rate, lasttimeupdate_date} = this.props;
  return (
    <h4>
      <Alert color="secondary">
        $1 {props.basecurrency} = {props.currency} : ${props.rate} - 
        Last Time Update Date: {props.lasttimeupdate_date}
      </Alert>
    </h4>
  );
};

Header.defaultProps = {
  basecurrency: "",
  currency: "",
  rate: "",
  lasttimeupdate_date: "",
}

export default Header;
