import { toast } from "react-toastify";
import { useAuthContext } from "../../app/hooks/useAuthContext";
import { List, ListItem } from "./styles";
import { useNavigate } from "react-router";
import { IconAvatar } from "../../components/Icons";
import { TransparentButton } from "../../components/TransparentButton";

export const AuthenticatedActionList = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const onAskForLogout = async () => {
    try {
      await logout();
      toast.success("Sessão encerrada");
      navigate("/auth/login");
    } catch (error) {
      toast.error("Erro no logout");
      console.error("logout", error);
    }
  };

  return (
    <List>
      <ListItem>Seja bem vindo!</ListItem>
      <ListItem>
        <IconAvatar />
      </ListItem>
      <ListItem>
        <TransparentButton onClick={onAskForLogout}>Logout</TransparentButton>
      </ListItem>
    </List>
  );
};
