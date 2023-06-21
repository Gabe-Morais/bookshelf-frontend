import React, { useState } from "react";
import {
  Alert,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { useMaterialUIController } from "context";
import { useLoan } from "hooks/useLoan";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

function NewBorrowingButton() {
  const [controller] = useMaterialUIController();

  const { createBorrowing } = useLoan();
  const { userLogged } = controller;

  const [openDialog, setOpenDialog] = useState(false);

  const [loanData, setLoanData] = useState({
    loanDate: "",
    returnDate: "",
    bookCode: "",
    userId: "",
  });
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [successSnackbar, setSuccessSnackbar] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleErrorSnackbar = () => {
    setErrorSnackbar(true);
  };

  const handleCloseErrorSnackbar = () => {
    setErrorSnackbar(false);
  };

  const handleSuccessSnackbar = () => {
    setSuccessSnackbar(true);
  };

  const handleCloseSuccessSnackbar = () => {
    setSuccessSnackbar(false);
  };

  const borrowingData = {
    loanDate: loanData.loanDate,
    returnDate: loanData.returnDate,
    bookCode: loanData.bookCode,
    userId: loanData.userId,
  };

  const validateFields = () => {
    // Verifica se todos os campos estão preenchidos
    if (!loanData.loanDate || !loanData.returnDate || !loanData.bookCode || !loanData.userId) {
      handleErrorSnackbar();
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    const isValid = validateFields();

    if (isValid) {
      createBorrowing(userLogged.token, borrowingData)
        .then(() => {
          handleCloseDialog();
          handleSuccessSnackbar();
        })
        .catch(() => {});
    }

    console.log(loanData);
  };

  return (
    <MDBox>
      <MDButton onClick={handleOpenDialog} color="success">
        Novo Empréstimo
      </MDButton>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          style: {
            backgroundColor: "#202940",
            boxShadow: "none",
          },
        }}
      >
        <DialogTitle>Novo Empréstimo</DialogTitle>
        <DialogContent>
          <Box gridRow={4} sx={{ mb: 2 }}>
            <Box gridRow={1} sx={{ mb: 2 }}>
              <MDInput
                label="Data de Empréstimo"
                type="date"
                value={loanData.loanDate}
                onChange={(e) => setLoanData({ ...loanData, loanDate: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Box>

            <MDBox gridRow={2} sx={{ mb: 2 }}>
              <MDInput
                label="Data de Devolução"
                type="date"
                value={loanData.returnDate}
                onChange={(e) => setLoanData({ ...loanData, returnDate: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </MDBox>

            <MDBox gridRow={3} sx={{ mb: 2 }}>
              <MDInput
                label="Tombo"
                type="number"
                value={loanData.bookCode}
                onChange={(e) => setLoanData({ ...loanData, bookCode: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </MDBox>
            <Box gridRow={4} sx={{ mb: 2 }}>
              <MDInput label="Usuario" />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <MDButton onClick={handleCloseDialog} color="error" variant="contained">
            Cancelar
          </MDButton>
          <MDButton onClick={handleSubmit} color="info" background="none">
            Criar Empréstimo
          </MDButton>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={errorSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseErrorSnackbar}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        TransitionComponent={Slide}
      >
        <Alert onClose={handleCloseErrorSnackbar} severity="error">
          Por favor, preencha todos os campos para realizar o empréstimo.
        </Alert>
      </Snackbar>

      <Snackbar
        open={successSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSuccessSnackbar}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        TransitionComponent={Slide}
      >
        <Alert onClose={handleCloseSuccessSnackbar} severity="success">
          Empréstimo criado com sucesso!
        </Alert>
      </Snackbar>
    </MDBox>
  );
}

export default NewBorrowingButton;
