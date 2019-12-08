import React from "react";
import List from "./list";
import submitHandler from "../utils/helperFunctions";

function Samples() {
  const label1 = "Required and disabled is false. Max is 3";
  const placeholder1 = "enter a item for sample 1";
  const required1 = false;
  const disabled1 = false;
  const max1 = 3;

  const label2 = "Required is true and Disabled is false. Max is 10";
  const placeholder2 = "enter a item for sample 2";
  const required2 = true;
  const disabled2 = false;
  const max2 = 10;

  const label3 = "Required is false and Disabled is true. Max is 4";
  const placeholder3 = "enter a item for sample 3";
  const required3 = false;
  const disabled3 = true;
  const max3 = 4;

  return (
    <React.Fragment>
      <form onSubmit={submitHandler}>
        <div className="row">
          <div className="col">
            <List
              label={label1}
              placeholder={placeholder1}
              required={required1}
              disabled={disabled1}
              max={max1}
            ></List>
          </div>
          <div className="col">
            <List
              label={label2}
              placeholder={placeholder2}
              required={required2}
              disabled={disabled2}
              max={max2}
            ></List>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <List
              label={label3}
              placeholder={placeholder3}
              required={required3}
              disabled={disabled3}
              max={max3}
            ></List>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
}

export default Samples;
