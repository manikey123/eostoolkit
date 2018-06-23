/**
 *
 * SimplePermissionsForm
 *
 */

import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
// import styled from 'styled-components';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/icons
import PersonAdd from '@material-ui/icons/PersonAdd';
import HelpOutline from '@material-ui/icons/HelpOutline';

// core components
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import CustomInput from 'components/CustomInput/CustomInput';
import Button from 'components/CustomButtons/Button';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardIcon from 'components/Card/CardIcon';
import CardBody from 'components/Card/CardBody';

import regularFormsStyle from 'assets/jss/regularFormsStyle';

const FormObject = props => {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, eosAccount } = props;
  return (
    <form>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomInput
            labelText="Change permission on"
            id="creator"
            error={errors.creator}
            touched={touched.creator}
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              type: 'text',
              placeholder: 'Scatter account',
              value: eosAccount,
              onChange: handleChange,
              onBlur: handleBlur,
              disabled: true,
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <CustomInput
            labelText="Active Permision (Only complete if you want to change)"
            id="activeKey"
            error={errors.activeKey}
            touched={touched.activeKey}
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              type: 'text',
              placeholder: 'Public key or account name',
              value: values.activeKey,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <CustomInput
            labelText="Owner Permision (Only complete if you want to change)"
            id="ownerKey"
            error={errors.ownerKey}
            touched={touched.ownerKey}
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              type: 'text',
              placeholder: 'Public key or account name',
              value: values.ownerKey,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Button onClick={handleSubmit} color="rose">
            Update
          </Button>
        </GridItem>
        <GridItem xs={12} sm={12} md={8}>
          <p>
            By executing this action you are agreeing to the EOS constitution and this actions associated ricardian
            contract.
          </p>
        </GridItem>
      </GridContainer>
    </form>
  );
};

const validationSchema = Yup.object().shape({
  activeKey: Yup.string(),
  ownerKey: Yup.string(),
});

const SimplePermissionsForm = props => {
  const { classes, handleSubmit, eosAccount } = props;
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} lg={8}>
        <Card>
          <CardHeader color="warning" icon>
            <CardIcon color="warning">
              <PersonAdd />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Change Permissions (Simple)</h4>
          </CardHeader>
          <CardBody>
            <Formik
              initialValues={{
                creator: '',
                activeKey: '',
                ownerKey: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              eosAccount={eosAccount}
              render={formikProps => <FormObject {...formikProps} eosAccount={eosAccount} classes={classes} />}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} lg={4}>
        <Card>
          <CardHeader color="danger" icon>
            <CardIcon color="danger">
              <HelpOutline />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Important</h4>
          </CardHeader>
          <CardBody>
            <h5>
              <strong>This action has serious consequences</strong>
            </h5>
            <h5>You can change active or owner permission or both</h5>
            <h5>Leave blank any permission you DON&pos;T want to change</h5>
            <h6>
              To change only active permission select <i>&quot;youraccount@active&quot;</i> for your Scatter identity
            </h6>
            <h6>
              To change any permission select <i>&quot;youraccount@owner&quot;</i> for your Scatter identity
            </h6>
            <h5>
              If you change your active permission you have to update your scatter identity to use this new key pair
            </h5>
            <h5>
              If you dont have the key pairs you assign to the active permission you will no longer be able send
              transactions.
            </h5>
            <h5>You can recover your active permission using your owner permission, however:</h5>
            <h3>
              <strong>
                If you dont have either key pair you assign your account becomes <u>IRRECOVERABLE</u>
              </strong>
            </h3>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default withStyles(regularFormsStyle)(SimplePermissionsForm);
