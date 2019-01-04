import React from "react";
import { Alert } from "reactstrap";

const Header = props => {
  return (
    <h4>
      <Alert color="secondary">
        $1 {props.basecurrency} = {props.currency} : ${props.rate} - 
        Last Time Update Date: {props.lasttimeupdate_date}
      </Alert>
    </h4>
  );
};

export default Header;
