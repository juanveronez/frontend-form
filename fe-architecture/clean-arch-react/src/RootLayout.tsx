import styled from "styled-components";
import { Header } from "./components/Header";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { AuthProvider } from "./app/contexts/AuthContext";

const Container = styled.div`
  display: flex;
  gap: 24px;
  width: 1200px;
  margin: 24px auto;
`;

const RootLayout = () => {
  return (
    <AuthProvider>
      <ToastContainer />
      <Header />
      <Container>
        <Outlet />
      </Container>
    </AuthProvider>
  );
};

export default RootLayout;
