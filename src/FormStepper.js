import React, { useState } from "react";
import useRecorder from "./useRecorder";
import "./form.css";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
} from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Step 1", "Step 2", "Step 3", "Step 4"];
}

const PersonalInformation = () => {
  const { control , formState: {errors}} = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="firstName"
        rules={{
          required: 'Name is Required',
        }}
        render={({ field }) => (
          <TextField
            id="first-name"
            label="Name"
            variant="outlined"
            placeholder="Enter Your  Name"
            fullWidth
            margin="normal"
            {...field}
            error={errors.firstName}
            helperText={errors.firstName?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="emailAddress"
        rules={{
          required: "email is required",
        }}
        render={({ field }) => (
          <TextField
            id="email"
            label="E-mail"
            variant="outlined"
            placeholder="Enter Your E-mail Address"
            fullWidth
            margin="normal"
            type="email"
            {...field}
            error={errors.emailAddress}
            helperText={errors.emailAddress?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="phoneNumber"
        rules={{
          required: "phone number is required",
        }}
        render={({ field }) => (
          <TextField
            id="phone-number"
            label="Phone Number"
            variant="outlined"
            placeholder="Enter Your Phone Number"
            fullWidth
            margin="normal"
            {...field}
            error={errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />
        )}
      />
    </>
  );
};
const RecordingInformation = () => {
  let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
  
  return (
    <div>
      <audio
        src={audioURL}
        controls
        style={{ marginLeft: "120px", marginTop: "20px" }}
      />
      <Button
        onClick={startRecording}
        disabled={isRecording}
        style={{
          marginLeft: "50px",
          marginBottom: "50px",

          marginRight: "20px",
          color: "#ffff",
          backgroundColor: "#e45b0b",
        }}
      >
        start recording
      </Button>
      <Button
        onClick={stopRecording}
        disabled={!isRecording}
        style={{
          marginBottom: "50px",
          backgroundColor: "#2db31c",
          color: "#ffff",
        }}
      >
        stop recording
      </Button>
    </div>
  );
};
const PasswordInformation = () => {
  const { control, formState: {errors},watch } = useFormContext();
  let pwd = watch("password");
  return (
    <>
      <Controller
        control={control}
        name="password"
        rules={{
          required:"this field is required"
        }}
        render={({ field }) => (
          <TextField
            id="password"
            label="password"
            variant="outlined"
            placeholder="Enter Your Password"
            fullWidth
            margin="normal"
            type="password"
            {...field}
            error={errors.password}
            helperText={errors.password?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required:"this field is required",
          validate: value => value === pwd || "The passwords do not match"
        }}
        render={({ field }) => (
          <TextField
            id="confirmPassword"
            label="confirmPassword"
            variant="outlined"
            placeholder="Confirm Password"
            fullWidth
            margin="normal"
            type="password"
            {...field}
            error={errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        )}
      />
    </>
  );
};
const CheckBoxInformation = () => {
  const { control } = useFormContext();
  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <h2 style={{ marginLeft: "120px" }}>
        Tick on checkbox if you Agree With our agreement
      </h2>
      <Controller
        control={control}
        name="checkBox"
        render={({ field }) => (
          <Checkbox
            checked={checked}
            onClick={handleChange}
            name="checkBox"
            style={{ left: "650px", marginTop: "-99px" }}
            {...field}
          />
        )}
      />
    </>
  );
};

function getStepContent(step) {
  switch (step) {
    case 0:
      return <PersonalInformation />;

    case 1:
      return <RecordingInformation />;

    case 2:
      return <PasswordInformation />;

    case 3:
      return <CheckBoxInformation />;

    default:
      return "unknown step";
  }
}

function stringToBinary(str) {
  let strOut = "";
  for (var i = 0; i < str.length; i++) {
    strOut += str[i].charCodeAt(0).toString(2);
  }
  return strOut;
}

const FormStepper = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);

  const FormData = () => {
    let formData = [JSON.parse(sessionStorage.getItem("formData"))];

    let audioUrl = JSON.parse(sessionStorage.getItem("audioURL"));
    let result = stringToBinary(audioUrl);

    return (
      <>
        <div className="stock-container">
          {formData.map((data, key) => {
            return (
              <>
                <br />
                <h1 style={{ textAlign: "center", color: "#1F1D36" }}>
                  Your FormData
                </h1>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "10px",
                    fontFamily: "Verdana",
                    color: "#105652",
                  }}
                >
                  <div key={key}>
                    <h1>Name : {data.firstName}</h1>
                    <h1>Email : {data.emailAddress}</h1>
                    <h1>Phone : {data.phoneNumber}</h1>

                    <h1>Password : {data.password}</h1>
                    <h1>confirmPassword : {data.confirmPassword}</h1>
                    <h1>
                      checkBox : {data.checkBox === true ? "true" : "false"}
                    </h1>
                  </div>
                  <h1>Recording : {result.substring(0, 20)}</h1>
                  <br />
                </div>
              </>
            );
          })}
        </div>
      </>
    );
  };

  const isStepFailed = () => {
    return Boolean(Object.keys(methods.formState.errors).length);
  }

  const steps = getSteps();
  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      nickName: "",
      emailAddress: "",
      phoneNumber: "",
      alternatePhone: "",
      address1: "",
      address2: "",
      country: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      checkBox: "",
    },
  });

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = (data) => {
    if (activeStep === steps.length - 1) {
      fetch("https://jsonplaceholder.typicode.com/comments")
        .then((data) => data.json())
        .then((res) => {
          sessionStorage.setItem("formData", JSON.stringify(data));
          setActiveStep(activeStep + 1);
        });
    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };

  return (
    <div>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography
                variant="caption"
                align="center"
                style={{ display: "block" }}
              ></Typography>
            );
          }
          if(isStepFailed() && activeStep == index){
            labelProps.error = true;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <>
          <br />
          <br />
          <Typography
            variant="h4"
            align="center"
            style={{ color: "#FF5403", fontFamily: "Helvetica" }}
          >
            Thank You Your Form Details Submitted Successfully
          </Typography>
          <FormData />
        </>
      ) : (
        <>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {getStepContent(activeStep)}
              <Button
                className={classes.button}
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  style={{ backgroundColor: "#e45b0b" }}
                >
                  skip
                </Button>
              )}
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                // onClick={handleNext}
                type="submit"
                style={{ backgroundColor: "#2db31c" }}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </form>
          </FormProvider>
        </>
      )}
    </div>
  );
};

export default FormStepper;
