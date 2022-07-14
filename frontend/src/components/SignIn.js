import Grid from '@material-ui/core/Grid';
import Pic from '../images/katie-smith-uQs1802D0CQ-unsplash.jpg';



function SignIn() {
    return (
    <main style={{ display:"flex", alignItems:"center", justifyContent:"center", paddingTop:"35px"}}>
      <Grid>
        <Grid container>
             <img src={Pic} style={{borderRadius:"10px"}} height='525' width='600' alt='recipe'/>
        </Grid>
      </Grid>
    </main>
        
  );
}

export default SignIn;

