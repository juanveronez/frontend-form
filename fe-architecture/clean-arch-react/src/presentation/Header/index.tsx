import { Link } from "react-router-dom";
import { Container, StyledHeader, List, ListItem } from "./styles";
import { useAuthContext } from "../../app/hooks/useAuthContext";
import { AuthenticatedActionList } from "./AuthenticatedActionList";
import { UnauthenticatedActionList } from "./UnauthenticatedActionList";
import { IconLogo } from "../../components/Icons";

export const Header = () => {
  const { session } = useAuthContext();

  const isAuthenticated = !!session;

  return (
    <StyledHeader>
      <Container>
        <List>
          <ListItem>
            <Link to="/">
              <IconLogo />
            </Link>
          </ListItem>
        </List>
        {isAuthenticated ? (
          <AuthenticatedActionList />
        ) : (
          <UnauthenticatedActionList />
        )}
      </Container>
    </StyledHeader>
  );
};
