import { useSelector } from "react-redux";
import { State } from "../redux/userSlice";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Header = () => {
  const { user } = useSelector((state: State) => state.userStore);

  return (
    <header className="h-[64px] flex p-2 items-center text-gray-700/80">
      <ul className="flex gap-3 w-full h-full items-center">
        <li className="ml-0 mr-auto font-bold">
          {user.firstName + " " + user.lastName}
        </li>
        <li className="mr-0">Todos</li>
        <li className="mr-9">Menu-2</li>
      </ul>
      <div className="p-0.5 rounded-full cursor-pointer hover:outline hover:outline-2 hover:outline-purple-600">
        <Menu>
          <MenuButton
            as={Avatar}
            aria-label="Options"
            size={"sm"}
            src="https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon"
            className=""
          />
          <MenuList>
            <MenuItem command="N">Profile</MenuItem>
            <MenuDivider />
            <MenuItem as={Link} to={"/logout"}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </header>
  );
};
