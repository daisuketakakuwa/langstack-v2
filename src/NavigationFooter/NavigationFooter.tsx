import { useNavigate } from "react-router-dom";
import { NavigationBar, NavigationIcon } from "./NavigationFooterStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faPlusSquare,
  faSearch,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

const NavigationFooter = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <NavigationBar>
      <NavigationIcon onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faHouse} size="2x" />
      </NavigationIcon>
      <NavigationIcon onClick={() => navigate("/post")}>
        <FontAwesomeIcon icon={faPlusSquare} size="2x" />
      </NavigationIcon>
      <NavigationIcon onClick={() => navigate("/search")}>
        <FontAwesomeIcon icon={faSearch} size="2x" />
      </NavigationIcon>
      <NavigationIcon onClick={() => navigate("/revise")}>
        <FontAwesomeIcon icon={faBook} size="2x" />
      </NavigationIcon>
    </NavigationBar>
  );
};

export default NavigationFooter;
