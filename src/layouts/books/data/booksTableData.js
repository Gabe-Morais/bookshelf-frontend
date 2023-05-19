/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import MDAvatar from "components/MDAvatar";
import { Link } from "react-router-dom";

export default async function data(books) {
  console.log(await books);
  const Book = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar
        src={image}
        name={name}
        size="sm"
        sx={{
          borderRadius: "0",
          alignContent: "center",
          boxShadow: "3px 3px 5px 0px rgba(0,0,0,0.19)",
        }}
      />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const Books = () => {
    if (books.length > 0) {
      const resp = [];
      books.forEach((element) => {
        resp.push({
          book: <Book image={element.cape} name={element.name} />,
          author: <Author name={element.authors.join(", ")} />,
          publisher: <Publisher name={element.publisher} />,
          categories: <Categories categoryName={element.categories.join(", ")} />,
          release: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {element.publicationDate.substring(0, 10).split("-").reverse().join("/")}
            </MDTypography>
          ),
          pages: <BookPages pages={element.numberPages} />,
          status: element.available ? (
            <MDBox ml={-1}>
              <MDBadge badgeContent="disponivel" color="success" variant="gradient" size="sm" />
            </MDBox>
          ) : (
            <MDBox ml={-1}>
              <MDBadge badgeContent="indisponivel" color="error" variant="gradient" size="sm" />
            </MDBox>
          ),
          details: <Details />,
        });
      });
      return resp;
    }
    return [];
  };

  const Author = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
  const Publisher = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const Categories = ({ categoryName }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {categoryName}
      </MDTypography>
    </MDBox>
  );

  const BookPages = ({ pages }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {pages}
      </MDTypography>
    </MDBox>
  );

  // Details está estatico com link apenas como placeHolder
  const Details = () => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        <MDTypography
          component={Link}
          to="/authentication/sign-in"
          variant="button"
          color="info"
          fontWeight="bold"
          fontSize="25px"
          textGradient
        >
          +
        </MDTypography>
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Título", accessor: "book", align: "left" },
      { Header: "Autores", accessor: "author", align: "left" },
      { Header: "Editora", accessor: "publisher", align: "left" },
      { Header: "Categorias", accessor: "categories", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Páginas", accessor: "pages", align: "center" },
      { Header: "Ano de Publicação", accessor: "release", align: "center" },
      { Header: "Detalhes", accessor: "details", align: "center" },
    ],
    rows: Books(),
  };
}
