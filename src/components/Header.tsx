import { useSelector } from "react-redux";
import {
  Avatar,
  Center,
  Divider,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { UserStore } from "../store/store";
import { FaRegCalendarCheck } from "react-icons/fa6";

export const Header = () => {
  const { user } = useSelector((state: UserStore) => state.userStore);
  const navigate = useNavigate();

  return (
    <header className="h-[64px] flex px-4 py-2 items-center text-gray-700/80">
      <ul className="flex gap-3 w-full h-full items-center">
        <li className="ml-0 mr-auto font-bold flex">
          <span className="flex items-center gap-2">
            <FaRegCalendarCheck className="text-4xl text-purple-700" />
            <span className="text-lg">YourCalendar</span>
          </span>
          <Center width='30px'>
            <Divider orientation='vertical' />
          </Center>
          <span className="my-auto">
            {user?.firstName + " " + user?.lastName}

          </span>
        </li>
        <li className={`mr-0 font-bold py-1 px-2 ${window.location.pathname == "/home" && "bg-purple-700 rounded text-white"}`}>
          <Link to={"/home"}>Todos</Link>
        </li>
        <li className="mr-9">asd</li>
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
            <MenuItem command="N" onClick={() => navigate("/profile")}>Profile</MenuItem>
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
