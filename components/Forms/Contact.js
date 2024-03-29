import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import brand from "../../public/text/brand";
import logo from "../../public/images/dassplastic-logo.svg";
import routeLink from "../../public/text/link";
import { withTranslation } from "../../i18n";
import { useText } from "../../theme/common";
import useStyles from "./form-style";

function Contact(props) {
  const classes = useStyles();
  const text = useText();
  const { t } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [values, setValues] = useState({
    values: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    ValidatorForm.addValidationRule("isTruthy", (value) => value);
  });

  const [openNotif, setNotif] = useState(false);

  const [check, setCheck] = useState(false);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleCheck = (event) => {
    setCheck(event.target.checked);
  };

  // const handleSubmit = () => {
  // 	setNotif(true);
  // };

  const handleClose = () => {
    setNotif(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jsonElements = JSON.stringify(values);

    await fetch(
      "https://redirectcorsdassplas.herokuapp.com/https://api.dassplastic.com.ar/v1/contact-form",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonElements,
      }
    ).then((res) => {
      if (res.status === 200) {
        setSubmitted(true);
        setValues({ name: "", email: "", phone: "", company: "", message: "" });
      }
    });
  };

  return (
    <div className={classes.pageWrap}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        key="top right"
        open={openNotif}
        autoHideDuration={4000}
        onClose={handleClose}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        message={<span id="message-id">Message Sent</span>}
      />
      <Hidden mdUp>
        <div className={clsx(classes.logo, classes.logoHeader)}>
          <a href={routeLink.dassplastic.home}>
            <img src={logo} alt="logo" />
            <Typography component="span" className={text.subtitle2}>
              {brand.dassplastic.projectName}
            </Typography>
          </a>
        </div>
      </Hidden>
      <Container maxWidth="md" className={classes.innerWrap}>
        <IconButton
          href={routeLink.dassplastic.home}
          className={classes.backtohome}
        >
          <i className="ion ion-ios-arrow-back" style={{ color: "white" }}>
            <div style={{ color: "white", fontSize: "15px", marginTop: "5px" }}>
              Volver
            </div>
          </i>
          <i className="ion-ios-arrow-round-back" />
        </IconButton>
        <Paper className={clsx(classes.formBox, "fragment-fadeUp")}>
          <div className={classes.fullFromWrap}>
            <Typography
              variant="h3"
              align="center"
              className={clsx(classes.title, text.title)}
              gutterBottom
            >
              {submitted
                ? "Mensaje enviado con exito!"
                : t("common:contact_title2")}
            </Typography>
            <Typography className={clsx(classes.desc, text.subtitle2)}>
              {submitted
                ? "Gracias por contactarte con nosotros."
                : t("common:contact_subtitle")}
            </Typography>
            {!submitted && (
              <div className={classes.form}>
                <ValidatorForm
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                  onError={(errors) => console.log(errors)}
                >
                  <Grid container spacing={6}>
                    <Grid item md={6} xs={12}>
                      <TextValidator
                        variant="filled"
                        className={clsx(classes.input, classes.light)}
                        label={t("common:form_name")}
                        onChange={handleChange("name")}
                        name="Name"
                        value={values.name}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextValidator
                        variant="filled"
                        className={clsx(classes.input, classes.light)}
                        label={t("common:form_email")}
                        onChange={handleChange("email")}
                        name="Email"
                        value={values.email}
                        validators={["required", "isEmail"]}
                        errorMessages={[
                          "This field is required",
                          "email is not valid",
                        ]}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextValidator
                        variant="filled"
                        className={clsx(classes.input, classes.light)}
                        label={t("common:form_phone")}
                        onChange={handleChange("phone")}
                        name="Phone"
                        value={values.phone}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextValidator
                        variant="filled"
                        className={clsx(classes.input, classes.light)}
                        label={t("common:form_company")}
                        onChange={handleChange("company")}
                        name="Company"
                        value={values.company}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextValidator
                        variant="filled"
                        multiline
                        rows="6"
                        className={clsx(classes.input, classes.light)}
                        label={t("common:form_message")}
                        onChange={handleChange("message")}
                        name="Message"
                        value={values.message}
                      />
                    </Grid>
                  </Grid>
                  <div className={clsx(classes.btnArea, classes.flex)}>
                    {!submitted && (
                      <Button
                        variant="contained"
                        fullWidth={isMobile}
                        type="submit"
                        color="secondary"
                        size="large"
                      >
                        {t("common:form_send")}
                      </Button>
                    )}
                  </div>
                </ValidatorForm>
              </div>
            )}
          </div>
        </Paper>
      </Container>
    </div>
  );
}

Contact.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation(["common"])(Contact);
