/**
 =========================================================
 * Material Dashboard 2 React - v2.1.0
 =========================================================
 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2022 Creative Tim (https://www.creative-tim.com)
 Coded by www.creative-tim.com
 =========================================================
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// import Cape from "assets/images/book/harry_potter_pf.jpg";
import JkRowling from "assets/images/avatar/imgAvatar.png";

import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import { Box, CircularProgress, Grid, useMediaQuery, useTheme } from "@mui/material";
import DataTable from "examples/Tables/DataTable";
// eslint-disable-next-line no-unused-vars
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLibrary } from "hooks/useLibrary";
import { useMaterialUIController } from "context";
// eslint-disable-next-line no-unused-vars
import Book from "models/Book.model";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";

import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";
import data from "./data";

function Details() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));
  const useLibraries = useLibrary();
  // eslint-disable-next-line no-unused-vars
  const [bookInfo, setBookInfo] = useState(null);
  const [controller] = useMaterialUIController();
  const { token } = controller;
  const { columns, rows } = data();

  // TODO: Constante responsavel por pegar os parametos presentes na url: http://localhost:8080/dashboard/book/details/(:id do livro)
  const { id } = useParams();

  useEffect(() => {
    // TODO: useLibraries.getLibraryBooks(tokenDeAcesso, idDaBiblioteca, filtrosDePesquisa)
    useLibraries
      .getLibraryBooks(token, localStorage.getItem("bs-lid"), [
        { filterKey: "code", value: id, operation: "eq" },
      ])
      .then((resp) => {
        // TODO: Insere o primeiro elemento que vier do metodo getLibraryBooks no state bookInfo.
        setBookInfo(resp[0]);
      });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Detalhes
                </MDTypography>
              </MDBox>
              {/* TODO: Caso o state bookInfo tenho informações dentro dele, será mostrado a pagina completo, se não mostrara um circulo carregando */}
              {bookInfo ? (
                <MDBox sx={{ margin: "3rem 1.5rem 1rem 3rem" }}>
                  <Grid
                    sx={
                      matches && {
                        display: "flex",
                        justifyContent: "center",
                      }
                    }
                    container
                    spacing={3}
                  >
                    <Grid xs={12} sm={9} md={5} lg={4}>
                      <MDBox
                        component="img"
                        sx={{
                          width: "400px",
                          maxWidth: "100%",
                          height: "auto",
                          maxHeight: "100%",
                          borderRadius: "0.7rem",
                        }}
                        src={bookInfo.cape}
                        alt="Capa"
                      />
                    </Grid>
                    <Grid xs={10.5} sm={6.6} lg={7.5} sx={{ ml: 2 }}>
                      <MDTypography variant="h3" align="center" sx={{ fontWeight: "400" }}>
                        {bookInfo.name}
                      </MDTypography>
                      <Grid container>
                        <Avatar
                          src={JkRowling}
                          alt="J.k.Rowling"
                          sx={{ width: 130, height: 130 }}
                        />
                        <MDBox
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            mb: "15px",
                          }}
                        >
                          <MDTypography variant="h5">{bookInfo.authors[0]}</MDTypography>
                          <MDTypography variant="h6" sx={{ color: "#cecece", fontWeight: "400" }}>
                            Autor(a)
                          </MDTypography>
                        </MDBox>
                      </Grid>
                      <Grid sx={{ textAlign: "justify" }}>
                        <MDTypography
                          variant="item"
                          sx={{
                            fontSize: "0.7em",
                            fontWeight: "400",
                            color: "#cecece",
                          }}
                        >
                          {bookInfo.sinopse}
                        </MDTypography>
                      </Grid>
                      <Grid
                        mt={5}
                        sx={
                          matches
                            ? { display: "block" }
                            : {
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gridTemplateRows: "repeat(6, 1fr)",
                              }
                        }
                      >
                        <Box
                          gridRow={1}
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            mr: "5",
                            mb: "15px",
                            alignItems: "flex-end",
                          }}
                        >
                          <MDTypography variant="h6" sx={{ mr: "8px", fontSize: "0.74em" }}>
                            Editora:
                          </MDTypography>
                          <MDTypography
                            variant="h6"
                            sx={{ color: "#cecece", fontWeight: "400", fontSize: "0.7em" }}
                          >
                            {bookInfo.publisher}
                          </MDTypography>
                        </Box>
                        <Box
                          gridRow={2}
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            mr: "5",
                            mb: "15px",
                            alignItems: "flex-end",
                          }}
                        >
                          <MDTypography variant="h6" sx={{ mr: "8px", fontSize: "0.74em" }}>
                            ISBN:
                          </MDTypography>
                          <MDTypography
                            variant="h6"
                            sx={{ color: "#cecece", fontWeight: "400", fontSize: "0.7em" }}
                          >
                            {bookInfo.isbn}
                          </MDTypography>
                        </Box>
                        <Box
                          gridRow={3}
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            mr: "5",
                            mb: "15px",
                            alignItems: "flex-end",
                          }}
                        >
                          <MDTypography variant="h6" sx={{ mr: "8px", fontSize: "0.74em" }}>
                            Edição:
                          </MDTypography>
                          <MDTypography
                            variant="h6"
                            sx={{ color: "#cecece", fontWeight: "400", fontSize: "0.7em" }}
                          >
                            {bookInfo.edition}
                          </MDTypography>
                        </Box>
                        <Box
                          gridRow={4}
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            mr: "5",
                            mb: "15px",
                            alignItems: "flex-end",
                          }}
                        >
                          <MDTypography variant="h6" sx={{ mr: "8px", fontSize: "0.74em" }}>
                            Data de Publicação:
                          </MDTypography>
                          <MDTypography
                            variant="h6"
                            sx={{ color: "#cecece", fontWeight: "400", fontSize: "0.7em" }}
                          >
                            {bookInfo.publicationDate}
                          </MDTypography>
                        </Box>
                        <Box
                          gridRow={5}
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            mr: "5",
                            mb: "15px",
                            alignItems: "flex-end",
                          }}
                        >
                          <MDTypography variant="h6" sx={{ mr: "8px", fontSize: "0.74em" }}>
                            Paginas:
                          </MDTypography>
                          <MDTypography
                            variant="h6"
                            sx={{ color: "#cecece", fontWeight: "400", fontSize: "0.7em" }}
                          >
                            {bookInfo.numberPages}
                          </MDTypography>
                        </Box>
                        <Box
                          gridRow={6}
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            mr: "5",
                            mb: "15px",
                            alignItems: "flex-end",
                          }}
                        >
                          <MDTypography variant="h6" sx={{ mr: "8px", fontSize: "0.74em" }}>
                            Linguagem:
                          </MDTypography>
                          <MDTypography
                            variant="h6"
                            sx={{ color: "#cecece", fontWeight: "400", fontSize: "0.7em" }}
                          >
                            {bookInfo.language}
                          </MDTypography>
                        </Box>
                        <Box
                          gridRow={1}
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            mr: "5",
                            mb: "15px",
                            alignItems: "flex-end",
                          }}
                        >
                          <MDTypography variant="h6" sx={{ mr: "8px", fontSize: "0.74em" }}>
                            Capa:
                          </MDTypography>
                          <MDTypography
                            variant="h6"
                            sx={{ color: "#cecece", fontWeight: "400", fontSize: "0.7em" }}
                          >
                            {bookInfo.capeType}
                          </MDTypography>
                        </Box>
                        <Box
                          gridRow={2}
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            mr: "5",
                            mb: "15px",
                            alignItems: "flex-end",
                          }}
                        >
                          <MDTypography variant="h6" sx={{ mr: "8px", fontSize: "0.74em" }}>
                            Copias:
                          </MDTypography>
                          <MDTypography
                            variant="h6"
                            sx={{ color: "#cecece", fontWeight: "400", fontSize: "0.7em" }}
                          >
                            09
                          </MDTypography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} lg={2}>
                    <MDBox
                      mt={3}
                      py={2}
                      px={2}
                      textAlign="center"
                      variant="gradient"
                      bgColor="info"
                      borderRadius="lg"
                      coloredShadow="info"
                    >
                      <MDTypography variant="h6" color="white">
                        Emprestimos
                      </MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid>
                    <MDBox pt={3}>
                      <DataTable
                        table={{ columns, rows }}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={false}
                        noEndBorder
                      />
                    </MDBox>
                  </Grid>
                </MDBox>
              ) : (
                <Box
                  sx={{
                    height: 100,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* Circulo de carregamento */}
                  <CircularProgress />
                </Box>
              )}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Details;
