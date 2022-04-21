import { GridTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

const AccountLock: React.FC<{
  setView: React.Dispatch<React.SetStateAction<string>>;
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
}> = ({ Grid, setView }) => {
  return (
    <>
      <Grid>
        <h1>HELLO</h1>
      </Grid>
    </>
  );
};

export default AccountLock;
