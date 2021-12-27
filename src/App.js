import FormStepper from "./FormStepper";
import { CssBaseline, Container, Paper, Box } from "@material-ui/core";
import Header from "./Header"

function App() {
  return (
    <>
     <Header />
      <CssBaseline />
      <Container component={Box} p={4}>
        <Paper component={Box} p={3}>
          <FormStepper />
        </Paper>
      </Container>
    </>
  );
}

export default App;
